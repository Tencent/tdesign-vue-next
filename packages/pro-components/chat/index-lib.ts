import './style';
import TDesignChat from './index';

const ENV = process.env.NODE_ENV;
if (
  ENV !== 'test' &&
  ENV !== 'production' &&
  typeof console !== 'undefined' &&
  console.warn && // eslint-disable-line no-console
  typeof window !== 'undefined'
) {
  // eslint-disable-next-line no-console
  console.warn('You are using a whole package of @tdesign-vue-next/chat!');
}

export * from './index';
export default TDesignChat;
