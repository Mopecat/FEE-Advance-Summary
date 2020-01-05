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

var _zlib = _interopRequireDefault(require("zlib"));

var _crypto = _interopRequireDefault(require("crypto"));

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
  }

  cache(absPath, statObj, req, res) {
    res.setHeader("Cache-Control", "max-age=10");
    let lastModified = statObj.ctime.toGMTString();

    let Etag = _crypto.default.createHash("md5").update(_fs.default.readFileSync(absPath)).digest("base64");

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
        res.setHeader("Content-Encoding", "gzip"); // 返回gzip转化流

        return _zlib.default.createGzip();
      } else if (encoding.match(/deflate/)) {
        // 设置响应头部为deflate压缩格式
        res.setHeader("Content-Encoding", "deflate"); // 返回deflate转化流

        return _zlib.default.createDeflate();
      }
    }

    return false;
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
      let cache = this.cache(absPath, statObj, req, res); // 再文件发送过程中，如果浏览器支持压缩，我需要对浏览器的内容先压缩再返回

      let flag = this.gzip(absPath, statObj, req, res);
      res.setHeader("Content-Type", _mime.default.getType(absPath) + ";charset=utf-8");

      if (!flag) {
        _fs.default.createReadStream(absPath).pipe(res);
      } else {
        _fs.default.createReadStream(absPath).pipe(flag) // 调用转化流 将返回文件压缩后 再返回给客户端
        .pipe(res);
      }
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