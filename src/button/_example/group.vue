<template>
  <t-space direction="vertical">
    <t-space>
      <t-button-group>
        <t-button>选择</t-button>
        <t-button theme="primary" shape="square" variant="base"><chevron-down-icon slot="icon" /></t-button>
      </t-button-group>
    </t-space>

    <t-space>
      <t-button-group>
        <t-button>按钮1</t-button>
        <t-button>按钮2</t-button>
      </t-button-group>
    </t-space>

    <t-space>
      <t-button-group>
        <t-button theme="warning" shape="square" variant="base"><thumb-up-2-icon slot="icon" /></t-button>
        <t-button theme="warning" shape="square" variant="base"><heart-icon slot="icon" /></t-button>
        <t-button theme="warning" shape="square" variant="base"><star-icon slot="icon" /></t-button>
      </t-button-group>
    </t-space>

    <t-space>
      <t-button-group theme="success">
        <t-button>按钮1</t-button>
        <t-button>按钮2</t-button>
        <t-button>按钮3</t-button>
      </t-button-group>
    </t-space>

    <t-space>
      <t-button-group size="large">
        <t-button>大按钮1</t-button>
        <t-button>大按钮2</t-button>
        <t-button>大按钮2</t-button>
      </t-button-group>
    </t-space>

    <t-space>
      <t-button-group disabled>
        <t-button>禁用按钮1</t-button>
        <t-button>禁用按钮2</t-button>
      </t-button-group>
    </t-space>
  </t-space>
</template>

<script setup lang="ts">
import { ChevronDownIcon, ThumbUp2Icon, HeartIcon, StarIcon } from 'tdesign-icons-vue-next';
</script>
