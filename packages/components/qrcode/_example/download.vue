<template>
  <t-space direction="vertical">
    <t-radio-group v-model="type" variant="default-filled">
      <t-radio-button value="canvas">canvas</t-radio-button>
      <t-radio-button value="svg">svg</t-radio-button>
    </t-radio-group>
    <t-qrcode
      id="QRCode"
      :type="type"
      value="https://tdesign.tencent.com/"
      icon="https://tdesign.gtimg.com/site/tdesign-logo.png"
    />
    <t-button @click="handleDownload">Download</t-button>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const type = ref('canvas');

function downloadFile(url, fileName) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const downloadCanvas = () => {
  const canvas = document.getElementById('QRCode').querySelector('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    console.log(url);
    downloadFile(url, 'TDesign-QRCode.png');
  }
};

const downloadSvg = () => {
  const svg = document.getElementById('QRCode').querySelector('svg');
  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  console.log(url);
  downloadFile(url, 'TDesign-QRCode.svg');
};

const handleDownload = () => {
  if (type.value === 'canvas') {
    downloadCanvas();
  }
  if (type.value === 'svg') {
    downloadSvg();
  }
};
</script>
