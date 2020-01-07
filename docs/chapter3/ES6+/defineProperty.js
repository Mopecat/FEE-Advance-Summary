// Object.defineProperty 常见的 就是getter 和 setter
let obj = {
  _a: "",
  // 写成这样的方式其实和 let obj = {a:""} 没有什么太大的区别 好处就是我们可以在用a属性的时候提前做一些事情，因为要用set来赋值 所以需要一个第三方变量中转一下 也就是_a
  get a() {
    // todo...
    console.log("111");
    return this._a;
  },
  set a(value) {
    // todo...
    this._a = value;
  }
};
obj.a = 100;
console.log(obj.a);

// Object.defineProperty 用法介绍
let obj1 = {};
let val = ""; // 修改的时候一样也要用个第三方变量中转一下
Object.defineProperty(obj1, "a", {
  configurable: true, // 是否可配置（删除）
  // writable: true, // 是否可写 （写了get 和 set 要删除这个属性 默认就是可写的了）
  enumerable: true, // 是否可枚举
  get() {
    return val;
  },
  set(value) {
    console.log(value);
    val = value;
  }
});
console.log(obj1);

// vue中的数据劫持 就是给每一个对象都添加一个getter和setter  当值变化了  可以实现更新视图的功能 原理代码~~

let obj3 = {
  a: { a: 1 },
  b: 2
};
// 更新视图方法
let updateView = () => {
  console.log("更新了视图");
};
// 缺陷就是无法监控数组的变化
function observer(obj) {
  if (typeof obj !== "object" || obj == null) {
    return;
  }
  for (let key in obj) {
    // 因为defineProperty需要一个特公共的值去修改，所以利用函数作用域将value保存下来作为公共的值去修改
    defineReactive(obj, key, obj[key]);
  }
}

function defineReactive(obj, key, value) {
  observer(value); // 递归增加getter 和 setter
  Object.defineProperty(obj, key, {
    get() {
      return value;
    },
    set(val) {
      updateView();
      value = val;
    }
  });
}
observer(obj3);
obj3.b = 100;
console.log(obj3.b);

// 因为递归更加消耗性能 且 不能监控数组变化 且 无法增加被监控的属性（需要通过vm.$set来实现） 所以新版改用proxy来实现 关于proxy的示例在此目录下proxy.js
