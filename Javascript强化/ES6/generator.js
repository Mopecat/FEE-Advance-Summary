// 生成器 生成迭代器的 => es6 （很快就被async+await取代掉了，但是相对来讲更加灵活）

// 用法 * 生成器函数 ，返回值叫迭代器
function* read() {
  yield 1;
  yield 2;
  yield 3;
}
// iterator 迭代器
let it = read();
console.log(it.next()); // {value: 1, done: false} done表示没有结束 不停地next执行下去

// 将类数组转化为数组
// 类数组的定义: 1.索引 2、长度
function add() {
  console.log([
    ...{
      0: 1,
      1: 2,
      2: 3,
      length: 3,
      // 生成器函数实现 返回的就是迭代器
      [Symbol.iterator]: function*() {
        let index = 0;
        while (index !== this.length) {
          yield this[index++];
        }
      }
      // 迭代器实现
      // [Symbol.iterator]() {
      //   let len = this.length;
      //   let index = 0;
      //   // 迭代器是有next方法 而且方法执行后需要返回value,done
      //   return {
      //     next: () => {
      //       return { value: this[index++], done: index === len + 1 };
      //     }
      //   };
      // }
    }
  ]);
}
add(1, 2, 3, 4, 5);
// 延伸面试题 ...和Array.from有什么区别: ...所展开的对象，类数组，数组等必须有迭代器方法

function* read1() {
  let a = yield 1;
  console.log("a", a);
  let b = yield 2; // 这里的返回值是上一次调用next传入的参数
  console.log("b", b);
  let c = yield 3;
  console.log("c", c);
}
let it1 = read1();
console.log(it1.next()); // 第一次传入的参数毫无意义
console.log(it1.next()); // a,undefined
console.log(it1.next(100)); // b, 100
