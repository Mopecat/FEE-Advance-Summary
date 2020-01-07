# this 相关

## 全局环境下的 this

在执行函数时，如果函数中的 `this` 是被上一级的对象所调用，那么 `this` 指向的就是上一级的对象；否则指向全局环境。

### 例子 1：

```js
function f1() {
  console.log(this);
}
function f2() {
  "use strict";
  console.log(this);
}
f1(); // window
f2(); // undefined
```

::: tip 解析：
这种情况相对简单直接，函数在浏览器全局环境中被简单调用，非严格模式下 `this` 指向 `window`；在 `use strict` 指明严格模式的情况下就是 `undefined`。
:::

### 例子 2：

```js
const foo = {
  bar: 10,
  fn: function() {
    console.log(this);
    console.log(this.bar);
  }
};
var fn1 = foo.fn;
fn1();
```

::: tip 解析：
这里 `this` 仍然指向的是 `window`。虽然 `fn` 函数在 `foo` 对象中作为方法被引用，但是在赋值给 `fn1` 之后，`fn1` 的执行仍然是在 `window` 的全局环境中。因此输出 `window` 和 `undefined`
:::

### 例子 3

```js
/**
 * 例3
 * 这个时候 this 指向的是最后调用它的对象，在 foo.fn() 语句中 this 指向 foo 对象
 * 输出{bar: 10, fn: ƒ} 10
 */
const foo3 = {
  bar: 10,
  fn: function() {
    console.log(this);
    console.log(this.bar);
  }
};
foo3.fn();
```

::: tip 解析：
这个时候 `this` 指向的是最后调用它的对象，在 `foo.fn()` 语句中 `this` 指向 `foo` 对象输出`{bar: 10, fn: ƒ} 10`
:::

## 上下文对象调用中的 this

重要的结论：`this` 指向最后调用它的对象

### 例 1:

```js
const student = {
  name: "Lucas",
  fn: function() {
    return this;
  }
};
console.log(student.fn() === student); // true
```

### 例 2:

```js
const person = {
  name: "Lucas",
  brother: {
    name: "Mike",
    fn: function() {
      return this.name;
    }
  }
};
console.log(person.brother.fn()); // Mike
```

::: tip 解析：
`this` 指向最后调用它的对象，因此输出将会是：Mike
:::

### 例 3:

```js
const o1 = {
  text: "o1",
  fn: function() {
    return this.text;
  }
};
const o2 = {
  text: "o2",
  fn: function() {
    return o1.fn();
  }
};
const o3 = {
  text: "o3",
  fn: function() {
    var fn = o1.fn;
    return fn();
  }
};

console.log(o1.fn());
// o2.fn = o1.fn  // 添加这句后可以让o2.fn正常输出o2 或者可使用bind/call/apply
console.log(o2.fn());
console.log(o3.fn());
```

::: tip 解析：
第一个 `console` 最简单，`o1` 没有问题。难点在第二个和第三个上面，关键还是看调用 `this` 的那个函数。

第二个 `console` 的 `o2.fn()`，最终还是调用 `o1.fn()`，因此答案仍然是 `o1`。

最后一个，在进行 `var fn = o1.fn` 赋值之后，这里的 `this` 指向 `window`，答案当然是 `undefined`。
:::

## bind/call/apply 改变 this 指向

`bind/call/apply` 三个方法的区别:

他们都是用来改变相关函数 `this` 指向的，但是 `call/apply`是直接进行相关函数调用；`bind`不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 `this` 指向，开发者需要手动调用即可。再具体的 `call/apply`之间的区别主要体现在参数设定上

```js
// 基本用法
const target = {};
fn.call(target, "arg1", "arg2");
fn.apply(target, ["arg1", "arg2"]);
fn.bind(target, "arg1", "arg2")();
/**
 * 例1
 */
const foo = {
  name: "lucas",
  logName: function() {
    console.log(this.name);
  }
};
const bar = {
  name: "mike"
};
console.log(foo.logName.call(bar)); // mike
```

## 构造函数和 this

`new` 操作符调用构造函数，具体做了什么:

1. 创建一个新的对象；
2. 将构造函数的 `this` 指向这个新对象
3. 为这个对象添加属性、方法等；
4. 最终返回新对象

以上过程可用代码简单概括一下:

```js
var obj = {};
obj.__proto__ = Foo.prototype;
Foo.call(obj);
```

### 例 1：

```js
function Foo() {
  this.bar = "Lucas";
}
const instance = new Foo();
console.log(instance.bar);
```

### 例 2:

```js
function Foo() {
  this.user = "Lucas";
  const o = {};
  return o;
}
const instance = new Foo();
console.log(instance.user);
```

::: tip 解析：
将会输出 `undefined`，此时 `instance` 是返回的空对象 `o`

结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 `this` 就指向这个返回的对象；如果返回的不是一个对象，那么 `this` 仍然指向实例。
:::

## this 优先级相关

### 例 1:

```js
function foo(a) {
  console.log(this.a);
}

const obj1 = {
  a: 1,
  foo: foo
};

const obj2 = {
  a: 2,
  foo: foo
};

obj1.foo.call(obj2); // 2
obj2.foo.call(obj1); // 1
```

::: tip 解析：
`call、apply、bind、new` 对 `this` 绑定的情况称为**显式绑定**；根据调用关系确定的 `this` 指向称为**隐式绑定**。上面例子证明**显示绑定 高于 隐式绑定**
:::

### 例 2：

```js
function foo2(a) {
  this.a = a;
}

const obj3 = {};

var bar = foo2.bind(obj3);
bar(2);
console.log(obj3.a); // 2
var baz = new bar(3);
console.log(baz.a); // 3   new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高。
```

::: tip 解析：
`new` 绑定修改了 `bind` 绑定中的 `this`，因此 `new` 绑定的优先级比显式 `bind` 绑定更高。
:::

### 例 3:

```js
/**
 *
 *
 */
function foo3() {
  return a => {
    console.log(this.a);
  };
}

const obj4 = {
  a: 2
};

const obj5 = {
  a: 3
};

const bar3 = foo.call(obj4);
console.log(bar3.call(obj5)); // 2
```

::: tip 解析：
将会输出 2。由于 `foo()` 的 `this` 绑定到 `obj1`，`bar`（引用箭头函数）的 `this` 也会绑定到 obj1，**箭头函数的绑定无法被修改**。
:::

### 例 4:

```js
var a = 123; // 若将var 修改为const 则下面将会输出undefined，因为const、let 声明的变量不会被挂载到window上
const foo4 = () => a => {
  console.log(this.a);
};

const obj6 = {
  a: 2
};

const obj7 = {
  a: 3
};

var bar4 = foo4.call(obj6);
console.log(bar4.call(obj7)); // 123 this指向window
```

## bind 方法实现

`instanceof`是通过循环左侧元素及原型链上各个类的`__proto__`是否等于右侧元素的`prototype`，来判断左侧元素是否是右侧元素的子类型

```js
Function.prototype.bind = function(context) {
  // Function.prototype.bind || // 可以兼容一下
  var me = this;
  // 从Mdn上得知 调用bind的必须是一个函数 所以
  if (typeof me !== "function") {
    throw new TypeError("调用bind的必须是一个function呦");
  }
  var args = Array.prototype.slice.call(arguments, 1); // test.bind时传入的参数
  var F = function() {}; // 作为一个中转的构造函数 这么做的原因是 可以让bind后的新方法上也有调用函数（test）原型上的方法
  F.prototype = this.prototype; // 让中转的构造函数的原型 与 this 的原型相同
  var bound = function() {
    var innerArgs = Array.prototype.slice.call(arguments); // 下文中test(666)调用时传入的参数
    var finalArgs = args.concat(innerArgs);
    /**
     *  instanceof 是通过循环左侧元素及原型链上各个类的__proto__是否等于右侧元素的prototype，来判断左侧元素是否是右侧元素的子类型
     */

    return me.apply(
      // 因为下面赋值了 bound.prototype 是 F的实例，所以如果new 了 bound,this指向的是bound(test3)不再是调用的函数（test） 所以下面可以用this instanceof F来判断是否new过bound
      this instanceof F ? this : context || this, // 判断返回的bound有没有被new,如果有返回this指向bound如果没有this指向context
      context,
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
console.log(test3);
```
