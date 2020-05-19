Function.prototype.mapply = function(context, args) {
  if (typeof context === "object" || typeof context === "function") {
    context = context || window;
  } else {
    context = Object.create(null);
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

function getValue(bb, cc) {
  console.log(this.aa, bb, cc);
}

const obj = {
  aa: "hello world",
};
getValue.mapply(obj, ["bb", "cc"]);
