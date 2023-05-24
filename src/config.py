import sys
import os
from prefect.cli import app


base_url = os.environ.get("PREFECT_ROOT_PATH", "")
port = 4288

if __name__ == '__main__':
    sys.argv = ['prefect', 'config', 'set', f'PREFECT_API_URL=http://localhost:{port}{base_url}']

    print(sys.argv)
    sys.exit(app())
