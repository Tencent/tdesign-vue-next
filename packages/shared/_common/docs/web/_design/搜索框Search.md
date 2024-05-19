# 搜索框Search

用于检索数据的控件，用户可以用一个或几个关键词，快速找到特定相关内容。



## 何时使用

当内容数据量大，需要进行数据检索或过滤；

可作为发现内容的首要操作，引导用户进行内容检索。



## 1.组件类型

### 1.1.基础搜索框

定义：最基础的搜索控件。

使用场景：通用场景都可以适用。

![基础搜索框](https://tdesign.gtimg.com/site/design/images/基础搜索框-1850410.jpg)



### 1.2.批量搜索框

定义：可选取多个搜索内容并进行批量搜索的搜索控件。

使用场景：需要同时进行多内容搜索的场景。

![使用场景2](https://tdesign.gtimg.com/site/design/images/使用场景2-1850419.jpg)

![批量搜索框-输入后](https://tdesign.gtimg.com/site/design/images/批量搜索框-输入后-1850424.jpg)





## 2.组件样式

### 2.1.尺寸

（1）正常尺寸：

![正常尺寸](https://tdesign.gtimg.com/site/design/images/正常尺寸-1850431.jpg)



（2）大尺寸：适用于跟其他组件相结合的场景，如表格、列表等

![大尺寸](https://tdesign.gtimg.com/site/design/images/大尺寸-1850439.jpg)



## 组件设计指南

### 3.1. 组件搭配使用


#### 3.1.1. 使用说明

（1）为方便用户理解，需要在搜索框内提示具体可检索的数据类型，尽量避免出现“请在此搜索”、“请输入你要搜索的内容”等过于空泛的提示

![基础搜索框-1](https://tdesign.gtimg.com/site/design/images/基础搜索框-1.jpg)



（2）搜索的内容需要进行即时的反馈，以引导或告知用户搜索的内容

![使用场景2-1](https://tdesign.gtimg.com/site/design/images/使用场景2-1.jpg)



#### 3.1.2. 组件的状态

搜索框状态可分为：默认态、可清空态、批量内容展示态

默认态：

![基础搜索框-2](https://tdesign.gtimg.com/site/design/images/基础搜索框-2.jpg)



批量搜索展开态：

![批量搜索框-输入中](https://tdesign.gtimg.com/site/design/images/批量搜索框-输入中-1850477.jpg)

![批量搜索框-输入后-1](https://tdesign.gtimg.com/site/design/images/批量搜索框-输入后-1.jpg)



#### 3.1.3. 交互逻辑

（1）基础搜索框

默认状态

![基础搜索框-正常](https://tdesign.gtimg.com/site/design/images/基础搜索框-正常-1850501.jpg)



输入中：回车或点击下拉内容可触发搜索，输入内容后出现清空按钮

![基础搜索框-输入中](https://tdesign.gtimg.com/site/design/images/基础搜索框-输入中-1850507.jpg)



输入完成（不带清空按钮）

![基础搜索框-输入后](https://tdesign.gtimg.com/site/design/images/基础搜索框-输入后-1850514.jpg)



（2）批量搜索框

默认状态

![基础搜索框-3](https://tdesign.gtimg.com/site/design/images/基础搜索框-3.jpg)



输入中：可选择联想内容，选后可继续输入进行搜索

![使用场景2-2](https://tdesign.gtimg.com/site/design/images/使用场景2-2.jpg)



输入完成

![批量搜索框-输入后-2](https://tdesign.gtimg.com/site/design/images/批量搜索框-输入后-2.jpg)



