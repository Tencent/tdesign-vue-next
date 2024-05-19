# tree 组件单元测试

## 调试命令

```bash
# 测试覆盖率仅给出摘要
npx jest --config test/script/jest.unit.conf.js ./test/unit/tree

# 输出简单测试覆盖率
JEST_REPORT=simple npx jest --config test/script/jest.unit.conf.js ./test/unit/tree

# 输出详细测试覆盖率
JEST_REPORT=default npx jest --config test/script/jest.unit.conf.js ./test/unit/tree

# 不输出测试覆盖率
JEST_REPORT=none npx jest --config test/script/jest.unit.conf.js ./test/unit/tree
```
