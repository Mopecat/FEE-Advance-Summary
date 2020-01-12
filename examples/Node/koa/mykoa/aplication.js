// 核心文件
// 1. 需要导出一个Koa类
// 2. 类上有两个对外直接调用的方法 分别为 use,listen

const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Application {
  constructor() {
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }
  // 注册方法
  use(fn) {
    this.fn = fn;
  }
  createContext(req, res) {
    let context = this.context;
    context.request = this.request;
    context.response = this.response;
    context.req = context.request.req = req;
    context.res = context.response.res = res;
    return context;
  }
  // 处理请求方法
  handleRequest(req, res) {
    let ctx = this.createContext(req, res);
    this.fn(ctx);
  }
  // 监听端口
  listen(...args) {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
