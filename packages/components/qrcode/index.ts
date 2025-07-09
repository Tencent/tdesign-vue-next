import _QRCode from './QRCode';
import { withInstall } from '@tdesign/shared-utils';
import { TdQRCodeProps } from './type';

import './style';

export type QRCodeProps = TdQRCodeProps;
export * from './type';

export const Qrcode = withInstall(_QRCode);

export default Qrcode;
