<template>
  <div class="t-upload__file-flow-demo">
    <t-upload
      v-model="files"
      placeholder="支持批量上传文件，文件格式不限，最多只能上传 10 份文件"
      theme="file-flow"
      multiple
      :request-method="requestMethod"
      :auto-upload="false"
      :on-success="handleRequestSuccess"
      :on-fail="handleRequestFail"
      :max="10"
    ></t-upload>
  </div>
</template>
<script setup>
import { ref, computed, nextTick } from 'vue';

class Scheduler {
  constructor(limit) {
    this.tasks = []; // 待运行的任务
    this.usingTask = []; // 正在运行的任务
    this.limit = limit;
  }

  // promiseCreator 是一个异步函数，return Promise
  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      promiseCreator.resolve = resolve;
      if (this.usingTask.length < this.limit) {
        this.usingRun(promiseCreator);
      }
      this.tasks.push(promiseCreator);
    });
  }

  usingRun(promiseCreator) {
    this.usingTask.push(promiseCreator);
    return promiseCreator().then((res) => {
      promiseCreator.resolve(res);
      this.usingMove(promiseCreator);
      if (this.tasks.length > 0) {
        this.usingRun(this.tasks.shift());
      }
    });
  }

  usingMove(promiseCreator) {
    const index = this.usingTask.findIndex(promiseCreator);
    this.usingTask.splice(index, 1);
  }
}
const files = ref([]);
const handleRequestFail = (error) => {
  console.log(error);
};
const handleRequestSuccess = (success) => {
  console.log(success);
};

const queue = new Scheduler(1);
const request = async (file) => {
  return new Promise((resolve) => {
    file.status = 'progress';
    try {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve({ status: 'success', response: { name: file.name } });
      }, 3000);
    } catch (e) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve({ status: 'fail', error: '上传失败', response: { name: file.name } });
      }, 3000);
    }
  });
};
const requestMethod = async (file) => {
  file.status = 'waiting';
  return queue.add(() => request(file));
};
</script>
