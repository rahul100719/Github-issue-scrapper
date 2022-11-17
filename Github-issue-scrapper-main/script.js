let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");   // sourcing repo js file

request(url, cb);
function cb(err, response, html) {
    if (err){
        console.log(err);
    } else if (response.statusCode == 404) { // incase url is wrong
        console.log("page not found");
    } else {
        //console.log(html);
        getTopiclinks(html);
    }
}

function getTopiclinks(html){
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

    // To get topic links looping dynamic href attributes, meanwhile cheerio will get element in its way in the array
    for(let i = 0; i < linkElemArr.length; i++){

        let href = $(linkElemArr[i]).attr("href");

        // last topic's sub topic eg. .......microsoft / playwright 
        let topic = href.split('/').pop();  

        // we will get full link via concatenation : bactic + href 
        let fullLink = `https://github.com/${href}`;
        getReposPageHtml(fullLink,topic);
    }
}