<template>
  <div class="tdesign-demo-item--datepicker">
    <t-date-picker theme="primary" mode="date" clearable :prefix-icon="() => renderPrefixIcon">
      <template #suffixIcon>
        <lock-on-icon></lock-on-icon>
      </template>
    </t-date-picker>
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import { BrowseIcon, LockOnIcon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    LockOnIcon,
  },
  setup() {
    const renderPrefixIcon = () => <BrowseIcon />;

    return {
      renderPrefixIcon,
    };
  },
});
</script>
