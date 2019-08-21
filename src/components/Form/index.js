import Tools from '../../../lib/ts/utils.ts'
/**
 * 
 * @param rules {
 *  key: {
  *  lable: '',
  *  trigger: 'blur, click fouce change'
  *  required: true false
  *  partner: 正则表表达式
  *  message: partner错误信息
 *  }
 * }
 */

let FormArea = function (rules) {
  this.children = []
  this.rules = rules
}
FormArea.prototype.add = function (selector, erroCallback) {
  let InputChild = new Input(selector, this.rules, erroCallback)
  InputChild.init()
  this.children.push(InputChild)
  return InputChild
}
FormArea.prototype.check = function () {
  let flag = true
  for (let i = 0; i < this.children.length; i++) {
    const element = this.children[i];
    flag = element.check()
    if (!flag) {
      break;
    }
  }
  return flag
}


/**
 * 
 * @param {*} selector 
 * @param {*} rule
 */
function erroCallbackFun (msg, inputIns) {
  let el = inputIns.parentInputInstance
  if (el.next().hasClass('formErr')) {
    el.next().text(msg)
    el.next().show()
  } else {
    let span = $('<div />').addClass('formErr').text(msg)
    el.after(span)
  }
}

let Input = function (selector, rules, erroCallback) {
  let inputInstance
  if ($(selector).is('input')) {
     inputInstance = $(selector);
  } else if ($(selector + ' input').length > 0) {
    inputInstance = $(selector + ' input').eq(0)
  } else {
    console.error('选择器中没有input元素')
  }
  this.parentInputInstance = $(selector);
  this.inputInstance = inputInstance;
  this.borderColor = inputInstance.css('borderColor');
  this.label = inputInstance.attr('label')
  this.erroCallback = erroCallback || erroCallbackFun 
  if (this.label && rules.hasOwnProperty(this.label)) {
    this.rule = Array.isArray(rules[this.label]) ? [...rules[this.label]] : [rules[this.label]]
    this.rule.forEach((item) => {
      item.isOk = !!item.required
    })
  } else {
    this.rule = null
  }
}
Input.prototype.init = function () {
  let that = this
  if (this.rule) {
    this.rule.forEach((item, index) => {
      if (item.trigger) {
        let message = item.message ? item.message : '参数错误没有自定义信息';
        this.inputInstance.on(item.trigger, (function (event) {
          let flag = that.checkOne(item, index)
          if (!flag) {
            console.log(that)
            that.erroCallback(message, that)
          }
        }))
      }
    })
  }
}
Input.prototype.checkOne = function (rule, index) {
  let val = this.inputInstance.val();
  let flag = true
  if (Tools.isEmpty(val)) {
    if (rule.required) {
      flag = false
    }
  } else if (rule.partner) {
    if (!(rule.partner.test(val))) {
      flag = false
    }
  }
  this.rule[index].isOk = flag
  let isAllOk = this.rule.every((item) => {
    return item.isOk
  })
  if (isAllOk) {
    this.parentInputInstance.css('borderColor', this.borderColor)
  } else {
    this.parentInputInstance.css('borderColor', '#f25150')
  }
  return flag
}

Input.prototype.check = function () {
  let result =  this.rule.every((item, index) => {
    let flag = this.checkOne(item, index)
    if (!flag) {
      this.erroCallback(item.message, this)
      this.parentInputInstance.css('borderColor', '#f25150')
    }
    return flag
  })
  if (result && this.parentInputInstance.next().hasClass('formErr')) {
    this.parentInputInstance.next().hide()
  }
  return result
}
Input.prototype.value = function (val) {
  if (val !== undefined) {
     this.inputInstance.val(val)
  } else {
    return this.inputInstance.val()
  }
}

export default FormArea