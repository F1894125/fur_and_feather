import re


NAME_REGEX = re.compile(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' \-]{1,19}")
MAX_IMG_SIZE = 2 * 1024 * 1024
MIN_IMG_HEIGHT = 400
MIN_IMG_WIDTH = 400