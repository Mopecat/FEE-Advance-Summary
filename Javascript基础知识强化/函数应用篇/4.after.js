// 在调用n次之后再执行
// after可以生成新的函数  等待函数执行次数达到我的预期时执行
const after = (times, fn) => () => --times === 0 && fn();

const newAfter = after(3, () => {
  console.log("调用三次后执行");
});

newAfter();
newAfter();
newAfter();

// 用上面这种方式可以优雅的处理node的并发问题 先看一下不优雅的方式
const fs = require("fs");
let info = {};
let index = 0;
function out() {
  if (index === 2) {
    console.log("很low的", info);
  }
}
fs.readFile("name.txt", "utf8", (err, data) => {
  info["name"] = data;
  index++;
  out();
});
fs.readFile("age.txt", "utf8", (err, data) => {
  info["age"] = data;
  index++;
  out();
});
// 优雅的实现方式
let afterInfo = {};
const outAfter = after(2, () => console.log("优雅的", afterInfo));
fs.readFile("name.txt", "utf8", (err, data) => {
  afterInfo["name"] = data;
  outAfter();
});
fs.readFile("age.txt", "utf8", (err, data) => {
  afterInfo["age"] = data;
  outAfter();
});

// 用发布订阅的方式实现
// 用on订阅，emit来发布实现
let e = {
  arr: [],
  on(fn) {
    this.arr.push(fn);
  },
  emit() {
    this.arr.forEach(fn => fn());
  }
};
let infoOnEmit = {};
e.on(() => {
  console.log("ok");
});
e.on(() => {
  if (Object.keys(infoOnEmit).length === 1) {
    console.log("这个订阅会在length为1的时候发布");
  }
});
e.on(() => {
  if (Object.keys(infoOnEmit).length === 2) {
    console.log("发布订阅实现", infoOnEmit);
  }
});
fs.readFile("name.txt", "utf8", (err, data) => {
  infoOnEmit["name"] = data;
  e.emit();
});
fs.readFile("age.txt", "utf8", (err, data) => {
  infoOnEmit["age"] = data;
  e.emit();
});
