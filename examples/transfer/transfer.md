## transfer 

::: demo demos/base 默认
:::

::: demo demos/transfer-search 带搜索框
:::

::: demo demos/transfer-pagination 带分页
:::

::: demo demos/advanced-usage 高级用法
:::

::: demo demos/custom-render 自定义渲染行数据
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

