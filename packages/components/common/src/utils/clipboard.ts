import Clipboard from 'clipboard';

export function copyText(text: string) {
  const div = document.createElement('div');
  const clip = new Clipboard(div, {
    text() {
      return text;
    },
  });
  div.click();
  clip.destroy();
  div.remove();
}

export default copyText;
