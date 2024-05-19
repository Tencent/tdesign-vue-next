<template>
  <t-space direction="vertical" class="t-demo-autocomplete-option">
    <!-- 使用 options 自定义下拉选项 -->
    <t-auto-complete
      v-model="value1"
      :options="options1"
      :popup-props="{ overlayClassName: 't-demo-autocomplete-option-list' }"
      placeholder="使用属性自定义联想词选项内容"
    />

    <!-- 使用插槽自定义下拉选项 -->
    <t-auto-complete
      v-model="value2"
      :options="options2"
      :popup-props="{ overlayClassName: 't-demo-autocomplete-option-list' }"
      placeholder="使用插槽自定义联想词选项内容"
    >
      <template #option="{ option }">
        <div class="custom-option">
          <img :src="option.avatar" />
          <div class="custom-option__main">
            <t-highlight-option :content="option.text" :keyword="value2" />
            <small class="description">{{ option.description }}</small>
          </div>
        </div>
      </template>
    </t-auto-complete>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref, computed } from 'vue';
import { HighlightOption as THighlightOption, AutoCompleteProps } from 'tdesign-vue-next';
const TEXTS = ['第一个默认联想词', '第二个默认联想词', '第三个默认联想词'];
const value1 = ref('');
const value2 = ref('');
const options2 = ref<AutoCompleteProps['options']>([
  {
    label: '第一个默认联想词',
    description: '这是关于联想词的描述。使用插槽渲染',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    label: '第二个默认联想词',
    description: '这是关于联想词的描述。使用插槽渲染',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
  {
    label: '第三个默认联想词',
    description: '这是关于联想词的描述。使用插槽渲染',
    avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  },
]);
const options1 = computed<AutoCompleteProps['options']>(() =>
  TEXTS.map((text) => ({
    text,
    label: () => (
      <div class="custom-option">
        <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
        <div class="custom-option__main">
          <THighlightOption content={text} keyword={value1.value} />
          <small class="description">这是关于联想词的描述，使用 Props 属性渲染</small>
        </div>
      </div>
    ),
  })),
);
</script>

<style>
.t-demo-autocomplete-option-list .t-select-option {
  height: 50px;
}

.t-demo-autocomplete-option-list .custom-option {
  display: flex;
  align-items: center;
}

.t-demo-autocomplete-option-list .custom-option > img {
  max-height: 40px;
  border-radius: 50%;
}

.t-demo-autocomplete-option-list .custom-option__main {
  margin-left: 8px;
}

.t-demo-autocomplete-option-list .custom-option .description {
  color: var(--td-gray-color-9);
}
</style>
