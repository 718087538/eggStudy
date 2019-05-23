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
  router.post('/account',controller.admin.account);//注册
  router.post('/login',controller.admin.login);//登录

  router.post('/add',controller.home.add);//增加题目
  router.post('/findList',controller.home.findList);//查找试卷列表
  router.post('/getRadio',controller.home.getRadio);//查找单选
  
};
