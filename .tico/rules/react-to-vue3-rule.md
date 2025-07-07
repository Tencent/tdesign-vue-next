---
# 注意不要修改本文头文件，如修改，Tico将按照默认逻辑设置
type: always
---
在收到将文件转换为vue3+ts的指令后，请在转换过程中遵守如下规则
1.vue3文件为SFC单文件组件，即一个文件中只有一个组件
2.在单文件组件中不应该使用defineComponent再定义别的组件，而是将所有组件都合为一个组件
3.setup中不允许出现组件模板结构
4.转换后的vue3中不应该存在tsx或jsx代码块
5.vue3的script标签带有setup和lang='ts'属性
