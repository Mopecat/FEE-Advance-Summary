// 反射 Reflect
// 有部分是对象的方法  放到了 Reflect上 功能是基本一致的 但是用起来更加的方便

let obj = {};
obj.name = "Mopecat";
// Reflect用法
Reflect.set(obj, "age", "forever18"); // 参数分别为 target(目标对象) key(属性名) value(值)

console.log("a" in { a: 1 });
console.log(Reflect.has({ a: 1 }, "a")); // 参数分别为 target(目标对象) key(属性名)
