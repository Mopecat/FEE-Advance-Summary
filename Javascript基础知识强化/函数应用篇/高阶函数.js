// 一个函数的参数是一个函数 (回调)
function a() {}
a(() => {});
// 一个函数返回一个函数 （拆分）
function b() {
  return function() {};
}
// 例子 函数的before
// 希望将核心的逻辑提取出来，在外面再增加功能

// 重写原型上的方法（扩展）
Function.prototype.before = function(beforeFn) {
  return (...arg) => {
    // ...arg相当于[1,2,3,4] ...运算符 可以将参数收缩成数组也可以将数组展开为一个个参数
    // 箭头函数没有this指向，所以向外层寻找,也没有arguments所以上面用剩余运算符合并成一个数组作为一个参数传入
    beforeFn();
    this(...arg); // 这里的this就是当前调用的函数 也就是下面的say ...arg是展开运算符 相当于 say(1,2,3,4)
  };
};
// AOP 切片编程/装饰 把核心功能（say）抽离出来，在核心基础上增加功能(newSay)
const say = (...arg) => {
  // 抽离核心功能
  // ...arg是剩余运算符
  console.log("说话", arg);
};

const newSay = say.before(() => {
  console.log("您好");
});
const newSay1 = say.before(() => {
  console.log("hello");
});

newSay(1, 2, 3, 4); // 最后输出 您好 说话
newSay1();
