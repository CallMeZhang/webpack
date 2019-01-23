require('./index.less')
import '../../../static/js/artTemplate'
let lodash = require.ensure([],function(require){
	require('lodash');
},'lodash')
lodash.then((_)=>{
	// isBoolean(false)
	console.log(_)
})
function index() {
	console.log('this is index page')
}
index()
var data = {
	title: '标签',
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
module.export=index