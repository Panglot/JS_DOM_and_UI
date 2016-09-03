function solve() {
	return function() {
		var template = [
			'<h1>{{title}}</h1>',
			'<ul>',
			'{{#each posts}}',
			'<li>',
			'<div class="post">',
			'<p class="author">',
			'<a class="{{#if author}}user" href="/user/{{author}}"{{else}}anonymous"{{/if}}>{{#if author}}{{author}}{{else}}Anonymous{{/if}}</a>',
			'</p>',
			'<pre class="content">{{{text}}}</pre>',
			'</div>',
			'<ul>',

			'{{#if comments}}',
			'{{#each comments}}',
			'{{#unless deleted}}',
			'<li>',
			'<div class="comment">',
			'<p class="author">',
			'<a class="{{#if author}}user" href="/user/{{author}}"{{else}}anonymous"{{/if}}>{{#if author}}{{author}}{{else}}Anonymous{{/if}}</a>',
			'</p>',
			'<pre class="content">{{{text}}}</pre>',
			'</div>',
			'</li>',
			'{{/unless}}',
			'{{/each}}',
			'{{/if}}',
			'</ul>',
			'</li>',
			'{{/each}}',
			'</ul>'
		].join('\n');

		return template;
	}
}

// submit the above

if(typeof module !== 'undefined') {
	module.exports = solve;
}
