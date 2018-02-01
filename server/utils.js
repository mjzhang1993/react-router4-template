// 工具函数

// 默认响应
exports.defaultResponse = function(req, res) {
   console.log(req.body);
   if (req.body) {
      res.json({ success: true });
   }
};

// 禁止响应
exports.forbidResponse = function(req, res) {
   res.statusMessage = 'forbidden operation';
   res.status(404);
   res.end();
};
