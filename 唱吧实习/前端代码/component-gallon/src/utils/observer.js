class Observer {
  constructor(name) {
    this.name = name
  }
  updated(taskType, taskInfo) {
    if (taskType === 'route') {
      console.log(`${this.name}不需要日常任务`)
      return
    }
    console.log(`${this.name}去任务大殿抢${taskInfo}任务`)
  }
}

class Subject {
  constructor() {
    this.observerList = []
  }
  addList(observer) {
    this.observerList.push(observer)
  }
  notify(task) {
    this.observerList.forEach((item) => {
      item.updated(task)
    })
  }
}
const subject = new Subject()
const stu1 = new Observer('弟子1')
const stu2 = new Observer('弟子2')

subject.addList(stu1)
subject.addList(stu2)

subject.notify('', '浇水')