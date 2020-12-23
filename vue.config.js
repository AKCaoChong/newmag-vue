const isPro = process.env.NODE_ENV === "production";

module.exports = {
    devServer: {
        proxy: {
            "/dev_url": {
                target: "https://zine.rayligirl.com/",
                changeOrigin: true,
                pathRewrite: {
                    /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
                      实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
                     */
                    '^/dev_url': '' 
                }
            },
        }
    },
    publicPath: isPro ? "" : "/",
};