# Buffer

缓存区

`node` 中内存的表示方式 内存中是二进制的 但`Buffer`存储的是十六进制的

下文中所有的代码示例中 `Buffer`大写的表示就是直接要用`Buffer`调用的，说明方法是在类上，不在原型上; `buffer`小写的代表这个方法是用实例调用，在原型上。

## Buffer 的声明方式

内存是不可扩展，所以声明多少就是多少，比如你买了 1G 的内存条，那你肯定不能用超过 1G

- `Buffer.alloc(5)` 声明了一个内存长度为 5 的`Buffer`
- `Buffer.allocUnsafe(5)` 随机拿刚释放的内存，速度很快，但不安全
- `Buffer.from([100, 2, 3])` (不常用) 声明一个 Buffer 其中的内容是`100,2,3`(16 进制的也就是 `64,02,03`)
- `Buffer.from("九儿")` (常用方式) 将内容放到内存中

## Buffer 的常见方法

`Buffer`的数组存储看起来跟数组比较像，所以方法名字和类型也比较像（可以说差不多一样）

- `buffer.slice()` 截取
- `Buffer.isBuffer()` 判断 `Buffer` 类型
- `buffer.copy(targetBuffer, 0, 0, 3)` 复制 用法：`源buffer.copy(目标buffer,目标buffer的起始位置,源buffer的起始位置,源buffer的结束位置)`
- `Buffer.concat([buffer1,buffer2])` 拼接
- `buffer.indexOf('xx')` 判断是否存在 存在返回对应位置

相关代码例子和原理：

<<< @/docs/Node/core/buffer/buffer.js

## Buffer 的扩展方法

`split`跟字符串的用法一样，找到某个标识 然后分割成数组

原理代码如下：

```javascript
Buffer.prototype.split = function(sep) {
  let len = Buffer.from(sep).length;
  let offset = 0;
  let current;
  let result = [];
  // 让当前的位置等于从offset开始找到的第一个sep 如果找到了就把从offset到current这一段放倒数组中 然后将offset 放当current加len的位置 再进行下一次的查找
  while ((current = this.indexOf(sep, offset)) !== -1) {
    result.push(this.slice(offset, current));
    offset = current + len;
  }
  result.push(this.slice(offset)); // 把最后一段也push进去
  return result;
};

let bufferSplit = Buffer.from(`九儿九儿九儿九儿
九儿九儿九儿九儿
九儿九儿九儿九儿`);
let re = bufferSplit.split("\n");
console.log(re); // 拿到了三段buffer
```
