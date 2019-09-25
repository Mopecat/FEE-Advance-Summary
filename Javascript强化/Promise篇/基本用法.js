/**
 * desc Promise的作用
 * 1) 解决并发问题 （同步多个异步方法的执行结果）
 * 2）链式调用问题 （先获取name 再通过name获取age这种问题） 解决多个回调嵌套的问题
 */

/**
 * desc Promise 用法简介
 * Promise是一个类
 * 1）每次new一个Promise都需要传递一个执行器，执行器是立即执行的
 * 2) 执行器函数中有两个参数 resolve reject
 * 3) 默认Promise 有三个状态 pending(等待) => resolve(成功) reject(失败)
 * 4）一旦成功不能失败，一旦失败不能成功
 * 5) 每个promise都有一个then方法
 */
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
