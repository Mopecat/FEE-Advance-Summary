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
