<template>
  <div>
    <t-select
      v-model="value"
      filterable
      placeholder="-请选择-"
      :on-search="remoteMethod"
      :loading="loading"
      :options="options"
      style="width: 200px; display: inline-block; margin: 0 20px 20px 0"
    />
    <t-select
      v-model="value2"
      multiple
      filterable
      placeholder="-请输入搜索-"
      :options="options2"
      :loading="loading2"
      reserve-keyword
      style="width: 400px; display: inline-block"
      :on-search="remoteMethod2"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const options = ref([
      {
        label: '上海',
        value: 'shanghai',
      },
      {
        label: '北京',
        value: 'beijing',
        disabled: true,
      },
      {
        label: '深圳',
        value: 'shenzhen',
      },
    ]);
    const options2 = ref([]);
    const value = ref('');
    const value2 = ref([]);
    const loading = ref(false);
    const loading2 = ref(false);

    const remoteMethod = (search) => {
      console.log('search', search);
      if (search) {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          options.value = [
            {
              value: `${search}_test1`,
              label: `${search}_test1`,
            },
            {
              value: `${search}_test2`,
              label: `${search}_test2`,
            },
            {
              value: `${search}_test3`,
              label: `${search}_test3`,
            },
          ];
        }, 500);
      }
    };

    const remoteMethod2 = (search) => {
      console.log(search);
      if (search) {
        loading2.value = true;
        setTimeout(() => {
          loading2.value = false;
          options2.value = [
            {
              value: `${search}_test1`,
              label: `${search}_test1`,
            },
            {
              value: `${search}_test2`,
              label: `${search}_test2`,
            },
            {
              value: `${search}_test3`,
              label: `${search}_test3`,
            },
          ];
        }, 500);
      }
    };

    return {
      value,
      value2,
      options,
      options2,
      loading,
      loading2,
      remoteMethod2,
      remoteMethod,
    };
  },
});
</script>
