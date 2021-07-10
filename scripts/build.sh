#!/bin/bash

set -e

cd packages

packages=(
  monorepo-core
  monorepo-auth
  monorepo-school
)

for pkg in "${packages[@]}"
do
  cd $pkg
  echo "Building ${pkg}"
  yarn build
  cd ..
done
