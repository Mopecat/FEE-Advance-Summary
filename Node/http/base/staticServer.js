// 封装成一个类
const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const path = require("path");
const mime = require("mime");
const { createReadStream } = require("fs");

class HttpServer {
  // 处理请求
  async handleServer(req, res) {
    let { pathname } = url.parse(req.url, true);
    let absPath = path.join(__dirname, pathname);
    try {
      let statObj = await fs.stat(absPath);
      this.sendFile(statObj, absPath, req, res);
    } catch (e) {
      this.sendError(e, res);
    }
  }
  async sendFile(statObj, absPath, req, res) {
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, "index.html");
      try {
        await fs.access(absPath);
      } catch (e) {
        return this.sendError(e, res);
      }
    }
    res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
    createReadStream(absPath).pipe(res);
  }
  sendError(e, res) {
    res.statusCode = 404;
    res.end("Not Found");
  }
  // 启动服务
  start(...args) {
    let server = http.createServer(this.handleServer.bind(this));
    server.listen(...args);
  }
}

let hs = new HttpServer();

hs.start(3000, function() {
  console.log("server is start 3000");
});
