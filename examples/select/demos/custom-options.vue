<template>
  <div class="tdesign-demo-select-options">
    <!-- 方式一：使用 options 自定义下拉选项内容 -->
    <t-select
      v-model="value1"
      :options="optionsData"
      :popup-props="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
      placeholder="请选择"
    />
    <br /><br />

    <!-- 方式二：使用插槽自定义下拉选项内容 -->
    <t-select
      v-model="value2"
      placeholder="请选择"
      :popup-props="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
    >
      <t-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label">
        <div class="tdesign-demo__user-option">
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
          <div class="tdesign-demo__user-option-info">
            <div>{{ item.label }}</div>
            <div class="tdesign-demo__user-option-desc">
              {{ item.description }}
            </div>
          </div>
        </div>
      </t-option>
    </t-select>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref, computed } from 'vue';

const options = [
  { label: '用户一', value: '1', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户二', value: '2', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户三', value: '3', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户四', value: '4', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户五', value: '5', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户六', value: '6', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户七', value: '7', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户八', value: '8', description: '这是一段用户描述信息，可自定义内容' },
  { label: '用户九', value: '9', description: '这是一段用户描述信息，可自定义内容' },
];

export default defineComponent({
  setup() {
    const value1 = ref([]);
    const value2 = ref([]);
    const optionRender = (h, option) => (
      <div class="tdesign-demo__user-option">
        <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
        <div class="tdesign-demo__user-option-info">
          <div>{option.label}</div>
          <div class="tdesign-demo__user-option-desc">{option.description}</div>
        </div>
      </div>
    );
    const optionsData = computed(() =>
      options.map((item) => ({
        ...item,
        // options 自定义下拉选项关键代码
        content: (h) => optionRender(h, item),
      })),
    );

    return {
      value1,
      value2,
      options,
      optionsData,
    };
  },
});
</script>

<style>
.tdesign-demo__user-option {
  display: flex;
}

.tdesign-demo__user-option > img {
  max-width: 40px;
  border-radius: 50%;
}

.tdesign-demo__user-option-desc {
  font-size: 13px;
  color: var(--td-gray-color-9);
}

.tdesign-demo__user-option-info {
  margin-left: 16px;
}

.tdesign-demo-select__overlay-option .t-select-option {
  height: 60px;
}
</style>
