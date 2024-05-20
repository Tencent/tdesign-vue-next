<template>
  <t-space>
    <!-- 方式一：使用 options 自定义下拉选项内容 -->
    <t-cascader
      v-model="value1"
      :popupProps="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
      :options="optionsData"
      clearable
    />
    <!-- 方式二：使用插槽自定义下拉选项内容 -->
    <t-cascader
      v-model="value2"
      :popupProps="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
      :options="options"
      style="width: 300px"
    >
      <template v-slot:option="{ item }">
        <div class="tdesign-demo__user-option">
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
          <div class="tdesign-demo__user-option-info">
            <div>{{ item.label }}</div>
            <div>{{ item.value }}</div>
          </div>
        </div>
      </template>
    </t-cascader>
    <!-- 方式三：使用option传参自定义下拉选项内容 -->
    <t-cascader
      v-model="value3"
      :popupProps="{ overlayClassName: 'tdesign-demo-select__overlay-option' }"
      :options="options"
      :option="optionRender"
      style="width: 300px"
    >
    </t-cascader>
  </t-space>
</template>

<script lang="jsx">
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      options: [
        {
          label: '选项一',
          value: '1',
          children: [
            {
              label: '子选项一',
              value: '1.1',
            },
            {
              label: '子选项二',
              value: '1.2',
            },
            {
              label: '子选项三',
              value: '1.3',
            },
          ],
        },
        {
          label: '选项二',
          value: '2',
          children: [
            {
              label: '子选项一',
              value: '2.1',
            },
            {
              label: '子选项二',
              value: '2.2',
            },
          ],
        },
      ],
    };
  },
  computed: {
    optionsData() {
      return this.getDeepOptions(this.options);
    },
  },
  methods: {
    getDeepOptions(options) {
      if (!options) return null;
      return options.map((item) => ({
        ...item,
        children: this.getDeepOptions(item.children),
        // content 自定义下拉选项关键代码
        content: (h) => this.optionRender(h, { item }),
      }));
    },
    optionRender(h, { item }) {
      return (
        <div class="tdesign-demo__user-option">
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" />
          <div class="tdesign-demo__user-option-info">
            <div>{item.label}</div>
            <div>{item.value}</div>
          </div>
        </div>
      );
    },
  },
};
</script>

<style>
.tdesign-demo__user-option {
  display: flex;
}

.tdesign-demo__user-option > img {
  max-width: 40px;
  max-height: 40px;
  border-radius: 50%;
}

.tdesign-demo__user-option-desc {
  font-size: 14px;
  color: var(--td-text-color-secondary);
}

.tdesign-demo__user-option-info {
  margin-left: 16px;
}

.tdesign-demo-select__overlay-option .t-cascader__item {
  height: auto;
  padding: 8px;
}
</style>
