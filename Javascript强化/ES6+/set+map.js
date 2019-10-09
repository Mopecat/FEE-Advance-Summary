// set 和 map是es6中的新的数据类型 特点 不能放重复项

let set = new Set([1, 2, 3, 4, 4, 1, 2, 3, 4]);
console.log(set); // 没有key属性
set.add(6); // 添加方法
// set.clear(); // 清空方法
// set.delete(2); // 删除某一项
// 下面这几个方法跟Object.keys/ Object.values/ Object.entries 功能上差不多
console.log(set.keys());
console.log(set.values());
console.log(set.entries()); // [value, value] 形式的数组 分别对应着keys和values
// set 可以被迭代 即 set有Symbol.iterator
set.forEach(item => console.log(item));

set.has(1); // 判断set中是否有1

let a1 = [1, 2, 3];
let a2 = [1, 2, 3, 4, 5, 6];
// 数组并集去重
let arrbing = [...new Set([...a1, ...a2])];
console.log(arrbing);

// 数组取交集
let s1 = new Set(a1);
let s2 = new Set(a2);
let arrjiao = [...s2].filter(item => s1.has(item));
console.log(arrjiao);

// 数组取差集
let s3 = new Set(a1);
let s4 = new Set(a2);
let arrcha = [...s4].filter(item => !s3.has(item));
console.log(arrcha);

// map和set的用法基本一致，会有内存泄漏的问题，如下面的例子
class Example {
  constructor(a) {
    this.a = a;
  }
}
let a = new Example();
let newMap = new Map([a, 1]); // 一个对应key 一个对应value
a = null; // 即使a被释放 内存中仍然存在Example这个类 可以将这部分代码放在一个html中打开用memory拍一个快照搜索一下
// 上述这种情况可以通过WeakMap来解决  即 当map的引用源对象被释放 那么map的引用也被释放

// 深拷贝 应用了weakMap
// 如果对于对象来讲 ...展开运算符只是展开一层，如果是多层对象就不是很实用了  =>  是浅拷贝  功能跟Object.assign一样
let info1 = {
  name: "Mopecat",
  age: "forever18",
  detail: { tall: 190, body: "strong", face: "老好看了" }
};
let info2 = { hobby: "篮个球", detail: { face: "男神啊我的天" } };
let newObj = { ...info1, ...info2 };
console.log(newObj); // detail 被覆盖了

// 那么什么是深拷贝呢？  就是拷贝出来的结果和以前没有关系
// 如何实现深拷贝呢？
newObj = JSON.parse(JSON.stringify(newObj)); // 一般这样实现，但是这样有一定缺点，什么缺点呢： 只能实现json格式的深拷贝 什么意思呢 ，不能有fucntion,不能有undefined,不能有正则

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
