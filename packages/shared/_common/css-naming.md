# CSS 命名规范

CSS 的命名，采用 [BEM](http://getbem.com/) 命名规范，可以有效的避免组件间样式的相互污染，减少嵌套层级。具体规则如下：

## BEM 是什么?

BEM 使用分隔符将类名区隔成三个部分：

[prefix]-[block]\_\_[element]--[modifier]

- **prefix**：全局的前缀，这里指代表 tdesign 的前缀，也就是 t-
- **Block(块)** ：组件的最外层父元素，这个类包含最通用和可重用的功能。
- **Element(元素)** ：组件内可包含一个或多个元素，元素为块添加了新功能。无需重置任何属性。
- **Modifier(修饰类)** ：块或元素都可以通过修饰词来表示为变体。

## BEM 的特点

- 易于理解和学习
- 创建的结构易于扩展和维护

## BEM 命名规则

通过几个常见实例，来讲解一下项目实践中的注意事项。

### 1. 无元素和修饰类的块

### 2. 含简单修饰类的组件

- 组件可能有变体，**变体必须使用修饰类来表示**
- **修饰类不能单独使用**。修饰类旨在增强而非替代基类

### 3. 含元素的组件

稍微复杂的结构通常有子元素。

- 每个需要设置样式的子元素**必须**包含一个类名。
- 不要省略 HTML 中子元素的类名，否则会对组件中的元素使用更高权重的选择器。BEM 目的之一是保持样式一致和较低的权重值（specificity）。
- 如果结构具有多个层级的子元素，**类名无需反映出每个层级**。
- BEM 并不打算传达结构层级。表示组件中子元素的 BEM 类名**只需包含块名和元素名**。

### 4. 含修饰类的元素

在某些情况下，你可能希望更改组件中的单个元素。在这种情况下，**不能**在组件上添加修饰类，只能在元素上添加修饰类。

### 5. 基于组件修饰类调整元素样式

如果需要以相同的方式调整同一个组件内的多个元素，可以在组件的基类上添加修饰类，再基于这个修饰类来调整次级元素的样式。虽然增加了样式权重值，但修改组件更加简单了。

### 6. 类名含有多个单词怎么办？

使用双下划线与双连字符区隔块\_\_元素--修饰类的意图正是为此。因此:

- 使用**连字符**来区隔单词，保证样式类名全小写，**不使用驼峰命名法（Camel-Case）**
- 类名应该易于阅读，因此除非缩写是普遍可识别的，否则缩写并不建议使用

```
<!-- GOOD -->
prefix-block\_\_element-name--modifier-name
```

```
<!-- BAD -->
prefix-block\_\_elementName--modifierName
```

### 7. 如何表示组件状态？

很多组件具有多种状态，比如 tab 组件有激活状态、禁用状态。

- 使用独立的状态钩子来表示状态，状态类名以 t-is-开头，我们整理一套**推荐使用的状态类名**（见附）供君选用
- 设置状态样式时，状态类名**必须**与其作用的元素类名或者块类名联合使用（.a.b 形式），不能使用后代选择器、子选择器等其他方式设置样式，以减小对全局样式的污染
- 修饰类的作用是用来表示组件的另外一个变体，而非另外一种状态，所以状态**不使用**修饰符的形式（如 t-tabs\_\_tab-disabled）

```html
<!-- GOOD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tab.t-is-active {
  }
  .t-tabs__tab.t-is-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

```html
<!-- BAD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tabitem .t-is-active {
  }
  .t-tabs__tabitem .t-is-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-is-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

```html
<!-- BAD -->
<style>
  .t-tabs {
  }
  .t-tabs__tab {
  }
  .t-tabs__tab-active {
  }
  .t-tabs__tab-disabled {
  }
</style>
<div class="t-tabs">
  <ul class="t-tabs__tablist">
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-tabs__tab-active">tab 1</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab t-tabs__tab-disabled">tab 2</a>
    </li>
    <li class="t-tabs__tabitem">
      <a href="" class="t-tabs__tab">tab 3</a>
    </li>
  </ul>
</div>
```

## 组件命名

参见[团队语言规范](./naming.md)

#### 常见状态类名

| **状态**  |           **类名**           |          **说明**           |
| :-------: | :--------------------------: | :-------------------------: |
|   加载    |         t-is-loading         |                             |
|   禁用    |        t-is-disabled         |                             |
|   成功    |         t-is-success         |                             |
|   报错    |          t-is-error          |                             |
|   警告    |         t-is-warning         |                             |
|   聚焦    |         t-is-focused         |                             |
|   选中    |        t-is-selected         |                             |
|   勾选    |         t-is-checked         |                             |
|   关闭    |        t-is-closable         |         是否可关闭          |
|   激活    |         t-is-active          |     比如当前 tab 选中项     |
|  当前项   |         t-is-current         | 主要用于 step，表示当前步骤 |
| 隐藏/显示 |   t-is-hidden/t-is-visible   |                             |
| 展开/折叠 | t-is-expanded/t-is-collapsed |                             |

#### 推荐常用单词

| **状态**  |           **类名**            |
| :-------: | :---------------------------: |
|    头     |            header             |
|    身     |             body              |
|    尾     |            footer             |
| 容器/内容 |  container / wrap / content   |
|   侧边    |   side / sidebar / sidemenu   |
| 边框修饰  | xxx–bordered / xxx–borderless |

#### 图标类，以 info 举例

| **说明** |            **类名**             |
| :------: | :-----------------------------: |
|   默认   |           t-icon-info           |
| 其他颜色 | t-icon-info t-icon-info--danger |
| 其他尺寸 |      t-icon-info t-size-l       |

#### 尺寸类

|  **尺寸**  |      **类名**      |  **说明**   |
| :--------: | :----------------: | :---------: |
|    较小    |     t-size-xs      | extra small |
|     小     |      t-size-s      |    small    |
| 中（默认） |      t-size-m      |   middle    |
|     大     |      t-size-l      |    large    |
|    较大    |     t-size-xl      | extra large |
| 高度 100%  | t-size-full-height |
| 宽度 100%  | t-size-full-width  |
| 宽度自适应 | t-size-auto-width  |
