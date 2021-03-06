function EventEmitter() {
  // 用Object.create(null)创建空对象的方式与直接字面量方式{}的区别是：{}这种方式会有__proto__上面有很多属性
  this._events = Object.create(null);
}

EventEmitter.prototype.on = function (eventName, callback) {
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

EventEmitter.prototype.emit = function (eventName, ...args) {
  if (this._events[eventName]) {
    this._events[eventName].forEach(fn => {
      fn(...args);
    });
  }
};

EventEmitter.prototype.once = function (eventName, callback) {
  // 用one代替callback 在执行了callback之后 删除callback 由此实现了只执行一次
  let one = () => {
    callback();
    this.off(eventName, one) // 下面on的是one所以这里off的应该也是one
  }
  // 如果手动off了 那么传入off的callback跟one肯定是不相等的 所以将callback赋值给one的自定义属性，用于在off中判断
  one.l = callback
  this.on(eventName, one)
}
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events[eventName]) {
    this._events[eventName] = this._events[eventName].filter(fn => {
      // 返回false的会被过滤掉
      return fn !== callback && fn.l !== callback
    })
  }
};
module.exports = EventEmitter;
