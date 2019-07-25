'use strict';

const Service = require('egg').Service;
const md5 = require('blueimp-md5');//引入md5加密
const svgCaptcha = require('svg-captcha');//引入验证码插件



class AccountService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async test(verifyId) {
        // await this.app.redis.set('foo', 'basssr');
        return await this.app.redis.get(verifyId);


    }

    // 注册
    async account(account, password, nick_name, verify100, uuid) {


        //检查账户是否存在，防止重复注册
        let checkUser = `SELECT * FROM public."user" WHERE account = $1;`;
        let checkResult = await this.app.pg.query(checkUser, [account]);
        console.log("检查账户结果", checkResult.rows[0]);
        if (checkResult.rows[0]) {
            return {
                data: null,
                code: 503,
                desc: '账号已存在',
            }
        }


        //检查验证码是否正确，防止疯狂注册
        //从redis中拿出verifyId对应的验证码
        let verifyByUuid = await this.app.redis.get(uuid);

        if (verify100 === verifyByUuid) {




            let md5Password = md5(password);
            let insertNewsSql = `INSERT INTO public.user(account,password,nick_name) VALUES ($1,$2,$3) RETURNING *;`;
            let result = await this.app.pg.query(insertNewsSql, [account, md5Password, nick_name]);
            this.app.logger.info('result:', result);
            return {
                data: null,
                code: 200,
                desc: '写入成功'
            }
        } else {
            return {
                data: null,
                code: 504,
                desc: '验证码错误'
            }
        }


    }

    // 登录
    async login(account, password, verify100, uuid) {

        //从redis中拿出verifyId对应的验证码
        let verifyByUuid = await this.app.redis.get(uuid);


        console.log("redis中的验证码", verifyByUuid);


        if (verify100 === verifyByUuid) {
            console.log("acount111:", account, "password", password)
            let selUserSql = `SELECT * FROM public."user" WHERE account = $1;`;
            let result = await this.app.pg.query(selUserSql, [account]);
            console.log(result.rows[0].id);
            let userPassword = md5(password);//提取用户输入的密码，并加密，等下进行比对
            let pwd = result.rows[0].password;//拿到要登录用户的密码
            let id = result.rows[0].id;//要登录用户的id，比对密码正确后封装进token
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
        } else {
            return {
                data: "验证码不正确",
                code: 502,
                desc: "验证码不正确"
            }
        }
    }

    // 产生验证码
    async captcha(uuid) {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            bacground: '#cc9966'
        });

        await this.app.redis.set(uuid, captcha.text);//好用的方法
        console.log("本次验证码", captcha.text);
        return captcha;
    }

}

module.exports = AccountService;