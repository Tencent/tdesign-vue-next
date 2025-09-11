<template>
  <div class="container">
    <h1>Form RequiredMark Test - After Fix</h1>

    <div class="test-section">
      <div class="test-title">Test 1: Form requiredMark=true (Should only show * on required fields)</div>
      <t-form :rules="rules" :data="formData" :required-mark="true">
        <t-form-item label="Required Field" name="requiredField">
          <t-input v-model="formData.requiredField" placeholder="This should show *"></t-input>
        </t-form-item>
        <t-form-item label="Optional Field" name="optionalField">
          <t-input v-model="formData.optionalField" placeholder="This should NOT show *"></t-input>
        </t-form-item>
      </t-form>
    </div>

    <div class="test-section">
      <div class="test-title">Test 2: Form requiredMark=false (Should never show *)</div>
      <t-form :rules="rules" :data="formData" :required-mark="false">
        <t-form-item label="Required Field" name="requiredField">
          <t-input v-model="formData.requiredField" placeholder="This should NOT show *"></t-input>
        </t-form-item>
        <t-form-item label="Optional Field" name="optionalField">
          <t-input v-model="formData.optionalField" placeholder="This should NOT show *"></t-input>
        </t-form-item>
      </t-form>
    </div>

    <div class="test-section">
      <div class="test-title">Test 3: Form requiredMark=undefined (Should show * only on required fields)</div>
      <t-form :rules="rules" :data="formData">
        <t-form-item label="Required Field" name="requiredField">
          <t-input v-model="formData.requiredField" placeholder="This should show *"></t-input>
        </t-form-item>
        <t-form-item label="Optional Field" name="optionalField">
          <t-input v-model="formData.optionalField" placeholder="This should NOT show *"></t-input>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const formData = reactive({
  requiredField: '',
  optionalField: '',
});

const rules = {
  requiredField: [{ required: true, message: 'This field is required' }],
  // No rules for optionalField
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}
.test-section {
  margin-bottom: 40px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
}
.test-title {
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}
</style>
