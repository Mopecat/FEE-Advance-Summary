// 反射 Reflect
// 有部分是对象的方法  放到了 Reflect上 功能是基本一致的 但是用起来更加的方便

// 1) get/set
let obj = {};
obj.name = "Mopecat";
// Reflect用法
Reflect.set(obj, "age", "forever18"); // 参数分别为 target(目标对象) key(属性名) value(值)

// 2) has
console.log("a" in { a: 1 });
console.log(Reflect.has({ a: 1 }, "a")); // 参数分别为 target(目标对象) key(属性名)

// 3) defineProperty 用法和功能与Object.defineProperty基本一致
const obj3 = { a: 1 };
Object.freeze(obj3); // 这个对象就被冻结了 对象里的属性就不能配置了 如果用Object.defineProperty 配置就会报错了 但是用Reflect.defineProperty就不会 但是如果配置失败会返回false
let flag = Reflect.defineProperty(obj3, "a", {
  value: 100
});
console.log(flag); // false

// 4) getOwnPropertyDescriptor 获取对象自有属性对应的属性描述 与 Object.getOwnPropertyDescriptor 一样
const obj4 = { a: 1 };
console.log(Reflect.getOwnPropertyDescriptor(obj4, "a"));

// 5) ownKeys =  [...Object.getOwnPropertyNames , ...Object.getOwnPropertySymbols]
// Object.getOwnPropertyNames 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
// Object.getOwnPropertySymbols 返回一个给定对象自身的所有 Symbol 属性的数组
const obj5 = { a: 1, [Symbol()]: 1 };
Object.getOwnPropertySymbols;
let arr5 = Reflect.ownKeys(obj5);
console.log(arr5);

// 6) getPrototypeOf  / setPrototypeOf 获取或者设置一个对象的原型  参数是 target目标对象 prototype 该对象的新原型（也就是一个对象或者null）
const obj6 = { a: 1 };
Reflect.setPrototypeOf(obj6, null);
let obj6R = Reflect.getPrototypeOf(obj6);
console.log(obj6R); // null

// 7) 函数的apply方法
// 延伸：经典面试题 bind call apply 的区别 共同点都能改变this的指向
const fn = function(a, b) {
  console.log(this, a, b);
};
// apply 支持多个参数传参
fn.apply(1, [2, 3]); // this:1 , a:2 , b:3
// call 参数要一个一个传
fn.call(1, 2, 3);
// bind产生一个新的函数 剩下的参数也要一个一个传（bind函数可以用函数柯里化写出来）
let fn2 = fn.bind(1, 2, 3);
// console.log(fn instanceof new fn2());
// fn2();

Function.prototype.bind =
  // Function.prototype.bind || //兼容一下
  function(context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1); // test.bind时传入的参数
    var F = function() {};
    F.prototype = this.prototype;
    var bound = function() {
      var innerArgs = Array.prototype.slice.call(arguments); // 下文中test(666)调用时传入的参数
      var finalArgs = args.concat(innerArgs);
      /**
       *  instanceof 是通过循环左侧元素及原型链上各个类的__proto__是否等于右侧元素的prototype，来判断左侧元素是否是右侧元素的子类型
       */
      console.log(this instanceof F);
      return me.apply(
        this instanceof F ? this : context || this, // 判断返回的bound有没有被new,如果有返回this指向bound如果没有this指向context
        finalArgs
      );
    };
    bound.prototype = new F();
    return bound;
  };
const test = function(aa, bb, cc) {
  console.log("函数内", arguments, this.aa);
};
test.prototype.mimimama = () => {
  console.log("咪咪咪嘛嘛嘛嘛");
};
const test1 = {
  aa: 111,
  bbb: 222
};
const test2 = test.bind(test1, 333, 444, 555);
// test2(666);
const test3 = new test2(666);
test3.mimimama();
