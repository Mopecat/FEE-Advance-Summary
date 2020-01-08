(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{230:function(v,_,e){"use strict";e.r(_);var t=e(0),a=Object(t.a)({},(function(){var v=this,_=v.$createElement,e=v._self._c||_;return e("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[e("h3",{attrs:{id:"htttp"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#htttp"}},[v._v("#")]),v._v(" HTTTP")]),v._v(" "),e("h2",{attrs:{id:"header-是一个规范"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#header-是一个规范"}},[v._v("#")]),v._v(" header => 是一个规范")]),v._v(" "),e("h2",{attrs:{id:"http-状态码"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http-状态码"}},[v._v("#")]),v._v(" http 状态码")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("101")]),v._v(": "),e("code",[v._v("websocket")]),v._v(" 双向通信")]),v._v(" "),e("li",[e("code",[v._v("200")]),v._v(": 成功, "),e("code",[v._v("204")]),v._v(": 没有响应体, "),e("code",[v._v("206")]),v._v(": 断点续传")]),v._v(" "),e("li",[e("code",[v._v("301")]),v._v(": 永久重定向, "),e("code",[v._v("302")]),v._v(" 临时重定向(比如负载均衡会导致 "),e("code",[v._v("302")]),v._v(")， "),e("code",[v._v("304")]),v._v(" 缓存（很重要）只能服务端设置")]),v._v(" "),e("li",[e("code",[v._v("401")]),v._v(": 没登录没有权限, "),e("code",[v._v("403")]),v._v(": 登录了没权限, "),e("code",[v._v("404")]),v._v(": 资源不存在， "),e("code",[v._v("405")]),v._v(": 请求方法不支持")]),v._v(" "),e("li",[e("code",[v._v("502")]),v._v(": 负载均衡问题 "),e("code",[v._v("500")]),v._v(": 服务器挂了")])]),v._v(" "),e("h2",{attrs:{id:"请求方法"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#请求方法"}},[v._v("#")]),v._v(" 请求方法")]),v._v(" "),e("p",[e("code",[v._v("RestfulApi")]),v._v(":是指根据不同的动作，做对应的处理 就比如接口的名字都叫"),e("code",[v._v("/user")]),v._v("，但是使用的请求方法不同就执行不同的逻辑")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("get")]),v._v(" 获取资源")]),v._v(" "),e("li",[e("code",[v._v("post")]),v._v(" 新增资源")]),v._v(" "),e("li",[e("code",[v._v("put")]),v._v(" 上传资源")]),v._v(" "),e("li",[e("code",[v._v("delete")]),v._v(" 删除资源")]),v._v(" "),e("li",[e("code",[v._v("options")]),v._v(" 跨域 （复杂请求时出现） 只是"),e("code",[v._v("get/post")]),v._v("时都是简单请求，如果"),e("code",[v._v("get/post")]),v._v("加了自定义"),e("code",[v._v("header")]),v._v("就是复杂请求了")])]),v._v(" "),e("h2",{attrs:{id:"传输数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#传输数据"}},[v._v("#")]),v._v(" 传输数据")]),v._v(" "),e("ul",[e("li",[e("p",[v._v("请求行 url")])]),v._v(" "),e("li",[e("p",[v._v("请求头 可以放自定义 "),e("code",[v._v("header")])])]),v._v(" "),e("li",[e("p",[v._v("请求体 提交给服务器的数据")])]),v._v(" "),e("li",[e("p",[v._v("响应行 状态码")])]),v._v(" "),e("li",[e("p",[v._v("响应头 可以自定义 "),e("code",[v._v("header")])])]),v._v(" "),e("li",[e("p",[v._v("响应体 返还给浏览器的结果")])])]),v._v(" "),e("h2",{attrs:{id:"常用的发送请求的方式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常用的发送请求的方式"}},[v._v("#")]),v._v(" 常用的发送请求的方式")]),v._v(" "),e("ul",[e("li",[v._v("浏览器 （默认是`get·请求）")]),v._v(" "),e("li",[v._v("postman")]),v._v(" "),e("li",[v._v("命令行 "),e("code",[v._v("windows")]),v._v("需要安装"),e("code",[v._v("git")]),v._v("； Mac 直接命令行就可以 curl -v http:// ....")])]),v._v(" "),e("h2",{attrs:{id:"数据传输常见格式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据传输常见格式"}},[v._v("#")]),v._v(" 数据传输常见格式")]),v._v(" "),e("ul",[e("li",[e("code",[v._v("json")]),v._v("字符串")]),v._v(" "),e("li",[v._v("表单格式 "),e("code",[v._v("a=1&b=2")])]),v._v(" "),e("li",[v._v("文件格式 "),e("code",[v._v("formData")])]),v._v(" "),e("li",[v._v("普通文本 字符串")])]),v._v(" "),e("h2",{attrs:{id:"如何返回静态文件"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#如何返回静态文件"}},[v._v("#")]),v._v(" 如何返回静态文件")]),v._v(" "),e("p",[v._v("大家都知道"),e("code",[v._v("node")]),v._v("比较适合 "),e("code",[v._v("I/O")]),v._v(" 密集的操作，性能较高。所以很适合做静态服务器。\n那么"),e("code",[v._v("node")]),v._v("如何来返回静态文件呢 "),e("a",{attrs:{href:"./base/static.js"}},[v._v("原生写法")]),v._v(" 、"),e("a",{attrs:{href:"./base/staticServer.js"}},[v._v("封装后的写法")])])])}),[],!1,null,null,null);_.default=a.exports}}]);