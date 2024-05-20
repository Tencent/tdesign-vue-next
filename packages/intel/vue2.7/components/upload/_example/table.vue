<template>
  <section class="tdesign-demo-upload-multiple" style="width: 570px">
    <header class="tdesign-demo-upload-multiple-header">
      <t-upload
        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
        :data="{ foo: 1, bar: 2 }"
        :files="files"
        :multiple="true"
        :before-upload="beforeUpload"
        @change="handleChange"
        accept="image/*"
      >
        <t-button variant="outline" slot="trigger"><upload-icon slot="icon" />选择文件</t-button>
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
      <div class="tdesign-demo-upload-table-item" v-for="item in files" :key="item.uid">
        <div class="tdesign-demo-upload-table__name">
          <span>{{ item.name }}</span>
        </div>
        <div class="tdesign-demo-upload-table__size">
          <span>{{ getFileSize(item.size) }}</span>
        </div>
        <div class="tdesign-demo-upload-table__status tdesign-demo-upload-table__status--success">
          <icon :name="getIcon(item.status).name" :style="'color:' + getIcon(item.status).fill"></icon>
          <span>{{ getStatusText(item.status) }}</span>
        </div>
        <div class="tdesign-demo-upload-table__operator">
          <t-button variant="text" size="small" @click="handleDelete(item)">删除</t-button>
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
import { UploadIcon, Icon } from 'tdesign-icons-vue';

export default {
  components: {
    UploadIcon,
    Icon,
  },
  data: () => ({
    files: [],
  }),
  methods: {
    handleChange(files) {
      console.log(files);
    },

    handleDelete(file) {
      this.files = this.files.filter((item) => item.uid !== file.uid);
    },

    beforeUpload() {
      return true;
    },

    getStatusText(status) {
      return {
        success: '上传成功',
        fail: '上传失败',
        progress: '上传中',
      }[status];
    },

    getFileSize(size) {
      return `${(size / 1024 / 1024).toFixed(2)}Mb`;
    },

    getIcon(status) {
      return {
        success: { name: 'check-circle-filled', fill: 'green' },
        fail: { name: 'error-circle-filled', fill: '#ff3e00' },
        progress: { name: 'loading', fill: '#0052d9' },
      }[status];
    },
  },
};
</script>
