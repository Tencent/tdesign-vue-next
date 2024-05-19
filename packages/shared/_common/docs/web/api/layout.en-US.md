---
title: Layout 
description: Used to organize the framework structure of web pages.
isComponent: true
usage: { title: '', description: '' }
spline: layout
---


### Basic usage

`<Layout>`: layout container, can wrap child components `<Header>`, `<Footer>`, `<Aside>`, `<Content>`.

When the child elements contain `<Aside>`, all child elements will be arranged horizontally, otherwise they will be arranged vertically.

{{ base }}

### Side navigation layout

Mainly includes side navigation and content area. Under this layout, the operation efficiency of page switching is high, but the horizontal space of the content area is compressed. Suitable for pages with deep navigation levels and high navigation efficiency requirements.

{{ aside }}

### Top navigation layout

Mainly includes the top area and content area. Under this layout, the display efficiency of horizontal space is very high, but the navigation space is lost and the switching efficiency of page navigation is reduced. Suitable for pages where the main operation area is in the content area and the page stacking efficiency requirements are not high. For such pages, in order to ensure the stability of information layout, the width of the content area is often set to a fixed width.

{{ top }}

### Combined navigation layout

Mainly includes top navigation, side navigation and content area. The combination of top navigation and side navigation improves navigation efficiency. It is mostly used in application-oriented websites with complex information architecture and certain requirements for navigation efficiency.

{{ combine }}
