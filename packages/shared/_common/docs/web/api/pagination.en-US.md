---
title: Pagination
description: Controls for switching content within a module.
isComponent: true
usage: { title: '', description: '' }
spline: navigation
---

### Base paging

#### Small number of pages
The most basic paging control, only show the page number. It is recommended to use lightweight pagination scenarios with less than 10 pages of content.

{{ base }}

#### More pages
With a large amount of data to display, paging allows users to quickly locate the current page number. It is recommended to use pagination scenarios with more than 10 pages of content.

{{ more }}

### Pagination with total data display
The data in the associated module is displayed, so that the user can quickly understand the data level without browsing all of them. Often used for statistics in tables.

{{ total }}

### Pagination with page display quantity selection
The number of items displayed on each page can be adjusted according to user requirements.

{{ page-num }}

### Pagination with quick jump
When the data needs to be quickly located, select to display the quick jump page.

{{ jump }}

### Minimalist pagination
Extremely simple page control, only show the current page, the total number of pages and page up and down. There is less horizontal space within the module and no need to pinpoint the scene of a specific page.

{{ simple }}

### Mini Pagination
Remove the border of the pagination control while retaining its main function. This is suitable for scenarios where space is limited within the module and lightweight pagination is needed to increase page utilization.

{{ mini }}

### Minimalist mini version pagination
Smaller size of the mini-style paging control, suitable for embedded in other components in the paging navigation.

{{ simple-mini }}

### PaginationMini Subassembly
The smallest unit paging control, suitable for embedded in other components with smaller space.

{{ pagination-mini }}
