const scaleEvent = new Event('scale', {cancelable: true, composed: false, bubbles: true})
const translateEvent = new Event('translate', {cancelable: true, composed: false, bubbles: true})

interface Coordinate{
  x: number
  y: number
}

interface eventParmas {
  el: string
  beforeStart?: (playlaod, event?: TouchEvent) => void
  then?: (playlaod, event?: TouchEvent) => void
  end?: (event?: TouchEvent) => void
}


// 手势事件抽象类
abstract class GestureEvent {
  dom: HTMLElement | null
  callback: (playlaod?, event?: TouchEvent) => void
  constructor(props: eventParmas) {
    this.dom = document.querySelector(props.el)
    this.callback = props.then || function() {}
    if (this.dom) {
      this.dom.addEventListener('touchstart', this.startFn)
      this.dom.addEventListener('touchmove', this.moveFn)
      this.dom.addEventListener('touchend', this.endFn)
    }
  }
  abstract startFn(event: TouchEvent): void
  abstract moveFn(event: TouchEvent): void
  abstract endFn(event: TouchEvent): void
  abstract remove(): void
}



// 缩放事件类
class ScaleEvent extends GestureEvent {
  static instance: ScaleEvent
  center: Coordinate | null
  distance: number
  scale: number
  stamptime: number
  beforeScalefn: (center?: Coordinate) => (void)
  endFnCallback: (event?: TouchEvent) => (void)
  constructor(props: eventParmas) {
    super(props)
    if (this.dom) {
      ScaleEvent.instance = this
      ScaleEvent.instance.stamptime = 0
      this.scale = 0
      const callback = this.callback
      this.dom.addEventListener('scale', function(event: TouchEvent) {
        callback({
          scale: ScaleEvent.instance.scale,
          center: ScaleEvent.instance.center
        }, event)
      })
      this.beforeScalefn = props.beforeStart || function () {return true}
      this.endFnCallback = props.end || function () {}
    }
  }
  endFn (event: TouchEvent) {
    ScaleEvent.instance.endFnCallback()
  }
  startFn(event: TouchEvent) {
    const touchs = event.touches
    if (touchs.length === 2) {
      event.preventDefault()
      event.stopPropagation()
      ScaleEvent.instance.stamptime = new Date().getTime()
      ScaleEvent.instance.center = {x: (touchs[0].pageX + touchs[1].pageX) / 2, y: (touchs[0].pageY + touchs[1].pageY) / 2}
      ScaleEvent.instance.distance = Math.sqrt(Math.pow(touchs[0].pageX - touchs[1].pageX, 2) + Math.pow(touchs[0].pageY - touchs[1].pageY, 2))
      ScaleEvent.instance.beforeScalefn(ScaleEvent.instance.center)
    }
  }
  moveFn (event: TouchEvent) {
    const touchs = event.touches
    if (touchs.length === 2) {
      event.preventDefault()
      event.stopPropagation()
      const curDistance = Math.sqrt(Math.pow(touchs[0].pageX - touchs[1].pageX, 2) + Math.pow(touchs[0].pageY - touchs[1].pageY, 2))
      const scale = Math.abs(curDistance - ScaleEvent.instance.distance) > 20 ? (curDistance - ScaleEvent.instance.distance) / (ScaleEvent.instance.distance) : 0
      ScaleEvent.instance.scale = scale
      scale !== 0 && event.currentTarget.dispatchEvent(scaleEvent)
    }
  }
  remove() {
    const that = this
    this.dom.removeEventListener('scale', that.callback)
    this.dom.removeEventListener('touchstart', that.startFn)
    this.dom.removeEventListener('touchmove', that.moveFn)
  }
}

// 滑动事件类
class TranslateEvent extends GestureEvent {
  static instance: TranslateEvent
  start: Coordinate
  translateX: number
  translateY: number
  stamptime: number
  beforeTranslatefn: (event?: TouchEvent) => (void)
  endFnCallback: (event?: TouchEvent) => (void)
  constructor(props: eventParmas) {
    super(props)
    TranslateEvent.instance = this
    if (this.dom) {
      const that = this
      this.stamptime = 0
      const callback = this.callback
      this.beforeTranslatefn = props.beforeStart || function () {}
      this.endFnCallback = props.end || function () {}
      this.dom.addEventListener('translate', function(event: TouchEvent) {
        callback({x: TranslateEvent.instance.translateX, y: TranslateEvent.instance.translateY}, event)
      })
    }
  }
  endFn(event: TouchEvent) {
    if (event.changedTouches.length === 1 && ScaleEvent.instance && Math.abs(TranslateEvent.instance.stamptime - ScaleEvent.instance.stamptime) > 100) {
      TranslateEvent.instance.endFnCallback(event)
    }
  }
  startFn(event: TouchEvent) {
    const touchs = event.touches
    if (touchs.length === 1) {
      TranslateEvent.instance.stamptime = new Date().getTime()
      TranslateEvent.instance.start = {
        x: touchs[0].pageX, 
        y: touchs[0].pageY
      }
      TranslateEvent.instance.beforeTranslatefn(event)
    }
  }
  moveFn (event: TouchEvent) {
    const touchs = event.touches
    event.preventDefault()
    event.stopPropagation()
    if (touchs.length === 1) {
      const end =  {
        x: touchs[0].pageX, 
        y: touchs[0].pageY
      }
      const start = TranslateEvent.instance.start
      TranslateEvent.instance.translateX = end.x - start.x
      TranslateEvent.instance.translateY = end.y - start.y
      if (ScaleEvent.instance && Math.abs(TranslateEvent.instance.stamptime - ScaleEvent.instance.stamptime) > 500) {
        TranslateEvent.instance.translateX !==0 && TranslateEvent.instance.translateY !== 0 && event.currentTarget.dispatchEvent(translateEvent)
      }
      TranslateEvent.instance.start = end
    }
  }
  remove() {
    const that = this
    this.dom.removeEventListener('translate', that.callback)
    this.dom.removeEventListener('touchstart', that.startFn)
    this.dom.removeEventListener('touchmove', that.moveFn)
  }
}



export {ScaleEvent, TranslateEvent}