import program from "commander";
import Server from "./server";

program.option("-p,--port <val>", "set http-server port").parse(process.argv);

let config = {
  port: 8080
};

Object.assign(config, program);
console.log(config.port);

// main.js是解析参数的
// 1）通过解析的参数启动一个服务
let server = new Server(config);

server.start();
