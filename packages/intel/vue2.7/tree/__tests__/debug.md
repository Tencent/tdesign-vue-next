# tree 组件调试备注

## 示例页面

预期示例页面改造方向：

- 用于调试的实例页面，用 debug 前缀区分，与官方文档示例区分开
- 官方文档示例中，减少选项配置，提供多个实例来说明较为重要的选项区别
- 官方文档示例中，明确说明可能存在的操作误解

## 单元测试

tree 针对性测试命令:

```bash
# 执行单测
npx vitest ./src/tree/__tests__/
```

## 分支维护

- 原项目 clone 到本地，并 fork 项目用于分支开发。
- 配置分支推送到个人仓库，merge request 从个人仓库分支发起，个人仓库 develop 分支保持与原仓库一致。
- 创建分支时，从原仓库分支创建，确保原仓库分支 upstream 为原仓库 develop 分支。

以用户名为 author 为例，流程指令一览:

```bash
# 进入项目，添加个人远程分支
git remote add {author} git@github.com:{author}/tdesign-vue-next.git
# 切换到原仓库 develop 分支
git checkout develop
# 更新原仓库代码
git pull
# 更新 submodule 仓库代码
gi submodule update
# 本地建立调试分支
git checkout -b fix/tree/debug
# 分支推送到个人仓库进行维护
git push {author}
# 该分支实际第一次推送代码时，配置 upstream
git push --set-upstream {author} fix/tree/debug
```

分支维护完毕后，在 github 选择该分支发起 merge request。

该流程可避免 MR 时混入大量重复的提交日志。

## 调试界面

单独组件调试地址示例

- [基本呈现](http://localhost:16000/vue/demos/tree/base)
- [激活态](http://localhost:16000/vue/demos/tree/activable)
- [选中态](http://localhost:16000/vue/demos/tree/checkable)
- [受控](http://localhost:16000/vue/demos/tree/controlled)
- [数据切换](http://localhost:16000/vue/demos/tree/data)
- [禁用](http://localhost:16000/vue/demos/tree/disabled)
- [可拖动](http://localhost:16000/vue/demos/tree/draggable)
- [空数据](http://localhost:16000/vue/demos/tree/empty)
- [全部展开](http://localhost:16000/vue/demos/tree/expand-all)
- [分层展开](http://localhost:16000/vue/demos/tree/expand-level)
- [互斥展开](http://localhost:16000/vue/demos/tree/expand-mutex)
- [过滤](http://localhost:16000/vue/demos/tree/filter)
- [自定义图标](http://localhost:16000/vue/demos/tree/icon)
- [自定义标签](http://localhost:16000/vue/demos/tree/label)
- [延迟加载](http://localhost:16000/vue/demos/tree/lazy)
- [自定义连线](http://localhost:16000/vue/demos/tree/line)
- [加载成功事件](http://localhost:16000/vue/demos/tree/load)
- [自定义控制区](http://localhost:16000/vue/demos/tree/operations)
- [性能测试](http://localhost:16000/vue/demos/tree/performance)
- [节点数据变更](http://localhost:16000/vue/demos/tree/state)
- [双向绑定](http://localhost:16000/vue/demos/tree/sync)
- [动画](http://localhost:16000/vue/demos/tree/transition)
- [虚拟滚动](http://localhost:16000/vue/demos/tree/vscroll)
