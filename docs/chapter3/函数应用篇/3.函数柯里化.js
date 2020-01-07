// 柯里化： 把一个大函数拆分多个函数
// 高阶函数包含柯里化
// 类型判断 Object.prototype.toString.call() 一般实现
// console.log(Object.prototype.toString.call("123")); // [object String]
// console.log(Object.prototype.toString.call([123])); // [object Array]
// 一般封装实现
// const checkType = (content, type) => {
//   return Object.prototype.toString.call(content) === `[object ${type}]`;
// };
// const b = checkType(123, "Number");
// console.log(b);

// 柯里化实现 （基础版）
const checkType = type => {
  return content => {
    return Object.prototype.toString.call(content) === `[object ${type}]`;
  };
};

const isString = checkType("String"); // 返回的是内层函数
console.log(isString("123")); // 123是上面方法中的content参数

// 还可以进一步封装
const utils = {};
const types = ["Number", "String", "Boolean", "Array"];
// 下面直接用柯里化封装好的方法实现
// types.forEach(type => {
//   utils["is" + type] = checkType(type);
// });

// 函数柯里化怎么实现 通用的柯里化实现 （核心是把函数的参数保留起来，到该用的时候再用）
const add = (a, b, c, d, e) => {
  return a + b + c + d + e;
};
const curring = (fn, arr = []) => {
  // fn就是add
  return (...arg) => {
    let len = fn.length; // 函数的length就是参数的个数
    arr = arr.concat(arg); // [1,2] [1,2,3,4] [1,2,3,4,5]
    if (arr.length < len) {
      return curring(fn, arr);
    }
    return fn(...arr);
  };
};
let result = curring(add)(1, 2)(3, 4)(5);
console.log(result);
types.forEach(type => {
  utils["is" + type] = curring(checkType)(type);
});
console.log(utils.isArray(123));
