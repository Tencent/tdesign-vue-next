---
title: Notification
description: A lightweight global message prompt and confirmation mechanism that requires slow animation when appearing and disappearing.
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Basic Message Notification

Basic message notification, which can be manually closed or automatically exited.

{{ base }}

### Message Notification with Icon

Message notifications with icons provide two scenarios:General and important message notifications (e.g.:system error, etc.).

{{ icon }}

### Message Notification with Operation

Message notifications with actions provide the user with a next action point for brief and quick interaction in a message prompt box.

{{ operation }}

### Position Control

The global prompt display position can be controlled.`placement` is used to control the approximate position, and `offset` is used to set the offset from the position of `placement`.

{{ placement }}

### Disabling Prompt

You can also use the close function if you do not want to close by timing, or if the user clicks a button.

{{ toggle }}
