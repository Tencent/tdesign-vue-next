import isString from 'lodash/isString';
import isArray from 'lodash/isArray';

import { TdImageViewerProps, ImageInfo } from './type';

export const downloadFile = function (imgSrc: string, imgName?: string) {
  const image = new Image();
  // fix #2935
  // 当链接携带了参数时，需处理掉参数再取图片名称，否则扩展名会与参数链接导致原扩展名失效
  // 例如：img.png?sign=xxx 不处理参数会被转成 img.png_sign=xxx
  const name =
    imgName || imgSrc?.split?.('?')?.[0]?.split?.('#')?.[0]?.split?.('/').pop() || Math.random().toString(32).slice(2);

  image.setAttribute('crossOrigin', 'anonymous');

  image.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = name;
      a.href = url;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  };
  image.src = imgSrc;
};

const isImageInfo = (image: string | File | ImageInfo): image is ImageInfo => {
  return !!image && !isString(image) && !(image instanceof File);
};

export const formatImages = (images: TdImageViewerProps['images']): ImageInfo[] => {
  if (!isArray(images)) return [];
  return images.map((item) => {
    if (isImageInfo(item)) {
      return {
        download: true,
        thumbnail: item.mainImage,
        ...item,
      };
    }
    return {
      mainImage: item,
      thumbnail: item,
      download: true,
    };
  });
};

export const getOverlay = (props: TdImageViewerProps) => {
  if (props.showOverlay !== undefined) {
    return props.showOverlay;
  }
  return props.mode === 'modal';
};
