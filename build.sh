set -e

[ -d "client/src/api-gen" ] && rm -rf libgen
swagger-codegen generate \
  -i api/openapi.yaml \
  -l typescript-axios \
  -o client/src/api-gen

[ -d "libgen" ] && rm -rf libgen
swagger-codegen generate \
  -i api/openapi.yaml \
  -l python-flask \
  -o libgen/
pipenv run python ./bin/redirect_controllers.py
( cd client && yarn build )
[ -d "tinybakerweb/public" ] && rm -rf tinybakerweb/public
cp -r client/build tinybakerweb/public