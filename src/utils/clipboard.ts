import clipboard from 'clipboard';

export function copyText(text: string) {
  const div = document.createElement('div');
  const clip = new clipboard(div, {
    text() {
      return text;
    },
  });
  div.click();
  clip.destroy();
  div.remove();
}


export default copyText;