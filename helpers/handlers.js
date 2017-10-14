const artcl = require('../models/article');
const cmmnt = require('../models/comment');

Error_400 = {
    "code": 400,
    "message": "Request invalid"
}

const handlers = {
    '/articles/readall': articlesReadall,
    '/articles/read': articlesRead,
    '/articles/create': articlesCreate,
    '/articles/update': articlesUpdate,
    '/articles/delete': articlesDelete,
    '/comments/create': commentsCreate,
    '/comments/delete': commentsDelete,
};

function articlesReadall(req, res, payload, articles, cb) {
    const result = articles;
  
    cb(null, result, articles);
}

function articlesRead(req, res, payload, articles, cb) {
    let context = {};
    const index = articles.length > 0 ? articles.findIndex((elem) => elem.id === payload.id) : -1;

    if(index !== undefined && index >= 0){
        context = articles[index];
    }
    else{
        context = {"Error": "No article with current articleId"};
    }
    cb(null, context, articles);
}

function articlesCreate(req, res, payload, articles, cb) {
    let article = new artcl.Article(payload);
    articles.push(article.getArticle());
  
    cb(null, article.getArticle(), articles);
}

function articlesUpdate(req, res, payload, articles, cb) {
    let context = {};
    
    try{
        const index = articles.length > 0 ? articles.findIndex((elem) => elem.id === payload.id) : -1;
        
        if(index !== undefined && index >= 0){
            articles[index] = updateArticle(articles[index], payload.update);
            context = {"Result": "Article updated"};
        }
    }
    catch(Error){
        context = Error_400;
    }
  
    cb(null, context, articles);
}

function articlesDelete(req, res, payload, articles, cb) {
    let context = {};
    const index = articles.length > 0 ? articles.findIndex((elem) => elem.id === payload.id) : -1;

    if(index !== undefined && index >= 0){
        delete articles[index];
        context = {"Result": "Article deleted"};
    }
    else{
        context = {"Error": "No article with current articleId"};
    }
    cb(null, context, articles);
}

function commentsCreate(req, res, payload, articles, cb) {
    let comment = new cmmnt.Comment(payload);
    let context = {};
    const index = articles.length > 0 ? articles.findIndex((elem) => elem.id === comment.getArticleId()) : -1;

    if(index !== undefined){
        context = comment.getComment();
        articles[index].comments.push(context);
    }
    else{
        context = {"Error": "No article with current articleId"};
    }
    cb(null, context, articles);
}

function commentsDelete(req, res, payload, articles, cb) {
    let comment_index;
    let context = {"Error": "No comment with current commentId"};
    articles.forEach((elem) => {
        comment_index = getCommentIndex(elem, payload.id);
        if(comment_index !== -1){
            elem.comments.splice(comment_index, 1);
            context = {"Result": "Comment deleted"};
        }
    });
  
    cb(null, context, articles);
}

function notFound(req, res, payload, articles, cb) {
    cb({ code: 404, message: 'Not found'}, articles);
}

function getCommentIndex(article, comment_id){
    let index;
    if(article.comments.length > 0){
        index = article.comments.findIndex((elem) => elem.id === comment_id);   
    }
    else{
        index = -1;
    }
    return index;
}

function updateArticle(currentArticle, newArticle){
    try{
        for(let elem in newArticle){
            currentArticle[elem] = newArticle[elem];
        }
    }
    catch(Error){

    }
    return currentArticle;
}

module.exports.handlers = handlers;
module.exports.notFound = notFound;
  