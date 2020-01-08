### HTTTP

## header => 是一个规范

## http 状态码

- `101`: `websocket` 双向通信
- `200`: 成功, `204`: 没有响应体, `206`: 断点续传
- `301`: 永久重定向, `302` 临时重定向(比如负载均衡会导致 `302`)， `304` 缓存（很重要）只能服务端设置
- `401`: 没登录没有权限, `403`: 登录了没权限, `404`: 资源不存在， `405`: 请求方法不支持
- `502`: 负载均衡问题 `500`: 服务器挂了

## 请求方法

`RestfulApi`:是指根据不同的动作，做对应的处理 就比如接口的名字都叫`/user`，但是使用的请求方法不同就执行不同的逻辑

- `get` 获取资源
- `post` 新增资源
- `put` 上传资源
- `delete` 删除资源
- `options` 跨域 （复杂请求时出现） 只是`get/post`时都是简单请求，如果`get/post`加了自定义`header`就是复杂请求了

## 传输数据

- 请求行 url
- 请求头 可以放自定义 `header`
- 请求体 提交给服务器的数据

- 响应行 状态码
- 响应头 可以自定义 `header`
- 响应体 返还给浏览器的结果

## 常用的发送请求的方式

- 浏览器 （默认是`get·请求）
- postman
- 命令行 `windows`需要安装`git`； Mac 直接命令行就可以 curl -v http:// ....

## 数据传输常见格式

- `json`字符串
- 表单格式 `a=1&b=2`
- 文件格式 `formData`
- 普通文本 字符串

## 如何返回静态文件

大家都知道`node`比较适合 `I/O` 密集的操作，性能较高。所以很适合做静态服务器。
那么`node`如何来返回静态文件呢 [原生写法][1] 、[封装后的写法][2]

[1]: ./base/static.js
[2]: ./base/staticServer.js