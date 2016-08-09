var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");


request("http://www.ithome.com.tw/security",function(error,response,body){
    if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        var $channel = $(".channel-item");
        var $title = $channel.find("p.title");
        var $summary = $channel.find(".summary");
        var count = 0;
        const result = {
            website: "http://www.ithome.com.tw/security",
            subject: "資安新聞",
            data: []
        };

        for(let i=0; i<$channel.length; i++){
            count++;
            result.data.push({title: $title.eq(i).text(), summary: $summary.eq(i).text().replace(/\n/g,"")})
        }
        console.log(count);
        fs.writeFileSync("result.json",JSON.stringify(result))
    }
})