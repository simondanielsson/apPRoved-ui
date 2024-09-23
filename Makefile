.PHONY: install_dev build-image
IMAGE_NAME := approved-frontend
IMAGE_TAG := latest

install_dev:
	npm install;
	pre-commit install

build-image:
	echo "Building ${IMAGE_NAME}:${IMAGE_TAG} image...";
	APP_ENV=docker docker image build -t ${IMAGE_NAME}:${IMAGE_TAG} .;
	echo "Image ${IMAGE_NAME}:${IMAGE_TAG} built.";
