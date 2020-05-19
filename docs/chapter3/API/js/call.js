Function.prototype.mcall = function(context) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  context.fn = this; // this 就是 getValue
  const args = [...arguments].slice(1);
  const result = context.fn(...args); // 调用getValue(...args)
  delete context.fn; // 用完了就删掉
  return result;
};

function getValue(bb, cc) {
  console.log(this, this.aa, bb, cc);
}

let obj = {
  aa: "hello world",
};
getValue.mcall(obj, "bb", "cc");
