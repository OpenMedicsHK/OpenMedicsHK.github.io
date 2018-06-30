---
---

const version = '{{site.time | date: '%Y%m%d%H%M%S'}}';
const staticCacheName = "openmedicshk::"+version;

console.log("installing worker");

const filesToCache = [
  "/",
  {% for page in site.html_pages %}
    '{{ page.url }}',
  {% endfor %}
  {% for post in site.posts %}
    '{{ post.url }}',
  {% endfor %}
  {% for file in site.static_files %}
    '{{ file.path }}',
  {% endfor %}
];
