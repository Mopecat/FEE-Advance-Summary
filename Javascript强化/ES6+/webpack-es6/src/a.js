// a模块
// 所有的导出结果会放在一个对象中
// export let a = 1; // 导出a变量
// export let b = 2;
let a = 1; // 导出a变量
let b = 2;
let h = "hello";
setInterval(() => {
  a++;
}, 1000);
export {
  a as c, // as是起别名
  b,
  h as default // 等价于export default 这里写了 下面就不能再export default了 每个模块只允许一个default ,Only one default export allowed per module.
}; // 跟上面的方式是一样的
// 下面的方式是错误的 导出的必须是个变量
// export {a:1,b:2}

// 导出值使用export default
// export default "导出值";

console.log("执行了");
