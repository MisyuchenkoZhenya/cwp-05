const uid = require('uid');

class Article {

    constructor(artcl){
        this.article = {
            "id": uid(),
            "title": artcl.title,
            "text": artcl.text,
            "date": this.getDate(),
            "author": artcl.author,
            "comments": [],
        }
    }

    getArticle(){
        return this.article;
    }

    getDate(){
        let date = new Date().toUTCString()
        return date.split(/ /g).slice(1, 5).join(' ');
    }
}

module.exports.Article = Article;