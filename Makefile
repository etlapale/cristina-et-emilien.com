PROFILE=cee
BUCKET=cristina-et-emilien.com
CHAT_PKG_DIR=chat-package
LAMBDA_PLATFORM=manylinux_2_17_aarch64
CHAT_LAMBDA_ZIP=chat_lambda_function.zip

.PHONY: all clean code fonts images

all: code fonts images

code:
	aws --profile $(PROFILE) s3 cp index.html scripts.js translations.js styles.css s3://$(BUCKET)/

fonts:
	aws --profile $(PROFILE) s3 cp --recursive fonts s3://$(BUCKET)/fonts

images:
	aws --profile $(PROFILE) s3 cp --recursive images s3://$(BUCKET)/images

chat-lambda: $(CHAT_LAMBDA_ZIP)

$(CHAT_LAMBDA_ZIP):
	mkdir -p $(CHAT_PKG_DIR)
	(cd $(CHAT_PKG_DIR); pip download --platform manylinux2014_aarch64 --only-binary=:all: --implementation cp --abi cp312 --python-version 3.12 openai; pip install --target . --no-deps *.whl; cd ..)
	# pip install --platform $(LAMBDA_PLATFORM) --target $(CHAT_PKG_DIR) openai
	# cp src/cristina_et_emilien_com/__init__.py $(CHAT_PKG_DIR)/lambda_function.py
	# (cd $(CHAT_PKG_DIR); zip -r ../$(CHAT_LAMBDA_ZIP) .; cd ..)

clean:
	rm -fr $(CHAT_PKG_DIR) $(CHAT_LAMBDA_ZIP)
