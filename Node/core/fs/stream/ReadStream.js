const EventEmitter = require('events')
const fs = require('fs')
class ReadStream extends EventEmitter {
  constructor(path, options = {}) {
    super()
    // 默认参数的赋值
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || false;
    this.start = options.start || 0;
    this.end = options.end;

    this.flowing = null // 默认是暂停模式
    this.open() // 打开文件，当创建可读流的时候就创建
    this.on('newListener', (type) => {
      if (type === 'data') {
        this.flowing = true
        this.read()
      }
    })
  }
  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      this.fd = fd
      this.emit('open', this.fd)
    })
  }
  read() {
    if (typeof this.fd !== 'number') {
      // 因为read比open先调用，所以第一次进入read时并没有fd 所以绑定一个事件，当触发了open时再次调用read 这时就有fd了
      return this.once('open', this.read)
    }
    console.log(this.fd)
  }
}

module.exports = ReadStream;
