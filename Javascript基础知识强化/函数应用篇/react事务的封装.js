// react 事务的改变: 可以在前面和后面同时增加方法
// 开始的时候做某件事  结束的时候再做某件事
// 发布订阅的应用
const perform = (anymethod, wrappers) => {
  wrappers.forEach(wrap => {
    wrap.initilizae();
  });
  anymethod();
  wrappers.forEach(wrap => {
    wrap.close();
  });
};

perform(() => {
  console.log("核心功能");
}, [
  {
    initilizae() {
      console.log("开始时1");
    },
    close() {
      console.log("结束时1");
    }
  },
  {
    initilizae() {
      console.log("开始时2");
    },
    close() {
      console.log("结束时2");
    }
  }
]);
