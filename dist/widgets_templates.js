window["Widgets"] = window["Widgets"] || {};
window["Widgets"]["templates"] = window["Widgets"]["templates"] || {};
window["Widgets"]["templates"]["iframe/fixed_aspect"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="widget-container" data-aspect-ratio="'+
((__t=( aspect ))==null?'':_.escape(__t))+
'">\n  <div class="widget-content">\n    <iframe src="'+
((__t=( src ))==null?'':_.escape(__t))+
'" frameborder="0" width="100%" height="100%"\n      webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n  </div>\n</div>\n';
}
return __p;
};
window["Widgets"] = window["Widgets"] || {};
window["Widgets"]["templates"] = window["Widgets"]["templates"] || {};
window["Widgets"]["templates"]["iframe/fixed_size"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<iframe src="'+
((__t=( src ))==null?'':_.escape(__t))+
'" frameborder="0" width="'+
((__t=( width ))==null?'':_.escape(__t))+
'" height="'+
((__t=( height ))==null?'':_.escape(__t))+
'"\n  webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>\n';
}
return __p;
};
window["Widgets"] = window["Widgets"] || {};
window["Widgets"]["templates"] = window["Widgets"]["templates"] || {};
window["Widgets"]["templates"]["insightmaker/insightmaker"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<a href="'+
((__t=( href ))==null?'':__t)+
'" target="lightbox">'+
((__t=( text ))==null?'':_.escape(__t))+
'</a>\n';
}
return __p;
};
window["Widgets"] = window["Widgets"] || {};
window["Widgets"]["templates"] = window["Widgets"]["templates"] || {};
window["Widgets"]["templates"]["test/test"] = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='Awww yeah!\n';
}
return __p;
};