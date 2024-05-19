---
title: ImageViewer
description: ImageViewer is used to display images and partially operate on images
isComponent: true
usage: { title: "", description: "" }
spline: base
---

### Base imageViewer

#### Thumbnail imageviewer

View the full image by using a thumbnail image.

{{ base }}

#### Small window imageviewer

View the full image by using a thumbnail image. Supports movable small window display.

{{ modeless }}

#### Text imageviewer

View the image by clicking on a text button.

{{ button }}

### Imageviewer with multi-image preview

When there are multiple images, all images can be previewed and expanded within the viewer.

{{ multiple }}

### Album imageviewer

Trigger multi-image preview by using the cover image of the album.

{{ album }}

### Imageviewer with progressive loading preview

The loading status is progressively displayed before the original image is successfully loaded.

{{ block }}

### Fail to load images

A placeholder image is used to show images that fail to load, and a description of the failure is provided.

{{ error }}

### Image viewer triggered from an operation bar

Click on a related button in the operation bar to view the image.

{{ albumIcons }}
