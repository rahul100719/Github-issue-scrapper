const request = require("request");
const cheerio = require("cheerio");
const getIssuePageHtml = require("./issue");

function getReposPageHtml(url,topic){
    request(url, cb);
    function cb(err,response, html){
        if(err){
            console.log(err);
        } else if (response.statusCode == 404) { // incase url is wrong
            console.log("page not found");
        } else {
            getReposLink(html);
            //console.log(html);
        }
    }

function getReposLink(html){
         //cheerio
        let $ = cheerio.load(html);
        let headingsArr = $(".f3.color-text-secondary.text-normal.lh-condensed");
        console.log(topic);
        
        // to display top 8 repos
        for (let i = 0 ; i < 8 ; i++){
            let twoAnchors = $(headingsArr[i]).find("a");  // finding anchor tag among headings of array
            
            // eg. microsoft / playwright
            let link = $(twoAnchors[1]).attr("href");  //microsoft --> 0th elemnt  / playwright -->1st element 
            //console.log(link);
            
            let fullLink = `https://github.com${link}/issues`;
            //console.log(fullLink);

            let repoName = link.split('/').pop(); 
            getIssuePageHtml(fullLink, topic, repoName);
        }
        console.log("****************************************");
    }
}
module.exports = getReposPageHtml;