// 类似中间层

const http = require("http");

// request / get
// 发送get请求
http.get("http://localhost:3000", function() {
  console.log("发送成功");
});

// request方法
let client = http.request(
  {
    port: 3000,
    hostname: "localhost",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      // a: 1
    },
    method: "POST"
  },
  function(res) {
    // 请求后会将响应结果放到函数中
    res.on("data", function(chunk) {
      console.log(chunk.toString());
    });
  }
);
client.end("a=1");
