---
title: Alert 
description: Alert bars are used to carry information that requires the user's attention.
isComponent: true
usage: { title: '', description: '' }
spline: message
---

### Basic Alert

The most basic warning bar using concise text prompts, with hints for 4 cases: Normal , Success, Alert, Failure.

{{ base }}

### Alert with operation

When taking action on this warning, you can configure `operation` to add the relevant action.

{{ operation }}

### Alert with relevant description text

When the content of the information is more complex, you can use the relevant description text to assist the explanation.

{{ title }}

### Collapsed Alert

When the information content exceeds 2 rows, you can use the collapsing method to hide part of the information.

{{ collapse }}
