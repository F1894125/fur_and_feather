from pathlib import Path
from uuid import uuid4


def profile_image_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    return f"profiles/{uuid4()}{extension}"

def profile_address_proof_upload_path(instance, filename):
    extension =  Path(filename).suffix.lower()
    return f"{uuid4()}{extension}"

def profile_id_upload_path(instance, filename):
    extension =  Path(filename).suffix.lower()
    return f"{uuid4()}{extension}"