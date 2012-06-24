docs:
	docco src/*.js

test:
	mocha

.PHONY: docs test
