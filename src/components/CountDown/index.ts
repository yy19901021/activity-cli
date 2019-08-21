/**
 * 
 * @param {*} selector 初始化倒计时的元素
 * @param {*} initText 初始化倒计时的文字
 * @param {*} runtext 包含占位符字符串的String 倒计时运行时显示的文字（%% 表示的是时间）
 * @param {*} fromTime 倒计时的时间 Number
 * @param {*} onStart 倒计时开始时的函数 return false 停止倒计时 true 开始倒计时
 */
class Count {
  countEl: HTMLElement
  initText: string
  runtext: string
  endText: string
  initTime: number
  remainingTime: number
  onStart: any
  timer: any
  constructor ({selector, initText="获取短信码", runtext="", fromTime= 60, endText = "重新获取", onStart = function () {}}) {
    this.countEl = document.querySelector(selector)
    this.initText = initText
    this.runtext = runtext
    this.endText = endText
    this.initTime = fromTime
    this.remainingTime = fromTime
    this.onStart = onStart
    this.countEl.innerText = initText
    this.timer = null;
    this.countEl.onclick = () => {
      this.start()
    }
  }
  start () {
    if (this.timer) return
    if (!this.onStart()) {
      return
    }
    this.run()
  }
  run() {
    if (this.remainingTime < 0) {
      this.stop()
      return
    }
    this.countEl.innerText = this.runtext.replace(/%+/g, this.remainingTime.toString())
    this.timer = setTimeout(() => {
      this.remainingTime--;
      this.run()
    }, 1000)
  }
  stop = function () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = null
    this.countEl.innerText = this.endText
    this.remainingTime = this.initTime
  }
  reset = function () {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.countEl.innerText = this.initText
  }
}


export default Count