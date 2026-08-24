#!/bin/sh

set -e # exit if any command fails

echo "Running makemigrations..."
python manage.py makemigrations

echo "Running migrate..."
python manage.py migrate

echo "Loading initial data..."
python manage.py loaddata fur_and_feather_data.json

echo "Running check"
python manage.py check

echo "Starting Django development server..."
python manage.py runserver 0.0.0.0:8000