require('./index.less')
import '../../../static/js/artTemplate'
function index() {
	console.log('this is home page')
}
index()
var data = {
	title: '标签',
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
module.export=index