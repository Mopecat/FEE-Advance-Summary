// 真实场景的用法
const fs = require("fs");
const path = require("path");

const rs = fs.createReadStream(path.resolve(__dirname, "1.txt"));

const ws = fs.createWriteStream(path.resolve(__dirname, "2.txt"));

rs.pipe(ws); // 默认会调用可写流的write方法，最终会调用end方法 是异步的

// 上面只是读文件的写法 但是其实还有不一定是文件的读写 也可以应用流的用法
// 有两个类 第一个类 ReadStream(_read),会把读取到的数据，调用push方法 传进去 ，Readable(read)
const { Readable, Writable } = require("stream");

class MyRead extends Readable {
  _read() {
    this.push("1"); // 来自父类的方法
    this.push(null); // 结束
  }
}

const myr = new MyRead();

myr.on("data", function(data) {
  console.log(data);
});

myr.on("end", function(data) {
  console.log("end");
});

class MyWrite extends Writable {
  _write(chunk, encoding, clearBuffer) {
    console.log(chunk, "------");
    clearBuffer();
  }
}

const myw = new MyWrite();
myw.write("123");
myw.write("123");
myw.write("123");
