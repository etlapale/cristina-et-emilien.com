PROFILE=cee
BUCKET=cristina-et-emilien.com

.PHONY: all code

all: code
	aws --profile $(PROFILE) s3 cp --recursive fonts s3://$(BUCKET)/fonts
	aws --profile $(PROFILE) s3 cp --recursive images s3://$(BUCKET)/images

code:
	aws --profile $(PROFILE) s3 cp index.html s3://$(BUCKET)/
	aws --profile $(PROFILE) s3 cp scripts.js s3://$(BUCKET)/
	aws --profile $(PROFILE) s3 cp styles.css s3://$(BUCKET)/
