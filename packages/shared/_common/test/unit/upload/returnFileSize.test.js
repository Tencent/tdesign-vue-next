import { returnFileSize } from '../../../js/upload/utils';

describe('returnFileSize', () => {
  it('size is 1 B return 1 Byte', () => {
    expect(returnFileSize(1)).toBe('1 Bytes');
  });

  it('size is 1023 B return 1023 Byte', () => {
    expect(returnFileSize(1023)).toBe('1023 Bytes');
  });

  it('size is 1025 B return 1.0 KB', () => {
    expect(returnFileSize(1025)).toBe('1.0 KB');
  });

  it('size is 2097152 B return 2.0 MB', () => {
    expect(returnFileSize(2097152)).toBe('2.0 MB');
  });

  it('size is 1073741823 B return 1024.0 MB', () => {
    expect(returnFileSize(1073741823)).toBe('1024.0 MB');
  });

  it('size is 1073741824 B return 1.0 GB', () => {
    expect(returnFileSize(1073741824)).toBe('1.0 GB');
  });
});
