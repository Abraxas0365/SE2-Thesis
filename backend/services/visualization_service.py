import numpy as np
import cv2

def draw_annotations(results, exit_zones=None):
    frame = results[0].plot()

    # Draw exit zones (polygons)
    if exit_zones:
        for poly in exit_zones:
            pts = np.array(poly, dtype=np.int32)
            pts = pts.reshape((-1, 1, 2))
            cv2.polylines(frame, [pts], isClosed=True, color=(0, 255, 255), thickness=3)

    return frame