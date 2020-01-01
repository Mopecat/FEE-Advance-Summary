import http from "http";
import fs from "fs";
import path from "path";
import util from "util";
import url from "url";
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
      res.setHeader("Content-Type", mime.getType(absPath) + ";charset=utf-8");
      fs.createReadStream(absPath).pipe(res);
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
