export default {
  normal: [
    {
      id: '1',
      role: 'user',
      status: 'complete',
      content: [
        {
          type: 'text',
          data: '牛顿第一定律是否适用于所有参考系？',
        },
      ],
    },
    {
      id: '2',
      role: 'assistant',
      status: 'complete',
      content: [
        {
          type: 'text',
          data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
        },
      ],
    },
  ],
  image: [],
};
