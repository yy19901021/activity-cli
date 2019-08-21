### 项目启动
`
开发环境：npm run dev
`
`
 生产： npm run build
`


### 项目目录介绍
- config 项目webpack构建代码
- head TS项目定义的头部文件
- lib 项目公共ts， css
- src 项目资源包含组件、图片和页面
  - images 图片资源
  - components 组件
  - pages 页面资源
- cli.js 生成pages文件的命令行（npm run create <file_name>
- h5 打包后的页面放置目录
### 项目组件介绍
- CountDown 计时器组件
- CountTo 自动增长组件
- Form 表单组件
- Http 封装的请求组件
- Loading loading组件
- Toast 提示组件
- observe 发布和订阅组件
- touchEvent 手势组件