"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = _interopRequireDefault(require("util"));

var _url = _interopRequireDefault(require("url"));

var _mime = _interopRequireDefault(require("mime"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ejs = _interopRequireDefault(require("ejs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let {
  stat,
  access,
  readdir
} = _fs.default.promises;

let template = _fs.default.readFileSync(_path.default.resolve(__dirname, "../template.html"), "utf8"); // 第三方


class Server {
  constructor(config) {
    this.port = config.port;
    this.template = template;
  } // 处理请求


  async handleRequest(req, res) {
    let {
      pathname
    } = _url.default.parse(req.url, true); // 解析中文路径


    pathname = decodeURIComponent(pathname);

    let absPath = _path.default.join(process.cwd(), pathname);

    try {
      let statObj = await stat(absPath);
      this.sendFile(absPath, statObj, pathname, req, res);
    } catch (e) {
      this.sendError(e, res);
    }
  } // 发送文件


  async sendFile(absPath, statObj, pathname, req, res) {
    if (statObj.isDirectory()) {
      let dirs = await readdir(absPath); // 需要判断路径是否是‘/’如果是就返回''否则返回pathname

      let templateStr = _ejs.default.render(this.template, {
        dirs,
        path: pathname === "/" ? "" : pathname
      });

      res.setHeader("Content-Type", "text/html;charset=utf-8");
      res.end(templateStr);
    } else {
      res.setHeader("Content-Type", _mime.default.getType(absPath) + ";charset=utf-8");

      _fs.default.createReadStream(absPath).pipe(res);
    }
  } // 返回错误


  sendError(e, res) {
    console.log(_chalk.default.red(e));
    res.statusCode = 404;
    res.end("Not Found");
  } // 启动服务


  start() {
    let server = _http.default.createServer(this.handleRequest.bind(this));

    server.listen(this.port, () => {
      console.log(`${_chalk.default.yellow("Starting up http-server, serving")} ${_chalk.default.cyan("./public")}
Available on:
  http://127.0.0.1:${_chalk.default.green(this.port)}
  http://192.168.1.5:${_chalk.default.green(this.port)}
Hit CTRL-C to stop the server`);
    });
  }

}

var _default = Server;
exports.default = _default;