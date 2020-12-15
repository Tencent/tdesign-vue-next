# transfer 穿梭框

在一定展示空间里对选项进行单个或批量移动从而完成挑选的数据容器。

### 何时使用
一组数据进行两种状态的分类时。
有更多的空间进行选择时。

## 1、组件类型
### 1.1基础穿梭框
定义：两框之间的元素迁移，非常直观且有效。一个或多个元素选择后点击方向按钮转到另一列框中。左栏是“源”，右边是“目标”

使用场景：需要两框之间的元素迁移时

::: demo demos/base
:::

### 1.1.2带搜索框

定义：在基础穿梭框上支持搜索功能

使用场景：穿梭框中数据量较大时，提供给用户更快捷的数据项定位能力
::: demo demos/transfer-search
:::

### 1.1.3带分页
::: demo demos/transfer-pagination
:::

### 1.1.4高级用法
::: demo demos/advanced-usage
:::

### 1.1.5自定义渲染数据
::: demo demos/custom-render
:::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|data|Array|[]|Y|全量的数据，数组每项为一个对象|
|targetValue|Array\<String\|Number\|Symbol\>|[]|Y|目标列索引集合，数组每项为数据的key，Transfer会把含有这些key值的数据筛选到右边|
|checkedValue|Array\<String\|Number\|Symbol\>|[]|-|设置哪些被选中|
|disabled|A\|[A,A]|false|-|A=Boolean,是否禁用，禁用列表+禁用按钮禁用search|
|search|A\|[A,A]|false|-|A=Boolean\|InputProps|
|titles|A\|[A,A]|['源列表'，'目标列表']|-|A=String|标题集合，顺序从左到右|
|directions|left\|right\|both|both|-|控制穿梭方向展示，默认双向|
|operations|A\|[A,A]|[>(图标),<(图标)]|-|A=String\|()=>Element，操作文案集合|
|pagination|A\|[A,A]|-|-|A=PaginationProps，使用分页样式，支持传pagination组件的total，pageSize，current属性，自定义列表下无效|
|checkAll|A\|[A,A]|true|-|A=Boolean,是否展示全选多选框|
|footer|String\/Slot\/Function|-|-|底部自定义渲染，作为Function时，参数为({direction:source\|target})|
|renderItem|Slot\/Function|-|-|每行数据的渲染函数，返回值是VNode，参数为({transferItem:Object,index:Number,direction:source\|target})|
|empty|String\/Slot\/Function|-|-|当列表为无数据状态时自定义渲染|
|targetOrder|original\|push\|unshift|original|-|右侧的排序策略，original保持和数据源相同的顺序|

