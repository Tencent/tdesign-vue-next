<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form>
        <t-form-item label="可选" style="margin-bottom: 16px">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="严格模式" style="margin-bottom: 16px">
          <t-switch v-model="checkStrictly" />
        </t-form-item>
        <t-form-item label="选中值模式" style="margin-bottom: 16px">
          <t-radio-group name="value-mode" variant="default-filled" v-model="valueMode">
            <t-radio-button v-for="item in valueOptions" :key="item.value" :value="item.value">{{ item.label }}</t-radio-button>
          </t-radio-group>
        </t-form-item>
      </t-form>
    </div>
    <t-tree
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :value-mode="valueMode"
      @change="onChange"
      @click="onClick"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueMode: 'onlyLeaf',
      checkable: true,
      checkStrictly: false,
      valueOptions: [
        {
          value: 'onlyLeaf',
          label: 'onlyLeaf',
        },
        {
          value: 'parentFirst',
          label: 'parentFirst',
        },
        {
          value: 'all',
          label: 'all',
        },
      ],
      items: [{
        value: '1',
        label: '1',
        children: [{
          value: '1.1',
          label: '1.1',
          children: [{
            value: '1.1.1',
            label: '1.1.1',
            children: [{
              value: '1.1.1.1',
              label: '1.1.1.1',
            }, {
              value: '1.1.1.2',
              label: '1.1.1.2',
            }],
          }, {
            value: '1.1.2',
            label: '1.1.2',
            children: [{
              value: '1.1.2.1',
              label: '1.1.2.1',
            }, {
              value: '1.1.2.2',
              label: '1.1.2.2',
            }],
          }],
        }, {
          value: '1.2',
          label: '1.2',
          children: [{
            value: '1.2.1',
            label: '1.2.1',
            children: [{
              value: '1.2.1.1',
              label: '1.2.1.1',
            }, {
              value: '1.2.1.2',
              label: '1.2.1.2',
            }],
          }, {
            value: '1.2.2',
            label: '1.2.2',
            children: [{
              value: '1.2.2.1',
              label: '1.2.2.1',
            }, {
              value: '1.2.2.2',
              label: '1.2.2.2',
            }],
          }],
        }],
      }, {
        value: '2',
        label: '2',
        children: [{
          value: '2.1',
          label: '2.1',
        }, {
          value: '2.2',
          label: '2.2',
        }],
      }],
    };
  },
  methods: {
    onClick(context) {
      console.info('onClick:', context);
    },
    onChange(checked, context) {
      console.info('onChange:', checked, context);
    },
    propOnChange(checked, context) {
      console.info('propOnChange:', checked, context);
    },
  },
};
</script>
