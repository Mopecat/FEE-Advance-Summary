# 闭包相关

## 闭包
函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包。

### 实例1：
```js
/**
 * desc 实例1
 */
const foo1 = (function() {
  var v = 0;
  return () => {
    return v++;
  };
})();

for (let i = 0; i < 10; i++) {
  foo1();
}

console.log(foo1());
```
::: tip 解析：
在循环执行时，执行 `foo()`，这样引用自由变量 10 次，v 自增 10 次，最后执行 `foo` 时，得到 10。（自由变量是指没有在相关函数作用域中声明，但是使用了的变量。）
:::

### 实例2：

```js
/**
 * desc 实例2
 */
const foo2 = () => {
  var arr = [];
  var i;

  for (i = 0; i < 10; i++) {
    arr[i] = function() {
      console.log(i);
    };
  }

  return arr[0];
};

foo2()();
```
::: tip 解析：
自由变量是i ，i在此时的值为10
:::

### 实例3：
```js
/**
 * desc 实例3
 */
var fn3 = null;
const foo3 = () => {
  var a = 2;
  function innerFoo() {
    console.log(a);
  }
  fn3 = innerFoo;
};

const bar3 = () => {
  fn3();
};

foo3();
bar3();

```
::: tip 解析：
正常来讲，根据调用栈的知识，foo 函数执行完毕之后，其执行环境生命周期会结束，所占内存被垃圾收集器释放，上下文消失。
但是通过 innerFoo 函数赋值给 fn，fn 是全局变量，这就导致了 foo 的变量对象 a 也被保留了下来。
所以函数 fn 在函数 bar 内部执行时，依然可以访问这个被保留下来的变量对象，输出结果为 2。
:::

### 实例4：
```js
/**
 * desc 实例4
 */
var fn4 = null;
const foo4 = () => {
  var a = 2;
  function innerFoo() {
    console.log(c);
    console.log(a);
  }
  fn4 = innerFoo;
};

const bar4 = () => {
  var c = 100;
  fn4();
};

foo4();
bar4();

```
::: tip 解析：
在 `bar` 中执行 `fn()` 时，`fn()` 已经被复制为 `innerFoo`，变量 `c` 并不在其作用域链上，`c` 只是 `bar` 函数的内部变量。因此报错 `ReferenceError: c is not defined`
:::

### 如何利用闭包实现单例模式?

```js
/**
 * 如何利用闭包实现单例模式???
 */
function Person() {
  this.name = "lucas";
}

const getSingleInstance = (function() {
  var singleInstance;
  return function() {
    if (singleInstance) {
      return singleInstance;
    }
    return (singleInstance = new Person());
  };
})();

const instance1 = new getSingleInstance();
const instance2 = new getSingleInstance();
```
::: tip 解析：
事实上，我们有 `instance1 === instance2`。因为借助闭包变量 `singleInstance，instance1` 和 `instance2` 是同一引用的（`singleInstance`），这正是单例模式的体现。
:::

## 内存泄漏

内存泄漏是指内存空间明明已经不再被使用，但由于某种原因并没有被释放的现象。内存泄漏危害却非常直观：它会直接导致程序运行缓慢，甚至崩溃。

### 内存泄漏实例1:
```js
/**
 * desc 内存泄漏实例1
 */
let el = document.getElementById("el");
el.class = "el-class";
// 移除 element 节点 调用该方法后再次访问el变量仍然可以访问到元素节点el
function remove() {
  el.parentNode.removeChild(el);
}
```
### 内存泄漏实例2
```js
var element = document.getElementById("element");
element.innerHTML = '<button id="button">点击</button>';

var button = document.getElementById("button");
button.addEventListener("click", function() {
  // ...
});

element.innerHTML = "";
```
::: tip 解析：
这段代码执行后，因为 `element.innerHTML = ''`，`button` 元素已经从 `DOM` 中移除了，
但是由于其事件处理句柄还在，所以依然无法被垃圾回收。我们还需要增加 `removeEventListener`，防止内存泄漏。
:::
### 内存泄漏实例3

```js
function foo() {
  var name = "lucas";
  window.setInterval(function() {
    console.log(name);
  }, 1000);
}

foo();
```
::: tip 解析：
这段代码由于 `window.setInterval` 的存在，导致 `name` 内存空间始终无法被释放，如果不是业务要求的话，一定要记得在合适的时机使用 `clearInterval` 进行清理。
:::

### 例1：
```js
function numGenerator() {
  let num = 1;
  num++;
  return () => {
    console.log(num);
  };
}

var getNum = numGenerator();
getNum();

var array = [];
function createNodes() {
  let div;
  let i = 100;
  let frag = document.createDocumentFragment();
  for (; i > 0; i--) {
    div = document.createElement("div");
    div.appendChild(document.createTextNode(i));
    frag.appendChild(div);
  }
  document.body.appendChild(frag);
}
function badCode() {
  array.push([...Array(100000).keys()]);
  createNodes();
  setTimeout(badCode, 1000);
}

// badCode();
```

::: tip 解析：
这个简单的闭包例子中，`numGenerator` 创建了一个变量 `num`，返回打印 `num` 值的匿名函数，这个函数引用了变量 `num`，使得外部可以通过调用 `getNum` 方法访问到变量 `num`，
因此在 `numGenerator` 执行完毕后，即相关调用栈出栈后，变量 `num` 不会消失，仍然有机会被外界访问。可借此方法来调试浏览器来查看页面的性能瓶颈
:::

