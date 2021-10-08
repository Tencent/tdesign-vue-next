<template>
  <t-calendar
    :head="renderHead"
    :cell="renderCell"
  >
  </t-calendar>
</template>

<script lang="jsx">
export default {
  methods: {
    renderHead(h, params) {
      let title = params.filterDate.getFullYear();
      if (params.mode === 'month') {
        title += `-${params.filterDate.getMonth() + 1}`;
      }
      title += ' 工作安排';
      return <h1 style="color:#0052D9">{title}</h1>;
    },
    renderCell(h, params) {
      return h(
        'span',
        {
          style: {
            fontWeight: params.isCurrent ? 700 : 500,
          },
          on: {
            click: () => {
              console.info(params);
            },
          },
        },
        params.formattedDate,
      );
    },
  },
};
</script>
