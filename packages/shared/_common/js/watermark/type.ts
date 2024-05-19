export interface WatermarkText {
  /**
   * 水印文本文字颜色
   * @default rgba(0,0,0,0.1)
   */
  fontColor?: string;
  /**
   * 水印文本文字大小
   * @default 16
   */
  fontSize?: number;
  /**
   * 水印文本文字样式
   * @default undefined
   */
  fontFamily?: string | undefined;
  /**
   * 水印文本文字粗细
   * @default normal
   */
  fontWeight?: 'normal' | 'lighter' | 'bold' | 'bolder';
  /**
   * 水印文本内容
   * @default ''
   */
  text?: string;
}

export interface WatermarkImage {
  /**
   * 水印图片是否需要灰阶显示
   * @default false
   */
  isGrayscale?: boolean;
  /**
   * 水印图片源地址，为了显示清楚，建议导出 2 倍或 3 倍图
   * @default ''
   */
  url?: string;
}
