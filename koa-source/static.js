const fs = require('fs');
const path = require('path');

module.exports = (dirPath = '.\\public') => {
  console.log(dirPath);
  return async (ctx, next) => {
    if (ctx.url.indexOf('/public') === 0) {
      // public开头 读取文件
      const url = path.resolve(__dirname, dirPath);
      console.log('url: ', url);
      const fileBaseName = path.basename(url);
      console.log('fileBaseName', fileBaseName);
      const filepath = url + ctx.url.replace('/public', '');
      console.log('filepath', filepath);
      try {
        const stats = fs.statSync(filepath);
        if (stats.isDirectory()) { // 目录
          const dir = fs.readdirSync(filepath);
          let str = `<div style="padding-left: 20px;">`;
          dir.forEach(filename => {
            if (filename.indexOf('.') > -1) { // 文件
              str += `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`;
            } else { // 目录
              str += `<p><a href="${ctx.url}/${filename}" style="color: black;">${filename}</a></p>`;
            }
          });
          str += `</div>`;
          ctx.body = str;
        } else { // 文件
          const content = fs.readFileSync(filepath);
          ctx.body = content;
        }
      } catch (err) {
        ctx.body = '404, not found';
      }
    } else {
      // 不是静态资源文件,直接到下一个中间件
      await next();
    }
  }
}
