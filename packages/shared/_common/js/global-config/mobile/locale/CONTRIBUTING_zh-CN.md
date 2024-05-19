# 如何新增语言包

[English](./CONTRIBUTING.md) | 简体中文

参照以下两个步骤：

## 新增翻译语言包

### 语言包文件命名

语言包统一以英文命名，命名遵循 locale 区域设置规范，分为语言编码和地区编码两部分，格式为 `language_CountryRegion`。比如 `en` 表示语言编码，`US` 表示地区编码，最终完整语言包名为 `en_US` 表示“美国讲的英语”。其他常见 locale 例子：

| 区域描述         | 对应 Code |
| ---------------- | --------- |
| 英语             | en        |
| 英语 - 美国      | en_US     |
| 简体中文         | zh_CN     |
| 台湾地区繁体中文 | zh_TW     |
| 新加坡简体中文   | zh_SG     |
| 通用阿拉伯语     | ar_001    |
| 科威特阿拉伯语   | ar_KW     |

完整语言包命名参考：https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9F%9F%E8%AE%BE%E7%BD%AE

### 着手翻译

组件中已经抽取了大量字符串变量，供语言包切换时替换，你可以参考 [en_US](./locale/en_US.ts) 来进行对应语言的翻译工作。如果你发现有未支持的组件字符串变量，请新开一个 issue 讨论，待组件实现后再实现语言包。

文档中补充新增语言包信息描述：https://github.com/Tencent/tdesign-mobile-vue/blob/develop/src/config-provider/config-provider.md。

实现语言包后可以在仓库中发起 PR。

## 关于 RTL

有很多语言遵循由右到左的书写方向，如 阿拉伯语、希伯来语等，目前 TDesign 中还未支持，RTL 适配可能涉及对组件默认 UI 实现的调整，如果你对 RTL 语言支持有需求或者对 RTL 适配有经验，欢迎在 [GitHub discussion](https://github.com/Tencent/tdesign/discussions/343) 讨论。
