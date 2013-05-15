AppRouter = Backbone.Router.extend({
	routes:{
		"*path(?:params)":"pathChange"
	},

	initialize: function initialize (options) {
		$(function () {
			if ("pushState" in window.history){
				Backbone.history.start({pushState: true, hashChange: false, silent: true});
				$(document).on('click', 'a', App.handleLinkClick);
				$(document).on('submit', 'form', App.handleFormSubmit);
			}
		});
	},
	pathChange: function pathChange (path, params) {
		path = path || '/';
		if (params) path = path + '?' + params;
		if(path.indexOf('/') !== 0) path = "/" + path;
		$.getJSON('/_pjax'+path, this.renderBlocks);
	},
	handleLinkClick: function handleLinkClick (e) {
		var $a = $(e.target);
		var target = $a.attr('target');
		var href = $a.attr('href');
		if (target === "_blank") return;
		if (!href || href.indexOf('#') === 0) return;
		e.preventDefault();
		App.navigate(href, {trigger: true});
	},
	renderBlocks: function renderBlocks (data) {
		if(App.checkForRedirect(data)) return;
		$('title').html(data.blocks.title);
		$('main .page').html(data.blocks.page_content);
		$('main .sidebar').html(data.blocks.sidebar_content);
		$('.top-navigation ul').html(data.blocks.navigation);
	},
	renderFormResponse: function (data) {
		if(App.checkForRedirect(data)) return;
		App.renderBlocks(data);
	},
	checkForRedirect: function checkForRedirect(data) {
		if(data.redirect === true){
			var path = data.location;
			// check wether its a relative redirect
			if(path.indexOf('/') !== 0) path = window.location.pathname + path;
			App.navigate(path, {trigger: true, replace: false});
			return true;
		}
		return false;
	},
	handleFormSubmit: function handleFormSubmit (e) {
		var $form = $(e.target);
		e.preventDefault();
		var url = $form.attr('action');
		if(url.indexOf('#') === 0) url = '.'; // IE10 fix
		$.ajax({
			url: url,
			type: $form.attr('method'),
			dataType: 'json',
			data: $form.serialize(),
			success: App.renderFormResponse
		});
	}
});

var App = new AppRouter();

