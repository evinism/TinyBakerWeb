from tests.sample_server import build_test_app

cxapp = build_test_app()
app = cxapp.app

if __name__ == '__main__':
  cxapp.run(port=5000)
