// 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
// “基本思路”部分——getInstance方法和instance这个变量。
// 实现：静态方法版
class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance
  }
  getItem(key) {
    return localStorage.getItem(key)
  }
  setItem(key, value) {
    return localStorage.setItem(key, value)
  }
}

const storage1 = Storage.getInstance()
const storage2 = Storage.getInstance()

storage1.setItem('name', '九儿')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')
// 返回true
storage1 === storage2

// 实现闭包版本
function Storage() { }
Storage.prototype.getItem = function (key) {
  return localStorage.getItem(key)
}
Storage.prototype.setItem = function (key, value) {
  return localStorage.setItem(key, value)
}