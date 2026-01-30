import { CanvasHTMLAttributes, CSSProperties, SVGAttributes } from 'vue';
import type { ErrorCorrectionLevel, ImageSettings } from '@tdesign/common-js/qrcode/types';
import { QRCodeConfig } from '@tdesign/components/config-provider/type';
import { StatusRenderInfo, TdQRCodeProps } from '../type';

export interface QRCodeSubComponent {
  /**
   * The value to encode into the QR Code. An array of strings can be passed in
   * to represent multiple segments to further optimize the QR Code.
   */
  value: string;
  /**
   * The size, in pixels, to render the QR Code.
   * @defaultValue 128
   */
  size?: number;
  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  level?: ErrorCorrectionLevel;
  /**
   * The background color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #FFFFFF
   */
  bgColor?: string;
  /**
   * The foregtound color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #000000
   */
  fgColor?: string;
  /**
   * The style to apply to the QR Code.
   */
  style?: CSSProperties;
  /**
   * Whether or not a margin of 4 modules should be rendered as a part of the
   * QR Code.
   * @deprecated Use `marginSize` instead.
   * @defaultValue false
   */
  includeMargin?: boolean;
  /**
   * The number of _modules_ to use for margin. The QR Code specification
   * requires `4`, however you can specify any number. Values will be turned to
   * integers with `Math.floor`. Overrides `includeMargin` when both are specified.
   * @defaultValue 0
   */
  marginSize?: number;
  /**
   * The settings for the embedded image.
   */
  imageSettings?: ImageSettings;
  /**
   * The title to assign to the QR Code. Used for accessibility reasons.
   */
  title?: string;
  /**
   * The minimum version used when encoding the QR Code. Valid values are 1-40
   * with higher values resulting in more complex QR Codes. The optimal
   * (lowest) version is determined for the `value` provided, using `minVersion`
   * as the lower bound.
   * @defaultValue 1
   */
  minVersion?: number;
}

export type QRCodeCanvas = QRCodeSubComponent & CanvasHTMLAttributes;

export type QRCodeSVG = QRCodeSubComponent & SVGAttributes;

export interface QRCodeStatus {
  locale: QRCodeConfig;
  classPrefix: string;
  onRefresh?: TdQRCodeProps['onRefresh'];
  statusRender?: TdQRCodeProps['statusRender'];
  status: StatusRenderInfo['status'];
}
