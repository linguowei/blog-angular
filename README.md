# 基于Angular4和koa2实现的一个博客系统

> admin 文件夹为博客的管理后台页面，提供对博客文章的发布，编辑，删除等功能<br>
> client 文件夹为博客的前台展示页面，[在线地址](http://lweiwei.com) <br>
> server 文件夹为博客的服务端代码，提供数据接口的支持<br>

### 开发
(本地要安装mongodb，并且启动mongodb服务)
不管是开发管理后台页面还是前台展示页面都依赖server文件下的服务，所以要先cd到server文件下执行npm install安装依赖然后执行npm run dev启动服务

``` bash
# git clone https://github.com/linguowei/blog-angular.git
# cd /admin 或者 cd /client
# npm run start
# 浏览器访问 localhost:4200
```
### License
MIT
