// 发布订阅模块 用法
let EventEmitter = require("./eventsCode");
let util = require("util");
let events = new EventEmitter();
// 订阅事件
events.on("提了个问题", function (whosaid) {
  console.log(whosaid + ": 你喜欢我嘛？喵~");
});
events.on("提了个问题", function (whosaid) {
  console.log(whosaid + ": Do you love me？喵~");
});
// 发布事件
events.emit("提了个问题", "九儿说：");

// 但是一般情况下 我们会用一个自己的子类来继承 events 类 也方便我们自己处理
function MyEvents() { }
util.inherits(MyEvents, EventEmitter);

let myevents = new MyEvents();
// 监听on事件的触发
myevents.on("newListener", type => {
  console.log(type);
  // on一次执行 执行一遍下面的发布 也就是on了两次 会执行两遍emit
  process.nextTick(() => {
    myevents.emit("九儿");
  });
});

myevents.once("九儿", () => {
  console.log("喵");
});
myevents.once("九儿", () => {
  console.log("喵喵");
});
