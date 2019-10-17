1. `promise.finally` 的实现

```
Promise.prototype.finally = function(callback){
  return this.then((val)=>{
    // 等待finally中的函数执行完毕，继续执行，finally函数可能返还一个promise用Promise.resolve等待返回的promise执行完
    return Promise.resolve(callback().then(()=>val))
  },err=>{
    return Promise.resolve(callback().then(()=>{throw err}))
  })
}
Promise.reject().finally(()=>{
  console.log(1)
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{resolve()},1000)
  })
}).catch(e=>{
  console.log(e)
})
```

2. `Promise.try` 这个方法原生里没有
3. `Promise.race` 谁快用谁
4. `Promise`有哪些优缺点？

优点： 1.可以解决异步并发问题 2.链式调用
缺点： 1.还是基于回调函数 2. `promise` 无法终止 只能抛弃这次结果

5. 如何终止一个 `promise` 链

返回一个等待的 promise

```
let p = new Promise((resolve,reject)=>{
  resolve()
})
let p1 = p.then(()=>{
  console.log('ok')
  return new Promise(()=>{})
}).then(()=>{
  console.log(111)
})
```

6. new 的原理
7. 怎么用 `es5` 来模拟 `es6` 中的 `class`
