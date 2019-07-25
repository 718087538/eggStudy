'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
    async index() {
        this.ctx.body = 'user Controller Anything!';
    }

    // 插入数据库的内容
    async insertNews() {
        const { ctx, app } = this;
        //接受前端传来的数据，text要与前端传过来的数据一致
        let { text } = ctx.request.body;
        // ctx.logger.info打印一些信息，查看服务器情况
        let result = await ctx.service.home.insertNews(text);
        ctx.body = result;
    }

    // 注册
    async register() {
        const { ctx, app } = this;
        let addUser = ctx.request.body;
        let result = await ctx.service.account.account(addUser.account,   addUser.password,    addUser.nick_name,addUser.verify100,   addUser.uuid);
        ctx.body = result;
    }
    // 登录
    async login() {
        const { ctx, app } = this;
        // ctx.validate(writeRule, ctx.request.body);

        let { account, password, verify100, uuid } = ctx.request.body;
        //靠，为什么verify改成其他的名字不行
        // console.log("controuller中的验证码",verify100);
        let result = await ctx.service.account.login(account, password, verify100, uuid);
        ctx.body = result;
    }

    //获取验证码
    async verify() {
        const { ctx } = this;
        let req = ctx.request.body;//请求验证码的id，与该验证码关联
        let captcha = await this.service.account.captcha(req.uuid); // 服务里面的方法
        ctx.response.type = 'image/svg+xml';  // 设置你个返回的类型
        ctx.body = captcha.data; // 返回一张图片
    }

    // 对比验证码
    // async verify_code() {
    //     const { ctx } = this;
    //     let captcha = await this.service.account.captcha(); // 服务里面的方法
    //     ctx.response.type = 'image/svg+xml';  // 知道你个返回的类型
    //     ctx.body = captcha.data; // 返回一张图片
    // }

    async test() {
        // console.log("进入了测试")
        // const { ctx, app } = this;
        // let headersCC = ctx.headers.token;//获得header里的token
        // console.log(headersCC, "查看token的内容");

        // let resultToken = this.app.jwt.verify(headersCC, this.config.secret)

        // ctx.body = resultToken;
        console.log("进入了测试")
        const { ctx, app } = this;
        let req = ctx.request.body;//请求验证码的id，与该验证码关联
        let result = await this.service.account.test(req.verifyId);


    



        ctx.body=result;


    }


}



// sql:查询是否有记录sql代码


// if(sql查到记录 ！= ""){
//    return 已有这个用户， 
// }else{
//     执行注册（在这写注册代码）
// }

module.exports = AccountController;

// 验证token的代码
// try {
//   jwt.verify(token, process.env.SECRET_KEY);
// } catch (err) {
//   //解码不成功 , todo: 根据情况，返回不同的状态. 暂时全部返回 403
//   ctx.status = 403;
//   ctx.body = {
//     data: null,
//     code: 403,
//     desc: 'token无效'
//   };
// }