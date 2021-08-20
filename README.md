# monorepo-nest
**monorepo风格的nestjs项目**

# 项目初始化&运行
* npm --registry https://registry.npm.taobao.org install -g lerna pm2
* lerna bootstrap
* yarn build
* 分别复制auth/school模块下example.env.ini，修改为env.ini，并修改其中的配置信息
* 本地调试：yarn start:dev
* pm2启动：yarn start:pm2
* 权限模块默认端口6001，学校模块默认端口6002

# 单元测试
* 测试命令：yarn test
* 生成报告：yarn test:cov

# 数据库迁移
* 启动即同步表结构：修改env.ini文件中MYSQL_SYNCHRONIZE为true
* 在业务模块中生成数据库迁移文件
* 生成命令：yarn migrate:generate
* 生成地址：项目内database/migration文件夹下
* 运行命令：yarn migrate:run
* 回滚命令：yarn migrate:revert

# 代码提交
* git add .
* yarn commit

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