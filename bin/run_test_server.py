from tests.sample_server import build_test_app

app = build_test_app()
app.run(port=5000)