
let Promise = require("./promise的基本实现");
let p = new Promise((resolve, reject) => {
  resolve("success");
  throw new Error("失败"); //如果抛出异常也会执行成功
});
p.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("resolve在then之后执行"); // 发布
  }, 1e3);
});
// 订阅多个then方法
p2.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
p2.then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
