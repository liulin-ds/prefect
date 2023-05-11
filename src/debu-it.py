import os
import prefect
from prefect.server.api.server import create_app

# used to confirm IDE is loading your working copy instead of installed one.
print(prefect.__file__)

# sub-url enablement
os.environ["PREFECT_ROOT_PATH"] = "/aa/prefect"

if __name__ == '__main__':
    import uvicorn
    app = create_app()

    uvicorn.run(app, host='0.0.0.0', port=4288, root_path='/aa/prefect')
