import './home.less';
import '../../../static/js/artTemplate'
import lodash from 'lodash'
// import $ from 'jquery';
//
// console.log($('.content'))
console.log(lodash)
console.log($)
console.log(_)
function index() {
	console.log('this is home page')

	return function () {
		console.log('home')
	}
}
var data = {
	title: '基本例子',
	isAdmin: true,
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他'],
	value: '<span style="color:#F00">hello world!</span>'
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
export default index()