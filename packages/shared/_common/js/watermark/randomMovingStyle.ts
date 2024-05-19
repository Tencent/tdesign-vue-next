/* eslint-disable no-nested-ternary */
export default function randomMovingStyle() {
  const align = Math.floor(Math.random() * 4);
  const p1 = Math.floor(Math.random() * 70) + 30;
  const leftTopLimit = 0;
  const bottomLimit = 95;
  const rightLimit = 90;
  const keyframesStyle = `
  @keyframes watermark {
    0%   {left: ${align === 1 ? rightLimit : align === 3 ? leftTopLimit : p1}%; top: ${
  align === 0 ? leftTopLimit : align === 2 ? bottomLimit : p1
}%;}
    25% {left: ${align === 0 ? rightLimit : align === 2 ? leftTopLimit : 100 - p1}%; top: ${
  align === 1 ? bottomLimit : align === 3 ? leftTopLimit : p1
}%;}
    50% {left: ${align === 1 ? leftTopLimit : align === 3 ? rightLimit : 100 - p1}%; top: ${
  align === 0 ? bottomLimit : align === 2 ? leftTopLimit : 100 - p1
}%; transform: translateX(-100%);}
    75% {left: ${align === 0 ? leftTopLimit : align === 2 ? rightLimit : p1}%; top: ${
  align === 1 ? leftTopLimit : align === 3 ? bottomLimit : 100 - p1
}%;}
    100% {left: ${align === 1 ? rightLimit : align === 3 ? leftTopLimit : p1}%; top: ${
  align === 0 ? leftTopLimit : align === 2 ? bottomLimit : p1
}%;}
  }
  `;
  return keyframesStyle;
}
