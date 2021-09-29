import { prefix } from '../config';

export const UPLOAD_NAME = `${prefix}-upload`;

export function returnFileSize(number: number) {
  if (number < 1024) {
    return `${number} Bytes`;
  }
  if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  }
  if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

export function getCurrentDate() {
  const d = new Date();
  let month: string | number = d.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  return `${d.getFullYear()}-${month}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
}
/**
 * 缩略文件名 ABCDEFG => ABC...FG
 * @param inputName 文件名
 * @param leftCount 左边长度
 * @param rightcount 右边长度
 * @returns 缩略后的文件名
 */
export function abridgeName(inputName: string, leftCount = 5, rightcount = 7): string {
  const name = inputName;
  let leftLength = 0;
  let rightLength = 0;
  for (let i = 0; i < name.length; i++) {
    const w = name[i];
    const isCn = escape(w).indexOf('%u') === 0;
    if (i < leftCount * 2 && leftLength < leftCount) {
      isCn ? leftLength += 1 : (leftLength += 2);
    } else if (i > i - rightcount && rightLength < rightcount) {
      isCn ? rightLength += 1 : (rightLength += 2);
    }
  }
  return name.replace(new RegExp(`^(.{${leftLength}})(.+)(.{${rightLength}})$`), '$1…$3');
}
