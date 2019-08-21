export default class Obeserve{
  private listener: Map<string, ((payload?: any)=>void)[]>
  constructor() {
    this.listener=new Map()
  }
  subscribe(key: string, fn?: (payload?: any)=>void): void{
    if (!this.listener.get(key)) {
      this.listener.set(key, [])
    } 
    fn && this.listener.get(key).push(fn)
  }
  notify(key: string, payload?: any){
    let fns = this.listener.get(key)
    if (fns) {
      fns.forEach(item => {
        item(payload)
      })
    }
  }
}


export const Responsive = function(obj: any): Obeserve {
  const obeserve = new Obeserve()
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    obeserve.subscribe(key)
    Object.defineProperty(obj, key, {
      set(val) {
        if (val !== this[key]) {
          obeserve.notify(key, val)
        }
        this.value = val
      },
      get() {
        return this.value
      }
    })
  }
  return obeserve
}