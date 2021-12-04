<template>
  <div class="tdesign-demo-block">
    <t-alert theme="success" message="这是一条成功的消息提示" />
    <t-alert theme="info" message="这是一条普通的消息提示" />
    <t-alert theme="warning" message="这是一条警示消息提示" />
    <t-alert theme="error" message="高危操作/出错信息提示" />
    <t-alert theme="warning" :icon="warningIcon" message="这是一条警示信息(以function形式自定义icon)" />
    <t-alert theme="error" message="高危操作/出错信息提示(以slot形式自定义icon)">
      <template #icon>
        <icon name="error-circle-filled" />
      </template>
    </t-alert>
  </div>
</template>
<script lang="jsx">
import { defineComponent } from 'vue';
import { Icon } from 'tdesign-icons-vue-next';

export default defineComponent({
  components: {
    Icon,
  },
  setup() {
    return {
      warningIcon: () => <Icon name="error-circle-filled" />,
    };
  },
});
</script>
