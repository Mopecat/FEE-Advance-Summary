"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

// 子类继承父类原型上的方法
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  // 关键代码 子类的原型指向父类的原型
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  // Tiger.__proto__ = Animal
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    // 如果有就用这个方法 没有自己写一个
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      // 关键代码
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _instanceof(left, right) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
// 创建类方法
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Animal =
  /*#__PURE__*/
  (function() {
    function Animal() {
      _classCallCheck(this, Animal);

      this.type = "哺乳类";
    }
    // 创建类
    _createClass(Animal, [
      {
        key: "say",
        value: function say() {
          console.log("say");
        }
      }
    ]);

    return Animal;
  })();

var Tiger =
  /*#__PURE__*/
  (function(_Animal) {
    _inherits(Tiger, _Animal); // 实现子类继承父类的原型上的方法

    function Tiger() {
      _classCallCheck(this, Tiger); // 判断this 看看是否是直接调用 Tiger() es6中不允许直接调用类

      return _possibleConstructorReturn(
        this,
        // _getPrototypeOf(Tiger) 去的是Tiger的链  也就是 Tiger.__proto__ 也就是 Animal
        // Animal.apply(this,arguments)  这里的this就是tiger 相当于是tiger继承Animal实例上的属性
        _getPrototypeOf(Tiger).apply(this, arguments)
      );
    }

    return Tiger;
  })(Animal);
