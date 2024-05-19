import { WatermarkText, WatermarkImage } from './type';

export default function generateBase64Url({
  width,
  height,
  gapX,
  gapY,
  offsetLeft,
  offsetTop,
  rotate,
  alpha,
  watermarkContent,
  lineSpace
}: {
  width: number,
  height: number,
  gapX:number,
  gapY: number,
  offsetLeft:number,
  offsetTop:number,
  rotate:number,
  alpha:number,
  watermarkContent: WatermarkText | WatermarkImage | Array<WatermarkText | WatermarkImage>,
  lineSpace:number
}, onFinish: (url: string) => void): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    // eslint-disable-next-line no-console
    console.warn('当前环境不支持Canvas, 无法绘制水印');
    onFinish('');
    return;
  }
  const ratio = window.devicePixelRatio || 1;
  const canvasWidth = (gapX + width) * ratio;
  const canvasHeight = (gapY + height) * ratio;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  canvas.style.width = `${gapX + width}px`;
  canvas.style.height = `${gapY + height}px`;

  ctx.translate(offsetLeft * ratio, offsetTop * ratio);
  ctx.rotate((Math.PI / 180) * Number(rotate));
  ctx.globalAlpha = alpha;

  const markWidth = width * ratio;
  const markHeight = height * ratio;

  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, markWidth, markHeight);

  const contents = Array.isArray(watermarkContent) ? watermarkContent : [{ ...watermarkContent }];
  let top = 0;
  contents.forEach((item: WatermarkText & WatermarkImage & { top: number }) => {
    if (item.url) {
      const { url, isGrayscale = false } = item;
      // eslint-disable-next-line no-param-reassign
      item.top = top;
      top += height;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.src = url;
      img.onload = () => {
        // ctx.filter = 'grayscale(1)';
        ctx.drawImage(img, 0, item.top * ratio, width * ratio, height * ratio);
        if (isGrayscale) {
          const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
          const pixels = imgData.data;
          for (let i = 0; i < pixels.length; i += 4) {
            const lightness = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
            pixels[i] = lightness;
            pixels[i + 1] = lightness;
            pixels[i + 2] = lightness;
          }
          ctx.putImageData(imgData, 0, 0);
        }
        onFinish(canvas.toDataURL());
      };
    } else if (item.text) {
      const {
        text,
        fontColor = 'rgba(0, 0, 0, 0.1)',
        fontSize = 16,
        fontFamily = undefined,
        fontWeight = 'normal',
      } = item;
      // eslint-disable-next-line no-param-reassign
      item.top = top;
      top += lineSpace;
      const markSize = Number(fontSize) * ratio;
      // TODO 后续完善font 渲染控制 目前font-family 暂时为 undefined
      ctx.font = `normal normal ${fontWeight} ${markSize}px/${markHeight}px ${fontFamily}`;
      ctx.textAlign = 'start';
      ctx.textBaseline = 'top';
      ctx.fillStyle = fontColor;
      ctx.fillText(text, 0, item.top * ratio);
    }
  });
  onFinish(canvas.toDataURL());
}
