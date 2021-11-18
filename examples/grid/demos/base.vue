<template>
  <div class="tdesign-demo-item--grid">
    <t-row
      v-for="(i, idx) in demoCols"
      :key="idx"
    >
      <t-col
        v-for="(j, jdx) in i"
        :key="jdx"
        :span="j"
      >
        <div>{{ j }}</div>
      </t-col>
    </t-row>
  </div>
</template>

<script>
const demoCols = [
  Array(12).fill(1),
  Array(6).fill(2),
  Array(4).fill(3),
  Array(3).fill(4),
  Array(2).fill(6),
  Array(1).fill(12),
];
export default {
  setup() {
    return {
      demoCols,
    };
  },
};
</script>
