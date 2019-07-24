'use strict';

/** @type Egg.EggPlugin */
// {app_root}/config/plugin.js
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
exports.pg = {
  enable: true,
  package: 'egg-pg',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};


//跨域
exports.cors= {
  enable: true,
  package: 'egg-cors',
}

// module.exports = {
// had enabled by egg
// static: {
//   enable: true,
// }
// };
