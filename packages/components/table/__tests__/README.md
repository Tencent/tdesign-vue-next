# Table 组件测试文件说明

本目录包含了 TDesign Vue Next Table 组件的所有测试文件。这些测试文件旨在确保表格组件的各个功能和特性能够正常工作，并提高代码覆盖率。

## 当前测试文件结构

### Hooks 测试文件

#### 1. 基础交互类 hooks - `table.hooks.interaction.test.tsx`
- **useRowHighlight** - 行高亮功能
- **useRowExpand** - 行展开功能  
- **useHoverKeyboardEvent** - 键盘悬停事件
- **useRowSelect** - 行选择功能
- 包含交互功能的集成测试和边界情况测试

#### 2. 数据处理类 hooks - `table.hooks.data-processing.test.tsx`
- **useFilter** - 数据过滤功能
- **useSorter** - 数据排序功能
- **usePagination** - 分页功能
- **useTreeData** - 树形数据处理
- **useTreeSelect** - 树形数据选择
- **useTreeExpand** - 树形数据展开
- 包含数据处理的集成测试和空数据处理

#### 3. 样式布局类 hooks - `table.hooks.layout-style.test.tsx`
- **useFixed** - 固定列/行功能
- **useAffix** - 表头/表尾吸附功能
- **useStyle** - 样式计算功能
- **useClassName** - CSS类名生成
- **useColumnResize** - 列宽调整功能
- **useRowspanAndColspan** - 单元格合并功能
- 包含布局样式的集成测试和响应式处理

### 功能测试文件

1. **base-table.test.tsx** - 测试基础表格的核心功能
2. **rowspan-colspan.test.tsx** - 测试单元格合并功能
3. **fixed-columns-rows.test.tsx** - 测试固定列和固定行功能
4. **tree-data.test.tsx** - 测试树形结构数据展示
5. **filter.test.tsx** - 测试表格过滤功能
6. **sorter.test.tsx** - 测试表格排序功能
7. **keyboard-navigation.test.tsx** - 测试键盘导航功能
8. **affix.test.tsx** - 测试表头和表尾吸附功能
9. **complex-scenarios.test.tsx** - 测试表格在复杂业务场景下的表现
10. **table.utils.comprehensive.test.tsx** - 测试表格组件使用的工具函数

## 测试组织优势

### 1. 按功能分类，便于维护
- **交互类**：专注用户交互相关的hooks
- **数据处理类**：专注数据操作和业务逻辑
- **样式布局类**：专注UI展示和布局

### 2. 减少重复，提高效率
- 合并了原有的重复测试用例
- 统一了测试数据生成和mock配置
- 避免了多个文件测试同一个hook的冗余

### 3. 完整覆盖，确保质量
- 每个hook都有基础功能测试
- 包含边界情况和异常处理测试
- 添加了hooks之间的集成测试
- 保持了高测试覆盖率

### 4. 易于扩展和维护
- 新的hooks可以轻松归类到对应文件
- 测试结构清晰，便于代码审查
- 集成测试确保hooks协同工作正常

## 已清理的重复文件

为了减少代码重复和维护复杂度，以下文件已被合并或删除：

- `table.hooks.coverage-summary.test.tsx` - 已合并到分类文件中
- `table.hooks.edge-cases.test.tsx` - 测试用例已分散到各分类文件
- `table.hooks.integration.test.tsx` - 已合并到分类文件中
- `hooks-special-cases.test.tsx` - 已合并到相应分类文件
- `hooks-integration.test.tsx` - 已合并到相应分类文件
- 其他重复的hooks单独测试文件

## 运行测试

```bash
# 运行所有测试
pnpm test

# 运行特定的hooks测试
pnpm test packages/components/table/__tests__/table.hooks.interaction.test.tsx
pnpm test packages/components/table/__tests__/table.hooks.data-processing.test.tsx
pnpm test packages/components/table/__tests__/table.hooks.layout-style.test.tsx

# 运行其他功能测试
pnpm test packages/components/table/__tests__/base-table.test.tsx

# 运行测试并查看覆盖率报告
pnpm test:coverage
```

## 测试覆盖率目标

- 语句覆盖率 (Statement Coverage): > 85%
- 分支覆盖率 (Branch Coverage): > 80%
- 函数覆盖率 (Function Coverage): > 90%
- 行覆盖率 (Line Coverage): > 85%

## 注意事项

1. **hooks测试复杂性**: Table组件的hooks涉及复杂的类型系统和API，部分高级功能的hooks测试需要精确的props类型匹配。

2. **测试环境Mock**: 某些功能（如固定列、虚拟滚动等）需要DOM属性mock才能在测试环境中正常工作。

3. **集成测试重要性**: 由于Table组件hooks之间存在复杂的依赖关系，集成测试对确保整体功能正确性至关重要。

4. **持续优化**: 随着组件功能的增加和API的变化，测试文件结构和内容会持续优化和更新。

通过重新组织的测试文件结构，我们能够更高效地维护测试代码，同时确保Table组件的稳定性和可靠性。
