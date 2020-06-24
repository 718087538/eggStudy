'use strict';
//这里是渲染页面和校验参数
const Controller = require('egg').Controller;

const writeRule = {
  id: 'string',
  password: 'string'
}

// egg是一个mvc框架
/*
MVC：
View   视图 模板  页面的展示

Controller控制器:负责处理一些业务逻辑

Model 模型 ：和数据库打交道（查询数据库   请求数据）

*/
class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi, egg,hello World';
    // await this.ctx.render('index');
    console.log(process.env.SMSSECRETACCESSKEY);


    // 注意  ctx是一部方法，要加await
    let msg = 'ejs';
    let list = ['1111','22222','33333'];
    await this.ctx.render('index',{
      msg,
      list
    });
  }

  async news() {
    this.ctx.body = 'i.am newsssss';
  }
  //这是登录页面
  async write() {
    const { ctx, app } = this;
    ctx.validate(writeRule, ctx.request.body);
    let { id, password } = ctx.request.body;
    let result = await ctx.service.home.write(id, password);
    ctx.body = result;
    // this.ctx.body = 'i.am 留言页面';
    // await this.ctx.render('write',{
    //   msgList,
    // })
    // ctx.set('show-response-time', used.toString());
  }

  async content() {
    // 获取get传值
    // koa中如何获取get传值   ctx.query

    // egg中如何获取get传值
    const query = this.ctx.query;
    console.log(query);
    this.ctx.body = 'news information';
  }


  async newsList() {
    // koa获取动态路由传值    ctx.params

    // egg中获取动态路由传值

    const params = this.ctx.params;
    console.log(params);
    this.ctx.body = 'newsLast';
  }

  async getNews(){
    const {ctx,app} = this;

    let result = await ctx.service.home.getNews();
    ctx.body = result;
  }

//增加单选题目
  async add(){
    const { ctx, app } = this;
    let req = ctx.request.body;
    let result = await ctx.service.home.add(req.title,  req.optiona,req.optionb,req.optionc,req.optiond,req.key, req.big_block,  req.category_id,req.sub_id,req.explain);
    ctx.body = result;
  }
  //查询试卷的列表
  async findList(){
    const { ctx, app } = this;
    let req = ctx.request.body;
    let result = await ctx.service.home.findList(req.rows, req.pageIndex,req.big_block,req.category_id,);
    ctx.body = result;
  }

  //查找单选
  async getRadio(){
    const { ctx } = this;
    let serach = ctx.request.body;//其实也可以用一个变量接收，然后在取出来
    // let serach = ctx.query;也可以直接拼接在url后面进行查询
    // http://127.0.0.1:7001/getRadio?pageIndex=1&rows=2
    ctx.logger.info('serach',serach);
    let result = await ctx.service.home.getRadio(serach.rows,serach.pageIndex,serach.big_block,serach.category_id,serach.sub_id);
    ctx.body = result;
  }

}
// 011318200946

module.exports = HomeController;
