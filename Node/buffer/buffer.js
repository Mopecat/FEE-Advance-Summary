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
// 3) buffer的扩展方法
