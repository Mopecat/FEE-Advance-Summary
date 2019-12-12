const fs = require("fs");
const path = require("path");

const r = fs.readFileSync(path.resolve(__dirname, "a.txt"));

console.log(r); // 十六进制的
// 默认文件的读取操作，读出来的就是buffer
// 内存的表示方式就是buffer 内存是二进制的
// 典型的进制转换问题 0.1 + 0.2 != 0.3
// 0.1 转换为二进制 0.0001100110011001100110011001101 无限循环的，所以最后进了一位 0.2也是一个无限循环的 也得进一位 所以最后相加大于 0.3
// 小数转换为二进制  *2取整法
// 0.1 * 2 = 0.2 => 0 (小于1都是0)
// 0.2 * 2 = 0.4 => 0
// 0.4 * 2 = 0.8 => 0
// 0.8 * 2 = 1.6 => 1 (大于1就删除1继续乘)
// 0.6 * 2 = 1.2 => 1
// 0.2 * 2 = 0.4 => 0
// 0.4 * 2 = 0.8 => 0  // 再往后就无线循环了
// base 64不能加密 只是进制的转换
console.log(Buffer.from("九")); // e4 b9 9d 得到三个十六进制数
// 把他们转换为二进制
console.log((0xe4).toString(2)); // 11100100
console.log((0xb9).toString(2)); // 10111001
console.log((0x9d).toString(2)); // 10011101

// 二进制最长为8位 也就是一个位最大是2**8 - 1 = 255
// 上述的三个二进制 11100100 10111001 10011101 也就是 3*8 = 4*6
// 也就是拆成这个样子 111001 001011 100110 011101
// 然后读一下
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
str += str.toLowerCase();
str += "0123456789+/";
console.log(str);
let result = str[0b111001] + str[0b001011] + str[0b100110] + str[0b011101];
console.log(result);

// base64就是编码转化，不需要发送http请求，大小回比以前大
console.log(Buffer.from("九").toString("base64")); // 证实原理没错

// Buffer
// 把二进制表现成十进制，并且可以直接转换成字符串（toString）
// 1) buffer的声明方式（内存不可扩展，比如你买了1G的内存条，那你肯定不能用超过1G）
let buf = Buffer.alloc(5); // 出来的结果很像数组
let buf1 = Buffer.allocUnsafe(5); // 随机拿刚释放的内存，速度很快，但不安全
buf1.fill(0); // allocUnsafe + fill(0) = alloc
let buf2 = Buffer.from([100, 2, 3]); // 不常用，
let buf3 = Buffer.from("九儿"); // 比较常见
console.log(buf);
console.log(buf1);
console.log(buf2);
console.log(buf3);
// 2) buffer常见方法
// 和数组类似
let arr = [[1, 2, 3], 4, 5, 6]
let newArr = arr.slice(0)
newArr[0][1] = 100;
console.log(arr)  // arr 变化了 证明 数组的slice是浅拷贝

// buffer的slice方法也是浅拷贝
let buffer = Buffer.from('九儿')
let newBuffer = buffer.slice(0)
newBuffer[0] = 100
console.log(buffer)
// 判断buffer类型
console.log(Buffer.isBuffer(buffer))

// Buffer不能扩展大小但是可以用copy
// copy
let targetBuffer = Buffer.alloc(6)
let sourceBuffer1 = Buffer.from('九')
let sourceBuffer2 = Buffer.from('儿')
// 实现copy的源代码 
Buffer.prototype.copy = function (targetBuffer, targetStart, sourceStart = 0, sourceEnd = this.length) {
  for (let i = 0; i < sourceEnd - sourceStart; i++) {
    targetBuffer[i + targetStart] = this[i + sourceStart]
  }
}
// 源buffer.copy(目标buffer,目标buffer的起始位置,源buffer的起始位置,源buffer的结束位置)
sourceBuffer1.copy(targetBuffer, 0, 0, 3)
sourceBuffer2.copy(targetBuffer, 3, 0, 3)
console.log(targetBuffer.toString()) // 九儿

// concat 拼接 更常用一些 更好用一些
// concat 原理代码
Buffer.prototype.concat = function (list, length = list.reduce((a, b) => a + b.length, 0)) {
  // length如果没传就默认指list中所有的buffer的总长度 用reduce求和 完美
  let buffer = Buffer.alloc(length)
  let offset = 0
  list.forEach(b => {
    b.copy(buffer, offset)
    offset += b.length
  })
  return buffer
}
console.log(Buffer.concat([sourceBuffer1, sourceBuffer2, sourceBuffer2]).toString()) // 九儿儿

// indexOf
console.log(targetBuffer.indexOf('儿'))
// 3) buffer的扩展方法

Buffer.prototype.split = function (sep) {
  let len = Buffer.from(sep).length
  let offset = 0
  let current
  let result = []
  // 让当前的位置等于从offset开始找到的第一个sep 如果找到了就把从offset到current这一段放倒数组中 然后将offset 放当current加len的位置 再进行下一次的查找
  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current))
    offset = current + len
  }
  result.push(this.slice(offset)) // 把最后一段也push进去
  return result
}

let bufferSplit = Buffer.from(`九儿九儿九儿九儿
九儿九儿九儿九儿
九儿九儿九儿九儿`)
let re = bufferSplit.split('\n')
console.log(re) // 拿到了三段buffer
