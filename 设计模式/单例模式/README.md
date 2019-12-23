## 单例模式

在`javascript`中的单例模式就是，让一个类只有一个实例

首先我们知道可以通过一个类创建任意多个实例对象：

```javascript
class Single {}
const s1 = new Single();
const s2 = new Single();
console.log(s1 === s2); // false
```

两个实例之间没有任何关系，就是两个独立的对象，各占一块内存空间

单例模式想要做到的是，**不管我们尝试去创建多少次，它都只给你返回第一次所创建的那唯一的一个实例**。

所以我们就要构造函数**具备判断自己是否已经创建过一个实例**的能力

我们现在把这段判断逻辑写成一个静态方法(其实也可以直接写入构造函数的函数体里）：

```javascript
class Single {
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!SingleDog.instance) {
      // 若这个唯一的实例不存在，那么先创建它
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}
const s1 = Single.getInstance();
const s2 = Single.getInstance();
console.log(s1 === s2); // true
```

单例模式的典型应用 `Vuex` => 一个`Vue`实例 只能对应一个`Store`

为什么这么做呢？

Vue 中的组件是相互独立的，组件间的通信也很简单，但是组件非常多且嵌套层级很深，逻辑较为复杂的时候，这时如果还用原有的通信方式就会变得非常难以维护，很容易发生那种牵一发动全身的问题。`Vuex`就是为了解决这种场景出现，它的出现也大大增强了`Vue`的健壮性，不再是那个只能构建轻量型的应用的框架了。而他的做法就是把可以共享的数据放在全局，供组件们使用。为了能够让`Store`中的数据以一种可预测的方式发生变化，那么必然要保证`Store`中的数据的唯一性 => 单例模式的应用
