<template>
  <div>
    <t-switch size="large">
      <template slot="open">开</template>
      <template slot="close">关</template>
    </t-switch>
    <t-switch size="large">
      <template slot="open"><i class="t-icon t-icon-tick"></i></template>
      <template slot="close"><i class="t-icon t-icon-close"></i></template>
    </t-switch>
    <br />
    <t-switch>
      <template slot="open">开</template>
      <template slot="close">关</template>
    </t-switch>
    <t-switch>
      <template slot="open"><t-icon name="tick"/></template>
      <template slot="close"><t-icon name="close"/></template>
    </t-switch>
    <br />
    <t-switch size="small">
      <template slot="open">开</template>
      <template slot="close">关</template>
    </t-switch>
    <t-switch size="small">
      <template slot="open"><t-icon name="tick"/></template>
      <template slot="close"><t-icon name="close"/></template>
    </t-switch>
  </div>
</template>

<script>

export default {
  data() {
    return {
      checked: true,
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
  },
};
</script>
