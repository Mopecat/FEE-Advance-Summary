// 封装成一个类
const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const path = require("path");
const mime = require("mime");
const { createReadStream,readFileSync } = require("fs");
const crypto = require('crypto')
const zlib = require('zlib')

class HttpServer {
  cache(absPath, statObj, req, res) {
    res.setHeader("Cache-Control", "max-age=10");
    let lastModified = statObj.ctime.toGMTString();
    let Etag = crypto
      .createHash("md5")
      .update(readFileSync(absPath))
      .digest("base64");
    res.setHeader("Last-Modified", lastModified);
    res.setHeader("Etag", Etag);
    let ifModifiedSince = req.headers["if-modified-since"];
    let ifNoneMatch = req.headers["if-none-match"];
    if (ifModifiedSince || ifNoneMatch) {
      if (ifModifiedSince !== lastModified || ifNoneMatch !== Etag) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  gzip(absPath, statObj, req, res) {
    let encoding = req.headers["accept-encoding"];
    if (encoding) {
      if (encoding.match(/gzip/)) {
        // 设置响应头部为gzip压缩格式
        res.setHeader("Content-Encoding", "gzip");
        // 返回gzip转化流
        return zlib.createGzip();
      } else if (encoding.match(/deflate/)) {
        // 设置响应头部为deflate压缩格式
        res.setHeader("Content-Encoding", "deflate");
        // 返回deflate转化流
        return zlib.createDeflate();
      }
    }
    return false;
  }
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
    let cache = this.cache(absPath, statObj, req, res);
    if(cache){
      res.statusCode = 304
      return res.end()
    }
    let flag = this.gzip(absPath, statObj, req, res);
    res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
    if (!flag) {
      createReadStream(absPath).pipe(res);
    } else {
      createReadStream(absPath)
        .pipe(flag) // 调用转化流 将返回文件压缩后 再返回给客户端
        .pipe(res);
    }
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

hs.start(8080, function() {
  console.log("server is start 8080");
});
