class Publisher{
  constructor() {
    this.observers = [];
    console.log('Publisher is created')
  }
  add(observer){
    this.observers.push(observer)
    console.log('add observer')
  }
  remove(observer){
    this.observers.forEach((item,index)=>{
      if(item === observer){
        this.observers.splice(index,1)
      }
    })
    console.log('remove observer')
  }
  notify(){
    console.log('notify observer')
    this.observers.forEach((item)=>{
      item.update(this)
    })
  }
}

class Observer{
  constructor() {
    console.log('observer is created')
  }
  update(publish){
    console.log('observer is notified')
  }
}

let observer1 = new Observer()
let observer2 = new Observer()
let publisher = new Publisher()
publisher.add(observer1)
publisher.add(observer2)

publisher.notify()

publisher.remove(observer1)