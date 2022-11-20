<template>
  <t-space direction="vertical" class="t-demo-autocomplete-option">
    <!-- 使用 options 自定义下拉选项 -->
    <t-auto-complete
      v-model="value1"
      :options="options1"
      :popup-props="{ overlayClassName: 't-demo-autocomplete-option-list' }"
      placeholder="使用属性自定义联想词选项内容"
      @change="onChange"
    />

    <!-- 使用插槽自定义下拉选项 -->
    <t-auto-complete
      v-model="value2"
      :options="options2"
      :popup-props="{ overlayClassName: 't-demo-autocomplete-option-list' }"
      placeholder="使用插槽自定义联想词选项内容"
      @change="onChange"
    >
      <template #option="{ option }">
        <div class="custom-option">
          <img :src="option.avatar" />
          <div class="custom-option__main">
            <!-- highlightKeyword -->
            <t-highlight-option :content="option.text" :keyword="value2" />
            <small class="description">{{ option.description }}</small>
          </div>
        </div>
      </template>
    </t-auto-complete>
  </t-space>
</template>

<!-- lang="jsx" 重要  -->
<script setup lang="jsx">
import { ref, computed } from 'vue';
import { HighlightOption as THighlightOption } from 'tdesign-vue-next';

const TEXTS = ['第一个默认联想词', '第二个默认联想词', '第三个默认联想词'];

const value1 = ref('');
const value2 = ref('');
const options2 = ref([
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

const options1 = computed(() =>
  TEXTS.map((text) => ({
    text,
    label: () => (
      <div class="custom-option">
        <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
        <div class="custom-option__main">
          <t-highlight-option content={text} keyword={this.value1} />
          <small class="description">这是关于联想词的描述，使用 Props 属性渲染</small>
        </div>
      </div>
    ),
  })),
);

// 输入框内容发生变化时进行搜索，200ms 搜索一次
function onChange(value) {
  clearTimeout(this.timer);
  this.timer = setTimeout(() => {
    const text = '搜索联想词';
    const pureValue = value.replace(`第一个${text}`, '').replace(`第二个${text}`, '').replace(`第三个${text}`, '');

    this.options = [`${pureValue}第一个${text}`, `${pureValue}第二个${text}`, `${pureValue}第三个${text}`];
    clearTimeout(this.timer);
  }, 200);
}
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
