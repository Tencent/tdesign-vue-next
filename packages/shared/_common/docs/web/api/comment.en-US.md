---
title: Comment
description: Comment is used for feedback, evaluation, discussion, etc. on page content, such as evaluations of articles and discussions on topics.
isComponent: true
usage: { title: "", description: "" }
spline: data
---

### Basic comments

The most basic comment component, including avatar, author, time, and comment content. Suitable for various scenarios where comments need to be displayed.

{{ base }}

### Comments with operations

A component that allows you to perform related operations on comment content. Suitable for scenarios where a custom operation column is needed.

{{ operation }}

### List comments

Comments displayed in list form.

{{ list }}

### Comments with replies

A component that displays the reply content of a comment. Suitable for scenarios where comments need to be replied to. The author’s name can be followed by the name of the reply object.

{{ reply }}

### Comments with quotes

Comments can quote other content to indicate the reference relationship between the comment and other content.

{{ quote }}

### Comments with reply form

A component for replying to comment content. You can directly enter content in the reply form to reply.

{{ reply-form }}
