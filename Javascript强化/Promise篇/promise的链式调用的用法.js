const fs = require("fs");
// 先看一看古老的用法
fs.readFile("name1.txt", "utf8", function(err, data) {
  if (err) {
    return console.error(err);
  }
  fs.readFile(data, "utf8", function(err, data) {
    if (err) {
      return console.error(err);
    }
    console.log(data);
  });
});
/**
 * desc  promise的链式调用
 * 1) 普通值表示不是promise 也不是错误（then回调中返回的）
 * 2）如果返回的是一个promise 那么这个promise会执行，并且采用他的状态
 */

// function readFile(...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, function(err, data) {
//       if (err) reject(err);
//       resolve(data);
//     });
//   });
// }
// readFile("name1.txt", "utf8")
//   .then(data => {
//     return readFile(data, "utf8");
//   })
//   .then(
//     data => {
//       console.log(data);
//     },
//     err => {
//       console.log(err);
//     }
//   );
const Promise = require("./promise的链式调用实现");
// 验证promise2 不能和 x是一个对象的例子
// let p = new Promise((resolve, reject) => {
//   resolve("hello");
// });
// // promise2
// let promise2 = p.then(
//   data => {
//     return promise2; // x
//   },
//   err => {
//     console.log(err);
//   }
// );
// promise2.then(
//   data => {
//     console.log(data);
//   },
//   err => console.log(err)
// );

// 验证resolve的也是一个promise的情况 即源码中的y也是一个promise的情况
let p2 = new Promise((resolve, reject) => {
  resolve(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve("嘿嘿嘿");
            }, 1000);
          })
        );
      }, 1000);
    })
  );
});
// promise2
let promise3 = p2
  .then(
    data => {
      console.log(data);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve("嘿嘿嘿");
              }, 1000);
            })
          );
        }, 1000);
      });
    },
    err => {
      console.log(err);
    }
  )
  .then(
    data => {
      console.log("s:" + data);
    },
    err => console.log(err)
  );
