let f = import(/*webpackChunkName:"lazy-file"*/ './lazy-file.js');
console.log(f)
async function getComponent() {
	let isRequire=false
	if(isRequire){
		// require.ensure([], function() {
		// 	let $ = require('jquery')
		// 	console.log($('body'))
		// },'123')
	}else{
		const $ = await import(/*webpackChunkName:"jquery-lazy"*/ 'jquery');
		console.log($('body'))
	}

	let element = document.createElement('div');
	const _ = await import(/* webpackChunkName: "lodash-lazy" */ 'lodash');
	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
	return element;
}

var btn = document.getElementById('btn')
btn.addEventListener('click', function () {
	getComponent().then((component) => {
		document.getElementById('app').appendChild(component);
	})
})
