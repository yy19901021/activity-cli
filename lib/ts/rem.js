/*
*网易rem比例计算（设计稿750px）
*/
 function setSize(doc, win) {
  var docEl = doc.documentElement
  var isIOS = navigator.userAgent.match(/\(i[^]+( U)? CPU.+Mac OS X/)
  console.log(isIOS)
  var isComputer = navigator.userAgent.toLocaleLowerCase().indexOf('window') > -1
  var dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
  var scaleFactor = 1 // 放大比例
  if(!isIOS && !isComputer){
    let $dom = doc.createElement('div');
    $dom.style.fontSize = '100px';
    doc.body.appendChild($dom);
    let scaledFontSize = parseInt(win.getComputedStyle($dom, null).getPropertyValue('font-size'));
    doc.body.removeChild($dom)
    scaleFactor = 100 / scaledFontSize;
  }
  dpr = window.top === window.self ? dpr : 1
  dpr = 1 // 被iframe引用时，禁止缩放
  var scale = 1 / dpr
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  docEl.dataset.dpr = dpr
  var metaEl = doc.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content = 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no'
  docEl.firstElementChild.appendChild(metaEl)
  var recalc = function () {
    var width = docEl.clientWidth
    if (dpr != 1 && width / dpr > 375) {
        width = 375 * dpr
    }
    //乘以100，px : rem = 100 : 1
    docEl.style.fontSize = 100 * (width / 375) * scaleFactor + 'px'
    docEl.dataset.scale = (width / 375) * scaleFactor
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
}
setTimeout(function() {
  setSize(document, window)
}, 0)
