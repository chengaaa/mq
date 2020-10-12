var  baseURL1 = "/api"
var  baseURL2 = "/tw"
var  baseURL3 = "/tz"

if(process.env.NODE_ENV === "production") {
   baseURL1 = 'https://www.bbook8.com/tradeapi/v1'
   baseURL2 = 'https://www.bbook8.com/twapi/v1/api'
   baseURL3 = 'https://www.bbook8.com/twapi/v2/api'
} 
module.exports = {
    //新的登录
    Login: baseURL2 + "/user/login_new",
    //第一层登录
    LoginURL: baseURL2 + "/user/login",
    DeailURL: baseURL2 + "/user/detail?userId=",
    //第二层登录
    Loginmt5URL: baseURL2 + "/login",
    Loginmt5: baseURL1 + "/login",
    //开立账户
    OpenURL: baseURL2 + "/account/open",
    //注册获取验证码
    CodeURL: baseURL2 + "/register/code",
    //注册
    RegisterURL: baseURL2 + "/register",
    //新的注册
    Registetest: baseURL2 + '/register_new',
    //图表
    ChartURL:  baseURL2 + "/chart",
    //transtion
    AccountURL: baseURL1 + "/account",
    //transtion  删除
    CloseURL: baseURL1 +"/position/contract/close",
    //下单
    Deleteorder: baseURL1 + "/trade/order/",
    //退出
    LogoutURL: baseURL1 + "/logout",
    //充值
    DepositURL: baseURL3 + "/account/deposit",
    //提币
    WithdrawURL: baseURL3 + "/account/withdraw",
    Positionorders: baseURL1 + "/position/orders",
    Positioncontracts: baseURL1 + "/position/contracts",
    MarketURL:  baseURL1 + "/market/symbols",
    //历史
    Historyorders: baseURL1 + "/history/orders?from=",
    Historyexecutions: baseURL1 + "/history/executions?from=",
    //获取图表最高最低
    chartBTCUSD: baseURL1 + "/chart?symbol=BTCUSD.&from=",
    chartETHUSD: baseURL1 + "/chart?symbol=ETHUSD.&from=",
    chartBCHUSD: baseURL1 + "/chart?symbol=BCHUSD.&from=",
    chart: baseURL2 + "/today",
    //获取汇率
    getnumber: baseURL2 + "/rate",
    //查询referralcode
    referralcode: baseURL2 + "/referral_code",
    //修改
    modify: baseURL1 + "/trade/order",
    //获取首页图片
    banner: baseURL2 + "/banner_pic",
    //获取公告
    notice: baseURL2 + "/announcement",
    //获取群组二维码
    social:baseURL2 + "/social_group",
    //获取下载app信息
    appinfo: baseURL2 + "/app_info",
    //修改密码
    changepassword: baseURL2 + "/user/pwd/set"
    
   

}