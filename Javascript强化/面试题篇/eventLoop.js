setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => {
    console.log("then 1");
  });
});
setTimeout(() => {
  console.log("timeout 2");
});
Promise.resolve().then(() => {
  console.log("then 2");
});
Promise.resolve().then(() => {
  console.log("then 3");
});

/*
 *  分析：
 *    1.先执行主栈 setTimeout => 回调放入宏任务队列、Promise.then()放入微任务队列 主栈执行完毕
 *    2.清空微任务队列 => 按顺序执行两个Promise.then() => 打印then 2 , 打印then 3
 *    3.将宏任务队列第一个放入主栈执行 => 打印timeout 1, 将promise.then放入微任务队列
 *    4.清空微任务队列 => 执行Promise.then() => 打印then 1
 *    5.将宏任务队列第二个放入主栈执行 => 打印timeout 2
 */
