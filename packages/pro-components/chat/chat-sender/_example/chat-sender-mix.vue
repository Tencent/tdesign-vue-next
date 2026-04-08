<template>
  <t-chat-sender
    ref="chatSenderRef"
    v-model="inputValue"
    class="chat-sender"
    :textarea-props="{
      placeholder: '请输入消息...',
    }"
    :attachments-props="{
      items: filesList,
      overflow: 'scrollX',
    }"
    :loading="loading"
    @send="inputEnter"
    @file-select="handleUploadFile"
    @file-click="handleFileClick"
    @remove="handleRemoveFile"
  >
    <template #suffix="{ renderPresets }">
      <component :is="renderPresets([{ name: 'uploadImage' }, { name: 'uploadAttachment' }])" />
    </template>
    <template #footer-prefix>
      <div class="model-select">
        <t-tooltip v-model:visible="allowToolTip" content="切换模型" trigger="hover">
          <t-select
            v-model="selectValue"
            :options="selectOptions"
            value-type="object"
            @focus="allowToolTip = false"
          ></t-select>
        </t-tooltip>
        <t-button class="check-box" :class="{ 'is-active': isChecked }" variant="outline" @click="checkClick">
          <SystemSumIcon />
          <span>深度思考</span>
        </t-button>
      </div>
    </template>
    <template #inner-header>
      <div
        :style="{
          display: 'flex',
          width: '100%',
          marginBottom: '8px',
          paddingBottom: '8px',
          justifyContent: 'space-between',
          alignItem: 'center',
          borderBottom: '1px solid var(--td-component-stroke)',
        }"
      >
        <div :style="{ flex: 1, display: 'flex', alignItems: 'center' }">
          <EnterIcon
            :size="'20px'"
            :style="{ color: 'var(--td-text-color-disabled)', transform: 'scaleX(-1)', padding: '6px' }"
          />
          <p :style="{ fontSize: '14px', color: 'var(--td-text-color-placeholder)', marginLeft: '4px' }">
            “牛顿第一定律（惯性定律）仅适用于惯性参考系，而不适用于非惯性参考系。”
          </p>
        </div>
        <CloseIcon
          :size="'20px'"
          :style="{ color: 'var(--td-text-color-disabled)', padding: '6px' }"
          @click="onRemoveRef"
        />
      </div>
    </template>
  </t-chat-sender>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SystemSumIcon, EnterIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { TdAttachmentItem } from '@tdesign-vue-next/chat';
const loading = ref(false);
const allowToolTip = ref(false);
const chatSenderRef = ref(null);
const inputValue = ref('');

const selectOptions = [
  {
    label: '默认模型',
    value: 'default',
  },
  {
    label: 'Deepseek',
    value: 'deepseek-r1',
  },
  {
    label: '混元',
    value: 'hunyuan',
  },
];
const selectValue = ref({
  label: '默认模型',
  value: 'default',
});
const isChecked = ref(false);
const filesList = ref<TdAttachmentItem[]>([
  {
    key: '1',
    name: 'excel-file.xlsx',
    size: 111111,
  },
  {
    key: '2',
    name: 'word-file.docx',
    size: 222222,
  },
  {
    key: '3',
    name: 'image-file.png',
    size: 333333,
  },
  {
    key: '4',
    name: 'pdf-file.pdf',
    size: 444444,
  },
]);
const checkClick = () => {
  isChecked.value = !isChecked.value;
};
// 模拟消息发送
const inputEnter = function () {
  if (loading.value) {
    return;
  }
  if (!inputValue.value) return;
  inputValue.value = '';
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 5000);
};

const handleRemoveFile = (e: CustomEvent<TdAttachmentItem>) => {
  filesList.value = filesList.value.filter((item) => item.key !== e.detail.key);
};

const handleUploadFile = ({ files, name, e }) => {
  console.log('🚀 ~ handleUploadFile ~ eYLog :', e, files, name);
  // 添加新文件并模拟上传进度
  const newFile = {
    size: files[0].size,
    name: files[0].name,
    status: 'progress' as TdAttachmentItem['status'],
    description: '上传中',
  };

  filesList.value = [newFile, ...filesList.value];
  console.log('🚀 ~ handleUploadFile ~ filesListYLog :', filesList);
  setTimeout(() => {
    filesList.value = filesList.value.map((file) =>
      file.name === newFile.name
        ? {
            ...file,
            url: 'https://tdesign.gtimg.com/site/avatar.jpg',
            status: 'success',
            description: `${Math.floor(newFile.size / 1024)}KB`,
          }
        : file,
    );
  }, 1000);
};
const handleFileClick = (e: CustomEvent<TdAttachmentItem>) => {
  console.log('fileClick', e.detail);
};
</script>
<style lang="less">
.chat-sender {
  .btn {
    color: var(--td-text-color-disabled);
    border: none;
    &:hover {
      color: var(--td-brand-color-hover);
      border: none;
      background: none;
    }
  }
  .btn.t-button {
    height: var(--td-comp-size-m);
    padding: 0;
  }
  .model-select {
    display: flex;
    align-items: center;
    .t-select {
      width: 112px;
      height: var(--td-comp-size-m);
      margin-right: var(--td-comp-margin-s);
      .t-input {
        border-radius: 32px;
        padding: 0 15px;
      }
      .t-input.t-is-focused {
        box-shadow: none;
      }
    }
    .check-box {
      width: 112px;
      height: var(--td-comp-size-m);
      border-radius: 32px;
      box-sizing: border-box;
      flex: 0 0 auto;
      .t-button__text {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-left: var(--td-comp-margin-s);
        }
      }
    }
    .check-box.is-active {
      border: 1px solid var(--td-brand-color-focus);
      background: var(--td-brand-color-light);
      color: var(--td-text-color-brand);
    }
  }
}
</style>
