import isNull from 'lodash/isNull';
import { calculateNodeSize } from './helper';

type CalculateStyleType = {
  height?: string,
  minHeight?: string
};

type LimitType = number | null;

const TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

let hiddenTextarea: HTMLTextAreaElement;

function calcTextareaHeight(
  targetElement: HTMLTextAreaElement,
  minRows: LimitType = 1,
  maxRows: LimitType = null,
): CalculateStyleType {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  const {
    paddingSize,
    borderSize,
    boxSizing,
    sizingStyle,
  } = calculateNodeSize(targetElement);

  hiddenTextarea.setAttribute('style', `${sizingStyle};${TEXTAREA_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || '';

  let height = hiddenTextarea.scrollHeight;
  const result: CalculateStyleType = {};
  const isBorderbox = boxSizing === 'border-box';
  const isContentbox = boxSizing === 'content-box';

  if (isBorderbox) {
    height += borderSize;
  } else if (isContentbox) {
    height -= paddingSize;
  }

  hiddenTextarea.value = '';
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  hiddenTextarea?.parentNode?.removeChild(hiddenTextarea);
  // @ts-ignore
  hiddenTextarea = null;

  const calcHeight = (rows: number) => {
    let rowsHeight = singleRowHeight * rows;
    if (isBorderbox) {
      rowsHeight = rowsHeight + paddingSize + borderSize;
    }
    return rowsHeight;
  };

  if (!isNull(minRows)) {
    const minHeight = calcHeight(minRows);
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (!isNull(maxRows)) {
    height = Math.min(calcHeight(maxRows), height);
  }
  result.height = `${height}px`;
  return result;
}

export default calcTextareaHeight;
