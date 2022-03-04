<template>
  <div class="list-common-table" style="background-color: grey; overflow: hidden">
    <t-form ref="form" :data="formData" :label-width="80" colon>
      <t-row>
        <t-col :span="10">
          <t-row :gutter="[16, 16]">
            <t-col :flex="1">
              <t-form-item label="合同编号" name="contractNo">
                <t-input
                  class="form-item-content"
                  type="search"
                  placeholder="合同编号"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
            <t-col :flex="1">
              <t-form-item label="合同名称" name="contractName">
                <t-input
                  class="form-item-content"
                  type="search"
                  placeholder="合同名称"
                  :style="{ minWidth: '134px' }"
                />
              </t-form-item>
            </t-col>
          </t-row>
        </t-col>

        <t-col :span="2" class="operation-container">
          <t-button theme="primary" type="submit" :style="{ marginLeft: '8px' }"> 查询</t-button>
          <t-button type="reset" variant="base" theme="default"> 重置</t-button>
        </t-col>
      </t-row>
      <t-button variant="outline" @click="handleClick"> 打开抽屉 </t-button>
    </t-form>
    <detail-drawer v-model:visible="visible" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import DetailDrawer from './com.vue';

const visible = ref(false);

const handleClick = () => {
  visible.value = true;
};
</script>
