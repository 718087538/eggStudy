'use strict';

const Service = require('egg').Service;
const md5 = require('blueimp-md5');//引入md5加密
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
    async login(account, password) {
        console.log("acount111:", account, "password", password)
        let selUserSql = `SELECT * FROM public."user" WHERE account = $1;`;
        let result = await this.app.pg.query(selUserSql, [account]);
        console.log(result.rows[0].id);
        let userPassword = md5(password);//提取用户输入的密码，并加密，等下进行比对
        let pwd = result.rows[0].password;//拿到要登录用户的密码
        let id = result.rows[0].id;//要登录用户的id，准备封装进token
        // let nick_name = result.rows[0].nick_name;//拿到要登录用户的昵称
        if (userPassword === pwd) {
            let token = this.app.jwt.sign({ account_id: id }, this.config.jwt.secret, { expiresIn: '7d' });

            return {
                data: {
                    token: token,
                },
                code: 200,
                desc: "活动token成功"
            }
        } else {
            return {
                data: "账号或密码不正确",
                code: 500,
                desc: "failed"
            }
        }
    }


}

module.exports = AccountService;