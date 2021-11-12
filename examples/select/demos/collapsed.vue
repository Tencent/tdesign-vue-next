<template>
  <div>
    <!-- 选项过多时，可折叠 -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :minCollapsedNum="1"
      :options="options"
    />
    <br/><br/>

    <!-- 自定义折叠项内容，collapsedItems 为 function (value, count, size) -->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :minCollapsedNum="1"
      :collapsedItems="collapsedItems"
      :options="options"
    />
    <br/><br/>

    <!-- 自定义折叠项内容，collapsedItems 为 插槽(slot) { value, count, size }-->
    <t-select
      v-model="value"
      placeholder="-请选择-"
      multiple
      :minCollapsedNum="1"
      :options="options"
    >
      <template #collapsedItems="{ value, count }">
        <t-popup>
          <template #content>
            <p
              v-for="(item, index) in value"
              :key="index"
              style="padding: 10px;"
            >
              {{item.label}}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00A870;">+{{count}}</span>
        </t-popup>
      </template>
    </t-select>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const options = [{
  label: '选项一',
  value: '1',
}, {
  label: '选项二',
  value: '2',
}, {
  label: '选项三',
  value: '3',
}]

export default defineComponent({
  setup() {
    const value = ref(['1', '3']);

    const collapsedItems = (h, { value, count }) => {
      if (!(value instanceof Array) || !count) return;
      return (
        <t-popup v-slots={{
          content: () =>  {
            value.map((item) => (
              <p style="padding: 10px;">{item.label}</p>
            ))
          },
        }}>
          <span v-show={count > 0} style="color: #ED7B2F;">
            +{count}
          </span>
        </t-popup>
      );
    }

    return {
      options,
      value,
      collapsedItems,
    }
  },
});
</script>
