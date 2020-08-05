## Upload 上传

::: demo demos/listType 上传文件列表
:::

::: demo demos/cardType 图片墙
:::

::: demo demos/draggerable 拖拽上传(默认样式)
:::

::: demo demos/customDraggerable 自定义拖拽上传
:::

::: demo demos/customType 完全自定义
:::

### 属性配置

#### Upload Props

| 属性            | 类型                                   | 默认值  | 必传 | 说明                                                     |
| --------------- | -------------------------------------- | ------- | ---- | -------------------------------------------------------- |
| accept          | `string`                               | ''      | N    | 接受上传的文件类型                                       |
| action          | `string | ((file) => Promise<string>)` | N       | Y    | 上传的地址                                               |
| showFileList    | `boolean`                              | true    | N    | 是否展示已上传的文件列表                                 |
| listType        | `string`                               | default | N    | 已上传文件列表类型，支持 `default` 和 `picture` 两种类型 |
| method          | `string`                               | POST    | N    | 上传请求的 http method                                   |
| beforeUpload    | `(file) => Promise<any> | boolean`     | N       | N    | 上传文件之前的钩子，参数为上传的文件，返回值决定是否上传 |
| data            | `object | (file) => object`            | N       | N    | 上传所需额外参数或返回上传额外参数的方法                 |
| headers         | `object`                               | N       | N    | 设置上传的请求头部                                       |
| disabled        | `boolean`                              | false   | N    | 是否禁用                                                 |
| multiple        | `boolean`                              | false   | N    | 是否支持多选文件                                         |
| name            | `string`                               | file    | N    | 发到后台的文件参数名                                     |
| withCredentials | `boolean`                              | false   | N    | 上传请求时是否携带 cookie                                |
| customRequest   | `Function`                             | N       | N    | 覆盖默认的上传行为                                       |
| transformFile   | `Function`                             | N       | N    | 在上传之前转换文件                                       |
| autoUpload      | `boolean`                              | Y       | N    | 是否选取文件后自动上传                                   |
| drag            | `boolean`                              | false   | N    | 是否启用拖拽上传                                         |
| fileList        | `UploadFile[]`                         | []      | N    | 已经上传的文件列表（受控）                               |

#### Upload Events

| 事件名称 | 参数                                                  | 说明                       |
| -------- | ----------------------------------------------------- | -------------------------- |
| change   | `UploadFile[]`                                        | 上传文件改变时的状态       |
| progress | `{ event, file: UploadFile, fileList: UploadFile[] }` | 上传进度变化回调           |
| success  | `{ event, file: UploadFile, fileList: UploadFile[] }` | 上传成功回调               |
| error    | `{ event, file: UploadFile, fileList: UploadFile[] }` | 上传失败回调               |
| preview  | `file: UploadFile`                                    | 列表中点击预览图片时的回调 |

#### Upload Slots

| 插槽名称 | 类型             | 必传 | 说明                 |
| -------- | ---------------- | ---- | -------------------- |
| trigger  | String/Component | Y    | 触发文件选择框的内容 |

### 补充说明

1. `UploadFile` 数据结构

``` js
interface UploadFile extends File {
  uid: string; // 文件唯一标识
  percent?: number; // 文件上传进度（百分比）
  originFileObj?: File | Blob; // 原始文件对象
  status?: 'success' | 'fail' | 'progress'; // 当前文件状态
  response?: any; // 请求的服务端响应内容
  thumbUrl?: string; // 预览地址（如果文件是图片的话）
};
```