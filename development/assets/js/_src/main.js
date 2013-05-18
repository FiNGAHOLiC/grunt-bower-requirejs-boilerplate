/*!
 * main.js
 *
 * @modified 2013/05/10
 *
 */

require.config({
	paths: {
		'jquery': '../vendor/jquery/jquery',
		'jquery-ui': '../vendor/jquery-ui/ui/jquery.ui.widget',
		'jquery-easing': '../vendor/jquery-easing/jquery.easing'
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
