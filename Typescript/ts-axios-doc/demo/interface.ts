import { pipeline } from "stream";

interface Square {
  color: string;
  area: number;
}
// 可选属性
interface SquareConfig {
  color?: string;
  area?: number;
  [propName: string]: any;
}

function createSquare(config: SquareConfig): Square {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.area) {
    newSquare.area = config.area;
  }
  return newSquare;
}
let mySquare = createSquare({ color: "black" });

//  只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 10 };

// p1.x = 5; // Cannot assign to 'x' because it is a read-only property.

// 函数类型
interface SearchFunc {
  // (参数1：类型，参数2：类型……)：返回值类型
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function(source: string, substring: string): boolean {
  let result = source.search(substring);
  return result > -1;
};

// 可索引类型
interface StringArray {
  [index: number]: string;
}
let myArray: StringArray;

myArray = ["Bob", "shara"];

let myStr = myArray["0"]; // 数字索引是字符串索引的子类型，上面写的是数字类型的索引但是用字符串依然可以拿到
console.log(myStr);

// 类类型
// 类类型只会检查实例属性 不会检查静态属性（包括constructor）
// interface ClockInterface {
//   currentTime: Date;
//   setTime(d: Date);
// }

// class Clock implements ClockInterface {
//   currentTime: Date;
//   setTime(d: Date) {
//     this.currentTime = d;
//   }
// }

// 构造器接口用法
interface ClockInterface {
  tick();
}

interface ClockContructor {
  new (hour: number, minute: number): ClockInterface;
}
function createClock(
  contructor: ClockContructor,
  hour: number,
  minute: number
): ClockInterface {
  return new contructor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 接口继承
