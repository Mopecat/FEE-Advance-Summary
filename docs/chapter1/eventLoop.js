// setTimeout(() => {
//   console.log("timeout 1");
//   Promise.resolve().then(() => {
//     console.log("then 1");
//   });
// });
// setTimeout(() => {
//   console.log("timeout 2");
// });
// Promise.resolve().then(() => {
//   console.log("then 2");
// });
// Promise.resolve().then(() => {
//   console.log("then 3");
// });

/*
 *  分析：
 *    1.先执行主栈 setTimeout => 回调放入宏任务队列、Promise.then()放入微任务队列 主栈执行完毕
 *    2.清空微任务队列 => 按顺序执行两个Promise.then() => 打印then 2 , 打印then 3
 *    3.将宏任务队列第一个放入主栈执行 => 打印timeout 1, 将promise.then放入微任务队列
 *    4.清空微任务队列 => 执行Promise.then() => 打印then 1
 *    5.将宏任务队列第二个放入主栈执行 => 打印timeout 2
 */

async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");

/*
 *  分析：
 *    1.先执行主栈 前两个都是函数 未调用 所以先打印 script start
 *    2.setTimeout 执行将回调放入宏任务队列
 *    3.调用async1 会直接打印asynv1 start
 *    4.await async2 在浏览器中相当于 Promise.resolve(async2()).then(()={...后续代码}) 所以先打印async2 然后then 放入微任务队列
 *    5.new Promise 回调立即执行 打印 promise1 then方法放入微任务队列
 *    6.打印 script end 主栈执行完毕 清空微任务 按照队列特点先进先出 所以 先打印async1 end 然后打印 promise2 （如果是node环境执行的话 先打印prmise2 再打印async1 end 因为await相当于两层then方法）
 *    7.清空宏任务队列 打印 setTimeout
 */
