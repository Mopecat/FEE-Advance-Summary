// 解构赋值 ...
// 解构的方式都是根据key来实现的
let arr = ["姓名", "年龄"];
let [, age] = arr;
console.log(age);

let { objName, objAge } = { objName: "Mopecat", objAge: "forever18" }; // 这里的两边的key要相同
console.log(objName, objAge);
// 如果想要修改变量名称 可以通过:来修改,如果没有对应属性的话 可以设置默认值
let { changeName: changed, noName = "我王*泽难道不配拥有姓名吗？" } = {
  changeName: "Feely"
};
console.log("修改了变量名称啊扑街", changed);
console.log("设置了默认值得变量", noName);

// 剩余运算符
// 示例只取出第一项剩下的还是一个数组 剩余运算符 ... 必须是最后一个元素 对象的用法相同
let [name1, ...args] = ["Mopecat", 18, "北京"];
console.log("取出的变量name1", name1);
console.log("剩下的还是一个数组args", args);

// 展开运算符 常用于合并数组或对象
let number = [1, 2, 3, 4];
console.log("展开后的number", ...number);
