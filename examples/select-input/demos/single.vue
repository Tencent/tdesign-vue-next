<template>
  <div>
    <t-select-input :value="selectValue" :visible="visible" variant="text" :on-visible-change="onVisibleChange">
      <template #content>
        <ul class="tdesign-demo__selet-input-ul">
          <li v-for="item in options" :key="item.value" @click="() => onOptionClick(item)">
            <img src="/favicon.ico" /> {{ item.label }}
          </li>
        </ul>
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
  setup() {
    const visible = ref(false);
    const selectValue = ref({ label: 'tdesign-vue', value: 1 });

    const onVisibleChange = (v) => {
      visible.value = v;
    };

    const onOptionClick = (item) => {
      selectValue.value = item;
      visible.value = false;
    };

    return { visible, selectValue, options: OPTIONS, onVisibleChange, onOptionClick };
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
  vertical-align: center;
}

.tdesign-demo__select-input-block {
  display: flex;
  align-items: center;
}

.tdesign-demo__select-input-block > label {
  width: 60px;
}
</style>
