<template>
  <section class="tdesign-demo-upload-multiple" style="width: 570px">
    <header class="tdesign-demo-upload-multiple-header">
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :data="{ foo: 1, bar: 2 }"
        :files="files"
        :multiple="true"
        :before-upload="beforeUpload"
        accept="image/*"
        @change="handleChange"
      >
        <template #trigger>
          <t-button variant="outline">
            <template #icon> <upload-icon />选择文件 </template>
          </t-button>
        </template>
      </t-upload>
    </header>

    <div class="tdesign-demo-upload-table">
      <div class="tdesign-demo-upload-table-header">
        <div class="tdesign-demo-upload-table__name">文件名</div>
        <div class="tdesign-demo-upload-table__size">大小</div>
        <div class="tdesign-demo-upload-table__status">状态</div>
        <div class="tdesign-demo-upload-table__operator">操作</div>
      </div>
      <div v-if="!files.length" class="tdesign-demo-upload-table--empty">
        <p>点击上方“选择文件”或将文件拖拽到此区域</p>
      </div>
      <div v-for="item in files" :key="item.uid" class="tdesign-demo-upload-table-item">
        <div class="tdesign-demo-upload-table__name">
          <span>{{ item.name }}</span>
        </div>
        <div class="tdesign-demo-upload-table__size">
          <span>{{ getFileSize(item.size) }}</span>
        </div>
        <div class="tdesign-demo-upload-table__status tdesign-demo-upload-table__status--success">
          <t-icon :name="getIcon(item.status).name" :style="'color:' + getIcon(item.status).fill" />
          <span>{{ getStatusText(item.status) }}</span>
        </div>
        <div class="tdesign-demo-upload-table__operator">
          <t-button variant="text" size="small" @click="handleDelete(item)"> 删除 </t-button>
        </div>
      </div>
    </div>

    <div class="tdesign-demo-upload-bottom">
      <button class="t-button t-button--line">取消</button>
      <button class="t-button t-button--primary">开始上传</button>
    </div>
  </section>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { UploadIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    UploadIcon,
  },
  setup() {
    const files = ref([]);

    const handleChange = (files) => {
      console.log(files);
    };

    const handleDelete = (file) => {
      files.value = files.value.filter((item) => item.uid !== file.uid);
    };

    const beforeUpload = () => true;

    const getStatusText = (status) =>
      ({
        success: '上传成功',
        fail: '上传失败',
        progress: '上传中',
      }[status]);

    const getFileSize = (size) => `${(size / 1024 / 1024).toFixed(2)}Mb`;

    const getIcon = (status) =>
      ({
        success: { name: 'check-circle-filled', fill: 'green' },
        fail: { name: 'error-circle-filled', fill: '#ff3e00' },
        progress: { name: 'loading', fill: '#0052d9' },
      }[status]);

    return {
      files,
      handleChange,
      handleDelete,
      beforeUpload,
      getStatusText,
      getFileSize,
      getIcon,
    };
  },
});
</script>
