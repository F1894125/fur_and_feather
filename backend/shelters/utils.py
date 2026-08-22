from pathlib import Path
from uuid import uuid4


def shelter_image_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    return f"shelters/{uuid4()}{extension}"

def secure_document_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    return f"{uuid4()}{extension}"