import http from "http";
import fs from "fs";
import path from "path";
import util from "util";
import url from "url";
import zlib from "zlib";
import crypto from "crypto";
let { stat, access, readdir } = fs.promises;
let template = fs.readFileSync(
  path.resolve(__dirname, "../template.html"),
  "utf8"
);
// 第三方
import mime from "mime";
import chalk from "chalk";
import ejs from "ejs";

class Server {
  constructor(config) {
    this.port = config.port;
    this.template = template;
  }
  // 处理请求
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url, true);
    // 解析中文路径
    pathname = decodeURIComponent(pathname);
    let absPath = path.join(process.cwd(), pathname);
    try {
      let statObj = await stat(absPath);
      this.sendFile(absPath, statObj, pathname, req, res);
    } catch (e) {
      this.sendError(e, res);
    }
  }
  cache(absPath, statObj, req, res) {
    res.setHeader("Cache-Control", "max-age=10");
    let lastModified = statObj.ctime.toGMTString();
    let Etag = crypto
      .createHash("md5")
      .update(fs.readFileSync(absPath))
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
  // 发送文件
  async sendFile(absPath, statObj, pathname, req, res) {
    if (statObj.isDirectory()) {
      let dirs = await readdir(absPath);
      // 需要判断路径是否是‘/’如果是就返回''否则返回pathname
      let templateStr = ejs.render(this.template, {
        dirs,
        path: pathname === "/" ? "" : pathname
      });
      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end(templateStr);
    } else {
      let cache = this.cache(absPath, statObj, req, res);
      // 再文件发送过程中，如果浏览器支持压缩，我需要对浏览器的内容先压缩再返回
      let flag = this.gzip(absPath, statObj, req, res);
      res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
      if (!flag) {
        fs.createReadStream(absPath).pipe(res);
      } else {
        fs.createReadStream(absPath)
          .pipe(flag) // 调用转化流 将返回文件压缩后 再返回给客户端
          .pipe(res);
      }
    }
  }
  // 返回错误
  sendError(e, res) {
    console.log(chalk.red(e));
    res.statusCode = 404;
    res.end("Not Found");
  }
  // 启动服务
  start() {
    let server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`${chalk.yellow(
        "Starting up http-server, serving"
      )} ${chalk.cyan("./public")}
Available on:
  http://127.0.0.1:${chalk.green(this.port)}
  http://192.168.1.5:${chalk.green(this.port)}
Hit CTRL-C to stop the server`);
    });
  }
}

export default Server;
