import './home.less';
import '../../../static/js/artTemplate'
function index() {
	console.log('this is home page')
}
var data = {
	title: '基本例子',
	isAdmin: true,
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他'],
	value: '<span style="color:#F00">hello world!</span>'
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
window.index2=function () {
	console.log(123)
}