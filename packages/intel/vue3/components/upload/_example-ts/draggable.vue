<template>
  <div class="tdesign-demo-block-column-large">
    <div class="tdesign-demo-block-column">
      <div>是否自动上传：<t-switch v-model="autoUpload"></t-switch></div>
      <div>
        <t-radio-group v-model="display" variant="default-filled">
          <t-radio-button value="file">文件拖拽上传</t-radio-button>
          <t-radio-button value="image">图片拖拽上传</t-radio-button>
        </t-radio-group>
      </div>
    </div>

    <!-- data 表示传递给上传接口的额外数据；如果有更复杂的数据场景传递，请使用 format 方法 -->
    <!-- abridgeName 表示省略文件名中间文本，保留两侧。左侧保留的文本数量，右侧保留的文本数量] -->
    <!--
       use fileListDisplay to define any file info
       fileListDisplay={(h, { files }) => <div>{JSON.stringify(files)}</div>}
     -->
    <t-space>
      <t-upload
        v-model="files"
        :auto-upload="autoUpload"
        :theme="display"
        :data="{ extra_data: 123, file_name: 'certificate' }"
        :abridge-name="[10, 8]"
        :format-response="formatResponse"
        draggable
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      />

      <t-upload
        v-model="files2"
        :auto-upload="autoUpload"
        :theme="display"
        :data="{ extra_data: 123, file_name: 'certificate' }"
        :abridge-name="[10, 8]"
        :format-response="formatResponse"
        draggable
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
      />
    </t-space>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { UploadProps } from 'tdesign-vue-next';
function getCurrentDate(needTime = false) {
  const d = new Date();
  let month = d.getMonth() + 1;
  month = month < 10 ? Number(`0${month}`) : month;
  const date = `${d.getFullYear()}-${month}-${d.getDate()}`;
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (needTime) return [date, time].join(' ');
  return date;
}
const autoUpload = ref(true);
const files = ref<UploadProps['value']>([]);
const files2 = ref<UploadProps['value']>([
  {
    name: '默认文件',
    url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
    status: 'success',
    size: 1024,
    // 上传日期，如果接口返回的字段包含 uploadTime，则会以接口返回的为准，默认使用本地电脑时间。
    // 如果希望使用接口返回的上传日期，但是接口字段名不是 uploadTime，则可以使用函数 formatResponse 格式化接口数据
    uploadTime: '2022-09-25',
  },
]);
const display = ref<UploadProps['theme']>('file');

// res.url 图片地址；res.uploadTime 文件上传时间；res.error 上传失败的原因
function formatResponse(res: any) {
  // 响应结果添加上传时间字段，用于 UI 显示
  res.uploadTime = getCurrentDate();
  return res;
}
</script>
