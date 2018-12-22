---
layout: default
---
{% assign tags = site.tags %}

{% for tag in tags %}
  <hr>
  <h3>{{ tag | first }}</h3>
  
  
  <section class="tiles">
	{% for post in tag[1] %}
	{% assign loopindex = forloop.index | modulo: 6 | plus : 1 %}
	<article class="style{{ loopindex }}">
		<span class="image">
			<img src="{{ post.img | prepend: "/images/" | prepend: site.baseurl }}" alt="" />
		</span>
		<a href="{{ post.url | prepend: site.baseurl }}">
			<h2>{{ post.title }}</h2>
			<div class="content">
				<p>{{ post.desc }}</p>
			</div>
		</a>
	</article>
	{% endfor %}
  </section>

{% endfor %}
