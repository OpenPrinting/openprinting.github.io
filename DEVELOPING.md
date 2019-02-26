---
title: DEVELOPING
---
## Adding Disqus to your page:

Disqus uses page's title to keep comments on different pages seperate. So, always set ```title``` of a page.

For adding comments section to any page simply add these lines to the page:
```
<div>
{% if site.comments.provider and page.comments %}
      {% include comments.html %}
{% endif %}
</div>
```
You don't need to add above lines, if you are using ```single``` layout. 

Don't forget to turn on comments in yaml:
```
---
comments: true
---
```