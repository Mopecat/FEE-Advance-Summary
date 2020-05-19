# 手写 API

虽然我们知道这东西怎么用就足够了，但是呢，为了应付面试也好，就当充实自己也好，这里单开出一个目录来写写。

## call 的实现

这个东西的实现原理其实就是在传入的第一个参数上加一个`fn`这个`fn`就是调用 call 的那个`function`也就是下面代码中的`getValue`

<<< @/docs/chapter3/API/js/call.js

## apply 的实现

跟上面的`call`同样的道理实现`apply`也就很简单了

<<< @/docs/chapter3/API/js/apply.js

## bind 实现

`bind`说法比较多，看这吧，反正都是自己写的。https://github.com/Mopecat/Daily-Mission-Board/issues/2
