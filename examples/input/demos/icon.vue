<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input
      prefix-icon="lock-on"
      suffix-icon="prompt"
      type="password"
      @click-prefix-icon="onPrefixIconClick"
      @click-suffix-icon="onSuffixIconClick"
    />
    <!-- 使用 function 或 slot 的形式定义 icon -->
    <t-input type="password" :prefix-icon="renderPrefixIcon" :suffix-icon="renderSuffixIcon" />
    <t-input type="password">
      <template v-slot:prefix-icon>
        <t-icon name="lock-on"></t-icon>
      </template>
      <template v-slot:suffix-icon>
        <t-icon name="prompt"></t-icon>
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
          name: 'lock-on',
        },
      });
    },
    renderSuffixIcon(h) {
      return h('t-icon', {
        props: {
          name: 'prompt',
        },
      });
    },
    onPrefixIconClick(e) {
      console.log('prefix icon clicked', e);
    },
    onSuffixIconClick(e) {
      console.log('suffix icon clicked', e);
    },
  },
};
</script>
