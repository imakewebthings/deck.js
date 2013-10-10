SASSOPTS=--scss --style expanded

default: generate

generate:
	sass --update ${SASSOPTS} .

force:
	sass --update ${SASSOPTS} --force .

watch:
	sass --watch  ${SASSOPTS} .
