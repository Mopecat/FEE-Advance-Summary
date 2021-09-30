## 单元测试

为什么要用单元测试？

- 自测 可以保留测试用例在项目中 但是测试代码不会被混入到项目中

- 通过测试用例我们可以更好的理解代码的功能

Vue 内置的两种测试框架 分别是`mocha + chai`和`jest`，用法上大同小异，看个人喜好。这里用`mocha + chai`举例，写几个测试用例。

用于测试的方法：

```javascript
export let parser = (str) => {
  let obj = {};
  str.replace(/([^&=]*)=([^&=]*)/g, function() {
    obj[arguments[1]] = arguments[2];
  });
  return obj;
};
export let stringify = (obj) => {
  let arr = [];
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`);
  }
  return arr.join("&");
};
```

测试用例：

```javascript
import { parser, stringify } from "@/code/parser.js";
import { expect } from "chai";
// chai是一个断言库

// 通过describe进行分类 比如这里可以将测试parser的测试用例都放在同一个describe里面一个it就是一个测试用例

describe("专门测试parser", () => {
  it("测试parser是否靠谱", () => {
    // 一般都用 to.be  由于两个对象不可能完全相等 所以需要用deep.equal判断两个对象是否相等 这里的相等不包括引用空间
    expect(parser("name=mopecat&age=18")).to.be.deep.equal({
      name: "mopecat",
      age: "18",
    });
  });
});

describe("专门测试stringify", () => {
  it("测试stringify是否靠谱", () => {
    expect(stringify({ name: "mopecat", age: "18" })).to.be.equal(
      "name=mopecat&age=18"
    );
  });
});

describe("测试方法", () => {
  it("相等关系", () => {
    expect(1 + 1).to.be.equal(2);
    expect(true).to.be.true;
    expect([1, 2, 3]).to.be.lengthOf(3);
  });
  it("包含关系", () => {
    expect("mopecat").to.be.include("m");
    expect("mopecat").to.be.contain("m");
    expect("mopecat").to.be.match(/m/);
  });
  it("大于、小于", () => {
    expect(2).to.be.greaterThan(1);
    expect(2).to.be.lessThan(3);
    expect(3).to.be.not.greaterThan(6);
  });
});
```

一般情况下我们在创建 Vue 项目时需要将单元测试的选项 √ 上，就可以使用，`cli`可以直接处理内置了，剩下的还有一写测试组件的方法都集成在`Vue`的 `test-utils`仓库中了，也可以直接搜 Vue 的文档中查看相关`API`用法比较像`jq`比较容易上手

## vue 源码学习记录

学习 vue 源码课的一些学习记录

### ast 语法树和虚拟 dom 有什么区别

ast 语法树是描述语法的不单单可以描述 html 还可以描述 js 语法等，但是虚拟 dom 只是描述 html 的

比如虚拟 dom 就可以在描述某一个元素的时候，把某个元素的自定义属性描述出来。但是 ast 语法树只能描述这个元素的属性

```javascript
{
  tag:'div',
  children:[],
  attr:[],
  // 如果是虚拟dom就可以写一些自定义属性,
  aa:'',
  bb:'',
  on:''
}
```

## Vue 的初始化过程

过程中有一些地方看不懂我就直接跳过了，死磕的话影响读下去的信心，效率也不高，整体了解一遍了再回头看，应该会更好理解点

1. `src/instance/index.js`在`initMixin`方法中给 `Vue` 的原型上添加`_init`方法，在 `Vue` 的构造函数中直接调用`_init`方法，在这个方法中首先初始化了`mixin`（将 `mixin` 中注册的 `options` 与 `new Vue` 传入的参数 `options` 合并）涉及到的合并方法是`mergeOptions`但是尤大觉得这个很浪费性能所以做了一层优化~（具体就是一顿赋值）。

2. `initLifecycle`初始化生命周期（此方法在`_init`中调用）,找到祖宗元素（一个 `while` 循环），然后把当前的 `vue` 实例的一些属性初始化一下，包括$parent,$root,\$ref 等等等（`src/instance/lifecycle.js`）

3. `initEvents` 初始化事件（此方法在`_init`中调用）

4. `initRender` 初始化渲染函数（此方法在`_init`中调用），将`_c`,`$createElement`方法挂在实例上，`defineReactive`（这个方法是在`observer`中的他的作用是让数据变得响应化）这里响应化的是`$attr`,`$listeners`

5. 调用生命周期钩子`callHook`这里的钩子是`beforeCreate`，`callHook`这里应用了策略模式，声明一个空对象`strats`在这个对象上挂了一个个生命周期函数的数组（比如父级的`beforeCreate`和子级的`beforeCreate`），这个生命周期函数挂载到实例上实际上是在第一步中的 `mergeOptions` 中做的

6. `initInjections` 这个东西没怎么用过回头看看文档再来研究，他出现在响应化`props`和`data`之前

7. `initState` 这一步做的就是大家耳熟能'翔'的，数据的响应式，也是 Vue 中的核心模块，主要内容都在 `observer` 文件夹下。这个方法首先做的就是初始化 `options` 中的 `props`、`methods`、`data`、`computed`、`watch`。后面在一个一个说吧。不然也太多了，这里说一下`initData`这个方法首先是拿到 `data` 这个函数的返回值也就是我们定义的那些需要响应的数据，然后将这些数据代理到 `Vue` 实例上，以便于我们都可以用 `this` 访问到（这里也是用 `defineProperty` 实现的），之后就是`observe data`（用了源码中的注释）调用 `observe` 方法，方法中判断了当前的这个属性是否是对象，判断了这个对象是不是被响应化过（通过当前对象上是否有 `__ob__` 属性来判断），然后还有一堆判断其中还有一个`Object.isExtensible`（看到这又学到了一个新方法，对象是否可扩展就是能不能在对象上添加属性）经过判断后最后会返回`new Observer(value)`。`Observer`这个类在初始化时创建了`Dep`的实例、将`__ob__`属性添加到对象上，判断是否是数组（因为数组与对象的响应化不同需要做一层函数拦截），在 `walk` 方法中将当前对象的每一个属性都用 `defineReactive` 函数循环了一遍（递归），这也是 `Vue2.0` 中性能方面不好的地方，`3.0` 中做了很大的提升，应用 `Proxy` 只有在某一个属性被访问的时候才会去递归响应化他，而不是像现在这样上来就一股脑的全都递归一遍。

然后就是 `defineReactive` 方法，这个方法一开头我又学到了一个方法 `Object.getOwnPropertyDescriptor` 获取属性描述器,用以判断当前的这个属性是否可配置（`configurable === true`），之后就是重点了大家总说的，通过`Object.defineProperty`重写这个属性，主要是重写 `get` 和 `set` 两个方法。稍微有点绕这里，在 `get` 方法中通过 `Dep.target` 来判断，是否触发`dep.depend()`（这个方法是在 Dep 类的原型方法主要是作用是调用 `Dep.target` 上的 `addDep` 方法，将当前的 `Dep` 实例存放在 `target` 上，`target` 实际上就是当前的 `watcher`实例，同时也将当前的这个 `watcher` 存放在 `dep` 的 `subs` 中），`set` 中其他的先不看，核心就这一句 `dep.notify()`，上面说了 `dep` 中存放了 `watcher`，这里就是将 `dep` 中存的每一个 `watcher` 都调用一遍（渲染的话只有一个渲染`watcher`）。乱七八糟的说了一堆`watcher`那么 `watcher` 是从什么时候初始化的呢？是这样的一个方法`mountComponent`可以理解为咱们用的`$mount`，`Vue` 默认会在渲染的过程中直接创建一个渲染 `watcher`，这个 `watcher` 里面东西特别多，先捡初始化的部分说（就是我能看懂的地方）

**通过调用`pushTarget`将当前的 `watcher` 实例赋值给 `Dep.target`，然后调用实例化 `watcher` 时传入的更新方法 `updateComponent` 也就是 `vm._update()`这个方法是用于渲染的，渲染的过程中肯定会读取 `data` 中的数据，这时就会触发了当前读取数据的 `get` 方法，而此时的 `Dep.target` 是当前的这个 `watcher`，这时就是上面的将 `dep` 存到 `watcher` 的 `deps` 中，将 `watcher` 存放到 `dep` 的 `subs` 中，这也是一个收集依赖的过程 然后 `set` 的时候调用的方法就会触发更新触发更新的过程中就会有 `nextTick` 的逻辑**

预知后事如何请看下回分解，今天眼睛太累了。不写了，估计一般人也看不下去这篇文章，我也是对着源码写的，看的话建议你也对着源码看

### Vue 的模板编译原理

1. 先把模板代码转换为 ast 语法树 （1）`parser` 解析 （正则）
2. 标记静态树（这一步属于提升性能，将不会变化的节点标记出来，比对的时候可以直接忽略掉） （2）树的遍历 `markup`
3. 通过 ast 语法树 生成 `render`函数 （3） `codegen`

## git actions test

用于测试 git actions 部署成功的废话~
