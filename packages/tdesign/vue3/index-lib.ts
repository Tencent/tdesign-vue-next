import './style';
import tdesign from './index';

const ENV = process.env.NODE_ENV;
if (
  ENV !== 'test'
  && ENV !== 'production'
  && typeof console !== 'undefined'
  && console.warn
  && typeof window !== 'undefined'
) {
  console.warn('You are using a whole package of TDesign!');
}

export * from './index';
export default tdesign;
