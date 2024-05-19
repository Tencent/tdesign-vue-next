# How to add a language pack

English | [简体中文](./CONTRIBUTING_zh-CN.md)

Follow these two steps:

## Add translation language pack

### Language pack file naming

Language packs are uniformly named in English. The naming follows the locale regional setting specification and is divided into two parts: language code and region code. The format is `language__country_region`. For example, `en` represents the language code, `US` represents the area code, and the final complete language package name is `en_US`, which represents "English spoken in the United States". Other common locale examples:

| Area Description | Corresponding Code |
|---|---|
| English | en |
| English - United States | en-US |
| Simplified Chinese | zh-CN |
| Traditional Chinese in Taiwan | zh-TW |
| Singapore Simplified Chinese | zh-SG |
| General Arabic | ar-001 |
| Kuwaiti Arabic | ar-KW |

Complete language pack naming reference: https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9F%9F%E8%AE%BE%E7%BD%AE

### start translating

A large number of string variables have been extracted from the component for replacement when the language pack is switched. You can refer to [en_US](./locale/en_US.ts) to translate the corresponding language. If you find an unsupported component string variable, please open a new issue for discussion, and implement the language pack after the component is implemented.

Added new language pack information description in the document: https://github.com/Tencent/tdesign-common/blob/develop/docs/web/api/config-provider.en-US.md#internationalization.

After implementing the language pack, you can initiate a PR in the tdesign-common repository, refer to [tdesign-common #1202](https://github.com/Tencent/tdesign-common/pull/1202).

## Introduce the language pack in the corresponding technology stack warehouse

After the PR in tdesign-common is merged, you need to initiate the corresponding PR to import the language pack in the corresponding technology stack warehouse, refer to [tdesign-vue #2313](https://github.com/Tencent/tdesign-vue/pull/2313 ), you need to initiate a corresponding PR in all technology stack warehouses on the desktop to add new language pack resources imported into common.

## About RTL

There are many languages that follow the writing direction from right to left, such as Arabic, Hebrew, etc., which are not supported in TDesign at present. RTL adaptation may involve the adjustment of the default UI implementation of components. If you need RTL language support Or have experience in RTL adaptation, welcome to discuss in [GitHub discussion](https://github.com/Tencent/tdesign/discussions/343).