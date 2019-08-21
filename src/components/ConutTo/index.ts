
/**
 * 
 * @param {*} selector 选择器
 * @param {*} number 最终数字
 * @param {*} time 持续时间
 * 
 */
class countTo {
  seletor: string;
  toNumber: number;
  time: number
  step: number
  decimalNum: number
  initNumber: number
  countToEL: HTMLElement
  constructor(selector: string, number: number, time: number) {
    this.countToEL = document.querySelector(selector)
    this.toNumber = number
    let copyNum = number + ''
    let minNum = copyNum.match(/\.([0-9]+)$/) ? copyNum.match(/\.([0-9]+)$/)[1] : null
    this.decimalNum = minNum ? minNum.length : 0
    this.initNumber = minNum ? parseFloat('0.' + '000'.substr(0, minNum.length - 1) + '1') : 1
    this.step = number / time * 80
    this.time = time
    this.countToEL.innerText = this.initNumber.toString()
  }

   start (): void {
    if (this.initNumber >= this.toNumber) {
      this.initNumber = this.toNumber
    } else {
      this.initNumber += this.step
      setTimeout(() => {
        this.start()
      }, 50)
    }
    this.show()
  }
  show (): void {
    let copyNum = this.initNumber.toFixed(this.decimalNum)
    this.countToEL.innerText = copyNum
  }
}


export default countTo