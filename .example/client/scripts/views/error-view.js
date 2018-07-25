'use strict';

var app = app || {};

(function(module) {
  const errorView = {}

  errorView.initErrorPage = err => {
    app.showOnly('.error-view');
    $('#error-message').empty();
    $('#error-message').append(app.render('error-template', err) );
  }

  module.errorView = errorView;
})(app);