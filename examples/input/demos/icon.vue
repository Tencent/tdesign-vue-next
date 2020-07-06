<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input prefix-icon="search" suffix-icon="prompt_fill" />

    <!-- 使用 function 或 slot 的形式定义 icon -->
    <t-input :prefix-icon="renderPrefixIcon" :suffix-icon="renderSuffixIcon" />
    <t-input>
      <template v-slot:prefix-icon>
        <t-icon name="search"></t-icon>
      </template>
      <template v-slot:suffix-icon>
        <t-icon name="prompt_fill"></t-icon>
      </template>
    </t-input>
  </div>
</template>
<script>
export default {
  methods: {
    renderPrefixIcon(h) {
      return h('t-icon', {
        props: {
          name: 'search',
        },
      });
    },
    renderSuffixIcon(h) {
      return h('t-icon', {
        props: {
          name: 'prompt_fill',
        },
      });
    },
  },
};
</script>
