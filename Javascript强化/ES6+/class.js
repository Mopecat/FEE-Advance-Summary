// 面试题
// 怎么用es5来模拟es6中的class
// new的原理

// es5中没有类 用构造函数来模拟类
// 类中有两种属性 1）实例上的属性 2）公共属性
function Animal() {
  // 判断当前是不是通过new来调用的
  if (!(this instanceof Animal)) {
    throw new Error("没有new呢哦");
  }
  this.name = { name: "九儿" }; // 实例上的属性
  this.age = 1;
}
// es5中的类可以当做函数来调用，es6中不可以
let a1 = new Animal();
let a2 = new Animal();
// 两个实实例上都有相同的属性(实例属性)，但是并不相等
console.log(a1, a2);
console.log(a1.name === a2.name); // false

// 公共属性一般加在类的原型上
Animal.prototype.say = function() {
  console.log("喵~");
};

// 一般情况下不要直接操作__proto__
// 实例上有个属性 __proto__ 指向类的原型，类的原型上有constrcutor指向类本身（构造函数），所以实例__proto__的constructor指向类本身（构造函数）
console.log(a1.__proto__ === Animal.prototype);
console.log(a1.__proto__.constructor === Animal);
// 每个类都有个__proto__ 包括类的原型，原型的__proto__指向父类的prototype 形成链条，知道指向Object.prototype 然后Object.__proto__ === null
console.log(a1.__proto__.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__); // null

// _--------------------------------------------
// 类的继承 继承实例上的属性，继承公共属性
function Animal1() {
  this.type = "哺乳类";
}
Animal1.prototype.say = function() {
  console.log("我是动物");
};
function Tiger(name) {
  this.name = name;
  Animal1.call(this); // 调用父类的构造函数，并且让this指向子类 =>继承实例上的属性
}

// 如果要拿到父类原型上的方法还要继承原型 =>继承公共属性
// Tiger.prototype = Animal1.prototype; // 这是错误的，相当于直接与父类的原型一样了，这样会造成修改Tiger上的属性时同时影响了Animal1
// Tiger.prototype.__proto__ = Animal1.prototype; // 根据上面原型链的学习可以知道=>子类原型的__proto__指向父类的原型
// 但是要遵循尽量不要操作__proto__的原则,下一行代码是es6的
// Object.setPrototypeOf(Tiger.prototype, Animal1.prototype); // 原理是一样的
// 下面的是用的最多的
Tiger.prototype = Object.create(Animal1.prototype, {
  constructor: { value: Tiger } // 将fn的constructor赋值为Tiger
});
// create 原理
// function create(parentProto, child) {
//   function Fn() {}
//   Fn.prototype = parentProto; // Animal1
//   let fn = new Fn();
//   fn.constructor = child; // Tiger
//   return fn;
// }

let tiger = new Tiger("大九儿");
console.log(tiger.constructor);
console.log(tiger.type);
tiger.say();
