import pkgutil
import swagger_server.controllers

def redirect_to_new_module(module, new_context):
  print("Redirecting modules in {} to {}".format(module.__name__, new_context))
  for package in pkgutil.iter_modules(module.__path__):
    path_to_overwrite = package.module_finder.find_spec("{}.{}".format(module.__name__,package.name)).origin
    with open(path_to_overwrite, 'w') as f:
      f.write("from {}.{} import *\n".format(new_context, package.name))

redirect_to_new_module(swagger_server.controllers, "tinybakerweb.controllers")