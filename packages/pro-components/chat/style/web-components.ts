import defaultCss from '@tdesign/web-components/style/index.css?raw';

const STYLE_ID = 'tdesign-vue-next-chat-web-components';

// Lower :root specificity so unlayered user theme tokens always win, even if a
// bundler unwraps @layer (Vite + lightningcss does this for older targets).
const lowerRootSpecificity = (css: string) => css.replace(/(^|[,(\s])(:root(?:\[[^\]]+\]|\.[\w-]+)*)/g, '$1:where($2)');

if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `@layer tdesign-web-components {\n${lowerRootSpecificity(defaultCss)}\n}`;
  document.head.appendChild(style);
}
