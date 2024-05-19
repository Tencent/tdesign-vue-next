import { SizeUnit } from './types';
import log from '../log/log';

export const IMAGE_REGEXP = /(.png|.jpg|.jpeg|.jpe|.webp|.avif|.svg|.gif|.bmp)/i;
export const IMAGE_ALL_REGEXP = /(.png|.jpg|.jpeg|.jpe|.webp|.avif|.svg|.gif|.bmp|.dwg|.dxf|.svf|.tif|.tiff|.arw)/i;
export const FILE_PDF_REGEXP = /(.pdf)/i;
export const FILE_EXCEL_REGEXP = /(.xlsx|.xls|.csv|.xlc|.xlm|.xlt|.xlw)/i;
export const FILE_WORD_REGEXP = /(.dox|docx|.document|.wps|.wdb|.msword)/i;
export const FILE_PPT_REGEXP = /(.ppt|.pptx|.key)/i;
export const VIDEO_REGEXP = /(.avi|.mp4|.wmv|.mpg|.mpeg|.mov|.rm|.ram|.swf|.flv|.rmvb|.flash|.mid|.3gp)/i;
export const AUDIO_REGEXP = /(.mp2|.mp3|.mp4|.ogg|.3gpp|.ac3|.au)/i;

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
 */
const INPUT_FILE_MAP = {
  'audio/*': AUDIO_REGEXP,
  'video/*': VIDEO_REGEXP,
  'image/*': IMAGE_ALL_REGEXP,
  '.ico': /image\/vnd.microsoft.icon/i,
  '.doc': /application\/msword/i,
  '.docx': /application\/vnd.openxmlformats-officedocument.wordprocessingml.document/i,
  '.xls': /application\/vnd.ms-excel/i,
  '.xlsx': /application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet/i,
  '.ppt': /application\/vnd.ms-powerpoint/i,
  '.pptx': /application\/vnd.openxmlformats-officedocument.presentationml.presentation/i,
  '.vsd': /application\/vnd.visio/i,
  '.txt': /text\/plain/i,
  '.abw': /application\/x-abiword/i,
  '.avi': /video\/x-msvideo/i,
  '.azw': /application\/vnd.amazon.ebook/i,
  '.bin': /application\/octet-stream/i,
  '.cda': /application\/x-cdf/i,
  '.mpkg': /application\/vnd.apple.installer+xml/i,
  '.odp': /application\/vnd.oasis.opendocument.presentation/i,
  '.ods': /application\/vnd.oasis.opendocument.spreadsheet/i,
  '.odt': /application\/vnd.oasis.opendocument.text/i,
  '.oga': /audio\/ogg/i,
  '.ogv': /video\/ogg/i,
  '.ogx': /application\/ogg/i,
};

/**
 * 各个单位和 KB 的关系
 *
 * [*] 表示方法采用这种方式
 * [x] 表示方法不采用这种方式
 *
 * [x] bit      位              b     0 or 1
 * [*] byte     字节            B     8 bits
 * [x] kilobit  千位            kb    1000 bites
 * [*] kilobyte 千字节(二进制)   KB    1024 bytes
 * [x] kilobyte 千字节(十进制)   KB    1000 bytes
 * [x] Megabite 百万位          Mb    1000 kilobits
 * [*] Megabyte 兆字节(二进制)   KB    1024 kilobytes
 * [*] Megabyte 兆字节(十进制)   KB    1000 kilobytes
 * [x] Gigabit  万亿位          Gb    1000 Megabite
 * [*] Gigabyte 吉字节(二进制)   GB    1024 Megabytes
 * [x] Gigabyte 吉字节(十进制)   GB    1000 Megabytes
 */
export const SIZE_MAP = {
  B: 1,
  KB: 1024,
  MB: 1048576, // 1024 * 1024
  GB: 1073741824, // 1024 * 1024 * 1024
};

export function returnFileSize(number: number) {
  if (number < SIZE_MAP.KB) {
    return `${number} Bytes`;
  }
  if (number >= SIZE_MAP.KB && number < SIZE_MAP.MB) {
    return `${(number / SIZE_MAP.KB).toFixed(1)} KB`;
  }
  if (number >= SIZE_MAP.MB && number < SIZE_MAP.GB) {
    return `${(number / SIZE_MAP.MB).toFixed(1)} MB`;
  }

  if (number >= SIZE_MAP.GB) {
    return `${(number / SIZE_MAP.GB).toFixed(1)} GB`;
  }
  return '';
}

export function getCurrentDate(needTime = false) {
  const d = new Date();
  let month: string | number = d.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const date = `${d.getFullYear()}-${month}-${d.getDate()}`;
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (needTime) return [date, time].join(' ');
  return date;
}

/**
 * 缩略文件名 ABCDEFG => ABC...FG
 * @param inputName 文件名
 * @param leftCount 左边长度
 * @param rightCount 右边长度
 * @returns 缩略后的文件名
 */
export function abridgeName(
  inputName: string,
  leftCount = 5,
  rightCount = 7
): string {
  const name = inputName;
  let leftLength = 0;
  let rightLength = 0;
  if (!name) return '';
  for (let i = 0; i < name.length; i++) {
    const w = name[i];
    const isCn = escape(w).indexOf('%u') === 0;
    if (i < leftCount * 2 && leftLength < leftCount) {
      // eslint-disable-next-line no-unused-expressions
      isCn ? (leftLength += 1) : (leftLength += 2);
    } else if (i > i - rightCount && rightLength < rightCount) {
      // eslint-disable-next-line no-unused-expressions
      isCn ? (rightLength += 1) : (rightLength += 2);
    }
  }
  return name.replace(
    new RegExp(`^(.{${leftLength}})(.+)(.{${rightLength}})$`),
    '$1…$3'
  );
}

export function getFileSizeText(number: number) {
  if (number < 1024) {
    return `${number} Bytes`;
  }
  if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  }
  if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
  return '';
}

/**
 * 大小比较
 * @param size 文件大小，单位：B
 * @param unit 计算机计量单位
 */
export function isOverSizeLimit(
  fileSize: number,
  sizeLimit: number,
  unit: SizeUnit
) {
  const units = ['B', 'KB', 'MB', 'GB'];
  const KBIndex = 1;
  let index = units.indexOf(unit);
  if (index === -1) {
    log.warn('Upload', `\`sizeLimit.unit\` can only be one of ${units.join()}`);
    index = KBIndex;
  }
  const num = SIZE_MAP[unit];
  return fileSize > sizeLimit * num;
}

// vue2临时使用的 sizeLimit 计算
export function isOverSizeLimit1(
  fileSize: number,
  sizeLimit: number,
  unit: SizeUnit
) {
  // 以 KB 为单位进行比较
  const units = ['B', 'KB', 'MB', 'GB'];
  // 各个单位和 KB 的关系

  const KBIndex = 1;
  let index = units.indexOf(unit);
  if (index === -1) {
    // eslint-disable-next-line no-console
    console.warn(
      `TDesign Upload Warn: \`sizeLimit.unit\` can only be one of ${units.join()}`
    );
    index = KBIndex;
  }
  const num = SIZE_MAP[unit];
  const limit = index < KBIndex ? sizeLimit / num : sizeLimit * num;
  return fileSize <= limit;
}

export const urlCreator = () => window.webkitURL || window.URL;

export function getFileUrlByFileRaw(fileRaw: File): Promise<string> {
  return new Promise((resolve) => {
    if (!fileRaw) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileRaw);
    reader.onload = (event: ProgressEvent<FileReader>) => {
      resolve(event.target?.result as string);
    };
  });
}

export function validateFileType(accept: string, fileType: string, fileName?: string) {
  const tmpFileType = fileType || fileName;
  if (!accept) return true;

  if (!tmpFileType) return false;

  const acceptList = accept.split(',').map((v) => v.trim());
  for (let i = 0, len = acceptList.length; i < len; i++) {
    const oneRule = acceptList[i];
    if (INPUT_FILE_MAP[oneRule] && INPUT_FILE_MAP[oneRule].test(tmpFileType)) {
      return true;
    }
    const regExp = new RegExp(oneRule, 'i');
    if (regExp.test(tmpFileType)) {
      return true;
    }
  }
  return false;
}

export function getFileList(files: FileList, accept: string = '') {
  const fileList: File[] = [];
  for (let i = 0; i < files.length; i++) {
    if (validateFileType(accept, files[i].type, files[i].name)) {
      fileList.push(files[i]);
    }
  }
  return fileList;
}
