### let const

用 `let` 声明的变量会绑定到当前作用域，用 `let` 声明变量可以保证代码命名不重复

`const`声明的变量不能更改(对象等不能改变类型，可以改变对象属性)

**一般我们尽可能用`const`，如果这个值需要改变，我们再使用`let`**

### 解构赋值

展开运算符 `...` 常用于合并数组或对象

剩余运算符 `...` （要放在最后面）

**解构的方式都是根据 key 来实现的** (这句是重点)

对象的话修改 key 对应的变量名称用 `:` （这个东西叫冒号） 如果没有对应的属性可以直接设置默认值

更多代码示例，点击[这里][1]

### set 和 map

`set` 和 `map`是`es6`中的新的数据类型

上面都有一下增删改查清空的方法，区别的话 `set`是`add`, `map`是`set`、`get` 还有对应`Object`的差不多功能方法 `set.keys()`、`set.values()` 、`set.entries()`

特点: **不能放重复项** (数组去重什么的简直不要太方便)

对应的还有弱保持类型 `WeakSet` 和 `WeakMap`

`WeakSet`: 对象是一些对象值的集合, 并且其中的每个对象值都只能出现一次. 与 set 的区别主要有一下两点

- `WeakSet` 对象中只能存放对象引用, 不能存放值, 而 `Set` 对象都可以.
- `WeakSet` 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, `WeakSet` 对象是无法被枚举的, 没有办法拿到它包含的所有元素.

`WeakMap`: 原生的 `WeakMap` 持有的是每个键或值对象的“弱引用”，这意味着在没有其他引用存在时垃圾回收能正确进行, `WeakMap` 的 `key` 也是不可枚举的

更多代码示例，点击[这里][2]

### class

涉及面试题

- 怎么去用 `es5` 来模拟 `es6` 中的 `class`
- new 的原理

`es5` 中没有类，用构造函数模拟类。`es5` 中的类可以当做函数来调用，`es6` 中不行

### generator

生成器 生成迭代器的 （**很快就被 async+await 取代掉了，但是相对来讲更加灵活**）

应用实例: `redux-saga`

用法：生成器函数上加 `*` 函数中 关键字 `yield`可以暂停执行，返回值是迭代器 `iterator`可以通过 `iterator.next()`返回对象及当前执行状态类似于这种`{value: 11, done: false}`

更多代码示例，点击[这里][3]

[1]: https://github.com/Mopecat/FEE-Advance-Summary/tree/master/Javascript%E5%BC%BA%E5%8C%96/ES6%2B/解构赋值.js
[2]: https://github.com/Mopecat/FEE-Advance-Summary/tree/master/Javascript%E5%BC%BA%E5%8C%96/ES6%2B/set+map.js
[3]: https://github.com/Mopecat/FEE-Advance-Summary/tree/master/Javascript%E5%BC%BA%E5%8C%96/ES6%2B/generator.js
