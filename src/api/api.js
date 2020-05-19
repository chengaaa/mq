
const baseURL1 = "/api"
const baseURL2 = "/tw"
const baseURL3 = "/tz"
// const baseURL1 = 'https://www.blitzbook8.com/tradeapi/v1'
// const baseURL2 = 'https://www.blitzbook8.com/twapi/v1/api'
// const baseURL3 = 'https://www.blitzbook8.com/twapi/v2/api'

module.exports = {
    //第一层登录
    LoginURL: baseURL2 + "/user/login",
    DeailURL: baseURL2 + "/user/detail?userId=",
    //第二层登录
    Loginmt5URL: baseURL2 + "/login",
    //开立账户
    OpenURL: baseURL2 + "/account/open",
    //注册获取验证码
    CodeURL: baseURL2 + "/register/code",
    //注册
    RegisterURL: baseURL2 + "/register",
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
   
    
  
   
    
    
    
  
    
    
    
    

}