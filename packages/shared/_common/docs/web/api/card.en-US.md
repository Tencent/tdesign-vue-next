---
title: Card 
description: A basic card container that can hold text, lists, images, and paragraphs, often used in background overview pages.
isComponent: true
usage: { title: '', description: '' }
spline: data
---

### The minimalist card

A card form with content only.

#### Have a border

{{ bordered }}

#### No border

{{ bordered-none }}

### The card with the header

It consists of a title bar at the top of a minimalist card. The title bar can contain the title, picture, operation area, status, and other content. The top bar can define all the content, depending on the user's custom elements.

#### There are no dividing lines

{{ header }}

#### With a line

{{ header-bordered }}

### The card with the footer

It consists of a bottom bar under a minimalist card that can contain titles, pictures, action areas, status, and more.

{{ footer }}

#### The bottom bar of all operations

{{ footer-actions }}

#### All are the bottom bars of the display content

{{ footer-content }}

#### At the same time with display content and operation content of the bottom bar

{{ footer-content-actions }}

### A card with a header and a footer

A complex card consisting of a top bar, a bottom bar, and a minimalist card, with three area contents that can be configured as needed.

{{ footer }}

{{ header-subtitle-footer-actions }}

{{ header-footer-actions }}

### Cards with different headings

A card with a main title, subtitle, or title description.

#### A card with a main subtitle

{{ header-subtitle }}

#### A card with a title description

{{ header-description }}

#### A card with both a main subtitle and a title description

{{ header-all-props }}

#### A custom loadingProps card

{{ custom-loading-props }}
