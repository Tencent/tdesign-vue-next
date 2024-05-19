---

title: Drawer
description: Drawers are often opened by clicking on adjacent button controls, floating panels that slide in from the edge of the screen, also known as half-screen pop-ups.
isComponent: true
usage: { title: '', description: '' }
spline: message

---

### Visible Drawers

Carrying the informational content of the presentation. Drawers can be used to increase page scalability when page space is limited.

{{ base }}

### Operable Drawer

The operation drawer carries the forms to be edited or operated in the drawer, and can be used when the user needs to operate.

{{ operation }}

### Drawers with no hidden layer

By setting `showOverlay`, you can control whether to display the drawer overlay.

{{ no-mask }}

### Drawers in Different Positions

With `placement`, the drawer can be displayed in different positions.

{{ placement }}

### Drawers of different size

The width of the drawer display is controlled by the `size` attribute.

{{ size }}

### Customizing the Top and Bottom Drawers

You can adjust the contents at the top and bottom of the drawer by using `header` and `footer`.

{{ custom }}

### Eject Mode Drawer

Drawers can be displayed by covering or pushing the content area. For the `push` mode of the entire page,`attach` needs to be set to body. (The drawer component is mounted by default to the location of the element itself).

{{ popup }}

### Rendering and rendering in the drawer of the current parent element

The `showInAttachedElement` attribute is used to specify the parent container element of the drawer. The parent element must have a positioning attribute, for example:position: relative。

{{ attach-parent }}

### Destroy drawer when closing

You can use `destroyOnClose` to destroy a drawer from a page node when closing it.

{{ destroy }}

### Draggable Drawers

With `sizeDraggable`, you can drag and drop the edge of the drawer to change the size of the drawer.

{{ size-draggable }}
