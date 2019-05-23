'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    async write(id, pwd) {
        let usersSqlR = `SELECT password FROM public."users" WHERE id = $1;`;
        let users = await this.app.pg.query(usersSqlR, [id]);
        let password = users.rows[0].password;
        this.app.logger.info(users.rows[0].password);
        if (pwd === password) {
            return {
                data: {
                    password: password
                },
                code: 200,
                desc: '成功'
            }
        } else {
            return {
                data: null,
                code: 888,
                desc: '账号或密码错误'
            }
        }
    }
    async getNews() {
        let getNewsSql = `SELECT content FROM public."text" WHERE id >0;`;
        let result = await this.app.pg.query(getNewsSql);
        if (result !== '') {
            return {
                data: { result },
                code: 200,
                desc: '查询数据成功'
            }
        } else {
            return {
                data: null,
                code: 501,
                desc: "查询失败"
            }
        }
    }
    async insertNews(text) {
        let insertNewsSql = `INSERT INTO public.text(content) VALUES ($1) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [text]);
        this.app.logger.info('result:', result);
        // if(result){
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
        // }else{
        //     return {
        //         data:null,
        //         code:501,
        //         desc:"写入失败"
        //     }  
        // }
    }
    // 注册，插入数据
    async account(name, password) {
        let insertNewsSql = `INSERT INTO public.user(name,password) VALUES ($1,$2) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [name, password]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }
    // 插入单选题目
    async add(title, optiona, optionb, optionc, optiond, key) {
        let insertQueSql = `INSERT INTO public.select(title,optiona,optionb,optionc,optiond,key) VALUES ($1,$2,$3,$4,$5,$6);`;
        let result = await this.app.pg.query(insertQueSql, [title, optiona, optionb, optionc, optiond, key]);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }

    // 登录
    async login(name, password) {
        let selUserSql = `SELECT password FROM public."user" WHERE name = $1;`;
        let result = await this.app.pg.query(selUserSql, [name]);
        let pwd = result.rows[0].password;
        if (password === pwd) {
            return {
                data: {
                    password: password
                },
                code: 200,
                desc: "成功"
            }
        } else {
            return {
                data: null,
                code: 500,
                desc: "failed"
            }
        }
    }
    // 查找列表
    async findList(){
        let findTitleSql = `SELECT title FROM public."h5" WHERE id >=0`;
        let result = await this.app.pg.query(findTitleSql)
        return{
            data:result,
            code:200,
            desc:"查询成功"
        }
    }


}

module.exports = HomeService;
