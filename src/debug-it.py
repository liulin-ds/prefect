import os
import prefect
from prefect.server.api.server import create_app

# used to confirm IDE is loading your working copy instead of installed one.
print(prefect.__file__)

# sub-url enablement
base_url = os.environ.get("PREFECT_ROOT_PATH", "/aa/prefect")
port = 4288

if __name__ == '__main__':
    import uvicorn
    app = create_app()
    print(f"Please visit the site via: http://127.0.0.1:{port}{base_url}")
    uvicorn.run(app, host='0.0.0.0', port=port)
