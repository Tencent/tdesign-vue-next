import _QRCode from './qrcode';
import { withInstall } from '@tdesign/shared-utils';
import { TdQRCodeProps } from './type';

import './style';

export type QRCodeProps = TdQRCodeProps;
export * from './type';

export const QRCode = withInstall(_QRCode, 'TQrcode');

export default QRCode;
