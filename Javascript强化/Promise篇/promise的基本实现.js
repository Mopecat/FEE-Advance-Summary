class Promise {
  constructor(executor) {
    let resolve = value => {};
    let reject = reason => {};
    // 创建promise executor(执行器)会立即执行
    executor(resolve, reject);
  }
}
// 导出当前类 commonjs定义的方式
module.exports = Promise;
