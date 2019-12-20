const EventEmitter = require("events");
const fs = require("fs");

class WriteStream extends EventEmitter {
  constructor(path, options) {
    super();
    this.path = path;
    this.highWaterMark = options.highWaterMark || 16 * 1024;
    this.encoding = options.encoding || "utf8";
    this.start = options.start || 0;
    this.mode = options.mode || 0o666;
    this.flags = options.flags || "w";

    // 默认直接打开文件
    this.open();
    // 缓存区
    this.cache = [];
    // 判断是否是正在写入 类比flowing
    this.writing = false;
    this.len = 0; // 缓存区的大小
    this.needDrain = false // 是否Drain事件
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      console.log(fd)
      this.fd = fd;
      this.emit("open", fd);
    });
  }
  // 用户会同步的调用write方法
  write(chunk, encoding = this.encoding, callback = function () { }) {
    // 用户调用write方法时，需要判断当前是否正在写入，如果正在写入，则将将要写入的放入缓存中,如果不是正在写入，就向文件里写入
    // 1) 判断这个chunk是不是buffer 如果不是 则转换成buffer
    chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    this.len += chunk.length;
    let flag = this.len < this.highWaterMark; // 没写满
    this.needDrain = !flag; // 当前写入的内容大于等于highWaterMark才会触发Drain事件
    if (this.writing) {
      // 如果正在向文件中写入，则将当前的放入缓存中
      this.cache.push({
        chunk,
        encoding,
        callback
      })
    } else {
      this.writing = true; // 标识是否正在写入
      this._write(chunk, encoding, () => {
        callback && callback() // 先执行自己的成功操作
        this.clearBuffer() // 再去清空队列中的第一个
      }) // 真实的向文件中写入
    }
    return flag
  }
  // 核心的写入方法
  _write(chunk, encoding, clearBuffer) {
    if (typeof this.fd !== "number") {
      return this.once('open', () => this._write(chunk, encoding, clearBuffer));
    }
    console.log(this.fd);

  }
  end() { }
}

module.exports = WriteStream;
