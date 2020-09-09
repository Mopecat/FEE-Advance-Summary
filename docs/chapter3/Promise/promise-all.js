// promise.all 全部  处理多个异步的并发问题
let fs = require("fs").promises;

// 全部完成才算完成，如果有一个失败 就失败
// Promise.all 是按照顺序执行的
const isPromise = value => {
  if (
    (typeof value === "object" && value !== null) ||
    typeof value === "function"
  ) {
    return typeof value.then === "function";
  }
  return false;
};
// 开始写all方法
Promise.all = promises => {
  return new Promise((resolve, reject) => {
    let arr = [];
    let i = 0;
    let processData = (index, data) => {
      arr[index] = data;
      if (++i === promises.length) {
        resolve(arr);
      }
    };
    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      if (isPromise(current)) {
        current.then(data => {
          processData(i, data);
        }, reject);
      } else {
        processData(i, current);
      }
    }
  });
};
Promise.all([
  fs.readFile("./name.txt", "utf8"),
  1,
  2,
  3,
  fs.readFile("./age.txt", "utf8")
]).then(
  data => {
    console.log(data);
  },
  err => {
    console.log(err);
  }
);
