class ReadStream {
  constructor(path, options = {}) {
    // 默认参数的赋值
    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding || null;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.mode = options.mode || 438;
    this.autoClose = options.autoClose || false;
    this.start = options.start || 0;
    this.end = options.end;
  }
}

module.exports = ReadStream;
