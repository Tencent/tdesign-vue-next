# 对话框 Dialog

对话框是一种临时窗口，通常在不想中断整体任务流程，但又需要为用户展示信息或获得用户响应时，在页面中打开一个对话框承载相应的信息及操作。








### 确认类对话框

指带有取消及主要操作，指导用户进行二次确认的对话框。常用于反馈或容错的场景。


![基础对话框](https://tdesign.gtimg.com/site/design/images/基础对话框-1838942.jpg)



### 反馈类对话框

指显示某操作结果的对话框，内容区域有icon，仅有一个确认按钮。常用于操作后结果的展示，或危险、警告等信息的展示。

![带图标对话框1备份](https://tdesign.gtimg.com/site/design/images/带图标对话框1备份-1839142.jpg)



### 异步加载类对话框

按钮带加载标识，操作需要异步完成的对话框。适用于当前操作需要异步完成，不能和对话框同步关闭时。

![带图标对话框状态-1](https://tdesign.gtimg.com/site/design/images/带图标对话框状态-1.jpg)

### 自定义类对话框
可自定义对话框内容和底部按钮。

（此处是demo）

### 模态与非模态类对话框
对话框属于独占式组件，必须处理当前对话框内容后才能进行其他操作。对话框的出现打断了用户当前的任务，而不是所有的提醒反馈及内容操作都需要打断用户。

（此处是demo）

### 弹出位置
可以自定义控制对话框位置。

（此处是demo）

## 组件设计指南


### 何时使用

需要展示操作反馈或提示信息；

需要填写或展示相关信息，需中断用户操作，但不中断当前流程时；


### 推荐/慎用示例

##### 对话框的主要说明文字需明确表达其目的及操作的后果。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/dialog-1@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/dialog-2@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

<hr />

##### 对话的按钮需使用可指引后果的操作词汇，而不是模棱两可的词汇。

<div class="legend">
  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/dialog-3@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/good.png" />
  </div>

  <div class="item">
    <img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/dialog-4@2x.png" />
    <img class="tag" src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/doc/bad.png" />
  </div>
</div>

### 相似组件

| 相似组件      | 何时使用                                                     |
| :------------------------------ | :----------------------------------------------------------- |
| [对话框](./dialog)    | 对话框是一种临时窗口，通常在不想中断整体任务流程，但又需要为用户展示信息或获得用户响应时，在页面中打开一个对话框承载相应的信息及操作。 |
| [气泡确认框](./Popconfirm)    | 气泡确认框通常用于需要用户进行二次确认、需要给用户展示反馈信息的情况下，与对话框中的提示类对话框的区别是比较快速轻量，适用于不会造成严重后果的二次确认场景，或反馈信息不需要强烈引起用户注意的情况。 |