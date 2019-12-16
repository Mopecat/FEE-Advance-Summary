### Node 核心模块

（node 自带的模块）

- `util`模块

  - `promisify` 将`function`转换成`promise`
  - `inherits` 继承公共属性
  - `inspect` 可以显示隐藏属性
  - `isDate`,`isNumber`，`isPrimitive`（判断是否是原始数据类型的）等各种判断方法

- `events` 模块

  - `on` 订阅 用法：`.on('eventsName',callback)`
  - `emit` 发布 用法： `.emit('eventsName',...args)`
  - `off` 删除订阅 用法同 `on`
  - `once` 订阅后只执行一次 用法同`on`

- `Buffer`模块 [链接][1]

- `fs` 模块 [链接][2]

[1]: ./buffer
[2]: ./fs
