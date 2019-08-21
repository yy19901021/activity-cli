declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.json'
interface NEWSKYMETROInterface{
  share: (p: string) => {}
}
declare var NEWSKYMETRO:NEWSKYMETROInterface

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}

declare interface Window {
  wx: any;
  webkit: any
}
declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (
    paths: string[],
    callback: (require: <T>(path: string) => T) => void
  ) => void;
};