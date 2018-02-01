// mock.js 配置假数据

const Mock = require('mockjs');

const Random = Mock.Random;

module.exports = function() {
   // 自定义扩展
   Random.extend({});

   const telReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

   const list = Mock.mock({
      'content|1-4': [
         {
            'id|+1': 0,
            name: '@cname',
            tel: telReg
         }
      ]
   }).content;

   return {
      list
   };
};
