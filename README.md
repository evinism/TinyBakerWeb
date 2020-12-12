# TinyBakerWeb

A wrapper around TinyBaker that exposes transformations over an extensible interface!!

## Developing:

Developing on this thing is probably gonna be a mess for a while. It's largely built around Swagger's
codegen offerings, and struggles a bit because of it.

### Requirements

Requires: `yarn`, `python`, `pipenv`, and `swagger-codegen`.

### Launching the dev environment

Download dependencies and generate derived files.

```sh
git clone [url]
cd tinybakerweb
./build.sh # Regenerates all derived files
(cd client && yarn install)
pipenv install --dev
```

And then the following in separate shells

Frontend:

```sh
(cd client && yarn start)
```

Backend:

```sh
pipenv run python bin/run_test_server.py
```
