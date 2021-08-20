#!/bin/bash

set -e

echo "参数个数:$#"
if [ $# -eq 0 ]; 
  then
    packages=(
      monorepo-auth
      monorepo-school
    )
    for pkg in "${packages[@]}"
    do
      cd packages
      if [ -d $pkg ];
        then
          cd $pkg
          if [ -f "pm2-config.json" ];
            then
              echo "pm2 start ${pkg}"
              pm2 start pm2-config.json
            else
              echo "pm2-config.json文件不存在"
          fi
          cd ..
      fi
      cd ..
    done
  else
    for arg in $*            
    do
      cd packages
      if [ -d "$arg" ];
        then
          cd $arg
          if [ -f "pm2-config.json" ];
            then
              echo "pm2 start ${pkg}"
              pm2 start pm2-config.json
            else
              echo "pm2-config.json文件不存在"
          fi
          cd ..
        else
          echo "${arg}项目不存在，pm2启动失败"
      fi
      cd ..
    done
fi
