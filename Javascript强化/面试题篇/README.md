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

2. `Promise.try` 这个方法原生里没有 **既能捕获同步异常也能捕获异步异常**

```
// 写一个方法 一个方法里能会throw err的同步异常，也可能是返回promise的异步异常，同步的可以用try-catch捕获，promise的要用then/catch捕获，但是我们不确定这个函数是同步错误还是异步错误，所以需要，Promise.try这个方法。下面你是实现方式
function fn(){}
```

3. `Promise.race`的实现 谁快用谁

```
let p1= new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('p1')
  },1000)
})
let p2= new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('p2')
  },2000)
})

Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for(let i = 0;i<promises.length;i++){
      promises[i].then((resolve,reject))
    }
  })
}
Promise.race([p1,p2]).then(data=>{ console.log(data) })
```

4. `Promise`有哪些优缺点？

优点： 1.可以解决异步并发问题 Promise.all 2.链式调用
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

6. 如何放弃某个 `promise` 执行结果

```
function wrap(p1){
  let fail = null;
  let p2 = new Promise((resolve,reject)=>{
    fail = reject // 先将p2的失败方法暴露出来
  })
  let p = Promise.race([p2,p1]); // race方法返回的也是一个promise
  p.abort = fail;
  return p
}
let p = wrap(new Promise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('啥都行 反正放弃这个结果了')
  },3000)
})
p.abort('调用abort放弃结果')
p.then(data=>{
  console.log(data)
}).catch(err=>{console.log(err)})
```

7. 怎么用 `es5` 来模拟 `es6` 中的 `class`
8. `new`的原理
