// 通过node实现一个http服务
// js本身不能提供http服务 所以是用node自身的核心模块 http模块 （这句是废话）
const http = require("http");
const url = require("url");
const querystring = require("querystring");
let server = http.createServer();
// url 的用法
const exampleRequestUrl =
  "http://username:password@www.baidu.com:80/ss?pageIndex=1&&pageSize=30#sss";
let result = url.parse(exampleRequestUrl, true); // 第二个参数 parseQueryString是否将参数转换为对象 默认false
// console.log(result);
/*
Url {
  protocol: 'http:', // 协议
  slashes: true, // 协议后面的 ‘/’
  auth: 'username:password', // 秘钥
  host: 'www.baidu.com:80', // 主机
  port: '80', // 端口
  hostname: 'www.baidu.com', // 主机名 跟主机的区别就是不带端口号
  hash: '#sss', // hash 正常是拿不到的 这里是写死了 所以才能拿的到
  search: '?pageIndex=1&&pageSize=30', // 这个用不到
  query: [Object: null prototype] { pageIndex: '1', pageSize: '30' }, // 参数部分 转换成对象了
  pathname: '/ss',     // 资源路径
  path: '/ss?pageIndex=1&&pageSize=30',
  href:
   'http://username:password@www.baidu.com:80/ss?pageIndex=1&&pageSize=30#sss' }s
*/
// 开启一个端口号
let port = 3000;
server.listen(port, () => {
  console.log(`server start ${port}`);
});

// 每次服务端代码发生变化都需要重启服务
// nodemon 是 node的监视器 监视文件变化的 基本上是一个node必备的一个模块了 可以解决上面的每次代码变化都要重启服务的麻烦
// 安装： sudo npm install nodemon -g  用法： nodemon 文件名 （可以增加配置文件） 本地开发用nodemon 线上用pm2

// 如果端口号 被占用了自动+1
server.on("error", err => {
  if (err.errno === "EADDRINUSE") {
    server.listen(++port);
  }
});
// 运用策略模式封装不同请求头下执行不同的逻辑 由于每个逻辑之间没有联系 所以策略模式无疑
let headers = {
  // 表单
  "application/x-www-form-urlencoded": function(res, content) {
    return res.end(querystring.parse(content).a + "");
  },
  // json
  "application/json": function(res, content) {
    return res.end(JSON.parse(content) + "");
  }
};
// 如果别人请求我，我需要解析请求
server.on("request", (req, res) => {
  // req 代表的客户端
  // res 代表的有什么区别
  // 请求行
  console.log(req.method); // 请求方法 方法名大写
  /*
   * 请求路径 '/' 表示首页 一个完整的url=> http://username:password@www.baidu.com:80/ss?pageIndex=1&&pageSize=30#sss
   * 这里的url中是不包括#（也就是hash信息的这玩意是给前端用的）
   * 下面用浏览器请求一下localhost:3000/xxx?a=1#bbb
   */
  console.log(req.url); // 打印 /xxx?a=1
  let { pathname, query } = url.parse(req.url, true);
  console.log(pathname, query);
  // 拿协议版本
  console.log(req.httpVersion); // 1.1

  // 请求头部分
  console.log("------", req.headers); // 全是小写

  // 获取请求体
  // 可以通过命令行发送一个post请求 curl -v -X POST -D a=1 http://localhost:3000
  let arr = [];
  req.on("data", function(chunk) {
    console.log("data", chunk); // 流的原理 push(null) 所以data方法不一定会触发 但是end一定会触发
    arr.push(chunk);
  });
  req.on("end", function() {
    console.log("end");
    console.log(Buffer.concat(arr).toString());
    // 响应 顺序不能乱 先写响应行 在写响应头 最后写响应体
    // res.statusCode = 404; // 响应状态码
    // 响应头
    // res.setHeader("Content-length", "1"); // 默认会自己计算content-length一般不用给
    // res.setHeader("Content-type", "text/plain;charset=utf-8");
    // 响应体
    // res.write(); // 写的时候不停止，如果想要停止的也就是说一次性写完的可以直接用end
    // res.end(Buffer.concat(arr));
    let content = Buffer.concat(arr).toString();
    let type = req.headers["content-type"];
    console.log(11111, type);
    if (typeof headers[type] === "function") {
      headers[type](res, content);
    } else {
      console.log("搞毛啊 没有这个头");
      return res.end(content);
    }
  });
});
