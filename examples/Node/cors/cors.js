const http = require("http");

http
  .createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/api") {
      res.end(JSON.stringify({ name: "my lovely baby" }));
    }
  })
  .listen(3000);
