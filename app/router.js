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

  router.get('/account', controller.account.index);
  router.post('/insertNews',controller.account.insertNews);
  router.post('/register',controller.account.register);//注册
  router.post('/login',controller.account.login);//登录

  router.post('/test',controller.account.test);//登录

  router.post('/findList',controller.home.findList);//查找试卷列表
  router.post('/getRadio',controller.home.getRadio);//查找单选
 




  router.post('/add',controller.home.add);//增加题目
  router.post('/addTitle',controller.add.addTitle);//增加试卷题目


  router.post('/dropList',controller.drop.dropList)//删除试卷
  router.post('/dropQuestion',controller.drop.dropQuestion)//删除试卷某一题题目
  
};
