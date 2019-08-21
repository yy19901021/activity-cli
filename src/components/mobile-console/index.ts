import "./index.scss";
interface ConsoleParamas{
  el?: string,
  position?: string

}

export class MobielConsole {
  el: HTMLElement
  position: string
  width: number
  height: number
  top: number
  left: number
  constructor({position="top", }: ConsoleParamas) {
    this.el = document.createElement('div')
    this.el.id = "MobielConsoleContainer"
    this.width = document.body.clientWidth
    this.height = 200
    document.body.appendChild(this.el)
  }
  log(msg) {
    const listItem = document.createElement('div')
    listItem.className = "list-item"
    listItem.innerText = JSON.stringify(msg)
    this.el.appendChild(listItem)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  }
}


 