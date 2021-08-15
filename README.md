# monorepo-nest
**monorepo风格的nestjs项目**

# 项目初始化&运行
* npm --registry https://registry.npm.taobao.org install -g lerna
* lerna bootstrap
* yarn build
* 分别复制auth/school模块下example.env.ini，修改为env.ini，并修改其中得配置信息
* yarn start:dev
* 权限模块默认端口6001，学校模块默认端口6002

# 目录结构
```
monorepo-nest
├─ .gitignore
├─ .nvmrc
├─ README.md
├─ jest.config.ts
├─ lerna.json
├─ package.json
├─ packages
│  ├─ monorepo-auth
│  ├─ monorepo-core
│  └─ monorepo-school
├─ tsconfig.json
└─ yarn.lock
```
# 接口文档
## Swagger
* http://ip:port/api-doc
## GraphQL
* http://ip:port/graphql