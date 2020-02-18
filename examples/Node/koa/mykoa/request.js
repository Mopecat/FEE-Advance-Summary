let request = {
  // 属性访问其， 这样可以处理复杂逻辑
  get url() {
    // this === ctx || this === ctx.request
    return this.req.url;
  },
  get method() {
    return this.req.method;
  }
};

module.exports = request;
