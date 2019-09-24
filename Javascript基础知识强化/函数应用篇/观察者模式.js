class Subject {
  constructor() {
    this.arr = [];
    this.state = "我不饿";
  }
  // 被观察者
  attach(o) {
    this.arr.push(o);
  }
  setState(newState) {
    this.state = newState;
    this.arr.forEach(o => o.update(newState));
  }
}

class Observer {
  // 观察者
  constructor(name) {
    this.name = name;
  }
  update(newState) {
    console.log(`${this.name}  知道了 九儿  ${newState}`);
  }
}

let o1 = new Observer("Mopecat");
let o2 = new Observer("Sean");
let s = new Subject("九儿");
s.attach(o1);
s.attach(o2);
s.setState("我又饿了");
