console.log(this === module.exports);
// 全局对象中除了global所包括的 还有模块匿名函数的参数： module.exports,require,_dirname,_filename

// 打印global
(function() {
  // console.log(this);
  console.log(Object.keys(this));
})();

// process
// 判断当前平台
console.log(process.platform); // window => win32, Mac => darwin
// process.argv 代表用户传递的参数 默认前两个参数没什么意义
// ------执行文件的时候携带的参数 如执行 node index.js --port 3000 刨除前两项之后就是参数
console.log(process.argv.slice(2)); // 执行 node index.js --port 3000 --me forever18 => [ '--port', '3000', '--me', 'forever', '18' ]
// ------将返回的数组变为对象的键值对形式
let config = process.argv.slice(2).reduce((memo, current, index, arr) => {
  if (current.includes("--")) {
    memo[current.slice(2)] = arr[index + 1];
  }
  return memo;
}, {});
// console.log(config);
// -----上面的功能可以用commander来实现 是一个第三方库
const program = require("commander");
// -----chalk粉笔 优化展示打印信息
const chalk = require("chalk");
// 还可以创建一个命令
program
  .command("create")
  .alias("c")
  .description("create project")
  .action(() => {
    console.log("create project"); // 执行node index.js create => create project
  });
program
  .option("-p, --port <val>", "set port")
  .version("1.0.0")
  .on("--help", () => {
    // 相当于事件 监听某一个命令 当执行node index.js --help 将会打印下面信息
    console.log("\r\n例子：");
    console.log("  node index.js --help");
    console.log("  node index.js create => " + chalk.green("create project"));
  })
  .parse(process.argv);

console.log(program.port); // 执行node index.js --prot 3000 => 3000

// process.chdir process.cwd() => current working directory
// process.chdir("Node"); 将执行文件的目录更改 也就是说这里改到那里 下面打印的就是哪个目录 一般用不到
console.log(process.cwd()); // 在哪里执行这个文件 目录就是那里，代表的就是执行文件的目录 等同于 path.resolve解析出来一个绝对路径
// process.env 环境变量
console.log(process.env); // 可以根据环境变量的不同 执行不同的结果
// ----临时变量 Mac => export / windows => set  有一个第三方库 解决临时变量兼容问题 => cross-env 所谓临时变量就是说在执行目录下可以被访问到
//  --------- export a=1 && node index.js
// process.nextTick node中的微任务 执行优先级大于promise.then
