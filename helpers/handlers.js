const artcl = require('../models/article');

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
    const result = {};
  
    cb(null, result, articles);
}

function articlesRead(req, res, payload, articles, cb) {
    const result = {};
  
    cb(null, result, articles);
}

function articlesCreate(req, res, payload, articles, cb) {
    article = new artcl.Article(payload);
    articles.push(article.getArticle());
  
    cb(null, {state: 'Article added'}, articles);
}

function articlesUpdate(req, res, payload, articles, cb) {
    const result = {};
  
    cb(null, result, articles);
}

function articlesDelete(req, res, payload, articles, cb) {
    const result = {};
  
    cb(null, result, articles);
}

function commentsCreate(req, res, payload, articles, cb) {
    const result = {};
  
    cb(null, result, articles);
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
  