<template>
  <div class="tdesign-demo-select-input-custom-tag">
    <!-- 单选，使用 valueDisplay 插槽定义选中的某一项的内容，也可使用同名渲染函数 props.valueDisplay -->
    <t-select-input :value="selectValue1" placeholder="Please Select" clearable @clear="onClear">
      <template #valueDisplay>
        <span>
          <img src="/favicon.ico" class="tdesign-demo-select-input__img" />
          {{ selectValue1.label }}
        </span>
      </template>
      <template #panel>
        <ul class="tdesign-demo__selet-input-ul">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="/favicon.ico" /> {{ item.label }}
          </li>
        </ul>
      </template>
    </t-select-input>

    <br /><br />

    <!-- 多选，第一种方式：使用 tag 插槽定义选中的某一项的内容，也可使用同名渲染函数 props.tag -->
    <t-select-input :value="selectValue2" placeholder="Please Select" multiple @tag-change="onTagChange2">
      <template #tag="{ value }">
        <span>
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" class="tdesign-demo-select-input__img" />
          {{ value }}
        </span>
      </template>
      <template #panel>
        <div class="tdesign-demo__select-empty">暂无示意数据</div>
      </template>
    </t-select-input>

    <br /><br />

    <!-- 多选，第二种方式：使用 valueDisplay 插槽定义全部选中项的内容，也可使用同名渲染函数 props.valueDisplay -->
    <t-select-input :value="selectValue3" placeholder="Please Select" multiple @tag-change="onTagChange3">
      <template #valueDisplay="{ value, onClose }">
        <!-- <span><img src="/favicon.ico" class="tdesign-demo-select-input__img" />{{ value }}</span> -->
        <t-tag
          v-for="(item, index) in value"
          :key="item"
          closable
          style="margin-right: 4px"
          @close="() => onClose(index)"
        >
          <img src="https://tdesign.gtimg.com/site/avatar.jpg" class="tdesign-demo-select-input__img" />
          <span>{{ item }}</span>
        </t-tag>
      </template>
      <template #panel>
        <div class="tdesign-demo__select-empty">暂无示意数据</div>
      </template>
    </t-select-input>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

const OPTIONS = [
  { label: 'tdesign-vue', value: 1 },
  { label: 'tdesign-react', value: 2 },
  { label: 'tdesign-miniprogram', value: 3 },
  { label: 'tdesign-angular', value: 4 },
  { label: 'tdesign-mobile-vue', value: 5 },
  { label: 'tdesign-mobile-react', value: 6 },
];

export default defineComponent({
  name: 'SelectInputCustomTag',
  setup() {
    const visible = ref(false);
    const selectValue1 = ref({ label: 'tdesign-vue', value: 1 });
    const selectValue2 = ref(['tdesign-vue', 'tdesign-react']);
    const selectValue3 = ref(['tdesign-vue', 'tdesign-react', 'tdesign-mobile-vue']);

    const onOptionClick = (item) => {
      selectValue1.value = item;
    };

    const onClear = () => {
      selectValue1.value = undefined;
    };

    const onTagChange2 = (val) => {
      selectValue2.value = val;
    };

    const onTagChange3 = (val) => {
      selectValue3.value = val;
    };

    return {
      visible,
      selectValue1,
      selectValue2,
      selectValue3,
      options: OPTIONS,
      onOptionClick,
      onClear,
      onTagChange2,
      onTagChange3,
    };
  },
});
</script>

<style>
.tdesign-demo__selet-input-ul,
.tdesign-demo__selet-input-ul > li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tdesign-demo__selet-input-ul > li {
  line-height: 40px;
  min-width: 200px;
  padding: 0 8px;
}

.tdesign-demo__selet-input-ul > li:hover {
  background-color: var(--td-bg-color-container-hover);
}

.tdesign-demo__selet-input-ul > li > img {
  max-width: 20px;
  max-height: 20px;
  vertical-align: middle;
  margin-right: 8px;
}

.tdesign-demo__select-input-block {
  display: flex;
  align-items: center;
}

.tdesign-demo__select-input-block > label {
  width: 60px;
}

.tdesign-demo-select-input-custom-tag img.tdesign-demo-select-input__img {
  max-width: 18px;
  max-height: 18px;
  margin: 0;
  vertical-align: -4px;
  margin-right: 4px;
}

.tdesign-demo__select-empty {
  text-align: center;
  color: var(--td-text-color-disabled);
  line-height: 32px;
}
</style>
