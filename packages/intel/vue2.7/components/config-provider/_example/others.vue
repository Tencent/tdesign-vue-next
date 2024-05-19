<template>
  <t-config-provider :globalConfig="globalConfig" class="tdesign-demo-item--locale-provider-base">
    <t-form :data="formData" :rules="rules">
      <t-form-item label="User Name" name="username">
        <t-input
          v-model="formData.username"
          style="width: 400px"
          placeholder="There is no required mark on the left of this input in Form"
        ></t-input>
      </t-form-item>
      <t-form-item label="Password" name="password" requiredMark>
        <t-input
          v-model="formData.password"
          type="password"
          style="width: 400px"
          placeholder="There is required mark on the left of this input in Form"
        ></t-input>
      </t-form-item>
    </t-form>
    <br /><br />

    <t-transfer :data="transferList" v-model="transferTargetValue" :checked.sync="transferChecked" :search="true" />
    <br /><br />

    <t-select :options="options1" placeholder="see clear icon, it is configurable" clearable style="width: 400px" />
    <br /><br />
    <t-select :options="[]" placeholder="select without data in Select" style="width: 400px" />
    <br /><br />
    <t-select placeholder="see loading text in Select" loading style="width: 400px" />
    <br /><br />

    <!-- 观察 placeholder -->
    <t-cascader :options="[]" style="width: 400px" />
    <br /><br />
    <!-- 观察空数据文本呈现 -->
    <t-cascader :options="[]" placeholder="select without data in Cascader" style="width: 400px" />
    <br /><br />
    <!-- 观察加载文本 -->
    <!-- <t-cascader placeholder="see loading text in Cascader" loading style="width: 400px;" /> -->
    <!-- <br><br> -->

    <t-tree-select :data="[]" placeholder="see empty data in TreeSelect" style="width: 400px" />
    <br /><br />
    <t-tree-select :data="[]" loading placeholder="see loading text in TreeSelect" style="width: 400px" />
    <br /><br />
    <t-tree-select
      v-model="treeValue"
      :data="treeOptions"
      filterable
      placeholder="tree select"
      style="width: 400px"
      clearable
    />
    <br /><br />

    <t-time-picker placeholder="select time" format="hh:mm:ss a" allowInput />
    <br /><br /><br />

    <!-- 自定义关闭按钮示例 -->
    <t-tag theme="primary" closable>Feature Tag</t-tag>
    <t-tag theme="success" closable>Feature Tag</t-tag>
    <t-tag theme="warning" closable>Feature Tag</t-tag>
    <t-tag theme="danger" closable>Feature Tag</t-tag>
    <br /><br />

    <!-- 数组件空数据 -->
    <t-tree :data="[]" />
    <br /><br />
    <!-- 数组件自定义层级图标 -->
    <t-tree :data="treeData" transition />
    <br /><br />
    <br />
    <t-steps :current="2" layout="vertical">
      <t-step-item title="First Step" content="You need to click the blue button"></t-step-item>
      <t-step-item title="Second Step" content="Fill your base information into the form"></t-step-item>
      <t-step-item title="Error Step" status="error" content="Something Wrong! Custom Error Icon!"></t-step-item>
      <t-step-item title="Last Step" content="You haven't finish this step."></t-step-item>
    </t-steps>
    <br /><br />

    <t-image src="1.jpg" fit="scale-down" style="width: 300px"></t-image>
  </t-config-provider>
</template>

<script lang="jsx">
import {
  ErrorIcon, ChevronRightIcon, CloseIcon, CloseCircleIcon,
} from 'tdesign-icons-vue';
import { merge } from 'lodash-es'
import enConfig from 'tdesign-vue/es/locale/en_US';

const transferList = [];
for (let i = 0; i < 20; i++) {
  transferList.push({
    value: i.toString(),
    label: `content ${i + 1}`,
    disabled: i % 4 < 1,
  });
}

const SELECT_OPTIONS = [
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shenzhen', value: 'shenzhen' },
];

const TREE_OPTIONS = [
  {
    label: '1',
    value: '1',
    children: [
      { label: '1.1', value: '1.1' },
      { label: '1.2', value: '1.2' },
    ],
  },
  {
    label: '2',
    value: '2',
    children: [
      { label: '2.1', value: '2.1' },
      { label: '2.2', value: '2.2' },
    ],
  },
];

const TREE_DATA = [
  {
    value: '1',
    label: 'Department A',
    children: [
      { label: '1.1 custom fold icon', value: '1.1' },
      { label: '1.2 custom fold icon', value: '1.2' },
    ],
  },
  { value: '2', label: 'Department B', children: [{ label: '2.1' }, { label: '2.2' }] },
];

export default {
  data() {
    return {
      // 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
      globalConfig: merge(enConfig, {
        image: {
          // 全局替换图片地址
          replaceImageSrc(params) {
            console.log(params);
            return 'https://tdesign.gtimg.com/demo/demo-image-1.png';
          },
        },
        form: {
          requiredMark: false,
        },
        transfer: {
          title: '{checked} / {total}',
          empty: 'Empty Data',
          placeholder: 'type keyword to search',
        },
        tree: {
          empty: 'Tree Empty Data',
          folderIcon: (h) => h && <ChevronRightIcon size="18px" />,
        },
        select: {
          empty: 'Empty Data',
          loadingText: 'loading...',
          clearIcon: (h) => h && <CloseIcon />,
        },
        treeSelect: {
          empty: 'Empty Data',
          loadingText: 'loading...',
        },
        timePicker: {
          now: 'Now',
          confirm: 'Confirm',
          anteMeridiem: 'AM',
          postMeridiem: 'PM',
          placeholder: 'select time',
        },
        tag: {
          closeIcon: (h) => h && <CloseCircleIcon />,
        },
        cascader: {
          empty: 'empty data',
          loadingText: 'loading...',
          placeholder: 'select cascader data',
        },
        steps: {
          errorIcon: (h) => h && <ErrorIcon />,
        },
      }),
      transferList,
      transferChecked: [],
      transferTargetValue: [],
      options1: SELECT_OPTIONS.concat(),
      treeValue: '',
      treeOptions: TREE_OPTIONS,
      treeData: TREE_DATA,
      formData: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '此项必填', type: 'error' }],
      },
    };
  },
};
</script>
<style scoped>
.tdesign-demo-item--locale-provider-base {
  margin: 24px -120px 0 0;
}

.tdesign-demo-item--locale-provider-base /deep/ .t-transfer__list {
  width: 280px;
}

.tdesign-demo-item--locale-provider-base >>> .t-tag + .t-tag {
  margin-left: 36px;
}
</style>
