!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.Ziz=n()}(this,function(){"use strict";function e(e){return e+="\r\n",e=n(e),e=t(e),e=u(e),e=c(e),e=i(e),e=o(e),e=l(e),e=r(e),e=a(e)}var n=function(e){return e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=e.replace(/"/g,"&quot;"),e=e.replace(/'/g,"&apos;"),e=e.replace(/\\/g,"&bsol;"),e=e.replace(/\//g,"&sol;")},r=function(e){var n=/~~(?!~)(.*)?~~/m;return e=e.replace(n,function(e,n,r){return"<del>"+r+"</del>"})},t=function(e){for(var n=/^(.*)\r?\n(={5,})$/gm,r=/^(.*)\r?\n(-{5,})$/gm,t=function(n){var r="^(#{"+n+"})([^#].*?)((#{1,})?$)",t=new RegExp(r,"gm");e=e.replace(t,function(e,r,t,u,o){return"<h"+n+">"+t+"</h"+n+">"})},u=6;u>=1;u--)t(u);return e=e.replace(n,function(e,n,r,t,u){return"<h1>"+n+"</h1>"}),e=e.replace(r,function(e,n,r,t,u){return"<h2>"+n+"</h2>"})},u=function(e){var n=/\[([^\[].*?)\]\((.*?)((?:\u0020*)&quot;(.*?)&quot;)?\)/gm;return e=e.replace(n,function(e,n,r,t,u){var o=n,c=r,i=u;return'<a href="'+c+'" title="'+i+'">'+o+"</a>"}),console.log(e),e},o=function(e){var n="<ul>",r="</ul>",t="<ol>",u="</ol>",o=/(([\*|\+|\-])(\u0020)+)(.*?)$/,c=/((^[\d]\.)(\u0020)+)(.*?)$/,i=e.split(/\n/),a=!0,l=i.length,f=i.map(function(e,t,u){return o.test(e)?(e=e.replace(o,function(e,n,r,t,u,o,c){return"<li>"+u+"</li>"}),a&&(e=n+e),t!==l-1&&o.test(u[t+1])||(e+=r),a=!1):a=!0,e});return a=!1,f=f.map(function(e,n,r){return c.test(e)?(e=e.replace(c,function(e,n,r,t,u,o,c){return"<li>"+u+"</li>"}),a||(e=t+e),r[n+1]&&c.test(r[n+1])||(e+=u),a=!0):a=!1,e}),e=f.join("\n")},c=function(e){return e},i=function(e){var n=/(^(\u0020)*`{3}(\w|\-|\.|\+|\-{1,10})?)((\n.*?)+)(`{3}$)/gm,r=/\<code\>(.*?)\<\/code\>/,t=/\r?\n/;e=e.replace(n,function(e,n,r,t,u,o,c,i,a){var l=u,f=t?t.toLowerCase():"nohighlight";return l="<pre><code class='"+f+"'>"+l+"</code></pre>"});var u=e.split(/\n/),o=u.map(function(e,n){for(var u=3;u>=1;u--){var o="(`{"+u+"})([^`]{1,}.*?[^`]*)(`{"+u+"})",c=new RegExp(o,"g");e=e.replace(c,function(e,n,u,o,c,i){var a=u;return!r.test(a)&&u.length>0&&!t.test(a)?a="<code>"+a+"</code>":e})}return e});return o.join("\n")},a=function(e){var n=e.split(/\n/),r=/^<[a-zA-Z0-9]{1,11}(\s.{1,18})?>.*<\/[a-zA-Z0-9]{1,11}>$/,t=/^\u0020+|\r|\n$/,u=n.map(function(e,n,u){var o="";return o=r.test(e)||t.test(e)||""===e?e:"<p>"+e+"</p>"});return u=u.join("\n")},l=function(e){var n=/(^((\u0020)*>+(\u0020)*)+)(.*)([^>]$)/gm;return e=e.replace(n,function(e,n,r,t,u,o,c,i){for(var a="<blockquotes>",l="</blockquotes>",f=0,p=/>/g;p.test(n);)f++;return""+a.repeat(f)+o+l.repeat(f)})};return e});
//# sourceMappingURL=Ziz.js.map
