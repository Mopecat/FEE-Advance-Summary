// 基础类型 boolean
let isDone: boolean = true;

// 基础类型 number
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;

// 基础类型 string
let name1: string = "Mopecat";

let age: number = 18;

let sentence = `Hello, my name is ${name1} 

I'm ${age} year old forever`;

// 数组类型定义
let list: number[] = [1, 2, 3]; // 表示数组的所有元素都是数字
// 另一种写法
let list1: Array<number> = [2, 3, 4];

// 元组
let x: [string, number]; // 表示第一个元素是字符串，第二个元素是数字
x = ["123", 123];

// 枚举类型
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;

console.log(c); // 1

let colorName: string = Color[2]; // 可以支持反查

console.log(colorName); // "blue";

// any 类型 不确定 可以修改类型
let notSure: any = 4;

// void 类型 用在不返回任何值函数的函数
function warningUser(): void {
  console.log("This is my warning message");
}

// never 一般用于抛出错误 或者无限循环
function error(message: string): never {
  throw new Error(message);
}
function fail() {
  return error("someting is failed");
}

function inifiniteLoop(): never {
  while (true) {}
}

// object 类型
declare function create(o: object | null): void;

create({ prop: 11 });
create(null);

// 强制转换类型
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // 第一种方式
let strLength1: number = (someValue as string).length; // 第二种方式 推荐
