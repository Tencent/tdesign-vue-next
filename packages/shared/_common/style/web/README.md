# TDesign-web 说明

- 该仓库用于 web 端（含 Vue 和 React ）的 TDesign 组件库的样式文件和 html 文件
- 使用 less 来管理和编写样式
- 基于 PBEM 命名，其中 `P` 代表 `Prefix`，`B` 代表 `Block` ，`E` 代表 `Element` ， `M` 代表 `Modifier`。更详细规范及命名推荐，请查看 [CSS 命名规范](../../css-naming.md)
- [组件名称命名规则](../../naming.md)

### 文件目录说明

```
web
├── dist                        // 编译后的样式文件和图片素材
├── docs                        // 文档示例相关的样式
│   ├── button-docs.less        // 针对单个组件示例补充的样式，开发也会按 UI 开发提供的示例来排版
│   └── ...
├── components                  // 组件样式
│   ├── button
│   │   ├── _index.less         // 组件的主样式文件，内含 base.less、自己变量/函数 及 相关依赖
|   |   ├── _mixin.less         // 组件的 mixin 文件
|   |   ├── _var.less           // 组件的变量文件
│   │   └── index.html          // 组件的 html 结构
│   ├── ...
│   └── index.less              // 统一引入各个组件样式的出口文件
├── assets                      // icon/图片素材
│   ├── image
│   │   ├── name.svg            // 各类图标
│   │   └── ...                 // 组件的 html 结构
├── mixins                      // 可复用
│   ├── _clearfix.less          // 清除浮动
│   ├── ...
│   └── _index.less             // mixin 统一入口
├── utilities                   // 定义可复用的代码片段,且可单独使用
│   ├── _float.less
│   └── index.less              // utilities 统一入口
├── theme                       // UI 主题风格样式
│   ├── ...
│   └── index.less              // 覆盖默认主题
├── _reset.less                 // 重置标签默认样式
├── _variables.less             // 全局变量
├── base.less                   // 基础样式（内含 _reset.less 和 _variable.less）
└── docs.less                   // 示例的公共样式
```

### 开发

#### 浏览器支持

- IE 11 以上
- chrome 等其他现代浏览器

#### 初始化

`name`为组件名（[命名规则参考](../../naming.md)）

##### 手动拷贝

复制 `a-template` ，修改为组件名，里面有需要的默认文件。
几个关键点：

- `components` 下创建组件文件夹
- 如果有示例样式，添加到 `/docs/<name>.css`，并在 `docs.css` 里引入


### 相关资料

[web 端设计稿](https://www.figma.com/file/UghlEiQXZogyPvx1XDMMyx/TDesign-for-web?node-id=25%3A2)
