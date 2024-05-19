# 输入框 Input

用于承载用户信息录入的文本框，常用于表单、对话框等场景，对不同内容的信息录入，可拓展形成多种信息录入形式。




### 基础输入框

最基础的单行输入框，按状态可分为正常、禁用、错误、带额外提示。通常在需要输入少量内容（20个字以内）的场景下使用。

![基础输入框](https://tdesign.gtimg.com/site/design/images/基础输入框-1850861.jpg)



### 文本域输入框

可输入多行内容的输入框。通常在需要输入大量多行文本内容的场景下使用。

![文本域输入框@2x](https://tdesign.gtimg.com/site/design/images/文本域输入框@2x-1850868.jpg)



### 前后置标签输入框

在输入框前后加入一些特定的纯展示标签，通常在需要提高辨识效率时使用。


![前后置标签输入框](https://tdesign.gtimg.com/site/design/images/前后置标签输入框-1850875.jpg)



### 组合输入框

多个输入框相组合，或与其他控件（如下拉）相组合，以方便识别。用于一些固定组合或者固定格式输入的场景，如输入电话号码。


![组合输入框](https://tdesign.gtimg.com/site/design/images/组合输入框-1850883.jpg)



### 可清空内容输入框

带清空操作的输入框，可快捷清空输入过的内容。

![可清空内容输入框](https://tdesign.gtimg.com/site/design/images/可清空内容输入框-1850892.jpg)



### 密码输入框

由符号代替输入内容的输入框，并可通过操作展示原文信息。用于强安全信息输入的场景。

![密码输入框](https://tdesign.gtimg.com/site/design/images/密码输入框-1850899.jpg)

### 不同状态的输入框

输入框状态可分为：正常、禁用、异常（带提示）、带额外内容提示、带状态图标提示。

#### 正常

![正常](https://tdesign.gtimg.com/site/design/images/正常-1850934.jpg)

#### 禁用

![禁用](https://tdesign.gtimg.com/site/design/images/禁用-1850939.jpg)

#### 异常（带提示）

![异常（带提示）](https://tdesign.gtimg.com/site/design/images/异常（带提示）-1850945.jpg)

#### 带额外内容提示

![带额外内容提示](https://tdesign.gtimg.com/site/design/images/带额外内容提示-1850955.jpg)

#### 带状态图标

![带状态图标提示](https://tdesign.gtimg.com/site/design/images/带状态图标提示-1850962.jpg)

### 不同尺寸的输入框
有大中小三种不同高度、宽度的输入框，以适应不同尺寸布局。

#### 不同高度尺寸

![不同高度尺寸](https://tdesign.gtimg.com/site/design/images/不同高度尺寸-1850909.jpg)


#### 不同宽度尺寸
![不同宽度尺寸](https://tdesign.gtimg.com/site/design/images/不同宽度尺寸-1850915.jpg)



## 组件设计指南

### 何时使用

需要用户录入信息时；

需要对用户录入的内容进行即时反馈时。



### 组件搭配使用


##### 与气泡搭配使用，在需要对输入框中内容进行提示或反馈时，可通过气泡内容展示。

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/input-1.png"/>
<em>图示：文本提示</em>

<hr />

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/input-2.png"/>
<em>图示：错误反馈提示</em>

<hr />

<img src="https://oteam-tdesign-1258344706.cos.ap-guangzhou.myqcloud.com/site/design/input-3.png"/>
<em>图示：密码输入提示，针对密码输入有多条规则要求的输入框而定制的特殊样式</em>






