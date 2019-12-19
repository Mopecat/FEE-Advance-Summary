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
    this.len = 0;
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit("open", fd);
    });
  }
  // 用户会同步的调用write方法
  write() {
    // 用户调用write方法时，需要判断当前是否正在写入，如果正在写入，则将将要写入的放入缓存中,如果不是正在写入，就向文件里写入
    if (typeof this.fd === "number") {
      this.once();
    }
    console.log(this.fd);
  }
  end() {}
}

module.exports = WriteStream;
