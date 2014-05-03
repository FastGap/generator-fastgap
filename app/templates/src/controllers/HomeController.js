/*!
 * FastGap v0.0.49 (http://fastgap.mobi/)
 * Author: Gustavo Costa
 * Maintainers: https://github.com/orgs/FastGap/members
 * Copyright (c) 2014
 * Licensed under MIT
 */

var HomeController = function () {};

HomeController.prototype = {
	self: Object,
	initialize: function () {
    // **************
		// your code here
    // --------------
	},
	destroy: function () {
    // ********************
		// unset events
		// stop ajax
		// destroy components
    // --------------------
		FG.scroll = null;
		PageLoad.ajxHandle = null;
	}
};
