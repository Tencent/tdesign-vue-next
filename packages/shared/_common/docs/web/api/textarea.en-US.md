---
title: Textarea
description: This component is used to carry the user's multi-line information entry. It is often used in scenarios that require a fairly long text, such as describing information and feedback opinions in a form. You can set the maximum copy length.
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### Basic Multiline Text Box

Used for multiline text entry.

{{ base }}

### Limit the maximum number of characters

Limits the maximum number of characters entered and displays the number of characters.

{{ maxlength }}

### Binding DOM Events

You can bind DOM native events such as `onKeypress` `onKeydown` `onKeyup` `onFocus` `onBlur`.

{{ events }}

### Multi-line text boxes in different statuses

Read-only, disabled state is supported.

{{ type }}
