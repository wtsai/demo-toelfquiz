var DBHouse = require('dbhouse');
var dbHouse = new DBHouse;

exports.retrieve = function(req, res){
    //res.send("skip: " + req.params.skip + "\nlimit: " + req.params.limit );
	var toefldb = res.app.locals.toefldb;
	toefldb.DBserver.quiz(req, res);  
};

exports.retrieve_old = function(req, res){
    //res.send("skip: " + req.params.skip + "\nlimit: " + req.params.limit );
	//var toefldb = res.app.locals.toefldb;
	//toefldb.DBserver.quiz(req, res);
    /* Create connection with database server */
    dbHouse.connect('mongodb', { host: 'localhost', port: 27017 }, function() {

            /* Create a database operator */
            console.log(dbHouse);
            var db = new DBHouse.Database(dbHouse);
            db
            .open('toelf_test')
            .collection('english')
            //.where({})
            //.limit(10)
            //.order('_id', 1)
            .query(function(err, data) {
                if (err) {
                    console.log("(lib)DBserver: Error. " + err);
                    return res.json({ 
                        msg : err
                    });
                }
                
                console.log("(lib)DBserver: data. ");
                console.log(data);
                //var result = JSON.parse(data);
                //console.log("(lib)DBserver: result. ");
                //console.log(result);
                //return res.json({ 
                //    quiz : result
                //});
                //res.send(data);
                return res.json({ 
                    quiz : "OK"
                });
            });
    });    
};