from datetime import timedelta
from decouple import config
from pathlib import Path


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django_extensions',
    'django_filters',

    'accounts.apps.AccountsConfig',

    'corsheaders',
    'rest_framework',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.facebook',

    'pets.apps.PetsConfig',
    'shelters.apps.SheltersConfig',
]

SITE_ID = 1

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': config('DB_NAME'),
    #     'USER': config('DB_USER'),
    #     'PASSWORD': config('DB_PASSWORD'),
    #     'HOST': config('DB_HOST'),
    # },
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Media files (uploads)
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

# CORS configuration
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000", # For standard React development port
    "http://127.0.0.1:3000", # For standard React development port
    "http://localhost:8000", # For standard Django development port
    "http://127.0.0.1:8000", # For standard Django development port
]

# Important for dj-rest-auth JWT cookies to pass from frontend to backend
CORS_ALLOW_CREDENTIALS = True
# DRF configuration
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ],
    "DEFAULT_FILTER_BACKENDS": [
            "django_filters.rest_framework.DjangoFilterBackend",
            "rest_framework.filters.SearchFilter",
            "rest_framework.filters.OrderingFilter",
    ],
}

AUTHENTICATION_BACKENDS = [
    'allauth.account.auth_backends.AuthenticationBackend',
    'django.contrib.auth.backends.ModelBackend',
]

ACCOUNT_SIGNUP_FIELDS = ['username*', 'email*', 'password1*', 'password2*']
# ACCOUNT_EMAIL_REQUIRED = True # Deprecated
# ACCOUNT_USERNAME_REQUIRED = False # Deprecated
ACCOUNT_LOGIN_METHODS = {'username', 'email'}
# ACCOUNT_AUTHENTICATION_METHOD = 'username_email' # Deprecated
ACCOUNT_EMAIL_VERIFICATION = 'none'

# Configure DRF to use JWT instead of standard token authentication
# This is necessary for dj-rest-auth to work with JWT
REST_AUTH = {
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'access-token',
    'JWT_AUTH_REFRESH_COOKIE': 'refresh-token',
    'JWT_AUTH_HTTPONLY': True,
    'JWT_AUTH_SECURE': True,
    'JWT_AUTH_SAMESITE': 'Lax',
    'REGISTER_SERIALIZER': 'accounts.serializers.CustomRegisterSerializer',
    'PASSWORD_RESET_SERIALIZER': 'accounts.serializers.CustomPasswordResetSerializer',
    'TOKEN_MODEL': None,
}

# SimpleJWT configuration
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60), # Defines the lifetime of the access token
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1), # Defines the lifetime of the refresh token
    'ROTATE_REFRESH_TOKENS': True, # Rotate refresh tokens after use
    'BLACKLIST_AFTER_ROTATION': True, # Blacklist old refresh tokens after rotation
}

# Social authentication
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': config('GOOGLE_CLIENT_ID'),
            'secret': config('GOOGLE_CLIENT_SECRET'),
        },
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'OAUTH_PKCE_ENABLED': True,
    },
    'facebook': {
        'APP': {
            'client_id': config('FACEBOOK_APP_ID'),
            'secret': config('FACEBOOK_APP_SECRET'),
        },
        'METHOD': 'oauth2',
        'SCOPE': ['email', 'public_profile'],
        'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
        'FIELDS': [
            'id', 'email', 'name', 'first_name',
            'last_name', 'picture',
        ],
        'VERIFIED_EMAIL': False,
        'VERSION': 'v18.0',
    }
}

# To handle login with a social account already linked to a different email
SOCIALACCOUNT_EMAIL_AUTHENTICATION_AUTO_CONNECT = True

# E-mail configuration
if DEBUG:
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
else:
    pass
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL')

FRONTEND_PASSWORD_RESET_URL = config('FRONTEND_PASSWORD_RESET_URL')

# App-level logging configuration
# LOGGING = {
#     "version": 1,
#     "disable_existing_loggers": False,  # Keeps Django's default loggers alive
#     "formatters": {
#         "verbose": {
#             "format": "{asctime} [{levelname}] {name} (line {lineno}): {message}",
#             "style": "{",
#         },
#         "simple": {
#             "format": "{levelname} {message}",
#             "style": "{",
#         },
#     },
#     "handlers": {
#         "console": {
#             "class": "logging.StreamHandler",
#             "formatter": "verbose",
#         },
#     },
#     "loggers": {
#         "django": {
#             "handlers": ["console"],
#             "level": "INFO",
#             "propagate": False,
#         },
#     },
# }

# PROJECT_APPS = ["accounts", "pets", "applications"]

# for app_name in PROJECT_APPS:
#     log_dir = BASE_DIR / app_name / "logs"
#     os.makedirs(log_dir, exist_ok=True)

#     handler_name = f"{app_name}_file"

#     LOGGING["handlers"][handler_name] = {
#         "level": "INFO",
#         "class": "logging.handlers.RotatingFileHandler",
#         "filename": log_dir / f"{app_name}.log",
#         "maxBytes": 1024 * 1024 * 5,  # 15 MB
#         "backupCount": 3,
#         "formatter": "verbose",
#     }

#     LOGGING["loggers"][app_name] = {
#         "handlers": ["console", handler_name],
#         "level": "INFO",
#         "propagate": False,
#     }
