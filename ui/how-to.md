### Build updated front-end
``` bash
#! /bin/bash

cd /mnt/c/git.repo/git.daimler/linliu/forks/prefect/ui

export PREFECT_UI_SERVE_BASE="/aa/prefect/"

# npm run build
# rm -rf ../src/prefect/server/ui
# cp -rf ./dist/ ../src/prefect/server/ui/
npm run build ; rm -rf ../src/prefect/server/ui ; cp -rf ./dist/ ../src/prefect/server/ui/
```

### Start server in pycharm
**DO run below scripts before opening pycharm!**
``` batch
@REM update Prefect configuration

prefect config set PREFECT_API_URL=http://127.0.0.1:4288/aa/prefect/api
setx PREFECT_ROOT_PATH /aa/prefect

@REM check whether the port is occupied or not
netstat -ano | findstr 4288

taskkill -pid 17316 -f
```

``debug-it.py``