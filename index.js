var mysql = require('mysql');
 var connection;

 
function openConn(){
	console.log(JSON.stringify(mysql));
    
    	console.log( $("#host").val());
        console.log( $("#user").val());
        console.log( $("#password").val());
        console.log( $("#database").val());
    
   connection = mysql.createConnection(
        {
        host     : $("#host").val(),
        user     : $("#user").val(),
        password : $("#password").val(),
        database : $("#database").val(),
        }
    );
    console.log(connection.connect());
    
    
    var queryString = "SELECT * FROM bjtf_colums";
 
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log("Post Titles: ", rows[i].post_title);
    }
});
} 





function closeConn(){
    console.log(connection.end());
} 
 

openConn();