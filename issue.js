const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

function getIssuePageHtml(url, topic, repoName){
    request(url, cb);
    function cb(err, response, html){
        if(err){
            console.log(err);
        } else if (response.statusCode == 404) {
            console.log("page not found");
        } else {
            //getReposLink(html);
            //console.log(html);
            getIssues(html);
        }
    }
    function getIssues(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr = [];
        for ( let i = 0; i < issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        //console.log(topic, "        ", arr); 
        let folderpath = path.join(__dirname, topic); // folder bna h 'topic' name ka
        dirCreater(folderpath);
        // issue k name ka repo ka name milega,uksa file bnega // 'repo' file
        let filePath = path.join(folderpath, repoName + ".pdf");
        let text =  JSON.stringify(arr);

        //https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit

        // Exports issues to pdf
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        fs.writeFileSync(filePath,JSON.stringify(arr));
    }
}
module.exports = getIssuePageHtml;

function dirCreater(folderpath){
    //if folder is not existing then creating
    if (fs.existsSync(folderpath) == false ){ 
        fs.mkdirSync(folderpath);
    }
}