<template>
  <div class="tdesign-tree-base">
    <t-tree :data="items" activable hover transition />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const items = [
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
];

export default defineComponent({
  setup() {
    return {
      items,
    };
  },
});
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>
