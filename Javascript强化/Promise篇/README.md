### Promise 的作用

- 解决并发问题 （同步多个异步方法的执行结果）
- 链式调用问题 （先获取 name 再通过 name 获取 age 这种问题） 解决多个回调嵌套的问题

### Promise 简介

`Promise` 是一个类

- 1. 每次 `new` 一个 `Promise` 都需要传递一个执行器，执行器是立即执行的
- 2. 执行器函数中有两个参数 `resolve` `reject`
- 3. 默认 `Promise` 有三个状态 `pending(等待)` => `resolve(成功)` `reject(失败)`
- 4. 一旦成功不能失败，一旦失败不能成功
- 5. 每个 `promise` 都有一个 `then` 方法

`promise` 的链式调用

- 1. 普通值表示不是 `promise` 也不是错误（`then` 回调中返回的）会走下一个 `then` 的成功
- 2. 如果返回的是一个 `promise` 那么这个 `promise` 会执行，并且采用他的状态
- 3. 抛出错误 走`then`的失败方法
- 4. 返回一个新的 `promise` 来实现链式调用

[promise 基础用法实例][1]
[promise 基本实现源码][2]
[promise 链式调用用法实例][3]
[promise 链式调用实现][4]
[promise/A+验证通过的源码][5]
[promise.all 的实现][5]

[1]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.js
[2]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/promise的基本实现.js
[3]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/promise的链式调用的用法.js
[4]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/promise的链式调用实现.js
[5]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/promise.js
[6]: https://github.com/Mopecat/FEE-Advance-Summary/blob/master/Javascript%E5%BC%BA%E5%8C%96/Promise%E7%AF%87/promise-all.js
