"use strict";
exports.__esModule = true;
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.area) {
        newSquare.area = config.area;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
var p1 = { x: 10, y: 10 };
var mySearch;
mySearch = function (source, substring) {
    var result = source.search(substring);
    return result > -1;
};
var myArray;
myArray = ["Bob", "shara"];
var myStr = myArray["0"]; // 数字索引是字符串索引的子类型，上面写的是数字类型的索引但是用字符串依然可以拿到
console.log(myStr);
