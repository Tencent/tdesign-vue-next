---
title: Anchor 
description: A hyperlink within a page that jumps to a specified location within a page
isComponent: true
usage: { title: '', description: '' }
spline: navigation
---

### Basic Anchor
There is no hierarchical relationship between anchor points. Suitable for anchors when there is a sibling relationship between anchors, it belongs to the scene with simple page structure.

{{ base }}

### Multiple anchor 
Anchor points contain hierarchical relationships. When the applicable anchor contains a parent-child relationship, it is a scene with a complex page structure.

{{ multiple }}

### Custom cursor anchor 
Supports styling cursors according to your own needs
{{ cursor }}

### Specifies the container anchor 

Specifies the container that responds to scrolling for anchor positioning, and the application of the click event prevents anchors from being added to the URI.

{{ container }}

### specific interaction anchor

Used for interaction after anchor anchor positioning, including: highlighting the current anchor, copying the link

{{ target }}

### Anchor of different sizes

Available in large and small sizes

{{ small }}

{{ large }}
