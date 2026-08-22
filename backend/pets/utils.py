from datetime import date
from dateutil.relativedelta import relativedelta
from django.utils.text import slugify
from uuid import uuid4
from pathlib import Path


def calculate_estimated_age(dob: date) -> int:
    """
    Returns age in months.
    
    Args:
        dob (date): The date of birth to calculate age from.
    
    Returns:
        int: The age in months.
    """
    today = date.today()
    delta = relativedelta(today, dob)

    return delta.years * 12 + delta.months


def calculate_estimated_dob(months: int) -> date:
    """
    Returns an approximate DOB.
    
    Args:
        months (int): The estimated age in months.
    
    Returns:
        date: The approximate DOB.
    """
    today = date.today()
    return today - relativedelta(months=months)

def generate_unique_slug(name: str, breed: str) -> str:
    """
    Generates a unique slug for a pet based on its name and breed.
    
    Args:
        name (str): The name of the pet.
        breed (str): The breed of the pet.
    
    Returns:
        str: The generated unique slug.
    """
    slug = f"{slugify(name)}-{slugify(breed)}-{uuid4().hex[:6]}"
    return slug

def pet_image_upload_path(instance, filename):
    extension = Path(filename).suffix.lower()
    return f'pets/{uuid4()}{extension}'