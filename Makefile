CONFIG_DIR = "$(shell sh -c 'echo $$HOME')/.config/cgai"

install: 
	npm i
	npm link

	mkdir $(CONFIG_DIR)
	touch $(CONFIG_DIR)/config.json

uninstall:
	npm unlink
