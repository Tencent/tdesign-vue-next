<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <t-tree :data="items" activable hover transition />
    </t-space>
  </t-space>
</template>

<script>
export default {
  data() {
    return {
      items: [
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
      ],
    };
  },
};
</script>
