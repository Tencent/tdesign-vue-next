---
title: Button
description: Buttons are used to open a closed-loop task, such as "delete" an object, "buy" an item, etc.
isComponent: true
usage: { title: '', description: '' }
spline: base
---

### Basic Buttons

The basic buttons include the fill button, the stroke button, the dotted box button, and the text button.

#### Fill button

It is generally used for the main button, which is the operation with the highest priority that the user needs to pay attention to throughout the page, guiding the user to pay attention and operate.

#### Stroke button

Stroke buttons are commonly used in the form of white background with text, and are weaker than fill buttons in terms of visual emphasis, and are usually used in groups with fill buttons.

#### Dummy frame button

The button border line is dashed and is often used to add configuration items to the form.

#### Text Button

Uses text directly as a button. One of the least visually appealing buttons, usually found in form action fields, next to headings and fields, etc.

{{ base }}

### Icon button

Iconic buttons consist of icons + text or icons. Icons enhance recognition for visual understanding.

{{ icon }}

### Ghost Button

The ghost button reverses the color of the button's content and makes the background of the button transparent, usually with a transparent base color. It is often used on colored backgrounds, such as banner images.

{{ ghost }}

### Block Button

The Block button fills its parent container in width (no padding and margin values). This button is commonly used in mobile and some form scenarios.

{{ block }}

### Different color theme buttons

Light gray, blue, red, yellow and green themed buttons are available.

{{ theme }}

### Buttons for different states

Provides two states: loaded and disabled.

{{ status }}

### Different sizes of buttons

Available in large, medium (default) and small sizes.

{{ size }}

### Different shaped buttons

Four shapes are provided: rectangle, square, rectangle with rounded corners, and circle.

{{ shape }}
