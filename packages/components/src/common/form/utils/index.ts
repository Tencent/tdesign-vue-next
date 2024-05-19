export function requestSubmit(target: HTMLFormElement) {
  if (!(target instanceof HTMLFormElement)) {
    throw new TypeError('target must be HTMLFormElement');
  }
  const submitter = document.createElement('input');
  submitter.type = 'submit';
  submitter.hidden = true;
  target.appendChild(submitter);
  submitter.click();
  target.removeChild(submitter);
}
