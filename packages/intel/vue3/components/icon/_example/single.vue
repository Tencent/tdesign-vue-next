<template>
  <t-space direction="vertical">
    <t-space break-line style="color: var(--td-brand-color)">
      <letters-t-icon @click="onIconClick" />
      <letters-d-icon />
      <letters-e-icon />
      <letters-s-icon />
      <letters-i-icon />
      <letters-g-icon />
      <letters-n-icon />
    </t-space>
    <t-space break-line>
      <component-checkbox-icon />
      <component-breadcrumb-icon />
      <component-input-icon />
      <component-switch-icon />
      <component-dropdown-icon />
      <component-radio-icon />
      <component-steps-icon />
    </t-space>
  </t-space>
</template>
<script setup>
import {
  LettersTIcon,
  LettersDIcon,
  LettersSIcon,
  LettersEIcon,
  LettersIIcon,
  LettersNIcon,
  LettersGIcon,
  ComponentCheckboxIcon,
  ComponentInputIcon,
  ComponentSwitchIcon,
  ComponentBreadcrumbIcon,
  ComponentDropdownIcon,
  ComponentRadioIcon,
  ComponentStepsIcon,
} from 'tdesign-icons-vue-next';

const onIconClick = () => {
  console.log('icon was clicked.');
};
</script>
