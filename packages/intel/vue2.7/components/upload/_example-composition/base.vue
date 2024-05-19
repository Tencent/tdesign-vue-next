<template>
  <!-- :sizeLimit="1024" 默认单位为：KB 。错误提示为 图片大小不能超过 {sizeLimit} KB-->
  <!-- :sizeLimit="{ size: 2, unit: 'MB' }" -->
  <!-- :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大' }" -->
  <!-- :sizeLimit="{ size: 2, unit: 'MB', message: '图片太大，不能超过 {sizeLimit} MB' }" -->
  <t-space direction="vertical">
    <t-space>
      <t-radio-group v-model="multiple" variant="default-filled">
        <t-radio-button :value="false">单文件上传</t-radio-button>
        <t-radio-button :value="true">多文件上传</t-radio-button>
      </t-radio-group>
    </t-space>
    <t-space>
      <t-checkbox v-model="disabled">禁用状态</t-checkbox>
      <t-checkbox v-if="multiple" v-model="uploadInOneRequest">多个文件一个请求上传</t-checkbox>
      <t-checkbox v-if="multiple" v-model="isBatchUpload">整体替换上传</t-checkbox>
      <t-checkbox v-model="autoUpload">自动上传</t-checkbox>
      <t-button v-if="!autoUpload" variant="base" theme="default" style="height: 22px" @click="uploadFiles">
        点击手动上传
      </t-button>
    </t-space>

    <br />
    <t-space>
      <t-upload
        ref="uploadRef1"
        v-model="files1"
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :placeholder="multiple ? '文件数量不超过 5 个' : '要求文件大小在 1M 以内'"
        :multiple="multiple"
        :auto-upload="autoUpload"
        :upload-all-files-in-one-request="uploadInOneRequest"
        :is-batch-upload="isBatchUpload"
        :size-limit="{ size: 1, unit: 'MB' }"
        :max="5"
        :disabled="disabled"
        :allow-upload-duplicate-file="true"
        @select-change="handleSelectChange"
        @fail="handleFail"
        @success="handleSuccess"
        @one-file-success="onOneFileSuccess"
        @validate="onValidate"
      />

      <t-upload
        ref="uploadRef2"
        v-model="files2"
        :multiple="multiple"
        :disabled="disabled"
        :auto-upload="autoUpload"
        :upload-all-files-in-one-request="uploadInOneRequest"
        :is-batch-upload="isBatchUpload"
        :trigger-button-props="{ theme: 'primary', variant: 'base' }"
        placeholder="这是一段没有文件时的占位文本"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :style="{ marginLeft: '40px' }"
        @fail="handleFail"
      />

      <!-- formatResponse 可控制上传成功或者失败 -->
      <!-- tips="文件上传失败示例" 和 status="error" 控制固定文本显示 -->
      <t-upload
        ref="uploadRef3"
        v-model="files3"
        :multiple="multiple"
        :disabled="disabled"
        :auto-upload="autoUpload"
        :upload-all-files-in-one-request="uploadInOneRequest"
        :is-batch-upload="isBatchUpload"
        :format-response="formatResponse"
        placeholder="文件上传失败示例"
        action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :style="{ marginLeft: '60px' }"
        @fail="handleFail"
      >
        <!-- 自定义文件列表，示例代码有效，勿删 -->
        <!-- <template #fileListDisplay="{ files }">
          <div>
            <div
              v-for="(file, index) in files"
              :key="file.name"
              class="t-upload__single-display-text t-upload__display-text--margin"
            >
              {{file.name}}（{{file.size}} B）
              <CloseIcon class="t-upload__icon-delete" @click="() => outsideRemove(index)" />
            </div>
          </div>
        </template> -->
      </t-upload>
    </t-space>
  </t-space>
</template>
<script setup>
import { MessagePlugin } from 'tdesign-vue';
import { ref, watch } from 'vue';

const uploadRef1 = ref();
const uploadRef2 = ref();
const uploadRef3 = ref();
const files1 = ref([]);
const files2 = ref([
  {
    name: '这是一个默认文件',
    status: 'success',
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    size: 1000,
  },
]);
const files3 = ref([]);
const multiple = ref(false);
const uploadInOneRequest = ref(false);
const autoUpload = ref(true);
const isBatchUpload = ref(false);
const disabled = ref(false);
const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};
const handleSelectChange = (files) => {
  console.log('onSelectChange', files);
};
const handleSuccess = (params) => {
  console.log(params);
  MessagePlugin.success('上传成功');
};
const onOneFileSuccess = (params) => {
  console.log('onOneFileSuccess', params);
};
const onValidate = (params) => {
  const { files, type } = params;
  console.log('onValidate', type, files);
  const messageMap = {
    FILE_OVER_SIZE_LIMIT: '文件大小超出限制，已自动过滤',
    FILES_OVER_LENGTH_LIMIT: '文件数量超出限制，仅上传未超出数量的文件',
    // if you need same name files, setting allowUploadDuplicateFile={true} please
    FILTER_FILE_SAME_NAME: '不允许上传同名文件',
    BEFORE_ALL_FILES_UPLOAD: 'beforeAllFilesUpload 方法拦截了文件',
    CUSTOM_BEFORE_UPLOAD: 'beforeUpload 方法拦截了文件',
  };
  // you can also set Upload.tips and Upload.status to show warning message.
  messageMap[type] && MessagePlugin.warning(messageMap[type]);
};
// 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
// error 为真时，组件会判定为上传失败
const formatResponse = (res) => ({
  error: '上传失败，请重试',
  url: res.url,
});
// const outsideRemove = (index) => {
//   files3.value.splice(index, 1);
// };
const uploadFiles = () => {
  uploadRef1.value.uploadFiles();
  uploadRef2.value.uploadFiles();
  uploadRef3.value.uploadFiles();
};
/** 单个文件校验方法，示例代码有效，勿删 */
// const beforeUpload = (file) => {
//   MessagePlugin.error(`文件 ${file.name} 不满足条件`);
//   return false;
// };
/** 全部文件一次性校验方法，示例代码有效，勿删 */
// const beforeAllFilesUpload = () => {
//   MessagePlugin.error('文件不满足条件');
//   return false;
// };
watch(multiple, (val) => {
  files3.value = val
    ? [
      {
        name: '这是一个上传成功的文件',
        status: 'success',
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
        size: 1000,
      },
      {
        name: '这是一个上传中的文件',
        status: 'progress',
        percent: 30,
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
        size: 1000,
      },
      {
        name: '这是一个上传失败的文件',
        status: 'fail',
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
        size: 1000,
      },
      {
        name: '这是一个等待上传的文件',
        status: 'waiting',
        url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
        size: 1000,
      },
    ]
    : [];
});
</script>
