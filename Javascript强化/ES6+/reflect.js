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
// call 参数要一个一个传 并直接执行函数
fn.call(1, 2, 3);
// bind产生一个新的函数 剩下的参数也要一个一个传（bind函数可以用函数柯里化写出来）
let fn2 = fn.bind(1, 2, 3);

Reflect.apply(fn, 1, [2, 3]); // fn 绑定的函数，1 this的指向，[2,3]是参数 等价于 Function.prototype.apply.call(fn,1,[2,3]) 这样做的是为了 调用原型上的apply方法 （比如在实例上写了一个apply方法 但是你想调用的原型上的 就这样用行了）

// 8) construct 构造器 跟new的功能一样
class Example {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
let example = Reflect.construct(Example, ["Mopecat", "forever18"]); // 参数  target构造函数 ，[]参数数组
console.log(example);

// 9) delete 跟delete功能一样 但是 返回是否删除成功
Reflect.deleteProperty;

// 10) isExtensible / preventExtensions  是否可扩展 / 组织扩展
let obj10 = {};
Reflect.preventExtensions(obj10);
obj10.a = 1;
console.log(obj10, Reflect.isExtensible(obj10));
