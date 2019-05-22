'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.home.news);
  router.get('/content', controller.home.content);
  router.get('/newslist/:id', controller.home.newsList);
  router.post('/write', controller.home.write);
  router.get('/getNews', controller.home.getNews);

  router.get('/admin', controller.admin.index);
  router.post('/insertNews',controller.admin.insertNews);
  router.post('/account',controller.admin.account);

};
