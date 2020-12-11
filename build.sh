set -e
[ -d "libgen" ] && rm -rf libgen
swagger-codegen generate \
  -i api/openapi.yaml \
  -l python-flask \
  -o libgen/
( cd client && yarn build )
[ -d "tinybakerweb/public" ] && rm -rf tinybakerweb/public
cp -r client/build tinybakerweb/public