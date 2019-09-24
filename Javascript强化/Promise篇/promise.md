### Promise 的作用

- 解决并发问题 （同步多个异步方法的执行结果）
- 链式调用问题 （先获取 name 再通过 name 获取 age 这种问题） 解决多个回调嵌套的问题

### Promise 简介

Promise 是一个类

- 1. 每次 new 一个 Promise 都需要传递一个执行器，执行器是立即执行的
- 2. 执行器函数中有两个参数 resolve reject
- 3. 默认 Promise 有三个状态 pending(等待) => resolve(成功) reject(失败)
- 4. 一旦成功不能失败，一旦失败不能成功
- 5. 每个 promise 都有一个 then 方法
