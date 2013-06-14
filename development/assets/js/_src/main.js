/*!
 * main.js
 *
 * @modified 2013/06/14
 *
 */

require.config({
	paths: {
		'jquery': '../vendor/jquery.min/index',
		'jquery-ui': '../vendor/jquery.ui.widget/index',
		'jquery-easing': '../vendor/jquery.easing.min/index'
	},
	shim: {
		'jquery-ui': {
			deps: ['jquery'],
			exports: 'jQuery'
		},
		'jquery-easing': {
			deps: ['jquery'],
			exports: 'jQuery.easing'
		}
	}
});

require([
	'module1',
	'module2',
	'module3',
	'foo/module4'
], function(func1, func2, func3, func4){
	func1.log();
	func2.log();
	func3.log();
	func4.log();
});
