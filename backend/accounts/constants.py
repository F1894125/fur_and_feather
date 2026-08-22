import re


NAME_REGEX = re.compile(r"^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' \-]{1,9}$")
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
PHONE_REGEX = re.compile(r"^[6-9]\d{9}$")
MAX_IMG_SIZE = 2 * 1024 * 1024
MIN_IMG_HEIGHT = 200
MIN_IMG_WIDTH = 200