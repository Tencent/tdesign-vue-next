import { validateFileType } from '../../../js/upload/utils';

describe('validateFileType', () => {
  it('image/* test', () => {
    expect(validateFileType('image/*', 'image/jpeg')).toBeTruthy();
    expect(validateFileType('image/*', 'image/jpg')).toBeTruthy();
    expect(validateFileType('image/*', 'image/png')).toBeTruthy();
    expect(validateFileType('image/*', 'image/webp')).toBeTruthy();
    expect(validateFileType('image/*', 'image/avif')).toBeTruthy();
    expect(validateFileType('image/*', 'image/svg')).toBeTruthy();
    expect(validateFileType('image/*', 'image/gif')).toBeTruthy();
    expect(validateFileType('image/*', 'image/bmp')).toBeTruthy();
    expect(validateFileType('image/*', 'DSC08672.ARW')).toBeTruthy();
  });

  it('video/* test', () => {
    expect(validateFileType('video/*', 'test.mp4')).toBeTruthy();
    expect(validateFileType('video/*', 'test.avi')).toBeTruthy();
    expect(validateFileType('video/*', 'test.mov')).toBeTruthy();
  });

  it('audio/* test', () => {
    expect(validateFileType('audio/*', 'test.mp4')).toBeTruthy();
    expect(validateFileType('audio/*', 'test.mp3')).toBeTruthy();
    expect(validateFileType('audio/*', 'test.mp2')).toBeTruthy();
    expect(validateFileType('audio/*', 'test.au')).toBeTruthy();
    expect(validateFileType('audio/*', 'test.ogg')).toBeTruthy();
    expect(validateFileType('audio/*', 'test.3gpp')).toBeTruthy();
  });

  it('.docx, .doc, .zip test', () => {
    expect(validateFileType('.docx, .doc, .zip', 'application/zip')).toBeTruthy();
    expect(validateFileType('.docx,.doc,.zip', 'application/doc')).toBeTruthy();
    expect(validateFileType('.docx,.doc,.zip', 'application/msword')).toBeTruthy();
    expect(validateFileType('.docx,.doc,.zip', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')).toBeTruthy();
    expect(validateFileType('.docx,.doc,.zip', 'application/docx')).toBeTruthy();
    expect(validateFileType('.docx,.doc,.zip', 'application/jpg')).toBeFalsy();
  });
});
