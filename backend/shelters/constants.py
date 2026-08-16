import re


NAME_REGEX = re.compile(r".{1,20}")
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
WEBSITE_REGEX = re.compile(r"^https?://[\w.-]+\.\w{2,}")
MAX_IMG_SIZE = 2 * 1024 * 1024
MIN_IMG_HEIGHT = 400
MIN_IMG_WIDTH = 400