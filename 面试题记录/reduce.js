// reduce的用法
let arr = [1, 2, 3, 4, 5];
arr.reduce((prev, current, index, arr) => {
  console.log("prev:上一次的返回值" + prev);
  console.log("current:当前的值" + current);
  console.log("index：当前值对应的下标" + index);
  console.log("当前调用的数组" + arr);
  console.log("---------------------");
  return prev + current;
});

let arrobj = [
  { count: 10, price: 10 },
  { count: 10, price: 10 },
  { count: 10, price: 10 },
  { count: 10, price: 10 }
];
// 第一个参数 回调方法 ，第二个参数
let total = arrobj.reduce(
  (prev, current, index, arr) => prev + current.price * current.count,
  0 // 第一次调用时prev的值，如果不传默认数组的第一个元素
);
console.log(total);
// 可以用这个api求平均数，求和，求最大值，最小值

// (1)用reduce实现数组扁平化 （flat）

// (2)函数的组合 compose
// 解释一下什么意思
function sum(a, b) {
  return a + b;
}
function len(str) {
  return str.length;
}
function addCurrency(val) {
  return "￥" + val;
}

// 想要得到最终结果需要 如下调用， 面向切片编程 保证函数功能的单一性，但是由于数量不定，写起来很麻烦了，也不方便阅读
let result = addCurrency(len(sum("asdf", "hjkl")));
console.log(result);
// compose方法就是用一个函数实现上述的功能 调用方式 compose(addCurrency,len,sum)("asdf", "hjkl")
// function compose(...args) {
//   return function(...values) {
//     let lastFn = args.pop()(...values);
//     return args.reduceRight((prev, current) => {
//       return current(prev);
//     }, lastFn);
//   };
// }
// 上面函数改为箭头函数的极简写法
// const compose = (...args) => (...values) =>
//   args.reduceRight((prev, current) => current(prev), args.pop()(...values));

// 上面方法还可以再换一种方法实现 跟redux源码一样的实现方式 https://github.com/reduxjs/redux/blob/master/src/compose.ts
function compose(...args) {
  return args.reduce((prev, current) => {
    return function(...values) {
      // return len(sum(...values)) 替换一下就是下面的了 当然了 如果是三层的话 就想第一次循环返回的是一个函数 函数里面返回的是prev(current(...values))
      return prev(current(...values));
    };
  });
}
// 换成箭头函数的极简写法
// const compose = (...args) =>
//   args.reduce((prev, current) => (...values) => prev(current(...values)));
let resultCompose = compose(addCurrency, len, sum)("asdf", "hjkl");
console.log(resultCompose);

// (3)实现Array.prototype.reduce
