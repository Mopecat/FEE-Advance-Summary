Function.prototype.mbind = function(context) {
  const me = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const F = function() {};
  F.prototype = me.prototype;
  const bound = function() {
    const innerArgs = Array.prototype.slice.call(arguments);
    const finalArgs = args.concat(innerArgs);
    return me.apply(this instanceof F ? this : context || this, finalArgs);
  };
  bound.prototype = new F();
  return bound;
};
