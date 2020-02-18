const Koa = require("./mykoa/aplication");

let app = new Koa();

app.use(ctx => {
  console.log(ctx.req.url);
  console.log(ctx.request.req.url);

  // 自己封装的
  console.log(ctx.request.url);
  console.log(ctx.url);
  console.log(ctx.method);
});

app.listen(5000);
