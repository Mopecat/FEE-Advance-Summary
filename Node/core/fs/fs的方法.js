// fs 操作文件 的一些方法
const fs = require("fs");
const path = require("path");

// 删除文件 
// 深度 先序 串联递归
function preDeep(dirs, callback) {
  // 首先判断dirs的类型 如果是文件 则直接删除，如果是文件夹则继续读 有儿子先删除儿子
  fs.stat(dirs, function (err, statObj) {
    if (statObj.isFile()) {
      fs.unlink(dirs, callback)
    } else {
      fs.readdir(dirs, function (err, files) {
        //   [ '/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/a/1.js',
        // '/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/a/b',
        // '/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/Users/tjuser/Documents/github/FEE-Advance-Summary/Node/core/fs/a/d' ]
        files = files.map(item => path.join(dirs, item))
        let index = 0;
        function next() {
          // 全都删除完了 再删除 dirs自己
          if (index === files.length) return fs.rmdir(dirs, callback)
          let dir = files[index++]
          // 删除当前第一个儿子 成功后删除第二个儿子
          preDeep(dir, next)
        }
        next()
      })
    }
  })
}

// 并行删除
function preDeep(dirs, callback) {
  fs.stat(dirs, function (err, statObj) {
    if (statObj.isFile()) {
      fs.unlink(dirs, callback)
    } else {
      fs.readdir(dirs, function (err, files) {
        files = files.map(item => path.join(dirs, item))
        // 如果没有儿子节点 直接将自己删除掉即可
        if (files.length === 0) {
          return fs.rmdir(dirs, callback)
        }
        let index = 0;
        function done() {
          // 如果删除的儿子数量 和自己的index相等说明儿子都删除完毕了
          if (++index === files.length) {
            return fs.rmdir(dirs, callback)
          }
        }
        files.forEach(file => {
          preDeep(file, done)
        })
      })
    }
  })
}


// 只要是异步的最后都要改变成promise/ async + await 
// promise版本
function preDeep(dirs) {
  return new Promise((resolve, reject) => {
    fs.stat(dirs, function (err, statObj) {
      if (statObj.isFile()) {
        fs.unlink(dirs, resolve)
      } else {
        fs.readdir(dirs, function (err, files) {
          files = files.map(item => preDeep(path.join(dirs, item)))
          Promise.all(files).then(() => {
            fs.rmdir(dirs, resolve)
          })
        })
      }
    })
  })
}



// async + await 这个就很好了
const { unlink, stat, readdir, rmdir } = require('fs').promises
async function preDeep(dir) {
  let statObj = await stat(dir)
  if (statObj.isFile()) {
    await unlink(dir)
  } else {
    let files = await readdir(dir)
    files = files.map(item => preDeep(path.join(dir, item)))
    await Promise.all(files)
    await rmdir(dir)
  }
}

preDeep(path.resolve(__dirname, 'a')).then(function () {
  console.log('删除成功了')
})

// 广度遍历 
function wide(dir) {
  let arr = [dir] // 一个数组（队列）
  let index = 0 // 一个指针
  let current  // 一个当前项
  while (current = arr[index++]) {
    let files = fs.readdirSync(current)
    files = files.map(item => path.join(current, item))
    arr = [...arr, ...files]
  }
  console.log(arr)
  // 然后循环删除arr 从后面往前删
}

wide(path.resolve(__dirname, 'a'))