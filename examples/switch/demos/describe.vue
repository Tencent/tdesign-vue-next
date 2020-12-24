<template>
  <div class="switch-demo">
    <div class="tdesign-demo-block">
      <t-switch v-model="checked" :label="['开', '关']">
      </t-switch>
      <t-switch :label="['开', '关']">
      </t-switch>
    </div>
    <div class="tdesign-demo-block">
      <t-switch v-model="renderChecked" :label="[renderActiveContent, renderInactiveContent]">
      </t-switch>
      <t-switch :label="[renderActiveContent, renderInactiveContent]">
      </t-switch>
    </div>
    <div class="tdesign-demo-block">
      <t-switch v-model="slotChecked">
        <template v-slot:label="slotProps">{{slotProps.value?'开':'关'}}</template>
      </t-switch>
      <t-switch>
        <template v-slot:label="slotProps">
          <template v-if="slotProps.value">
            <t-icon name="tick"/>
          </template>
          <template v-else>
            <t-icon name="close"/>
          </template>
        </template>
      </t-switch>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checked: true,
      renderChecked: true,
      slotChecked: true,
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
    renderActiveContent() {
      return (<t-icon name="tick"/>);
    },
    renderInactiveContent() {
      return (<t-icon name="close"/>);
    },
  },
};
</script>

<style scoped>
.switch-demo .tdesign-demo-block {
  width: 150px;
  display: flex;
  justify-content: space-around;
}
</style>
