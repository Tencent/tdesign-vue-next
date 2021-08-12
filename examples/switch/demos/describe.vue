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
      <t-switch v-model="renderChecked2" :label="renderContent">
      </t-switch>
      <t-switch :label="renderContent">
      </t-switch>
    </div>
    <div class="tdesign-demo-block">
      <t-switch v-model="slotChecked">
        <template v-slot:label="slotProps">{{slotProps.value?'开':'关'}}</template>
      </t-switch>
      <t-switch>
        <template v-slot:label="slotProps">
          <template v-if="slotProps.value">
            <t-icon-check />
          </template>
          <template v-else>
            <t-icon-close />
          </template>
        </template>
      </t-switch>
    </div>
  </div>
</template>
<script>

import TIconClose from '@/src/icon/close.tsx';
import TIconCheck from '@/src/icon/check.tsx';

export default {
  components: { TIconClose, TIconCheck },
  data() {
    return {
      checked: true,
      renderChecked: true,
      renderChecked2: true,
      slotChecked: true,
    };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
    renderActiveContent() {
      return (<TIconCheck />);
    },
    renderInactiveContent() {
      return (<TIconClose />);
    },
    renderContent(h, data) {
      return data.value ? (<TIconCheck />) : (<TIconClose />);
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
