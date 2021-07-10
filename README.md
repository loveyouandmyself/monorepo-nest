# monorepo-nest
monorepo风格的nestjs项目

# 项目初始化

# 目录结构解释

# 提交门禁配置
@commitlint/cli @commitlint/config-conventional : 校验提交规格的(这套是angular那套)
commitizen 可以拦截git cz 触发规则校验提交交互
lint-staged 可以给git暂存区特定文件设置执行规则,比如ts走tslint,所有文件prettier
husky 可以拦截git钩子做一些事情,比如提交记录拦截去执行校验

# 运行
