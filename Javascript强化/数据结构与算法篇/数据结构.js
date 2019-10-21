// js中常见的数据结构：队列、栈、链表、集合、hash表、树、图
// 队列（类似排队，先进先出，倒水的话就是管子）
class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(ele) {
    this.queue.push(ele);
  }
  dequeue() {
    this.queue.shift();
  }
}
let queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();
console.log(queue.queue);
// 栈 （类似喝水，先进后出，倒水的话就是水杯） 代码执行的时候的结构就是栈型结构，执行上下文栈，如下面的两个例子 (思考：什么是闭包？=> 就是执行上下文不销毁)
// 先调用a栈里面先放入a,然后是b,最后是c.出栈（也就是销毁函数）c先出，然后是b，最后是a
function a() {
  function b() {
    function c() {}
    c();
  }
  b();
}
a();
class Stack {
  constructor() {
    this.stack = [];
  }
  put(ele) {
    this.stack.push(ele);
  }
  pop() {
    this.stack.pop();
  }
}
let stack = new Stack();
stack.put(1);
stack.put(2);
stack.pop();
console.log(stack.stack);

// 链表 常见的链表：单向链表、双向链表、循环链表
// 操作数据不需要破坏数据的原有结构
// 单项链表
