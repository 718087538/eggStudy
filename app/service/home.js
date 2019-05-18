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
}

module.exports = HomeService;
