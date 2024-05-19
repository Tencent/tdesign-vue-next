---
title: Dialog 
description: A dialog  is a temporary window that opens a dialog on the page to host the corresponding information and actions when you do not want to interrupt the overall task flow, but you need to present information to the user or get a user response.
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Confirm the Class dialog 

A dialog  with a cancellation and main action that guides the user to make a second confirmation. Commonly used in feedback or fault-tolerant scenarios.

{{ base }}

### Feedback Class dialog 

A dialog that displays the result of an operation, with an icon in the title area and only a confirmation button. It is often used to display the results after operation, or to display information such as hazards and warnings.

{{ warning }}

### Asynchronous   dialog 

Buttons with load identities, operations require asynchronous completion of the dialog. For the current operation, it needs to complete asynchronously, waiting for it before automatically closing the dialog .

{{ async }}

### Customize  dialog 

You can customize the dialog box content and bottom buttons.

{{ custom }}

### Modal and Nonmodal  dialog 

Modal dialogs interrupt user actions, and the current dialog box content must be processed before other actions can be taken. Non-modal boxes do not interrupt user action.

{{ modal }}

### The pop-up position
The control dialog position can be customized by the `placement` and `top` properties.

{{ position }}


### Mount the element

Specifies that the dialog  element mounts the DOM.

{{ attach }}

