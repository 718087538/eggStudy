'use strict';

const Service = require('egg').Service;
const md5 = require('blueimp-md5');//引入md5加密
const svgCaptcha = require('svg-captcha');//引入验证码插件
const redis = require('redis');//连接redis插件

// 连接redis
var client = redis.createClient(6379, '127.0.0.1')
client.on('error', function (err) {
    console.log('Error ' + err);
});


class AccountService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    // 注册
    async account(account, password, nick_name) {

        let md5Password = md5(password);
        let insertNewsSql = `INSERT INTO public.user(account,password,nick_name) VALUES ($1,$2,$3) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [account, md5Password, nick_name]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }

    // 登录
    async login(account, password, verify100, verifyId) {

        // let redisVerify="我是占位，不是验证码";

        //从redis中拿出verifyId对应的验证码
        client.get(verifyId, function (err, value) {
            // if (err) throw err;
            console.log('redis中的验证码为====》》》》' + value)
            // client.quit();
        })

        // console.log("收到验证码",verify100);
        // console.log("验证码id",verifyId);
        

        // if (verify100 === 'M6lq') {
        //     console.log("acount111:", account, "password", password)
        //     let selUserSql = `SELECT * FROM public."user" WHERE account = $1;`;
        //     let result = await this.app.pg.query(selUserSql, [account]);
        //     console.log(result.rows[0].id);
        //     let userPassword = md5(password);//提取用户输入的密码，并加密，等下进行比对
        //     let pwd = result.rows[0].password;//拿到要登录用户的密码
        //     let id = result.rows[0].id;//要登录用户的id，准备封装进token
        //     // let nick_name = result.rows[0].nick_name;//拿到要登录用户的昵称
        //     if (userPassword === pwd) {
        //         let token = this.app.jwt.sign({ account_id: id }, this.config.jwt.secret, { expiresIn: '7d' });

        //         return {
        //             data: {
        //                 token: token,
        //             },
        //             code: 200,
        //             desc: "活动token成功"
        //         }
        //     } else {
        //         return {
        //             data: "账号或密码不正确",
        //             code: 500,
        //             desc: "failed"
        //         }
        //     }
        // } else {
        //     return {
        //         data: "验证码不正确",
        //         code: 502,
        //         desc: "验证码不正确"
        //     }
        // }



    }

    // 产生验证码
    async captcha(verifyId) {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            bacground: '#cc9966'
        });

        // 不推荐放在session中，推荐放在redis中，所以注销
        // let sessName = new Date().getTime();//获取时间戳，命名session
        // console.log(sessName);
        // this.ctx.session.code = captcha.text;//把数字形式验证码存在session中

        client.set(verifyId, captcha.text, redis.print);//把数字形式验证码存在对应的verifyId中，并打印

        //测试是否成功存redis中
        client.get(verifyId, function (err, value) {
            if (err) throw err;
            console.log('redis中的验证码为0.0' + value)
            // client.quit();
        })

        return captcha;
    }

}

module.exports = AccountService;