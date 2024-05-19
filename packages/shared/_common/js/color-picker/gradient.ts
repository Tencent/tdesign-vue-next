import isString from 'lodash/isString';
import isNull from 'lodash/isNull';
/* eslint-disable no-param-reassign */
/**
 * 用于反解析渐变字符串为对象
 * https://stackoverflow.com/questions/20215440/parse-css-gradient-rule-with-javascript-regex
 */
import tinyColor from 'tinycolor2';

/**
 * Utility combine multiple regular expressions.
 *
 * @param {RegExp[]|string[]} regexpList List of regular expressions or strings.
 * @param {string} flags Normal RegExp flags.
 */
const combineRegExp = (regexpList: (string | RegExp)[], flags: string): RegExp => {
  let source = '';
  for (let i = 0; i < regexpList.length; i++) {
    if (isString(regexpList[i])) {
      source += regexpList[i];
    } else {
      source += (regexpList[i] as RegExp).source;
    }
  }
  return new RegExp(source, flags);
};

interface RegExpLib {
  gradientSearch: RegExp;
  colorStopSearch: RegExp;
}

interface ColorStop {
  color: string;
  position?: string;
}

interface ParseGradientResult {
  original: string;
  colorStopList?: ColorStop[];
  line?: string;
  angle?: string;
  sideCorner?: string;
}

/**
 * Generate the required regular expressions once.
 *
 * Regular Expressions are easier to manage this way and can be well described.
 *
 * @result {object} Object containing regular expressions.
 */
const generateRegExp = (): RegExpLib => {
  // Note any variables with "Capture" in name include capturing bracket set(s).
  const searchFlags = 'gi'; // ignore case for angles, "rgb" etc
  const rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/; // Angle +ive, -ive and angle types
  // optional 2nd part
  const rSideCornerCapture = /to\s+((?:(?:left|right|top|bottom)(?:\s+(?:top|bottom|left|right))?))/;
  const rComma = /\s*,\s*/; // Allow space around comma.
  const rColorHex = /#(?:[a-f0-9]{6}|[a-f0-9]{3})/; // 3 or 6 character form
  const rDigits3 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)/;
  const // "(1, 2, 3)"
    rDigits4 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)/;
  const // "(1, 2, 3, 4)"
    rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/;
  const // ".9", "-5px", "100%".
    rKeyword = /[_a-z-][_a-z0-9-]*/;
  const // "red", "transparent".
    rColor = combineRegExp(
      ['(?:', rColorHex, '|', '(?:rgb|hsl)', rDigits3, '|', '(?:rgba|hsla)', rDigits4, '|', rKeyword, ')'],
      '',
    );
  const rColorStop = combineRegExp([rColor, '(?:\\s+', rValue, '(?:\\s+', rValue, ')?)?'], '');
  const // Single Color Stop, optional %, optional length.
    rColorStopList = combineRegExp(['(?:', rColorStop, rComma, ')*', rColorStop], '');
  const // List of color stops min 1.
    rLineCapture = combineRegExp(['(?:(', rAngle, ')|', rSideCornerCapture, ')'], '');
  const // Angle or SideCorner
    rGradientSearch = combineRegExp(['(?:(', rLineCapture, ')', rComma, ')?(', rColorStopList, ')'], searchFlags);
  const // Capture 1:"line", 2:"angle" (optional), 3:"side corner" (optional) and 4:"stop list".
    rColorStopSearch = combineRegExp(
      ['\\s*(', rColor, ')', '(?:\\s+', '(', rValue, '))?', '(?:', rComma, '\\s*)?'],
      searchFlags,
    ); // Capture 1:"color" and 2:"position" (optional).

  return {
    gradientSearch: rGradientSearch,
    colorStopSearch: rColorStopSearch,
  };
};

/**
 * Actually parse the input gradient parameters string into an object for reusability.
 *
 *
 * @note Really this only supports the standard syntax not historical versions, see MDN for details
 *       https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient
 *
 * @param regExpLib
 * @param {string} input
 * @returns {object|undefined}
 */
const parseGradient = (regExpLib: RegExpLib, input: string) => {
  let result: ParseGradientResult;
  let matchColorStop: any;
  let stopResult: ColorStop;

  // reset search position, because we reuse regex.
  regExpLib.gradientSearch.lastIndex = 0;

  const matchGradient = regExpLib.gradientSearch.exec(input);
  if (!isNull(matchGradient)) {
    result = {
      original: matchGradient[0],
      colorStopList: [],
    };

    // Line (Angle or Side-Corner).
    if (matchGradient[1]) {
      // eslint-disable-next-line prefer-destructuring
      result.line = matchGradient[1];
    }
    // Angle or undefined if side-corner.
    if (matchGradient[2]) {
      // eslint-disable-next-line prefer-destructuring
      result.angle = matchGradient[2];
    }
    // Side-corner or undefined if angle.
    if (matchGradient[3]) {
      // eslint-disable-next-line prefer-destructuring
      result.sideCorner = matchGradient[3];
    }

    // reset search position, because we reuse regex.
    regExpLib.colorStopSearch.lastIndex = 0;

    // Loop though all the color-stops.
    matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
    while (!isNull(matchColorStop)) {
      stopResult = {
        color: matchColorStop[1],
      };

      // Position (optional).
      if (matchColorStop[2]) {
        // eslint-disable-next-line prefer-destructuring
        stopResult.position = matchColorStop[2];
      }
      result.colorStopList.push(stopResult);

      // Continue searching from previous position.
      matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[4]);
    }
  }

  // Can be undefined if match not found.
  return result;
};

export interface GradientColorPoint {
  id?: string;
  color?: string;
  left?: number;
}

export interface GradientColors {
  points: GradientColorPoint[];
  degree: number;
}

const REGEXP_LIB = generateRegExp();
const REG_GRADIENT = /.*gradient\s*\(((?:\([^)]*\)|[^)(]*)*)\)/gim;

/**
 * 验证是否是渐变字符串
 * @param input
 * @returns
 */
export const isGradientColor = (input: string): null | RegExpExecArray => {
  REG_GRADIENT.lastIndex = 0;
  return REG_GRADIENT.exec(input);
};

// 边界字符串和角度关系
const sideCornerDegreeMap = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
  'top left': 225,
  'left top': 225,
  'top right': 135,
  'right top': 135,
  'bottom left': 315,
  'left bottom': 315,
  'bottom right': 45,
  'right bottom': 45,
};

/**
 * 解析渐变字符串为 GradientColors 对象
 * @param input
 * @returns
 */
export const parseGradientString = (input: string): GradientColors | boolean => {
  const match = isGradientColor(input);
  if (!match) {
    return false;
  }
  const gradientColors: GradientColors = {
    points: [],
    degree: 0,
  };

  const result: ParseGradientResult = parseGradient(REGEXP_LIB, match[1]);
  if (result.original.trim() !== match[1].trim()) {
    return false;
  }
  const points: GradientColorPoint[] = result.colorStopList.map(({ color, position }) => {
    const point = Object.create(null);
    point.color = tinyColor(color).toRgbString();
    point.left = parseFloat(position);
    return point;
  });
  gradientColors.points = points;
  let degree = parseInt(result.angle, 10);
  if (Number.isNaN(degree)) {
    degree = sideCornerDegreeMap[result.sideCorner] || 90;
  }
  gradientColors.degree = degree;

  return gradientColors;
};

export default parseGradientString;
