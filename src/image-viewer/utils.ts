import isString from 'lodash/isString';
import { TdImageViewerProps, ImageInfo } from './type';
import isArray from 'lodash/isArray';

export const downloadFile = function (imgSrc: string) {
  const image = new Image();
  const name = imgSrc?.split?.('/').pop() || Math.random().toString(32).slice(2);

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

const isImageInfo = (image: string | ImageInfo): image is ImageInfo => {
  return !isString(image);
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
