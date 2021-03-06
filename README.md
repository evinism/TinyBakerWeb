# TinyBakerWeb

A wrapper around [TinyBaker](https://github.com/evinism/TinyBaker) that exposes transformations over an extensible interface!!

When this project is done, you should be able to create a batteries-included server that runs TinyBaker transforms, with a single function call.

```py
from tinybakerweb import build_server
from .local_project import FirstPipeline, SecondPipeline, YetAnotherPipeline

server = build_server([FirstPipeline, SecondPipeline, YetAnotherPipeline])
server.run(port=5000)
```

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
pipenv run python run_test_server.py
```
