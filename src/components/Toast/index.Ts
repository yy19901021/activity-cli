import './index.scss';
let ToastEl: HTMLElement | null
let Timer: any = ''
let Toast = function (showTime: number | string = 3000) {
  this.showTime = showTime
  this.isAppend = false
  if (!ToastEl) {
    ToastEl = document.createElement('div')
    ToastEl.id = 'Toast';
    ToastEl.style.display = "none"
  }
}
Toast.prototype.then = function (fn) {
  this.afterHide = fn
}
Toast.prototype.show = function (text) {
  if (!this.isAppend) {
    document.body.appendChild(ToastEl)
    this.isAppend = true
  }
  if (Timer) {
    clearTimeout(Timer)
    this.hide()
  }
  ToastEl.innerHTML = text
  ToastEl.style.display = "block"
  let showTime = this.showTime
  if (this.showTime == 'manual') {
    return
  }
  Timer = setTimeout(()=>{
    this.hide()
  }, showTime)
  return this
}

Toast.prototype.hide = function () {
  ToastEl.style.display = 'none'
  this.afterHide && this.afterHide()
}
export default Toast