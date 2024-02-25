<template>
  <t-space direction="vertical">
    <t-space align="center">
      <label>StyleA</label>
      <t-check-tag v-model="checked1" style="margin-right: 32px">选中/未选态</t-check-tag>
      <t-check-tag :checked="true">选中态</t-check-tag>
      <t-check-tag :checked="false">未选态</t-check-tag>
      <t-check-tag :checked="true" disabled>选中禁用</t-check-tag>
      <t-check-tag :checked="false" disabled>未选禁用</t-check-tag>
    </t-space>

    <t-space align="center">
      <label>StyleB</label>
      <t-check-tag v-model="checked2" :unchecked-props="STYLE_B_UNCHECKED_PROPS" style="margin-right: 32px"
        >选中/未选态</t-check-tag
      >
      <t-check-tag :checked="true">选中态</t-check-tag>
      <t-check-tag :checked="false" :unchecked-props="STYLE_B_UNCHECKED_PROPS">未选态</t-check-tag>
      <t-check-tag :checked="true" disabled>选中禁用</t-check-tag>
      <t-check-tag :checked="false" disabled :unchecked-props="STYLE_B_UNCHECKED_PROPS">未选禁用</t-check-tag>
    </t-space>

    <t-space align="center">
      <label>StyleC</label>
      <t-check-tag
        v-model="checked3"
        :checked-props="STYLE_C_CHECKED_PROPS"
        :unchecked-props="STYLE_B_UNCHECKED_PROPS"
        style="margin-right: 32px"
        >Outline Tag</t-check-tag
      >
      <t-check-tag :checked="true" :checked-props="STYLE_C_CHECKED_PROPS">Checked</t-check-tag>
      <t-check-tag :checked="false" :unchecked-props="STYLE_B_UNCHECKED_PROPS">Unchecked</t-check-tag>
      <t-check-tag :checked="true" disabled :checked-props="STYLE_C_CHECKED_PROPS">Disabled</t-check-tag>
      <t-check-tag :checked="false" disabled :unchecked-props="STYLE_B_UNCHECKED_PROPS">Disabled</t-check-tag>
    </t-space>
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { CheckTagProps } from 'tdesign-vue-next';
const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);
const STYLE_B_UNCHECKED_PROPS: CheckTagProps['uncheckedProps'] = {
  theme: 'default',
  variant: 'outline',
};
const STYLE_C_CHECKED_PROPS: CheckTagProps['checkedProps'] = {
  theme: 'primary',
  variant: 'outline',
};
</script>
