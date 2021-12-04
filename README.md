# imooc-admin

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## husky

Git Hooks 就是在 Git 执行特定事件（如commit、push、receive等）时触发运行的脚本，类似于“钩子函数”，没有设置可执行的钩子将被忽略。在项目的 `.git/hooks` 目录中，有一些 `.sample` 结尾的钩子示例脚本，如果想启用对应的钩子，只需手动删除后缀，即可。（删除某一个 hook 的后缀 `.sample` 即可启用该 hook 脚本，默认是不启用的。）

但是，我们一般不去改动 `.git/hooks` 里面的文件，因为我们使用 husky



```shell
# 安装 husky
npm i -D husky

# prepare 脚本会在执行 npm install 之后自动执行。也就是说当我们执行 npm install 安装完项目依赖后会执行 husky install 命令。
npm set-script prepare "husky install" && npm run prepare
```

效果 

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```



## lint-staged

`lint-staged` 是一个在 git 暂存文件上（也就是被 `git add` 的文件）运行已配置的 linter（或其他）任务。`lint-staged` 总是将所有暂存文件的列表传递给任务。



```shell
# 安装 lint-staged
npm i -D lint-staged
```



配置

```json
{
  "lint-staged": {
    "src/**/*.{js,vue}": [
      "prettier --write",
      "eslint --cache --fix",
      "git add"                // 将处理过的代码重新 add 到 git 中
    ]
  }
}
```



## commitlint

```shell
# 安装 commitlint
npm i @commitlint/cli @commitlint/config-conventional -D

# 生成 commitlint 配置文件
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```



## 配置 husky

```shell
# 创建了 pre-commit hook 之后，在每次执行 git commit 或者 git commit --amend 时，都会先触发 pre-commit hook，来执行 npm run lint 中包含的 eslint 等代码检测工作。
# 理论上，这样就可以有效避免将存在 eslint error 的代码提交到远程仓库了
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"$1\""
```



