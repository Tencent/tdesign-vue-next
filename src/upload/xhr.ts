import { XhrOptions, UploadProgressEvent } from './interface';

export default function xhr({
  action,
  withCredentials = false,
  headers = {},
  data = {},
  file,
  name = 'file',
  onError,
  onProgress,
  onSuccess,
}: XhrOptions) {
  const xhr = new XMLHttpRequest();
  if (withCredentials) {
    xhr.withCredentials = true;
  }

  // set send data
  const formData = new FormData();
  const sendData = typeof data === 'function' ? data(file) : data;
  Object.keys(sendData).forEach((key) => {
    formData.append(key, data[key]);
  });
  formData.append(name, file.originFileObj);

  // custom request headers
  Object.keys(headers).forEach((key) => {
    xhr.setRequestHeader(key, headers[key]);
  });

  xhr.open('post', action, true);

  xhr.onerror = (event: UploadProgressEvent) => onError({ event, file });

  xhr.onprogress = function (event: UploadProgressEvent) {
    if (event.total > 0) {
      event.percent = event.loaded / event.total * 100; // eslint-disable-line
    }
    onProgress({ event, file });
  };

  xhr.onload = function (event: UploadProgressEvent) {
    if (xhr.status < 200 || xhr.status >= 300) {
      return onError({ event });
    }
    let response;
    const text = xhr.responseText || xhr.response;
    try {
      response = JSON.parse(text);
    } catch (e) {
      response = text;
    }
    onSuccess({ event, file, response });
  };

  xhr.send(formData);

  return xhr;
};
