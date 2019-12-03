## 概念

- `nrm` 源管理
- `nvm` 版本管理
- `npm` 包管理

## 初始化包

package.json

```
npm init
// npm init -y 直接生成默认的package.json
```

## 下载包

- 全局安装 => 任意目录下的命令行中使用

```
npm i http-server -g
```

## 写一个全局命令

在`package.json`里面，添加`bin`字段

本地调试命令，在对应目录下执行 `npm link` 创建快捷方式指向文件 如目录下的`package.json` 会形成下面的映射路径

```
/usr/local/bin/feely -> /usr/local/lib/node_modules/feely-test/bin/www
/usr/local/lib/node_modules/feely-test -> /Users/liuyang/Documents/github/FEE-Advance-Summary/npm
```

- 本地安装

```
npm install jquery --save / -S
npm install webpack --save-dev / -D
```

`--save` 会安装到 `dependencies` => 表示上线和开发的时候都需要

`--save-dev / -D` 会安装到 `devDependencies` => 开发依赖， 上线的时候不需要

> 区别就是 有一天模块发布了 ，别人安装我发布的模块时 `devDependencies` 中的模块是不会被下载的
> `npm install --production` 可以只安装 dependencies

## 依赖项

- `dependencies`: 表示上线和开发的时候都需要
- `devDependencies`: 开发依赖， 上线的时候不需要
- `peerDependencies`: 会提示你安装缺少的模块，默认要求带版本，如果版本不一致就会提示 `warn`
- `bundledDependencies`: 打包的依赖项，执行`npm pack`时，会将`bundledDependencies`所写的依赖打包到`tgz`压缩包中，不写则不打包（不常用）
- `optionalDependencies`: 可选依赖，即当前引用依赖下载时如果没有下载到这个包也会继续下载其他不会中断，也就是这个包可有可无，也就是说我们可能在代码里面兼容处理了这个包，比如如果有这个包就用这个，没有就用其他的

## 清空缓存

```
npm cache clean --force
```

## 打包

```
npm pack
```

## 版本问题

1.0.0

- 第一位 表示不兼容老代码，大规模的更新
- 第二位 表示增加了一些功能
- 第三位 表示小的补丁（改了一些 bug）

```
npm version patch // 第三位+1
npm version minor // 第二位+1
npm version major // 第一位+1
```

执行上述代码可以同步`git tag`

^2.0.0 `^`控制第一位版本 本例是不到 3，不能小于 2 => 2.0.1 / 2.2.2 这样的都可以
~2.1.0 `~`控制的是第二位版本 本例是 不超过 1 => 2.1.2 ok

- `alpha` => 内部测试版本
- `beta` => 公开测试版本
- `rc` => 基本 ok 了

## 协议问题

开源软件一般就选择 `MIT` 协议

![开源协议选择](./licenses.png)

## scripts

可以用`scripts` 配置执行的脚本

1） 执行命令 `echo XXXX` 输出这一类的

2） 执行 `node_modules/.bin`目录下的文件

当执行 `npm run`的时候 会把当前目录`node_modules/.bin`也拷贝到当前系统的 `path` 中(用完就删掉)，所以 `npm run` 可以执行`.bin`下的文件

## npx

可以直接执行 `node_modules/.bin` 目录下的文件，不需要去配 `scripts`

> 优点：如果执行的模块不存在，会自动安装，安装完执行完毕后自动销毁，避免安装全局模块。比如：`npx create-react-app project-name`

## 发布

1. 登录 `npm login`
2. 发布 `npm publish`
