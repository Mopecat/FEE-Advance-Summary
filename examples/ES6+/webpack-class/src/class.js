// 类
// __proto__ 指向所属类的原型
// prototype 所有类都有一个prototype属性
// constructor prototype.constructor 每个类的原型上都有这个属性
class Animal {
  // type = "哺乳类"; // 可以这样声明在实例上 （但是现在还不支持，还是实验性语法）
  constructor(name) {
    this.name = name;
    this.type = "哺乳类"; // 现在还是要这样写的，将来上面那样写就可以了
  }
  // 在原型上声明属性 Animal.prototype.a = 1
  get a() {
    // 这里的实现原理是 Object.defineProperty(Animal.prototype,a)
    return 1;
  }
  // 放到原型上的方法 相当于 Animal.pototype.say
  say() {
    console.log(this, "===");
  }
  // 静态属性就是定义在类上的属性
  static flag = "动物"; // 这样用=赋值是es7的语法 es6中只有静态方法 flag(){ return '动物'}
  // es6中的静态属性的写法是
  static get flagES6() {
    return "ES6 => flag";
  }
}
let animal = new Animal();
let say = animal.say; // 如果将类中的方法拿出来用必须绑定this 否则默认指向undefined
say(); // undefined
// 应该用bind绑定一下
let say1 = animal.say.bind(animal);
say1();
console.log(Animal.flag, Animal.flagES6);

class Tiger extends Animal {
  // 如果子类里写了constructor 就必须调用super 不然会报错 Must call super constructor in derived class before accessing 'this' or returning from derived constructor
  constructor(name) {
    super(name); // 相当于 Animal.call(tiger,name) 在constructor中只能被调用一次
  }
  static getAnimal() {
    console.log(super.flag, "静态方法中的super就是父类");
  }
  say() {
    super.say(); //
    console.log("原型上的方法中的super是父类的原型");
  }
}
let tiger = new Tiger("老虎");
console.log(Tiger.flag); // 静态方法和静态属性在es6中也会被子类继承
console.log(tiger);
tiger.say();
