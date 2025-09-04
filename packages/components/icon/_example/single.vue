<template>
  <t-space direction="vertical">
    <t-slider v-model="strokeWidth" :step="0.5" :min="0.5" :max="2.5" style="width: 200px"></t-slider>
    <t-space break-line style="color: var(--td-brand-color)">
      <letters-t-icon :stroke-width="strokeWidth" @click="onIconClick" />
      <letters-d-icon :stroke-width="strokeWidth" />
      <letters-e-icon :stroke-width="strokeWidth" />
      <letters-s-icon :stroke-width="strokeWidth" />
      <letters-i-icon :stroke-width="strokeWidth" />
      <letters-g-icon :stroke-width="strokeWidth" />
      <letters-n-icon :stroke-width="strokeWidth" />
    </t-space>

    <t-space break-line>
      <component-checkbox-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-breadcrumb-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-input-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-switch-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-dropdown-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-radio-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
      <component-steps-icon
        :stroke-width="strokeWidth"
        :stroke-color="['#00000', '#0052d9']"
        :fill-color="['#bbd3fb', '#f78d94']"
      />
    </t-space>
  </t-space>
</template>
<script setup>
import { ref } from 'vue';
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

const strokeWidth = ref(2);

const onIconClick = () => {
  console.log('icon was clicked.');
};
</script>
