---
title: Loading
description: Representation of the state when data is being loaded when the network is slow or when there is a lot of data. 
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Icon Loading
Only the icon is displayed during loading. Suitable for loading scenarios where modules are waiting to refresh after opening the page or completing an operation.

{{ base }}

### Text Loading
Text is displayed during loading. Suitable for loading scenarios where modules are waiting to refresh after opening the page or completing an operation.

{{ text }}

### Icon and Text Loading
Text and icons are displayed together during loading. Suitable for loading scenarios where the entire page is waiting to refresh after opening the page or completing an operation.

{{ icon-text }}

### Different Sizes
The small size is suitable for loading scenarios within the component, the medium size is suitable for loading scenarios in container areas such as cards, tables, etc., and the large size is suitable for full-screen loading scenarios on pages.

{{ size }}

### Wrapped Loading
The Loading component can wrap the content that needs to display the loading state.

{{ wrap }}

### Delayed Loading
Set the minimum delay response time, and the loading state will not be displayed for operations with a response time lower than the response time.

{{ delay }}

### Full-screen Loading
The loading state is displayed full-screen, preventing the user from operating.

{{ fullscreen }}

### Attached to a Specific Element
The Loading component can be attached to a specific element using attach.

Note: The element being attached to (the parent element of loading) should set `position: relative;`.

{{ attach }}

### Function Call
{{ service }}

