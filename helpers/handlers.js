const artcl = require('../models/article');
const cmmnt = require('../models/comment');

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
    const result = {};
  
    cb(null, result, articles);
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
    const result = {};
  
    cb(null, result, articles);
}

function notFound(req, res, payload, articles, cb) {
    cb({ code: 404, message: 'Not found'}, articles);
}

module.exports.handlers = handlers;
module.exports.notFound = notFound;
  