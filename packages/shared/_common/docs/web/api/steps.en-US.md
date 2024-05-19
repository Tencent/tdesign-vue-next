---
title: Steps
description: A navigation bar that prompts the user's progress and current steps to guide the user to complete tasks step by step.
isComponent: true
usage: { title: "", description: "" }
spline: navigation
---

### Horizontal step bar

A step bar that guides users to use in a horizontal direction.

#### Horizontal step bar with sequence number

Suitable for when there are many steps, so that users can more clearly understand the number of steps.

{{ sequence }}

#### Horizontal step bar without sequence

Suitable for when there are fewer steps, mainly to guide users to complete operations step by step.

{{ no-sequence }}

### Vertical step bar

A vertically arranged step bar, commonly used in vertical layouts or narrow screen scenarios.

#### Vertical step bar without sequence number

Suitable for situations where there are fewer vertical steps.

{{ vertical-no-sequence }}

#### Vertical step bar with sequence number

Suitable for scenarios with more steps and longer step prompts.

{{ vertical-sequence }}

### Step bar with status

A step bar that includes three states of "completed, in progress, and not completed" in the steps.

{{ status }}

### Step bar with icon

Suitable for scenarios where custom icons are required.

{{ icon }}

### Step bar with extra content

Suitable for scenarios where additional operations are required in the steps and waiting for the next operation.

{{ extra }}
