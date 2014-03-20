
var express = require('express');
var routes = require('./routes');
var apis = require('./routes/apis');
var http = require('http');
var path = require('path');
var TOEFLDB = require('toelfdb');

var app = express();

// all environments
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.configure(function() {
    app.use(express.cookieParser());
    app.use(express.cookieSession({
		key: 'node',
		secret: 'HelloExpressSESSION'
	}));
    app.use(express.bodyParser());
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/apis/quiz/:skip/:limit', apis.retrieve);

var toefldb = app.locals.toefldb = new TOEFLDB;
http.createServer(app).listen(app.get('port'), function(){
    toefldb.init();
    console.log('Express server listening on port ' + app.get('port'));
});
