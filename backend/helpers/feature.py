#backend/helpers/feature.py
import numpy as np
import cv2

# Exit zones configuration
EXIT_ZONES = [
    [(0, 300), (100, 300), (100, 480), (0, 480)],     # door 1
    [(540, 300), (640, 300), (640, 480), (540, 480)]  # door 2
]


def get_center(box):
    x1, y1, x2, y2 = box
    return ((x1 + x2) / 2, (y1 + y2) / 2)

def is_inside_polygon(point, polygon):
    contour = np.array(polygon, dtype=np.int32)
    return cv2.pointPolygonTest(contour, point, False) >= 0

def compute_motion(current_centers, prev_centers):
    if not prev_centers or not current_centers:
        return 0.0

    distances = []

    for c in current_centers:
        d = min(
            np.linalg.norm(np.array(c) - np.array(p))
            for p in prev_centers
        )
        distances.append(d)

    motion = float(np.mean(distances))

    return min(motion / 50.0, 1.0)


# -------------------------------
# MAIN FEATURE EXTRACTION
# -------------------------------
def extract_features(results, previous_centers, exit_points):
    print("Exit points - ", exit_points)
    """
    Extract motion, people count, exit activity,
    AND direction-based entry/exit counts
    """

    boxes = results[0].boxes.xyxy.cpu().numpy()
    confs = results[0].boxes.conf.cpu().numpy()
    classes = results[0].boxes.cls.cpu().numpy()

    people_boxes = []
    confidences = []

    model_names = results[0].names

    for box, conf, cls in zip(boxes, confs, classes):
        class_name = model_names[int(cls)]

        if class_name == "person":
            people_boxes.append(box)
            confidences.append(float(conf))

    people_count = len(people_boxes)

    avg_confidence = (
        sum(confidences) / people_count
        if people_count > 0 else 0
    )

    centers = [get_center(b) for b in people_boxes]

    motion_level = compute_motion(centers, previous_centers)

    # -------------------------------
    # EXISTING: Exit activity (boolean)
    # -------------------------------
    zones = exit_points if exit_points else EXIT_ZONES

    exit_activity = any(
        any(is_inside_polygon(get_center(box), poly) for poly in zones)
        for box in people_boxes
    )

    # -------------------------------
    # NEW: Direction detection
    # -------------------------------
    entry_count = 0
    exit_count = 0

    # NOTE: This is approximate matching (no tracking IDs yet)
    zones = exit_points if exit_points and len(exit_points) > 0 else EXIT_ZONES

    for curr in centers:
        for prev in previous_centers:
            for poly in zones:
                prev_inside = is_inside_polygon(prev, poly)
                curr_inside = is_inside_polygon(curr, poly)

                # OUTSIDE → INSIDE = ENTRY
                if not prev_inside and curr_inside:
                    entry_count += 1

                # INSIDE → OUTSIDE = EXIT
                elif prev_inside and not curr_inside:
                    exit_count += 1

    features = {
        "people_count": people_count,
        "motion_level": motion_level,
        "exit_activity": exit_activity,
        "entry_count": entry_count,   
        "exit_count": exit_count,     
        "avg_confidence": avg_confidence
    }

    return features, centers