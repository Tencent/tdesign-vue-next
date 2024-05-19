---
title: Dialog
description: A modal view that interrupts the current action to display an important prompt or request an important action from the user
spline: base
isComponent: true
toc: false
---

## Code Demo

The default button style is' variant = text ', if any button changes' variant ', then all buttons change to this.

### Component Type

#### Feedback Class Dialog

Used when a user performs an operation that communicates important information and informs the user of the current situation.

{{ feedback }}

#### Confirm Class Dialog

It is used when the user performs an operation that has serious consequences and requires the user to confirm twice. For example, exit, delete, and clear

{{ confirm }}

#### Enter Dialog

After an operation is performed, the user needs to enter the necessary information for the next operation. Such as entering a password

{{ input }}

#### Dialog With Picture

Image elements can be inserted into the dialog box and the position can be customized.

{{ image-dialog }}

### Component Status

Text button, horizontal base button, vertical base button, multi-button, with close button

{{ multi-state }}

### Component Usage

Command line call

{{ plugin }}
