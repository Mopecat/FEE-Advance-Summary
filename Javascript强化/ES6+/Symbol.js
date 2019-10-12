// Symbol 数据类型
// 5中基本的数据类型： string,boolean,null,number,undefined
// Symbol是新增的一种数据类型 独一无二  一旦声明完跟别的值都不相等
// 一般用作声明常量

const s1 = Symbol("mopecat"); // 接收参数是string || number
const s2 = Symbol("mopecat"); // 接收参数是string || number
console.log(s1 === s2);

// 另一种创建方式 Symbol.for() 如果没有就创建新的 如果有就返回
let sf1 = Symbol.for("sf");
let sf2 = Symbol.for("sf");
console.log(sf1 === sf2); // true
console.log(Symbol.keyFor(sf1)); // 返回key值 上面的sf

// 在对象中定义 Symbol属性 可以用来做属性私有化
let obj = {
  [s1]: "Symbol定义的值" // es6的写法 []的含义是将s1结果取出来作为key
};
console.log(obj[s1]); // 缺陷是不能用obj.s1来取Symbol的值了

// 元编程  可以改变js原有的功能
// 1) instanceof 可以判断谁是谁的实例
let o = {
  name: 1
};
let obj1 = {
  // 下面在使用instanceof时会默认调用下面的这个方法 但是定义了Symbol.hasInstance的对象要在instanceof的右侧
  [Symbol.hasInstance]() {
    return "name" in o;
  }
};
console.log(o instanceof obj1); // true

// 2) Symbol.toPrimitive 当转换原始类型的时候会调此方法
let obj2 = {
  // 当转换原始类型的时候会调此方法
  [Symbol.toPrimitive](value) {
    console.log(value);
    return "hello";
  },
  a: 1
};
// valueOf toString
console.log(obj2 + 1);

// 3）修改衍生对象的类的构造函数
class MyArray extends Array {
  constructor(...args) {
    super(...args); // 继承父类
  }
  // 静态 属性上的方法
  static get [Symbol.species]() {
    return Array; // 控制衍生出来的对象的类的构造函数是Array 不是 MyArray
  }
}
let myarr = new MyArray(1, 2, 3);
let newArr = myarr.map(item => item * 2); // newArr就是衍生出来的数组对象
console.log(newArr instanceof MyArray); // false

// 4) Symbol.split 可以重写数组的分割方法
// 5) Symbol.search 可以重写数组的搜索方法
// 6）Symbol.match 可以重写字符串的match方法
// 7）Symbol.unscopables() 可以声明一下属性 不在with中使用
// console.log(Array.prototype[Symbol.unscopables]); // 数组上不能用在with中的方法
// with (Array.prototype) {
//   fill(112); // fill不能用在with中所以报错
// }
// 再来一个例子
class Me {
  showName() {
    console.log("Mopecat");
  }
  get [Symbol.unscopables]() {
    return { showName: true };
  }
}
// with (Me.prototype) {
//   showName(); // 报错 如果注掉class Me里的Symbol.unscopables就不会报错了 就会正常打印Mopecat了
// }

// 8) concat不展开数组 isConcatSpreadable
let arr = [1, 2, 3];
arr[Symbol.isConcatSpreadable] = false;
console.log(arr.concat(4, 5, 6)); // [[1,2,3],4,5,6]
