import { PropType } from 'vue';
import { QRCodeSubComponent, QRCodeStatus } from './type';

export const QRCodeSubComponentProps = {
  /**
   * The value to encode into the QR Code. An array of strings can be passed in
   * to represent multiple segments to further optimize the QR Code.
   */
  value: {
    type: String,
    default: '',
  },
  /**
   * The size, in pixels, to render the QR Code.
   * @defaultValue 128
   */
  size: {
    type: Number,
    default: 128,
  },
  /**
   * The Error Correction Level to use.
   * @see https://www.qrcode.com/en/about/error_correction.html
   * @defaultValue L
   */
  level: {
    type: String as PropType<QRCodeSubComponent['level']>,
    default: 'L',
  },
  /**
   * The background color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #FFFFFF
   */
  bgColor: {
    type: String,
    default: '#FFFFFF',
  },
  /**
   * The foregtound color used to render the QR Code.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
   * @defaultValue #000000
   */
  fgColor: {
    type: String,
    default: '#000000',
  },
  /**
   * The style to apply to the QR Code.
   */
  style: {
    type: Object as PropType<QRCodeSubComponent['style']>,
    default: () => ({} as QRCodeSubComponent['style']),
  },
  /**
   * Whether or not a margin of 4 modules should be rendered as a part of the
   * QR Code.
   * @deprecated Use `marginSize` instead.
   * @defaultValue false
   */
  includeMargin: {
    type: Boolean,
    default: false,
  },
  /**
   * The number of _modules_ to use for margin. The QR Code specification
   * requires `4`, however you can specify any number. Values will be turned to
   * integers with `Math.floor`. Overrides `includeMargin` when both are specified.
   * @defaultValue 0
   */
  marginSize: {
    type: Number,
    default: 0,
  },
  /**
   * The settings for the embedded image.
   */
  imageSettings: {
    type: Object as PropType<QRCodeSubComponent['imageSettings']>,
    default: () => ({}),
  },
  /**
   * The title to assign to the QR Code. Used for accessibility reasons.
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * The minimum version used when encoding the QR Code. Valid values are 1-40
   * with higher values resulting in more complex QR Codes. The optimal
   * (lowest) version is determined for the `value` provided, using `minVersion`
   * as the lower bound.
   * @defaultValue 1
   */
  minVersion: {
    type: Number,
    default: 1,
  },
};

export const QRCodeStatusProps = {
  locale: {
    type: Object as PropType<QRCodeStatus['locale']>,
    default: () => ({} as QRCodeStatus['locale']),
  },
  classPrefix: {
    type: String,
    default: 't',
  },
  onRefresh: {
    type: Function as PropType<QRCodeStatus['onRefresh']>,
  },
  statusRender: {
    type: Function as PropType<QRCodeStatus['statusRender']>,
  },
  status: {
    type: String as PropType<QRCodeStatus['status']>,
    default: 'active' as QRCodeStatus['status'],
  },
};
