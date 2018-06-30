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

  // can be automated rather than manual entries
  "/assets/images/bhavri-github-callbacks.png",
  "/assets/images/bhavri-github-issues.png",
  "/assets/images/jakethecake-svg-line-anime.png",
  "/assets/images/svg-animated-mast-text-shapes-tweet.png",
  "css/main.css",
  "/about/",
  "/index.html"
];
