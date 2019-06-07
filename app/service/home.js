'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    async write(id, pwd) {
        let usersSqlR = `SELECT password  FROM public."users" WHERE id = $1;`;
        let users = await this.app.pg.query(usersSqlR, [id]);
        let password = users.rows[0].password;
        this.app.logger.info(users.rows[0].password);
        if (pwd === password) {
            return {
                data: {
                    password: password,
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
    async account(acount, password) {
        let insertNewsSql = `INSERT INTO public.user(acount,password) VALUES ($1,$2) RETURNING *;`;
        let result = await this.app.pg.query(insertNewsSql, [acount, password]);
        this.app.logger.info('result:', result);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }
    // 插入单选题
    async add(title, optiona, optionb, optionc, optiond, key, big_block,category_id,sub_id,explain) {
        let insertQueSql = `INSERT INTO public.select(title,optiona,optionb,optionc,optiond,key, big_block,category_id,sub_id,explain) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`;
        let result = await this.app.pg.query(insertQueSql, [title, optiona, optionb, optionc, optiond, key,big_block,category_id,sub_id,explain]);
        return {
            data: null,
            code: 200,
            desc: '写入成功'
        }
    }

    // 登录
    async login(account, password) {
        console.log("acount111:",account,"password",password)
        let selUserSql = `SELECT * FROM public."user" WHERE account = $1;`;
        let result = await this.app.pg.query(selUserSql, [account]);
        let pwd = result.rows[0].password;
        let account_id = result.rows[0].password;
        let nick_name = result.rows[0].nick_name;
        if (password === pwd) {
            let token = this.app.jwt.sign({account_id:account_id},this.config.jwt.secret,{expiresIn:'7d'});

            return {
                data: {
                    password: password,
                    token:token,
                    nickName:nick_name
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
    // 查找试卷列表
    async findList(rows, pageIndex,big_block,category_id) {
        pageIndex = rows * (pageIndex - 1);
        let findTitleSql = `SELECT * FROM public."block" WHERE big_block = $1 and category_id = $2 LIMIT $3 OFFSET $4`;
        let totalSql = `SELECT COUNT(id) FROM public."block" WHERE big_block =$1 and category_id = $2;`;//总共有多少页（个）
        let total = await this.app.pg.query(totalSql, [big_block,category_id]);
        let result = await this.app.pg.query(findTitleSql, [big_block,category_id,rows, pageIndex])
        return {
            data: {result,total},
            code: 200,
            desc: "查询成功"
        }
    }
    //查找单选
    async getRadio(rows, pageIndex,big_block,category_id,sub_id) {
        pageIndex = rows * (pageIndex - 1);
        console.log('==========' + rows + '======' + pageIndex + '======'+category_id,sub_id);
        // console.log(table == 'select', "999");

        let findTitleSql = `SELECT * FROM public."select" WHERE big_block =$3 and category_id = $4 and sub_id = $5 LIMIT $1 OFFSET $2;`;
        let totalSql = `SELECT COUNT(id) FROM public."select" WHERE big_block =$1 and category_id = $2 and sub_id = $3;`;//总共有多少页（个）
        let total = await this.app.pg.query(totalSql, [big_block,category_id, sub_id]);
        let result = await this.app.pg.query(findTitleSql, [rows, pageIndex, big_block,category_id, sub_id]);
        return {
            data: {
                result: result.rows,
                total: total.rows[0].count
            },
            code: 200,
            desc: "查询成功"
        }
    }


}

module.exports = HomeService;
