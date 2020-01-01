// 获取静态资源
const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url);
  let absPath = path.join(__dirname, pathname);
  console.log("abspath", absPath);
  fs.stat(absPath, function(err, statObj) {
    if (err) {
      res.statusCode = 404;
      return res.end("Not Found");
    }
    if (statObj.isDirectory()) {
      absPath = path.join(absPath, "index.html");
      fs.access(absPath, function(err) {
        if (err) {
          res.statusCode = 404;
          return res.end("Not Found");
        }
        res.setHeader("Content-Type", "text/html;charset=utf-8");
        fs.createReadStream(absPath).pipe(res);
      });
    } else {
      // 这里由于不确定类型 需要用mime这个库来判断文件类型然后设置header
      let type = require("mime").getType(absPath);

      res.setHeader("Content-Type", type + ";charset=utf-8");
      fs.createReadStream(absPath).pipe(res);
    }
  });
});

server.listen(3000);
