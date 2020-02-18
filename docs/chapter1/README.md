# 面试题记录

## promise 相关

1. **`promise.finally` 的实现**

```javascript
Promise.prototype.finally = function(callback) {
  return this.then(
    val => {
      // 等待finally中的函数执行完毕，继续执行，finally函数可能返还一个promise用Promise.resolve等待返回的promise执行完
      return Promise.resolve(callback().then(() => val));
    },
    err => {
      return Promise.resolve(
        callback().then(() => {
          throw err;
        })
      );
    }
  );
};
Promise.reject()
  .finally(() => {
    console.log(1);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  })
  .catch(e => {
    console.log(e);
  });
```

2. **`Promise.try` 这个方法原生里没有**

**既能捕获同步异常也能捕获异步异常**

```javascript
// 写一个方法 一个方法里可能会throw err的同步异常，也可能是返回promise的异步异常，同步的可以用try-catch捕获，promise的要用then/catch捕获，但是我们不确定这个函数是同步错误还是异步错误，所以需要，Promise.try这个方法。下面你是实现方式
function fn() {
  // throw new Error('同步的错误')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("异步的错误");
    }, 3000);
  });
}
Promise.try = function(callback) {
  return new Promise((resolve, reject) => {
    // Promise.resolve只能返回一个成功的promise所以外面需要再包一层promise
    return Promise.resolve(callback()).then((resolve, reject));
  });
};
Promise.try(fn).catch(err => {
  console.log(err);
});
```

3. **`Promise.race`的实现 谁快用谁**

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 1000);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 2000);
});

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((resolve, reject));
    }
  });
};
Promise.race([p1, p2]).then(data => {
  console.log(data);
});
```

4. **`Promise`有哪些优缺点？**

优点： 1.可以解决异步并发问题 Promise.all 2.链式调用
缺点： 1.还是基于回调函数 2. `promise` 无法终止 只能抛弃这次结果

5. **如何终止一个 `promise` 链**

返回一个等待的 promise

```javascript
let p = new Promise((resolve, reject) => {
  resolve();
});
let p1 = p
  .then(() => {
    console.log("ok");
    return new Promise(() => {});
  })
  .then(() => {
    console.log(111);
  });
```

6. **如何放弃某个 `promise` 执行结果**

```javascript
function wrap(p1) {
  let fail = null;
  let p2 = new Promise((resolve, reject) => {
    fail = reject; // 先将p2的失败方法暴露出来
  });
  let p = Promise.race([p2, p1]); // race方法返回的也是一个promise
  p.abort = fail;
  return p;
}
let p = wrap(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("啥都行 反正放弃这个结果了");
    }, 3000);
  })
);
p.abort("调用abort放弃结果");
p.then(data => {
  console.log(data);
}).catch(err => {
  console.log(err);
});
```

## reduce 相关

**与数组`reduce`相关的面试题**

（1）用`reduce`实现数组扁平化 (`flat`)

（2）函数的组合 `compose`

```js
// 解释一下什么意思
function sum(a, b) {
  return a + b;
}
function len(str) {
  return str.length;
}
function addCurrency(val) {
  return "￥" + val;
}

// 想要得到最终结果需要 如下调用， 面向切片编程 保证函数功能的单一性，但是由于数量不定，写起来很麻烦了，也不方便阅读
let result = addCurrency(len(sum("asdf", "hjkl")));
console.log(result);
```

`compose` 方法就是用一个函数实现上述的功能 调用方式 `compose(addCurrency,len,sum)("asdf", "hjkl")`

方法一：

```js
function compose(...args) {
  return function(...values) {
    let lastFn = args.pop()(...values);
    return args.reduceRight((prev, current) => {
      return current(prev);
    }, lastFn);
  };
}
// 上面函数改为箭头函数的极简写法
const compose = (...args) => (...values) =>
  args.reduceRight((prev, current) => current(prev), args.pop()(...values));

let resultCompose = compose(addCurrency, len, sum)("asdf", "hjkl");
console.log(resultCompose);
```

方法二：

```js
// 上面方法还可以再换一种方法实现 跟redux源码一样的实现方式 https://github.com/reduxjs/redux/blob/master/src/compose.ts
function compose(...args) {
  return args.reduce((prev, current) => {
    return function(...values) {
      // return len(sum(...values)) 替换一下就是下面的了 当然了 如果是三层的话 就想第一次循环返回的是一个函数 函数里面返回的是prev(current(...values))
      return prev(current(...values));
    };
  });
}
// 换成箭头函数的极简写法
const compose = (...args) =>
  args.reduce((prev, current) => (...values) => prev(current(...values)));

let resultCompose = compose(addCurrency, len, sum)("asdf", "hjkl");
console.log(resultCompose);
```

（3）实现 `Array.prototype.reduce`

```javascript
// 下面的实现方式并不能作为polyfill 因为reduce是es5引入，forEach 也是es5引入。但是从实现上考虑是没有问题的，实在不行还可以把forEach改成for循环也没什么问题
Array.prototype.reduce = function(fn, initialValue) {
  var arr = this;
  var base = typeof initialValue === "undefined" ? arr[0] : initialValue;
  var startPoint = typeof initialValue === "undefined" ? 1 : 0;
  arr.slice(startPoint).forEach((val, index) => {
    base = fn(base, val, index + startPoint, arr);
  });
  return base;
};
```

## 怎么用 ES5 来模拟 ES6 中的 class

## new 的原理

要想用代码还原 `new` 首先我们应该要先知道 `new` 都做了什么？

- 创建一个对象并返回
- 将构造函数中的 `this` 指向这个对象
- 继承构造函数原型上的方法

**需要注意的是如果构造函数返回的是个引用空间，那么 new 返回的对象就指向这个引用空间**

下面就是实现的代码例子~ 基本可以跟 `new` 的功能一致

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
  return null;
}
function _new(...constructor) {
  let [o, ...args] = constructor;
  let obj = {};
  let returnValue = o.call(obj, ...args);
  if (
    (typeof returnValue === "object" || typeof returnValue === "function") &&
    returnValue !== null
  ) {
    return returnValue;
  }
  obj.__proto__ = o.prototype; // 这块也可以用Object.create来做 反正归根到底原理都是这个~
  return obj;
}

let person = _new(Person, "Mopecat", "永远18岁");
let person1 = new Person("Mopecat", "永远18岁");
console.log(person);
console.log(person1);
```

## 模板引擎的实现原理

```js
let fs = require("fs");

let templateStr = fs.readFileSync("./template1.html", "utf8");

// console.log(templateStr);

const render = (template, obj) => {
  return template.replace(/\{\{(.+?)\}\}/g, function() {
    return obj[arguments[1]];
  });
};
let obj = { name: "Feely", age: "forever 18" };
let r = render(templateStr, obj);
console.log(r);

// 模板引擎的实现原理 1）with 语法 2）new Function
let templateStr2 = fs.readFileSync("./template2.html", "utf8");
function render2(template, obj) {
  let head = 'let str = "";\r\n';
  head += "with(xxx){\r\n";
  let content = "str += `";
  template = template.replace(/\{\{(.+?)\}\}/g, function() {
    return "${" + arguments[1] + "}";
  });
  content += template.replace(/\<\%(.+?)\%\>/g, function() {
    return "`\r\n" + arguments[1] + "\r\nstr+=`";
  });
  let tail = "`\r\n}\r\nreturn str";
  let fn = new Function("xxx", head + content + tail);
  console.log(fn.toString());
  return fn(obj);
}
let r2 = render2(templateStr2, { arr: [1, 2, 3] });
console.log(r2);
```

## 浏览器事件环

![浏览器事件环](./images/eventLoop.jpg)

🌰1：

```js
setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => {
    console.log("then 1");
  });
});
setTimeout(() => {
  console.log("timeout 2");
});
Promise.resolve().then(() => {
  console.log("then 2");
});
Promise.resolve().then(() => {
  console.log("then 3");
});

/*
 *  分析：
 *    1.先执行主栈 setTimeout => 回调放入宏任务队列、Promise.then()放入微任务队列 主栈执行完毕
 *    2.清空微任务队列 => 按顺序执行两个Promise.then() => 打印then 2 , 打印then 3
 *    3.将宏任务队列第一个放入主栈执行 => 打印timeout 1, 将promise.then放入微任务队列
 *    4.清空微任务队列 => 执行Promise.then() => 打印then 1
 *    5.将宏任务队列第二个放入主栈执行 => 打印timeout 2
 */
```

🌰2：

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
async1();
new Promise(function(resolve) {
  console.log("promise1");
  resolve();
}).then(function() {
  console.log("promise2");
});
console.log("script end");

/*
 *  分析：
 *    1.先执行主栈 前两个都是函数 未调用 所以先打印 script start
 *    2.setTimeout 执行将回调放入宏任务队列
 *    3.调用async1 会直接打印asynv1 start
 *    4.await async2 在浏览器中相当于 Promise.resolve(async2()).then(()={...后续代码}) 所以先打印async2 然后then 放入微任务队列
 *    5.new Promise 回调立即执行 打印 promise1 then方法放入微任务队列
 *    6.打印 script end 主栈执行完毕 清空微任务 按照队列特点先进先出 所以 先打印async1 end 然后打印 promise2 （如果是node环境执行的话 先打印prmise2 再打印async1 end 因为await相当于两层then方法）
 *    7.清空宏任务队列 打印 setTimeout
 */
```

## 单例模式相关面试题

- 实现 `Storage`，使得该对象为单例，基于 `localStorage` 进行封装。实现方法 `setItem(key,value)` 和 `getItem(key)`。

```js
// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
// “基本思路”部分——getInstance方法和instance这个变量。
// 实现：静态方法版
class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    return localStorage.setItem(key, value);
  }
}

const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();

storage1.setItem("name", "九儿");
// 李雷
storage1.getItem("name");
// 也是李雷
storage2.getItem("name");
// 返回true
storage1 === storage2;

// 实现闭包版本
function StoragecClosure() {}
Storage.prototype.getItem = function(key) {
  return localStorage.getItem(key);
};
Storage.prototype.setItem = function(key, value) {
  return localStorage.setItem(key, value);
};

const Storage = (function() {
  let instance = null;
  return function() {
    if (!instance) {
      instance = new StoragecClosure();
    }
    return instance;
  };
})();

// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果
const storage1 = new Storage();
const storage2 = new Storage();

storage1.setItem("name", "李雷");
// 李雷
storage1.getItem("name");
// 也是李雷
storage2.getItem("name");

// 返回true
storage1 === storage2;
```

- 实现一个全局唯一的 `Modal` 弹框

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>modal</title>
    <style>
      #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <button id="open">打开弹框</button>
    <button id="close">关闭弹框</button>
    <script>
      const Modal = (function() {
        let modal = null;
        return function() {
          if (!modal) {
            modal = document.createElement("div");
            modal.innerHTML = "全局唯一弹窗啦啦啦啦";
            modal.id = "modal";
            modal.style.display = "none";
            document.body.appendChild(modal);
          }
          return modal;
        };
      })();
      document.getElementById("open").addEventListener("click", function() {
        // 未点击则不创建modal实例，避免不必要的内存占用;此处不用 new Modal 的形式调用也可以，和 Storage 同理
        const modal = new Modal();
        modal.style.display = "block";
      });
      document.getElementById("close").addEventListener("click", function() {
        const modal = new Modal();
        if (modal) modal.style.display = "none";
      });
    </script>
  </body>
</html>
```

## 深拷贝的前世今生

看到的还不错的文章 https://segmentfault.com/a/1190000016672263

`weakMap`的解决方案:

```js
// 靠谱的深拷贝，递归拷贝
// 想要实现递归拷贝首先得判断数据类型 那么如何判断类型
// 1） typeof  无法区分 Array 和 Object
// 2)  Object.prototype.toString().call()  无法判断是谁的实例
// 3)  instanceof 可以判断类型，可以判断是谁的实例
// 4) constructor 构造函数

// 下面有注解为什么要用map / WeakMap
const deepClone = (value, hash = new WeakMap()) => {
  // 排除 null 和 undefined
  if (value == null) return value;
  if (typeof value !== "object") return value; // 包含了函数类型
  if (value instanceof RegExp) return new RegExp(value); // 如果是正则 返回一个新的正则
  if (value instanceof Date) return new Date(value); // 如果是日期 返回一个新的日期
  // .....特殊的要求继续判断
  // 拷贝的可能是一个对象 或者是一个数组 既能循环数组 又能 循环对象 => for in 循环
  let instance = new value.constructor(); // 根据当前属性构建一个新的实例
  if (hash.has(value)) {
    return hash.get(value);
  }
  hash.set(value, instance);
  // console.log(instance);
  for (let key in value) {
    // 过滤掉原型链上的属性，如果是实例上的属性 再拷贝
    if (value.hasOwnProperty(key)) {
      // 将hash 继续向下传递 保证这次拷贝能拿到以前的拷贝结果
      instance[key] = deepClone(value[key], hash);
    }
  }
  return instance;
};
let cloneInfo = deepClone(info2);
cloneInfo.detail.face = "无敌炸天帅";
console.log(cloneInfo);
console.log(info2);

// 注解示例 为什么要用 map / WeakMap
// 用WeakMap代替Map是为了防止内存泄漏
// 如果不使用map/WeakMap 则下面的这个示例会陷入死循环不能自拔 用map做相对简单点不然要每次存一下对象 然后传到下一次里面 然后在判断是否有重复 跟现在的逻辑是一样的 但是实现起来相对麻烦很多
let objExample = { a: 1 };
objExample.b = objExample;
console.log(deepClone(objExample));
```

## 观察者模式面试题

- `Vue`数据双向绑定（响应式系统）的实现原理
- 实现一个 `Event Bus/ Event Emitter`

```js
function EventEmitter() {
  // 用Object.create(null)创建空对象的方式与直接字面量方式{}的区别是：{}这种方式会有__proto__上面有很多属性
  this._events = Object.create(null);
}

EventEmitter.prototype.on = function(eventName, callback) {
  // (this._events[eventName] || []).push(callback)
  // 如果实例上没有_events属性就添加上一个，指例子中的Myevents的情况 => 此时的this是Myevents的实例 而非 EventEmitter的实例 所以this上没有 _events
  if (!this._events) this._events = Object.create(null);
  // 如果当前的订阅不是newListener就执行 newListener的回调 并传递当前的事件名 用这种方式实现 监控on事件的触发
  if (eventName !== "newListener") {
    this.emit("newListener", eventName);
  }
  // 向对应事件的数组中添加callback
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    this._events[eventName] = [callback];
  }
};

EventEmitter.prototype.emit = function(eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...args);
    });
  }
};

EventEmitter.prototype.once = function(eventName, callback) {
  // 用one代替callback 在执行了callback之后 删除callback 由此实现了只执行一次
  let one = () => {
    callback();
    this.off(eventName, one); // 下面on的是one所以这里off的应该也是one
  };
  // 如果手动off了 那么传入off的callback跟one肯定是不相等的 所以将callback赋值给one的自定义属性，用于在off中判断
  one.l = callback;
  this.on(eventName, one);
};
EventEmitter.prototype.off = function(eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      // 返回false的会被过滤掉
      return fn !== callback && fn.l !== callback;
    });
  }
};
module.exports = EventEmitter;
```

## 虚拟 DOM

- 什么是虚拟 DOM

  用 js 模拟一颗 DOM 树，放在浏览器的内存中，当需要变更时，虚拟 DOM 进行 diff 算法进行新旧虚拟 DOM 的对比，将变更放入到队列中。反应到实际的 DOM 上，减少 DOM 的操作。

- 为什么用虚拟 DOM

  - 保证性能下限

    不管数据变化多少，尽管不能保证每次重绘的性能都是最优，但是能让每次的重绘的性能都能够接受，就是保证下限

  - 不需要手动优化的情况下，我依然可以给你提供过得去的性能

    这是性能 与 可维护性的取舍，诚然没有任何框架可以比手动优化 DOM 更快，因为框架的 DOM 操作需要应对任何上层 API 产生的操作，所以他的实现必须是普适性的，但是构建一个应用时不可能每一个地方都要去手动优化。

  - 跨平台: 因为是 js 对象

- 虚拟 DOM 的实现
  1. 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
  2. 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
  3. 把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了

## link 与 @import 的区别

1. `link`是标签除了能加载`css`还能加载很多东西 `@import` 只能在`css`文件中使用
2. `@import`会等待页面全部下载完了再加载，所以会导致刚打开页面时用`@import`引入的样式的页面没有样式，也就是会闪烁，网速不好时尤为明显
3. `@import` 有兼容性问题 `css2.1`版本之后才支持
