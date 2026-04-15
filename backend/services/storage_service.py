import os
import uuid
import cv2

RESULTS_DIR = "./results"
MAX_FILES = 20


def save_image(frame):
    # Ensure folder exists
    os.makedirs(RESULTS_DIR, exist_ok=True)

    # Generate unique filename
    filename = f"{uuid.uuid4()}.jpg"
    filepath = os.path.join(RESULTS_DIR, filename)

    # Save image
    cv2.imwrite(filepath, frame)

    # 🔥 CLEANUP: keep only latest 10 files
    try:
        files = [
            os.path.join(RESULTS_DIR, f)
            for f in os.listdir(RESULTS_DIR)
            if f.endswith(".jpg")
        ]

        # Sort by modified time (oldest first)
        files.sort(key=os.path.getmtime)

        # Remove extra files
        while len(files) > MAX_FILES:
            old_file = files.pop(0)
            try:
                os.remove(old_file)
                print("Deleted old file:", old_file)
            except PermissionError:
                print("Skipping (in use):", old_file)

    except Exception as e:
        print("Cleanup error:", e)

    # Return for frontend
    image_url = f"http://localhost:8000/results/{filename}"
    return filename, image_url