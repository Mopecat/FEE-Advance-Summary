let fs = require("fs");

let templateStr = fs.readFileSync("./template1.html", "utf8");

// console.log(templateStr);

const render = (template, obj) => {
  return template.replace(/\{\{(.+?)\}\}/g, function() {
    return obj[arguments[1]];
  });
};
let obj = { name: "Feely", age: "forever 18" };
let r = render(templateStr, obj);
console.log(r);

// 模板引擎的实现原理 1）with 语法 2）new Function
let templateStr2 = fs.readFileSync("./template2.html", "utf8");
function render2(template, obj) {
  let head = 'let str = "";\r\n';
  head += "with(xxx){\r\n";
  let content = "str += `";
  template = template.replace(/\{\{(.+?)\}\}/g, function() {
    return "${" + arguments[1] + "}";
  });
  content += template.replace(/\<\%(.+?)\%\>/g, function() {
    return "`\r\n" + arguments[1] + "\r\nstr+=`";
  });
  let tail = "`\r\n}\r\nreturn str";
  let fn = new Function("xxx", head + content + tail);
  console.log(fn.toString());
  return fn(obj);
}
let r2 = render2(templateStr2, { arr: [1, 2, 3] });
console.log(r2);
