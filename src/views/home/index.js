import './home.less';
import '../../../static/js/artTemplate'
import lodash from 'lodash'
const $ = require('jquery');
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
function Person(name,age,job){
	this.name = name
	this.age = age
	this.job = job
	this.sayName = function () {
	}
}
var person1 = new Person('Nicholas',29,'Software Engineer')
console.log(person1)

var bar = (function(name) {
	var _newObj = {
	constructor : Person,
		__proto__ : Person.prototype,
};
	_newObj.constructor(name); // _newObj.constructor.call(_newObj, name)-------------------------------------2  3
	delete _newObj.constructor
	return _newObj;
})('Alan');
// var person3 = bar
console.log(bar)

console.log(bar.__proto__ === person1.__proto__)
var data = {
	title: '基本例子',
	isAdmin: true,
	list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他'],
	value: '<span style="color:#F00">hello world!</span>'
};
var html = template('test', data);
document.getElementById('content').innerHTML = html;
export default index()