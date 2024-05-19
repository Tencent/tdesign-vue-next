<template>
  <div class="tdesign-demo-dropdown">
    <t-dropdown :options="options" @click="clickHandler" :maxColumnWidth="120" :maxHeight="200">
      <t-button variant="text">
        下拉菜单
        <chevron-down-icon size="16" slot="suffix" />
      </t-button>
    </t-dropdown>
  </div>
</template>
<script>
import { ChevronDownIcon } from 'tdesign-icons-vue';

export default {
  components: {
    ChevronDownIcon,
  },
  data() {
    return {
      options: [
        {
          content: '操作一',
          value: 1,
          children: [
            {
              content: '操作九',
              value: 9,
            },
          ],
        },
        {
          content: '操作二操作二操作二操作二',
          value: 2,
          children: [
            {
              content: '操作五',
              value: 5,
            },
            {
              content: '操作六',
              value: 6,
            },
          ],
        },
        {
          content: '操作三',
          value: 3,
          children: [
            {
              content: '操作十',
              value: 10,
            },
          ],
        },
        {
          content: '操作四',
          value: 4,
          children: [
            {
              content: '操作十一',
              value: 11,
            },
          ],
        },
        {
          content: '操作五',
          value: 5,
          children: [
            {
              content: '操作十二',
              value: 12,
            },
          ],
        },
        {
          content: '操作六',
          value: 6,
          children: [
            {
              content: '操作十三',
              value: 13,
            },
          ],
        },
        {
          content: '操作七',
          value: 7,
        },
        {
          content: '操作八',
          value: 8,
        },
        {
          content: '操作十八',
          value: 18,
          children: [
            {
              content: '操作十四',
              value: 14,
            },
            {
              content: '操作十五',
              value: 15,
            },
            {
              content: '操作十六',
              value: 16,
              children: [
                {
                  content: '三级操作一',
                  value: 20,
                },
                {
                  content: '三级操作二',
                  value: 21,
                },
              ],
            },
            {
              content: '操作十七',
              value: 17,
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickHandler(data, context) {
      console.log(data);
      console.log(context);
    },
  },
};
</script>
