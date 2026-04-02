<template>
  <t-space direction="vertical">
    <t-space align="center">
      <label>StyleA</label>
      <t-check-tag-group v-model="checkTagValue1" :options="options" />
    </t-space>

    <t-space align="center">
      <label>StyleB</label>
      <t-check-tag-group
        v-model="checkTagValue2"
        :options="options"
        :unchecked-props="STYLE_B_UNCHECKED_PROPS"
        multiple
      />
    </t-space>

    <t-space align="center">
      <label>StyleC</label>
      <t-check-tag-group
        v-model="checkTagValue3"
        :options="options"
        :checked-props="STYLE_C_CHECKED_PROPS"
        :unchecked-props="STYLE_B_UNCHECKED_PROPS"
        multiple
      />
    </t-space>

    <t-space align="center">
      <label>CustomContent</label>
      <t-check-tag-group
        v-model="checkTagValue4"
        :options="options2"
        :checked-props="STYLE_C_CHECKED_PROPS"
        :unchecked-props="STYLE_B_UNCHECKED_PROPS"
        multiple
      >
        <template #option="{ label, value, avatar }">
          <div>
            <img :src="avatar" class="avatar" />
            <span>{{ label }}({{ value }})</span>
          </div>
        </template>
      </t-check-tag-group>
    </t-space>
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CheckTagGroupOption, CheckTagGroupProps } from 'tdesign-vue-next';
const STYLE_B_UNCHECKED_PROPS: CheckTagGroupProps['uncheckedProps'] = {
  theme: 'default',
  variant: 'outline',
};
const STYLE_C_CHECKED_PROPS: CheckTagGroupProps['checkedProps'] = {
  theme: 'primary',
  variant: 'outline',
};
const checkTagValue1 = ref([1]);
const checkTagValue2 = ref([2]);
const checkTagValue3 = ref([3]);
const checkTagValue4 = ref([4, 6]);
const options: CheckTagGroupProps['options'] = [
  {
    label: '标签1',
    value: 1,
  },
  {
    label: '标签2',
    value: 2,
  },
  {
    label: () => <span>标签3</span>,
    value: 3,
  },
  {
    label: '标签4',
    value: 4,
  },
  {
    label: '标签5',
    value: '5',
  },
  {
    label: '标签6',
    value: 6,
  },
];
const AVATAR = 'https://tdesign.gtimg.com/site/avatar.jpg';
const options2: (CheckTagGroupOption & {
  avatar: string;
})[] = [
  {
    label: 'TAG_A',
    value: 1,
    avatar: AVATAR,
  },
  {
    label: 'TAG_B',
    value: 2,
    avatar: AVATAR,
  },
  {
    label: 'TAG_C',
    value: 3,
    avatar: AVATAR,
  },
  {
    label: 'TAG_D',
    value: 4,
    avatar: AVATAR,
  },
  {
    label: 'TAG_E',
    value: '5',
    avatar: AVATAR,
  },
  {
    label: 'TAG_F',
    value: 6,
    avatar: AVATAR,
  },
];
</script>

<style lang="less" scoped>
.avatar {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  vertical-align: -4px;
  margin-right: 4px;
}
</style>
