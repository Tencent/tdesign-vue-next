<template>
  <t-calendar>
    <div slot="cellAppend" slot-scope="scope">
      <div style="color:#00935D; background-color: #DFF7ED; text-align: center; font-weight:700; margin:4px; padding:4px">
        {{ getDateStr(scope.data.date) }}
      </div>
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
