<template>
  <div class="tdesign-demo-block-column-large">
    <div>
      <t-radio-group v-model="type" variant="default-filled">
        <t-radio-button value="hide">隐藏文本提示</t-radio-button>
        <t-radio-button value="align-left">文本提示左对齐</t-radio-button>
        <t-radio-button value="align-input">文本提示对齐输入框</t-radio-button>
      </t-radio-group>
    </div>
    <t-form>
      <!-- 隐藏文本提示 -->
      <template v-if="type === 'hide'">
        <t-form-item label="禁用">
          <t-input-number v-model="value0" disabled></t-input-number>
        </t-form-item>
        <t-form-item label="只读">
          <t-input-number v-model="value1" readonly></t-input-number>
        </t-form-item>
        <t-form-item label="正常">
          <t-input-number v-model="value2"></t-input-number>
        </t-form-item>
        <t-form-item label="成功">
          <t-input-number v-model="value3" status="success"></t-input-number>
        </t-form-item>
        <t-form-item label="警告">
          <t-input-number v-model="value4" status="warning"></t-input-number>
        </t-form-item>
        <t-form-item label="错误">
          <t-input-number v-model="value5" status="error"></t-input-number>
        </t-form-item>
      </template>

      <!-- 文本提示左对齐 -->
      <template v-if="type === 'align-left'">
        <t-form-item label="正常提示">
          <t-input-number v-model="value6" tips="这是普通文本提示"></t-input-number> </t-form-item
        ><br />
        <t-form-item label="成功提示">
          <t-input-number v-model="value7" status="success" tips="校验通过文本提示"></t-input-number> </t-form-item
        ><br />
        <t-form-item label="警告提示">
          <t-input-number v-model="value8" status="warning" tips="校验不通过文本提示"></t-input-number> </t-form-item
        ><br />
        <t-form-item label="错误提示">
          <t-input-number
            v-model="value9"
            status="error"
            tips="校验存在严重问题文本提示"
          ></t-input-number> </t-form-item
        ><br />
      </template>

      <!-- 文本提示对齐输入框 -->
      <template v-if="type === 'align-input'">
        <t-form-item label="正常提示">
          <t-input-number v-model="value6" :input-props="{ tips: '这是普通文本提示' }"></t-input-number> </t-form-item
        ><br />
        <t-form-item label="成功提示">
          <t-input-number
            v-model="value7"
            status="success"
            :input-props="{ tips: '校验通过文本提示' }"
          ></t-input-number> </t-form-item
        ><br />
        <t-form-item label="警告提示">
          <t-input-number
            v-model="value8"
            status="warning"
            :input-props="{ tips: '校验不通过文本提示' }"
          ></t-input-number> </t-form-item
        ><br />
        <t-form-item label="错误提示">
          <t-input-number
            v-model="value9"
            status="error"
            :input-props="{ tips: '校验存在严重问题文本提示' }"
          ></t-input-number> </t-form-item
        ><br />
      </template>
    </t-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const type = ref('align-input');
const value0 = ref(3);
const value1 = ref(3);
const value2 = ref(3);
const value3 = ref(3);
const value4 = ref(3);
const value5 = ref(3);
const value6 = ref(3);
const value7 = ref(3);
const value8 = ref(3);
const value9 = ref(3);
</script>

<style scoped>
.t-form__item {
  margin-bottom: 0px;
}

.t-input-number {
  width: 300px;
}
.tdesign-demo-item--input-number .t-input-number {
  margin-bottom: 16px;
}
</style>
