## yoyo-mall-manager

yoyo是商城Web管理端

技术栈：Vue3

### Project setup

```shell
npm run serve
```

### deployment

使用 Docker + Nginx 部署，详细参考[官方文档](https://cli.vuejs.org/zh/guide/deployment.html#docker-nginx)

```shell
# 构建镜像
docker build -t yoyo-manager:0.1 .

# 运行
docker run -p 8080:80 -d --name yoyo-manager yoyo-manager:0.1

# 尝试是否能获取到网页
curl localhost:8080
```
