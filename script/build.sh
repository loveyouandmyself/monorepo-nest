#!/bin/bash

set -e

echo "参数个数:$#"
if [ $# -eq 0 ]; 
  then
    for pkg in $(ls packages)
    do
      cd packages
      if [ -d $pkg ];
        then
          cd $pkg
          echo "Building ${pkg}"
          # yarn build
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
          echo "Building ${arg}"
          # yarn build
          cd ..
        else
          echo "${arg}不存在，编译失败"
      fi
      cd ..
    done
fi