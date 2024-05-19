---
title: Image
description: Image is used to display image.
isComponent: true
usage: { title: "", description: "" }
spline: data
---

### Base Image

Provide five different fill mode: `fill`、`contain`、`cover`、`none`、and `scale-down`.

{{ fill-mode }}

Images with different padding positions.

This refers to the position of the image relative to the container. When the image is too large, different positions can be provided for displaying the left or right alignment of the partial image.

{{ fill-position }}

### Different shapes of image

Provide three shapes: `round`, `circle` and `square`.

When the length and width of an image are unequal, it is not possible to display a perfect circle using the `circle` option.

{{ shape }}

### Image with gallery cover

{{ gallery-cover }}

### Loading status of image

{{ placeholder }}

### Lazy load image

#### Single image

placeholder is used to display a placeholder image while the image is loading.

{{ lazy-single }}

#### Image list

When multiple images are scrolled and pulled down, the images that have not yet appeared will be represented by a placeholder, presenting the effect of lazy loading.

{{ lazy-list }}

### Extension element of image

Image with floating layer.

#### Always display floating layer

The floating layer is always displayed, and does not appear or disappear due to user operations.

{{ extra-always }}

#### Image with extra floating element

The floating layer is not displayed by default, and appears when the mouse is hovered over the image area.

{{ extra-hover }}

### Support `avif` and `webp`

Support using `srcset` for special format，such as `.avif` and `.webp`. Tencent Cloud's Image Processing service is recommended to transcod images into AVIF/WEBP <a href="https://cloud.tencent.com/document/product/436/60455">Image Compress Service</a>。

{{ avif }}
