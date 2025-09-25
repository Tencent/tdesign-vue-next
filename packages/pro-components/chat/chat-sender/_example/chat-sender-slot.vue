<template>
  <t-chat-sender
    ref="chatSenderRef"
    v-model="inputValue"
    class="chat-sender"
    :textarea-props="{
      placeholder: options.filter((item) => item.value === scene)[0].placeholder,
    }"
    :loading="loading"
    @send="inputEnter"
  >
    <template #suffix>
      <!-- 监听键盘回车发送事件需要在sender组件监听 -->
      <t-button theme="default" variant="text" size="large" class="btn" @click="inputEnter"> 发送 </t-button>
    </template>
    <template #input-prefix>
      <t-dropdown :options="options" trigger="click" :style="{ padding: 0 }" @click="switchScene">
        <t-tag shape="round" variant="light" color="#0052D9" :style="{ marginRight: '4px', cursor: 'pointer' }">
          {{ options.filter((item) => item.value === scene)[0].content }}
        </t-tag>
      </t-dropdown>
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
        <t-button
          class="check-box"
          theme="default"
          :class="{ 'is-active': isChecked }"
          variant="outline"
          @click="checkClick"
        >
          <SystemSumIcon />
          <span>深度思考</span>
        </t-button>
      </div>
    </template>
    <template #inner-header>
      <t-space
        :style="{
          width: '100%',
          marginBottom: '12px',
          padding: '4px 0',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          borderBottom: '1px solid #e7e7e7',
        }"
      >
        <t-space size="small">
          <EnterIcon :size="'14px'" :style="{ color: 'rgba(0, 0, 0, 0.26)', transform: 'scaleX(-1)' }" />
          <span :style="{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.4)' }">引用一段文字</span>
        </t-space>
        <div :style="{ marginLeft: 'auto', width: '16px' }" @click="onRemoveRef">
          <CloseIcon :size="'14px'" :style="{ color: 'rgba(0, 0, 0, 0.26)' }" />
        </div>
      </t-space>
    </template>
  </t-chat-sender>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { SystemSumIcon, EnterIcon, CloseIcon } from 'tdesign-icons-vue-next';
const loading = ref(false);
const allowToolTip = ref(false);
const chatSenderRef = ref(null);
const inputValue = ref('');
const options = [
  {
    content: '帮我写作',
    value: 1,
    placeholder: '输入你要撰写的主题',
  },
  {
    content: '图像生成',
    value: 2,
    placeholder: '说说你的创作灵感',
  },
  {
    content: '网页摘要',
    value: 3,
    placeholder: '输入你要解读的网页地址',
  },
];
const scene = ref(1);
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
const switchScene = (data: any) => {
  scene.value = data.value;
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
      // border: 0;
      // background: var(--td-bg-color-component);
      color: var(--td-text-color-primary);
      box-sizing: border-box;
      flex: 0 0 auto;
      .t-button__text {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-left: var(--td-comp-margin-xs);
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
