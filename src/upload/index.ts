import _Upload from './upload';
import { withInstall } from '../utils/withInstall';
import { TdUploadProps } from './type';
import mapProps from '../utils/map-props';

import './style';

export * from './interface';
export type UploadProps = TdUploadProps;

export const Upload = withInstall(
  mapProps([
    {
      name: 'files',
      event: 'change',
      alias: ['modelValue'],
    },
  ])(_Upload),
);
export default Upload;
