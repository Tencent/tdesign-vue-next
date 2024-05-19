---
title: Tree
description: Used to carry structured content with parent-child relationships and provide a hierarchical display of content.
isComponent: true
usage: { title: "", description: "" }
spline: data
---

### Basic Tree

Can carry content with parent-child relationships for display. The parent node has expand/collapse operations and provides a selection mark for a single node. Commonly used for displaying system directory structures and organizational structures.

{{ base }}

### Selectable Tree

#### Tree with Checkboxes

Provides checkbox controls on top of the basic tree structure. Used when multiple nodes need to be selected, such as selecting multiple personnel in an organizational structure.

{{ checkable }}

#### Highlightable

{{ activable }}

### Draggable Tree

Nodes in the tree can be freely dragged

{{ draggable }}

### Filterable Tree

{{ filter }}

### Customizable

#### Tree with Operational Functions

Provides operational buttons for nodes on top of the basic tree structure. Used when a series of operations need to be performed on nodes, such as adding, deleting, and modifying.

{{ operations }}

#### Tree with Custom Icons

Allows for custom design of the expand/collapse icons on parent nodes. Used when the icon needs to match the meaning of the information name, such as the concept of a folder.

{{ icon }}

#### Empty Data

{{ empty }}

#### Custom Labels

{{ label }}

### Tree with Connecting Lines

Connects parent nodes in the tree with their child nodes at the same level. This usage is for situations where there are many sub-items at deep levels and a clearer representation of the subordinate relationship is needed.

{{ line }}

### Expand Operations

#### Expand All on Initialization

{{ expand-all }}

#### Expand First Level on Initialization

{{ expand-level }}

#### Mutually Exclusive Expansion

{{ expand-mutex }}

<!-- ### Disabled State

{{ disabled }} -->

### Data Loading

#### Asynchronously Load Nodes

{{ load }}

#### Load Nodes on Expansion

{{ lazy }}

<!-- ### Controlled Operations

{{ controlled }} -->

### Controlled Usage

{{ sync }}

<!-- ### Update Nodes

{{ state }} -->

### Virtual Scrolling

{{ vscroll }}
