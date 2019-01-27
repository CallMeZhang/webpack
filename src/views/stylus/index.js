/**
 * Created by for on 2019/1/27.
 */
// import './css03.css'
require('./css01.less')
require('./css02.less')
require('./css04.css')

let clicked = false;
let btn = document.getElementById('btn')
btn.addEventListener("click", function() {
	// 需要手动点击页面才会引入样式！！！
	console.log(123456)
	if (!clicked) {
		require("./css03.css");
	}
});