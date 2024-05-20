<template>
  <t-space direction="vertical">
    <t-cascader v-model="value1" :options="options" check-strictly />
    <t-cascader v-model="value2" :options="options" check-strictly multiple />
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '1',
          children: [
            {
              value: '1.1',
              label: '1.1',
              children: [
                {
                  value: '1.1.1',
                  label: '1.1.1',
                  children: [
                    {
                      value: '1.1.1.1',
                      label: '1.1.1.1',
                    },
                    {
                      value: '1.1.1.2',
                      label: '1.1.1.2',
                    },
                  ],
                },
                {
                  value: '1.1.2',
                  label: '1.1.2',
                  children: [
                    {
                      value: '1.1.2.1',
                      label: '1.1.2.1',
                    },
                    {
                      value: '1.1.2.2',
                      label: '1.1.2.2',
                    },
                  ],
                },
              ],
            },
            {
              value: '1.2',
              label: '1.2',
              children: [
                {
                  value: '1.2.1',
                  label: '1.2.1',
                  children: [
                    {
                      value: '1.2.1.1',
                      label: '1.2.1.1',
                    },
                    {
                      value: '1.2.1.2',
                      label: '1.2.1.2',
                    },
                  ],
                },
                {
                  value: '1.2.2',
                  label: '1.2.2',
                  children: [
                    {
                      value: '1.2.2.1',
                      label: '1.2.2.1',
                    },
                    {
                      value: '1.2.2.2',
                      label: '1.2.2.2',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          value: '2',
          label: '2',
          children: [
            {
              value: '2.1',
              label: '2.1',
            },
            {
              value: '2.2',
              label: '2.2',
            },
          ],
        },
      ],
      value1: '1.2.2',
      value2: ['1.1.2.1', '2'],
    };
  },
};
</script>
