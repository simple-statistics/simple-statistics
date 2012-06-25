docs:
	docco src/*.js

test:
	mocha -R spec

.PHONY: docs test
