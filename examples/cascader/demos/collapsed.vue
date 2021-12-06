<template>
  <div>
    <t-cascader
      v-model="value"
      class="t-demo-cascader"
      :options="options"
      :on-remove="handleBlur"
      multiple
      :min-collapsed-num="1"
    />
    <t-cascader
      v-model="value"
      class="t-demo-cascader"
      :options="options"
      :collapsed-items="collapsedItems"
      multiple
      :min-collapsed-num="1"
    />
    <t-cascader v-model="value" class="t-demo-cascader" :options="options" multiple clearable :min-collapsed-num="1">
      <template #collapsedItems="{ collapsedSelectedItems, count }">
        <t-popup>
          <template #content>
            <p v-for="(item, index) in collapsedSelectedItems" :key="index" style="padding: 10px">
              {{ item.label }}
            </p>
          </template>
          <span v-show="count > 0" style="color: #00a870">+{{ count }}</span>
        </t-popup>
      </template>
    </t-cascader>
  </div>
</template>

<script lang="jsx">
import { defineComponent, ref } from 'vue';

const options = [
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
];

export default defineComponent({
  setup() {
    const value = ref(['1.1', '1.2', '1.3']);

    const handleBlur = (e) => {
      console.log(e);
    };

    const collapsedItems = (h, { value, count }) => {
      if (!(value instanceof Array) || !count) return;
      return (
        <t-popup
          v-slots={{
            content: () => (
              <div>
                {value.map((item) => (
                  <p style="padding: 10px;">{item.label}</p>
                ))}
              </div>
            ),
          }}
        >
          <span v-show={count > 0} style="color: #ED7B2F;">
            +{count}
          </span>
        </t-popup>
      );
    };

    return {
      value,
      options,
      handleBlur,
      collapsedItems,
    };
  },
});
</script>
<style scoped>
.t-demo-cascader + .t-demo-cascader {
  margin-top: 16px;
}
</style>
