const { resolve } = require("./promise");

const FULLFILED = "FULLFILED";
const REJECTED = "REJECTED";
const PENDING = "PENDING";

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new Error(`死循环了#<promise>`));
  }

  if ((typeof x === "object") & (x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(excutor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = PENDING;
    this.onFullfiledStack = [];
    this.onRejectedStack = [];

    let resolve = (value) => {
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULLFILED;
        this.value = value;
        this.onFullfiledStack.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedStack.forEach((fn) => fn());
      }
    };

    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw new Error(err);
          };

    let promise2 = new Promise((resolve, reject) => {
      if (this.status === FULLFILED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            return resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.reason);
            return resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.status === PENDING) {
        this.onFullfiledStack.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              return resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onFullfiledStack.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.reason);
              return resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }

  static all(promises) {
    let isPromise = (value) => {
      if (
        (typeof value === "object" && value !== null) ||
        typeof value === "function"
      ) {
        return typeof value.then === "function";
      }
    };
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
          current.then((data) => {
            processData(data);
          });
        } else {
          processData(current);
        }
      }
    });
  }
}
