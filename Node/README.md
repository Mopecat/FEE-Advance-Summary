### Node 相关笔记

#### module

1. 每个文件都相当于一个模块，模块中的`this`指向 `module.exports` 核心原理文件读写 + 自执行函数 [原理代码][1]
2. 如果别人想使用我 就需要 `require`
3. 我要想给别人用 就需要 `module.exports`
4. 模块的路径查找顺序是先找文件，找不到文件，再找文件夹(11 版本)
5. 第三方模块查找：默认会去`node_modules`文件夹下查找，找不到的话，会向上级目录的`node_modules`文件夹查找，直到根目录，还找不到会报错。找到`node_modules`中对应的文件夹后，会先以这个第三方模块的`package.json`里的`main`字段定义的入口文件为入口,如果没定义则找`index.js`

#### global

1. 全局对象中除了 global 所包括的 还有模块匿名函数的参数： `module.exports`,`module,require`,`_dirname`,`_filename`

2. `process` 进程 代表当前启用的应用

- `process.platform`: 判断当前平台 `window => win32` ， `Mac => darwin`
- `process.argv`: 代表用户传递的参数 默认前两个参数没什么意义

```
// 在/Node/global目录下
console.log(process.argv.slice(2));
// 执行 node index.js --port 3000 --me forever18 => [ '--port', '3000', '--me', 'forever', '18' ]
```

- `process.chdir` => change dir `process.cwd()` => current working directory
- `process.env`: 环境变量
- `process.nextTick`: `node` 中的微任务

3. `Buffer` 缓存区(用来处理二进制数据的) `node`读取文件时存储的是二进制的 二进制比较长 所以缓存区存储的是十六进制的 [链接][3]

4. `clearInterval` `setInterval`

5. `clearTimeout` `setTimeout`

6. `clearImmediate` `setImmediate`

[代码示例][2]

[1]: ./module/module.js
[2]: ./global/index.js
[3]: ./core/buffer
