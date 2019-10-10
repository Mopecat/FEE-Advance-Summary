// proxy 兼容性差
// 代理 可以创建一个代理帮我们干某些事
let obj = {
  a: 1,
  b: 2
};
let proxy = new Proxy(obj, {
  // 只能代理当前的对象obj 也就是一层
  get(target, key) {
    // return target[key];
    return Reflect.get(target, key); // 跟上一行等价
  },
  set(target, key, value) {
    console.log("更新视图", target, key, value);
    // target[key] = value;
    return Reflect.set(target, key, value); // 跟上一行等价
  }
});
proxy.c = 3;

console.log(obj);
// 如果是多层对象呢 该怎样实现代理呢 看下面的代码~
let obj1 = {
  a: { a: 122 },
  b: 2
};
let handler = {
  get(target, key) {
    if (typeof target[key] === "object" && target[key] !== null) {
      return new Proxy(target[key], handler);
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    console.log("更新");
    return Reflect.set(target, key, value);
  }
};
let proxy1 = new Proxy(obj1, handler);
proxy1.a.a = 1000;
console.log(obj1);
// 数组一样可以实现代理监控
let arr = [1, 2, 3, 4];
let proxyArr = new Proxy(arr, {
  get(target, key) {
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (key === "length") return true; // 如果操作会更改数组的length 比如push等 会触发两次set 一次更改 对应的key，一次修改length，所以屏蔽修改length触发的set
    console.log("更新");
    return Reflect.set(target, key, value);
  }
});
proxyArr.push(100);
console.log(arr);
