---
title: Upload
description: The upload component allows users to transfer files or submit their own content.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Upload Function Quick Lookup Table

The file upload function lookup table has 9 styles in total. Only the attribute combinations listed in the table below are supported. You can find the corresponding API combination according to your actual needs.

 | Images/Documents|Batch|Drag and Drop Upload| API |Sample Code Location|
 | -- | -- | -- | -- | -- |
 | Documentation|single file|Drag and drop uploads are not allowed| theme=single-input, multiple=false |Input box single file upload|
 | Documentation|single file|Drag and drop uploads are not allowed| theme=file, multiple=false |Basic File Upload|
 | Documentation|batch file|Drag and drop uploads are not allowed| theme=file, multiple=true |Basic File Upload|
 | Documentation|single file|Allow drag and drop uploads| theme=file, draggable=true |Single file/image drag and drop upload|
 | Documentation|batch file|Allow drag and drop uploads| theme=file-flow, multiple=true, draggable=true |Batch Upload Files|
 | Picture|single picture|Drag and drop uploads are not allowed| theme=image, multiple=false |Upload basic image|
 | Picture|single picture|Allow drag and drop uploads| theme=image, draggable=true |Single file/image drag and drop upload|
 | Picture|Batch Images|Drag and drop uploads are not allowed| theme=image, multiple=true |Upload basic image|
 | Picture|Batch Images|Allow drag and drop uploads| theme=image-flow, multiple=true, draggable=true |Batch upload pictures|

### Upload Basic File

For basic file upload style, you can set `theme=file`. Drag and drop upload is not supported in this style. Drag and drop upload and batch upload examples are shown below the document.

- `action` indicates the upload API address.
- `formatRequest` is used to format upload API request parameters. You can add or modify parameters.
- `formatResponse` is used to format the API response value. If the `error` field in the response value exists, the upload fails.
- `sizeLimit` is used to set the file size limit. If the limit is exceeded, the upload request will not be triggered.
- `allowUploadDuplicateFile` Whether to allow uploading files with the same file name.
- `onSelectChange` is triggered after file selection but before upload request is initiated.
- `onSuccess` will be triggered after the upload is successful.
- `onFail` will start after the upload fails.

{{ base }}

### Upload File in Input Box

You can set `theme="single-input"`. Drag and drop upload is not supported in this style. Drag and drop upload and batch upload examples are provided below the document.

{{ single-input }}

### Uploading Basic Images

After the picture is uploaded successfully, the preview picture is displayed;After the image upload fails, the preview image is not displayed.

- You can set the attribute `theme="image"`. Drag and drop upload is not supported in this style. If you need to drag and drop upload, please go to the example of drag and drop upload below the document.
- All texts in the upload component can be modified via `locale`. Global configuration and document viewing are also supported<a href='/react/config?tab=api#uploadconfig'></a>.
- Image preview URL. By default, the `url` field returned by the upload API is read. If the API does not return the `url` field, you can use `formatResponse` to format the returned value and add the `url` field to the returned value.

{{ image }}

### Drag-and-Drop Upload of Single File/Image

Drag and drop files to the specified area to trigger upload. Both image and file types are supported.

- All texts in the upload component can be modified via `locale`. Global configuration and document viewing are also supported<a href='/react/config?tab=api#uploadconfig'></a>.
- If dragging and uploading a single file, set `theme="file"` and `draggable=true`.
- If dragging and uploading a single image, set `theme="image"` and `draggable=true`.
- You can use `fileListDisplay` to customize file information to display content.

{{ draggable }}

### Upload Files in Batch

Bulk uploads are usually presented as a separate function, with uploaded content hosted in a table. Since batch upload takes a long time, in some scenarios, files may be selected first, and then uploaded uniformly after confirmation.

- For batch file upload, please set the attributes `theme="file-flow"` and `multiple=true`.
- All texts in the upload component can be modified via `locale`. Global configuration and document viewing are also supported<a href='/react/config?tab=api#uploadconfig'></a>.
- When using `allowUploadDuplicateFile` to upload multiple documents, you can select files with duplicate names repeatedly.
- Use `uploadAllFilesInOneRequest` and `batchUpload` to implement batch consolidated upload of multiple files. Multiple files can be uploaded and replaced as a whole. No additional files are allowed.

{{ file-flow-list }}

### Upload Images in Batch

- For batch image upload, please set the attributes `theme="image-flow"` and `multiple=true`.
- All texts in the upload component can be modified via `locale`. Global configuration and document viewing are also supported<a href='/react/config?tab=api#uploadconfig'></a>.

{{ img-flow-list }}

### Custom Upload Method

You can use `requestMethod` to customize the upload method and return a Promise object.`status` in the resolve parameter controls whether the upload succeeds or fails, and `error` indicates the reason for the upload failure.

{{ request-method }}

### Custom Style Upload

- Use `trigger` to customize the upload trigger element. The file list is customized outside the upload component.

{{ single-custom }}

### Custom Drag-and-Drop Upload

- Use `dragContent` to customize the element content in the drag-and-drop area. If additional upload trigger elements are needed, they can be customized outside the upload component.

{{ custom-drag }}
