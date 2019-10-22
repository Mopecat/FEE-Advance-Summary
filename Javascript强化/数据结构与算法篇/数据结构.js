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
// 单向链表
// 对比图上 每一个node节点上有element元素和next指针
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  insert(position, element) {
    let node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let index = 0; // 从0项开始查找
      let current = this.head; // 先把链表的头拿出来
      let previous = null;
      while (index++ < position) {
        previous = current;
        // 如果插入的位置还没有元素将current赋值为null后面用来抛出错误
        current ? (current = current.next) : (current = null);
      }
      if (!current) {
        throw new Error(`当前链表没有第${position}项`);
      }
      // 当插入到第0个时也就是第一个，previous为null，因为前面没有节点了 所以需要处理一下
      previous ? (previous.next = node) : (this.head = node);

      node.next = current;
    }
    this.length++;
  }

  append(element) {
    let node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let index = 0; // 从0项开始查找
      let current = this.head; // 先把链表的头拿出来
      // 从头开始查找，直到找到最后一项，让最后一项的next指向当前append的node
      while (++index < this.length) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }
}
let ll = new LinkList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.insert(0, 100);
ll.insert(5, 400);
console.log(JSON.stringify(ll));
