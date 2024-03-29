const PENDING = "PENGDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
console.log("---------------引入成功");
// promise处理函数
const resolvePromise = (promise2, x, resolve, reject) => {
  // 处理x的类型来决定是调用resolve还是reject
  // 必须要写的很严谨
  // promise2 和 x 不能是同一个对象 自己等待自己完成进入死循环 直接抛出错误
  if (promise2 === x) {
    return reject(
      new TypeError(`Chaining cycle detected for promise #<Promise>`)
    );
  }
  // 判断x是不是一个普通值 先认为他是一个promise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // typeof null === 'object'
    let called; // 默认情况下没有成功或者失败
    try {
      let then = x.then; // 先判断x里面是不是有then 如果有错误就抛出错误
      if (typeof then === "function") {
        // 这里就确定是promise了
        // x.then(()=>{},()=>{}) 这样会再次调用了一下x.then 会导致一些极端情况的问题，比如含有then属性的对象
        then.call(
          x,
          y => {
            if (called) return; // 防止多次调用 状态只能改变一次
            called = true;
            // y有可能还是一个promise 所以递归解析 直到可以解析为一个普通值了
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return; // 防止多次调用
            called = true;
            reject(r);
          }
        );
      } else {
        // 这里就是普通值 是个对象 没有成功或者失败 所以不用改变called的值
        resolve(x);
      }
    } catch (e) {
      if (called) return; // 防止多次调用
      called = true;
      reject(e); // 就抛出错误
    }
  } else {
    // 不是promise
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = value => {
      // 如果new Promise里的resolve直接返回一个新的promise时 递归调用resolve直到返回一个普通值
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      // 只有是PENDING状态的时候才能改变状态
      if (this.status === PENDING) {
        this.value = value;
        this.status = FULFILLED;
        this.onResolvedCallbacks.forEach(fn => fn()); // 发布 有可能resolve在then的后边执行，此时先将方法存放起来，状态改变为成功时依次执行这些方法（同一个示例订阅了多个then方法）
      }
    };
    let reject = reason => {
      if (this.status === PENDING) {
        this.reason = reason;
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
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : val => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : err => {
            throw err;
          };
    // then方法调用后应该返回一个新的promise
    let promise2 = new Promise((resolve, reject) => {
      // 应该在返回的promise中取到上一个promise的状态，来决定promise2走resolve还是reject
      if (this.status === FULFILLED) {
        // 当前的onFulfilled,onRejected不能在当前的上下文中执行，为了确保promise2的存在加上setTimeout改为异步
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value); // 当前/上一个 promise返回的值（可能是promise,可能是普通值，可能是个错误）
            resolvePromise(promise2, x, resolve, reject); // 处理x的类型来决定是调用resolve还是reject
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason); // 当前/上一个 promise返回的值（可能是promise,可能是普通值，可能是个错误）
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          // 外面在包一层函数 可以在这里再做一些其他的事 todo...
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value); // 当前/上一个 promise返回的值（可能是promise,可能是普通值，可能是个错误）
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          // 外面在包一层函数 可以在这里再做一些其他的事 todo...
          setTimeout(() => {
            try {
              let x = onRejected(this.reason); // 当前/上一个 promise返回的值（可能是promise,可能是普通值，可能是个错误）
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
  // catch就是then的语法糖
  catch(errCallback) {
    return this.then(null, errCallback);
  }
  // 静态方法 可以直接被 Promise.resolve()这种方式调用
  // 静态方法 是可以被类直接调用 不可以被示例调用，可以继承
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  // 静态方法 可以直接被 Promise.reject()这种方式调用
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
}

// 测试promise是否符合a+规范 全局安装 promises-aplus-tests包 执行 promises-aplus-tests 文件名
Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
// 导出当前类 commonjs定义的方式
module.exports = Promise;
