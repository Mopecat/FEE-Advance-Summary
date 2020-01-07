// 类
// __proto__ 指向所属类的原型
// prototype 所有类都有一个prototype属性
// constructor prototype.constructor 每个类的原型上都有这个属性
class Animal {
  // type = "哺乳类"; // 可以这样声明在实例上 （但是现在还不支持，还是实验性语法）
  constructor() {
    this.type = "哺乳类"; // 现在还是要这样写的，将来上面那样写就可以了
  }
  // 在原型上声明属性 Animal.prototype.a = 1
  get a() {
    // 这里的实现原理是 Object.defineProperty(Animal.prototype,a)
    return 1;
  }
  // 放到原型上的方法 相当于 Animal.pototype.say
  say() {
    console.log(this);
  }
}
let animal = new Animal();
let say = animal.say; // 如果将类中的方法拿出来用必须绑定this 否则默认指向undefined
say(); // undefined
// 应该用bind绑定一下
let say1 = animal.say.bind(animal);
say1();

// 由于一些实验性语法在普通js中无法看到效果，所以放在webpack-class中用babel的插件["@babel/plugin-proposal-class-properties", { "loose": true }]转译了一下
