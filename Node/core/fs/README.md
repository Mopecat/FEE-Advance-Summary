## fs

`file system` 可以在服务器端读取文件和数据 方法是同步和异步共存

- 同步方法容易使用，（刚开始运行时用）
- 异步方法不会阻塞主线程（运行起来后用异步）

## 文件的操作

操作文件 的一些方法

特点就是带`Sync`的就是同步的

- 文件的读写

  读取的文件不存在,会报错，写入的文件不存在,会创建文件

  - `fs.readFile()` 异步的
  - `fs.readFileSync()` 同步的
  - `fs.writeFile()` 异步的
  - `fs.writeFileSync()` 同步的

  ```javascript
  fs.readFile(path.resolve(__dirname, "小宇.txt"), (err, data) => {
    if (err) {
      console.log(err);
    }
    fs.writeFile(
      path.resolve(__dirname, "小宇.txt"),
      data + "\r\n比方说当我遇见你",
      (err, data) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
  ```

  > 原理是：把文件中的内容全部读取到内存中，然后再把内存中所有的内容写入到文件中，如果文件很大，会造成内存的浪费。性能很不好，解决方式是读一点写一点,标准是 64K 以下的文件用上述的方式,64K 以上的用读一点写一点，手动按照字节来读取 fs.open fs.read fs.write fs.close

[代码][1]

- `fs.rename()` 重命名

```javascript
fs.rename(
  path.resolve(__dirname, "小宇1.txt"),
  path.resolve(__dirname, "rename小宇1.txt"),
  function(err) {}
);
```

- 判断文件是否存在

```javascript
fs.existsSync(path); // 同步的
fs.access(path, mode, callback); // 异步的
```

- 复制文件

先全部读完再写 会淹没内存

```javascript
fs.copyFile(src, path, calback);
```

## 文件夹的操作

- 创建目录

```javascript
fs.mkdirSync(); // 创建目录，创建子目录时要保证父目录存在 不然会报错
```

> 写一个嵌套类型的创建文件夹的方法 （异步的）

```javascript
function mkdir(paths, callback) {
  paths = paths.split("/");
  let index = 1;
  function next() {
    // 说明已经都创建完了 就可以执行回调函数了
    if (index === paths.length + 1) return callback();
    // 拿到当前要创建目录地址
    let dirPath = paths.slice(0, index++).join("/");
    // 判断一下是否存在，不存在就创建一个 然后继续next
    fs.access(dirPath, function(err) {
      if (err) {
        fs.mkdir(path.resolve(__dirname, dirPath), next);
      } else {
        next();
      }
    });
  }
  next();
}

mkdir("a/b/c/d/e/f", () => {
  console.log("创建完成");
});
```

- 读取目录

```javascript
fs.readdir(path, callback); // 读取文件
```

- 判断文件夹状态

可检查文件类型 官网上说 如果要检查文件是否存在但随后并不对其进行操作，则建议使用 fs.access()。

```javascript
fs.stat(path, function(err, statObj) {
  // 判断是是否是文件 还有isDir()
  if (statObj.isFile()) {
  }
});
```

- 删除目录

```javascript
fs.rmdir(path, callback); // 如果目录下有东西就不能删除
```

> 写删除目录要用递归删除 要一步一步判断当前目录下是否有文件或文件夹

本次实例写了

- 深度先序的串联删除（性能不高）
- 深度先序的并行删除（性能高）原始版本 => `Promise`版本 => `async + await` 版本
- 广度删除（性能一般）

[示例代码][2]

## 可读流

应用发布订阅实现`fs`的写法的解耦

- [用法实例][3]

- [可读流代码原理][4]

[1]: ./fs.js
[2]: ./fs的方法.js
[3]: ./stream/stream.js
[4]: ./stream/ReadStream.js
