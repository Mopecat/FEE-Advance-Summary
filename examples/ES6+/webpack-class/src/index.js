// 装饰器 装饰模式， 在执行类之前，对类,类的属性还有类中的方法进行包装（类中的属性，还有类中的方法）参数分别为 类的原型，装饰的key，key对应的属性装饰器
// 装饰器必须是个函数 传参了就再包一层返回一个函数
@type1("传了个参数1")
@type2("传了个参数2")
class Animal {}

// 对类进行扩展 如果不传参 就近执行 先执行2后执行1, 如果传参了 就先执行外层函数的1，2，然后执行内层函数的2，1，像切洋葱一样的执行顺序

function type1(args) {
  console.log(`t1`);
  return function(Constructor) {
    console.log("inner1");
    Constructor.type1 = args;
  };
}

function type2(args) {
  console.log(`t2`);
  return function(Constructor) {
    console.log("inner2");
    Constructor.type2 = args;
  };
}

let animal = new Animal();
console.log(animal);

class Circle {
  @readonly PI = 3.14; // 实例上的属性
  @before
  area(radius) {
    console.log(this);
    console.log("圆的面积是：" + radius * radius * this.PI);
  }
}

function readonly(circlePrototype, key, descriptor) {
  console.log(circlePrototype, key, descriptor);
  descriptor.writable = false;
}
function before(circlePrototype, key, descriptor) {
  let func = descriptor.value; // 赋值原函数

  descriptor.value = function(args) {
    console.log(
      "求圆的面积之前呢 可以做点什么，顺便求个周长吧：" + this.PI * args * 2
    );
    func.bind(this)(args); // 调用原函数,绑定当前的this,circle
  };
}
let circle = new Circle();
circle.PI = 3.111; // 修改失败
console.log(circle.PI);
circle.area.bind(circle)(10); // 将area的this指向circle 用es6 class声明的原型上的方法中的this指向undefined

// mixin
let obj = {
  name: "Feely",
  age: "forever 18",
  info() {
    console.log("Feely贼几把帅");
  }
};

@mixin(obj)
class Feely {}
// const mixin = obj => Feely => Object.assign(Feely.prototype, obj);
// 试了一下上面的简便写法 报错，错误是const不支持变量提升这种错误，所以目前来看装饰器的外层函数必须要用function来写了
function mixin(obj) {
  return function(Feely) {
    Object.assign(Feely.prototype, obj);
  };
}

let feely = new Feely();
console.log(feely); // obj的属性和方法都已经挂到了 Feely的原型上
feely.info();
