const PENDING = "PENGDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
console.log("---------------引入成功");
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn()); // 发布 有可能resolve在then的后边执行，此时先将方法存放起来，状态改变为成功时依次执行这些方法（同一个示例订阅了多个then方法）
      }
    };
    let reject = reason => {
      if (this.status === PENDING) {
        this.value = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };
    // 创建promise executor(执行器)会立即执行
    // 这里可能会发生异常
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        // 外面在包一层函数 可以在这里再做一些其他的事 todo...
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        // 外面在包一层函数 可以在这里再做一些其他的事 todo...
        onRejected(this.reason);
      });
    }
  }
}
// 导出当前类 commonjs定义的方式
module.exports = Promise;
