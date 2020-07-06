<template>
  <div>
    <t-switch v-model="checked" active-content="开" inactive-content="关">
    </t-switch>
    <t-switch active-content="开" inactive-content="关">
    </t-switch>
    <br />
    <t-switch v-model="renderChecked" :active-content="renderActiveContent"
              :inactive-content="renderInactiveContent">
    </t-switch>
    <t-switch :active-content="renderActiveContent"
              :inactive-content="renderInactiveContent">
    </t-switch>
    <br />
    <t-switch v-model="slotChecked">
      <template slot="active-content">开</template>
      <template slot="inactive-content">关</template>
    </t-switch>
    <t-switch>
      <template slot="active-content"><t-icon name="tick"/></template>
      <template slot="inactive-content"><t-icon name="close"/></template>
    </t-switch>
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
