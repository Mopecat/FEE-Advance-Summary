const EventEmitter = require("events");
const fs = require("fs");
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super();
    // 默认参数的赋值
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || false;
    this.start = options.start || 0;
    this.end = options.end;

    this.flowing = null; // 默认是暂停模式
    this.offset = 0; // 偏移量
    this.open(); // 打开文件，当创建可读流的时候就创建
    this.on("newListener", type => {
      if (type === "data") {
        this.flowing = true;
        this.read();
      }
    });
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd;
      this.emit("open", this.fd);
    });
  }
  read() {
    if (typeof this.fd !== "number") {
      // 因为read比open先调用，所以第一次进入read时并没有fd 所以绑定一个事件，当触发了open时再次调用read 这时就有fd了
      return this.once("open", this.read);
    }
    // 总计应该读多少个
    let howMuchToRead = this.end
      ? Math.min(this.highWaterMark, this.end - this.start + 1 - this.offset)
      : this.highWaterMark;
    let buffer = Buffer.alloc(howMuchToRead);
    fs.read(
      this.fd,
      buffer,
      0,
      howMuchToRead,
      this.offset,
      (err, bytesRead) => {
        this.offset += bytesRead;
        if (bytesRead > 0) {
          // 如果读取到内容了 触发data
          this.emit("data", buffer.slice(0, bytesRead));
          this.flowing && this.read();
        } else {
          this.emit("end");
          this.close();
        }
      }
    );
  }
  close() {
    if (this.autoClose) {
      fs.close(this.fd, () => {
        this.emit("close", this.fd);
      });
    }
  }
  pause() {
    this.flowing = false;
  }
  resume() {
    this.flowing = true;
    this.read();
  }
  pipe(ws) {
    this.on("data", chunk => {
      let flag = ws.write(chunk);
      if (!flag) {
        this.pause();
      }
    });
    ws.on("drain", () => {
      this.resume();
    });
  }
}

module.exports = ReadStream;
