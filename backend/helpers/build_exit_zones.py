def build_exit_zones(points):
    """
    Convert DB points → polygon per ROI
    """
    rois = {}

    for p in points:
        idx = p["point_index"]

        if idx not in rois:
            rois[idx] = []

        rois[idx].append((p["point_x"], p["point_y"], p.get("point_order", 0)))

    polygons = []

    for roi_points in rois.values():
        roi_points.sort(key=lambda x: x[2])  # maintain drawing order
        polygon = [(x, y) for x, y, _ in roi_points]
        polygons.append(polygon)

    return polygons