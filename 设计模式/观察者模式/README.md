### 观察者模式

> 观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

在观察者模式里，至少应该有两个关键角色是一定要出现的——发布者和订阅者。用面向对象的方式表达的话，那就是要有两个类。

发布者的类具备的基本功能：

- 增加订阅者
- 移除订阅者
- 通知订阅者

```javascript
class Publisher {
  constructor() {
    this.observers = [];
    console.log("Publisher is created");
  }
  add(observer) {
    this.observers.push(observer);
    console.log("add observer");
  }
  remove(observer) {
    this.observers.forEach((item, index) => {
      if (item === observer) {
        this.observers.splice(index, 1);
      }
    });
    console.log("remove observer");
  }
  notify() {
    console.log("notify observer");
    this.observers.forEach(item => {
      item.update(this);
    });
  }
}
```

订阅者的功能

- 被通知
- 去执行 （本质上是接受发布者的调用，这步我们在 `Publisher` 中已经做了）

既然我们在 `Publisher` 中做的是方法调用，那么我们在订阅者类里要做的就是方法的定义

```javascript
class Observer {
  constructor() {
    console.log("observer is created");
  }
  update(publish) {
    console.log("observer is notified");
  }
}
```
