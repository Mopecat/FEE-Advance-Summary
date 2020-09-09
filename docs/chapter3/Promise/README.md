# Promise

## Promise 的作用

- 解决并发问题 （同步多个异步方法的执行结果）
- 链式调用问题 （先获取 name 再通过 name 获取 age 这种问题） 解决多个回调嵌套的问题

## Promise 简介

`Promise` 是一个类

- 每次 `new` 一个 `Promise` 都需要传递一个执行器，执行器是立即执行的
- 执行器函数中有两个参数 `resolve` `reject`
- 默认 `Promise` 有三个状态 `pending(等待)` => `resolve(成功)` `reject(失败)`
- 一旦成功不能失败，一旦失败不能成功
- 每个 `promise` 都有一个 `then` 方法

`promise` 的链式调用

- 普通值表示不是 `promise` 也不是错误（`then` 回调中返回的）会走下一个 `then` 的成功
- 如果返回的是一个 `promise` 那么这个 `promise` 会执行，并且采用他的状态
- 抛出错误 走`then`的失败方法
- 返回一个新的 `promise` 来实现链式调用

## `promise` 基础用法实例

```js
let p = new Promise((resolve, reject) => {
  resolve("success");
  throw new Error("失败"); //如果抛出异常也会执行成功
});
p.then(
  (data) => {
    console.log(data);
  },
  (err) => {
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
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
p2.then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
```

## `promise` 基础用法的实现

<<< @/docs/chapter3/Promise/promise的基本实现.js

## `promise` 链式调用用法实例

<<< @/docs/chapter3/Promise/promise的链式调用的用法.js

## `promise` 链式调用实现

<<< @/docs/chapter3/Promise/promise的链式调用实现.js

## `promise/A+`验证通过的源码

<<< @/docs/chapter3/Promise/promise.js

## `promise.all` 的实现

<<< @/docs/chapter3/Promise/promise-all.js
