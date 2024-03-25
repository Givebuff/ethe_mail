var express = require('express');
var https = require('https');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
var fs = require('fs');
var readline = require('readline');
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');
app.use(express.static('public'));

const options = {
	key: fs.readFileSync('./keys/private.pem'),
	cert: fs.readFileSync('./keys/public.pem')
};
/*
https.createServer(options, app).listen(3000, function() {
  console.log("HTTPS server listening on port " + 3000);
});
*/
app.get('/', function(req, res){
  res.render('etheMail_start');
});
app.post('/sending', function(req, res){
  var account_address = req.body.account_address;
  if (fs.existsSync('data/'+account_address)) {
    res.redirect('/etheMail');
  }
  else {
    fs.writeFile('data/'+account_address, "", function(err){
    });
    res.redirect('/etheMail');
  }
});
app.post('/save', function(req, res){
  var address = req.body.address;
  var send_address = req.body.send_address;
  var name = req.body.name;
  var array = fs.readFileSync('data/'+address).toString().split("\n");
  if (array != "") {
    fs.appendFile('data/'+address, "\n" + send_address + " / " + name, function(err){
      if (err){
        console.log(err);
        res.status(500).send('error');
      }
    });
  }
  else {
    fs.appendFile('data/'+address, send_address + " / " + name, function(err){
      if (err){
        console.log(err);
        res.status(500).send('error');
      }
    });
  }
  
  res.redirect('/etheMaill_send');
})
app.post('/memo', function(req, res){
  var address = req.body.address;
  var array = fs.readFileSync('data/'+address).toString().split("\n");
  var lis = '';
  if (array != "") {
    for(i in array) { 
      lis = lis + `
      <input type='checkbox' name="remove" value="${array[i]}"/>${array[i]}<br>
      <div id="add">
      </div>`; 
    }
    var output = `<form action = "/remove" method = "post">` + lis + `
      <input type='text' name="address" value="${address}" style="display:none;"/>
      <button id="remove_btn">삭제</button>
      <textarea type='textarea' id="text" name="text" style="display:none;"></textarea>
    </form>`;
  }
  else {
    lis = "";
    var output = "";
  }
  var script = `
  <script>
  setInterval(function() {
    var check = 0;
    var arr_removeChk = document.getElementsByName("remove");
    for(var i=0;i<arr_removeChk.length;i++){
      if(arr_removeChk[i].checked == false) {
        if (data == null) {
          check = 1;
          var data = arr_removeChk[i].value
        }
        else {
          check = 1;
          var data = data + "\\n" + arr_removeChk[i].value
        }
      }//if
    }//for
    document.getElementById("text").value = data;
    console.log(document.getElementById("text").value);
  });
  </script>`;
  res.send(output+script)
});
app.post('/remove', function(req, res){
  var address = req.body.address;
  var text = req.body.text;
  if (text != "undefined") {
    fs.writeFile('data/'+address, text, function(err){
    });
  }
  else {
    fs.writeFile('data/'+address, "", function(err){
    });
  }
  res.redirect(307, 'back');
});
app.get('/etheMail', function(req, res){
  res.render('etheMail');
});
app.get('/etheMaill_send', function(req, res){
  res.render('etheMaill_send');
});
app.get('/etheMail_receive', function(req, res){
  if (req.query.index != null) {
    res.render('etheMail_receive');
  }
  else {
    res.redirect('/');
  }
});
app.listen(3000, function(){
    console.log('Conneted 3000 port!');
});
