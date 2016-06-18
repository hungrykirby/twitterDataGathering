var twitter = require('twitter');
var fs = require('fs');

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.OAUTH_TOKEN,
    access_token_secret: process.env.OAUTH_TOKEN_SECRET
});

fs.appendFileSync('twitterData01.txt', "yahoo", 'utf8', function(err){
  console.log(err);
});

var count = 0;
client.stream('statuses/sample', function (stream) {
    if (count < 10) {
      var str = "";
      stream.on('data', function (data) {
        //console.log(data.user);
          var text = data.text;
          //str += text;
          var lang = '';
          try{
            lang = data.user.lang;
            //console.log(lang);
          }catch(e){
            //console.log(e.message);
          }

          if(lang === 'ja'){
            count++;
            var url = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/gi;
            if(text.match(/RT/) === null && text.match(url) === null){
              text = text.replace(/@\w+/, '');
              text = text.replace(/\s/, '');
              fs.appendFileSync('twitterData02.txt', text + '\n', 'utf8', function(err){
                console.log(err);
              });
              console.log(count + ':' + text);
            }

          }
        });
    }
});
