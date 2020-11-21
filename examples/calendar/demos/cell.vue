<template>
  <t-calendar>
    <div slot="cell" slot-scope="scope">
      {{ getDateStr(scope.data.date) }}
    </div>
  </t-calendar>
</template>

<script>
export default {
  methods: {
    getDateStr(dt) {
      const y = dt.getFullYear();
      const m = dt.getMonth();
      const d = dt.getDate();
      return `${y}-${m}-${d}`;
    },
  },
};
</script>
