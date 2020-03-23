
export function showMsg(msg) {
    console.log('msg、', msg);
    var message = document.getElementById('message');
    message.innerText = msg;
    message.classList.remove("none");
    setTimeout(function () {
        message.innerText = '';
        message.classList.add("none");
    }, 1500);
}
export function showMsgs(msg) {
    console.log('msg、', msg);
    var messages = document.getElementById('messages');
    messages.innerText = msg;
    messages.classList.remove("none");
    setTimeout(function () {
        messages.innerText = '';
        messages.classList.add("none");
    }, 1500);
}
export function showMsg2(msg) {
    console.log('msg、', msg);
    var message2 = document.getElementById('message2');
    message2.innerText = msg;
    message2.classList.remove("none");
    setTimeout(function () {
        message2.innerText = '';
        message2.classList.add("none");
    }, 1500);
}
export function showMsg3(msg) {
    console.log('msg、', msg);
    var message3 = document.getElementById('message3');
    message3.innerText = msg;
    message3.classList.remove("none");
    setTimeout(function () {
        message3.innerText = '';
        message3.classList.add("none");
    }, 1500);
}
export function showMsg4(msg) {
    console.log('msg、', msg);
    var message3 = document.getElementById('message4');
    message4.innerText = msg;
    message4.classList.remove("none");
    setTimeout(function () {
        message4.innerText = '';
        message4.classList.add("none");
    }, 1500);
}
export function dispaly1(msg) {
    console.log('msg、', msg);
    var blance1 = document.getElementById('blance1');
    blance1.innerText = msg;
    blance1.classList.remove("none");
    setTimeout(function () {
        blance1.innerText = '';
        blance1.classList.add("none");
    }, 1500);
}

export function dispaly2(msg) {
    console.log('msg、', msg);
    var blance2 = document.getElementById('blance2');
    blance2.innerText = msg;
    blance2.classList.remove("none");
    setTimeout(function () {
        blance2.innerText = '';
        blance2.classList.add("none");
    }, 1500);
}

export function getcode() {
    console.log('zhixing')


    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
    var passwordReg = /^[a-zA-Z0-9]{6,16}$/;
    var fOver = true; // 获取验证码是否可点击
    var code = ''; // 生成的验证码
    var timerSecond = null;
    var phoneNumber = document.getElementById('phoneNumber');

    if (fOver) {
        if (phoneNumber.value == '') {
            showMsg('请输入手机号');
            return;
        } else {
            if (phoneNumberReg.test(phoneNumber.value) == false) {
                showMsg('请输入正确的手机号');
                return;
            } else {
                console.log("keyi")
                fOver = false;
                getCodeBtn.classList.add("disabled");
                var second = 10;
                getCodeBtn.value = second + ' 秒';


                console.log(getCodeBtn)
                timerSecond = setInterval(function () {
                    second = second - 1;
                    getCodeBtn.value = second + ' 秒';


                    if (second <= 0) {
                        clearInterval(timerSecond);
                        getCodeBtn.value = '重新发送';
                        fOver = true;
                        getCodeBtn.classList.remove("disabled");
                    }
                }, 1000);
            }
        }
    }

}
//检测手机注册按钮
export function checkUser() {

    var button = document.getElementById('button');

    var phoneNumber = document.getElementById('phoneNumber');
    var userName = document.getElementById('userName');
    var rega = document.getElementById('rega');
    var pwd1 = document.getElementById('pwd1');
    
    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
     var reg=/^\d{6}$/; 
    //  var psw = /^[A-Z][A-z0-9]*$/;
    if(userName.value == "") {
        showMsgs('请输入用户名')
        return
    }else if (phoneNumber.value == '') {
        showMsg('请输入手机号');
        return;
    } else if (phoneNumberReg.test(phoneNumber.value) == false) {
            showMsg('请输入正确的手机号');
            return;
        
    } else if (rega.value == "") {
        showMsg2('请输入验证码');
        return;
    } else if( reg.test(rega.value) == false) {
        showMsg2('请输入6位验证码');
        return;
    } else if(pwd1.value == "") {
        showMsg3('请输入密码');
        return;
    }
    // }else if(psw.test(pwd1.value) == false) {
    //     showMsg3('请首字母大写');
    //     return;
    // }
 


    


}

//检测邮箱注册按钮
export function checkemailUser() {

    var button = document.getElementById('button');

    var userName = document.getElementById('userName');
    var emailNumber = document.getElementById('emailNumber');
    var rega = document.getElementById('rega');
    var pwd1 = document.getElementById('pwd1');
    
    var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
     var reg=/^\d{6}$/; 
    //  var psw =/^(\w[A-Z]{1}\w*\s?)*$/g;
   
  
    if(userName.value == "") {
        showMsgs('请输入用户名')
        return
    }else if (emailNumber.value == '') {
        showMsg('请输入邮箱');
        return;
    } else if (phoneNumberReg.test(emailNumber.value) == false) {
            showMsg('请输入正确的邮箱');
            return;
        
    } else if (rega.value == "") {
        showMsg2('请输入验证码');
        return;
    } else if( reg.test(rega.value) == false) {
        showMsg2('请输入6位验证码');
        return;
    } else if(pwd1.value == "") {
        showMsg3('请输入密码');
        return;
    }
    // }else if(psw.test(pwd1.value) == false) {
    //     showMsg3('请首字母大写');
    //     return;
    // }
 


    


}


export function checkPassword() {
    var pwd1 = document.getElementById('pwd1').value;
    var pwd2 = document.getElementById('pwd2').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    // var abh = document.getElementById('rega').value;
   
   

    if (phoneNumber == "" ) {
    showMsg('请输入手机号');
    return
    } 
    // if (abh = "") {
    //     alert('请输入验证码');
    //     return

    // }
   
   
    if (pwd1 == pwd2) {
        if (pwd1 == "" || pwd2 == "") {
            alert("登录名和密码不能为空，请输入");
            return false;
           
        }

    } else if (pwd1 != pwd2) {
        alert("两次输入密码不同");
        return false;
    } 
    

}

export function checklogin () {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
    if (username == "" ) {
        showMsg('手机号不能为空');
        return
       
        }  else if(phoneNumberReg.test(username) === false) {
                showMsg('手机号错误');
            }else if (password == "" ) {
                showMsg4('请输入密码');
               
                }


}
//邮箱登录
export function checkloginemail () {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    if (username == "" ) {
        showMsg('邮箱不能为空');
        return
       
        }  else if(phoneNumberReg.test(username) === false) {
                showMsg('邮箱格式错误');
            }else if (password == "" ) {
                showMsg4('请输入密码');
               
                }


}
//手机号倒计时
export function timer() {
    send()
    function send () {
       var  timer = null;
        var send = document.getElementById('send') //按钮ID
        var phoneNumber = document.getElementById('phoneNumber');
        var emailNumber = document.getElementById('emailNumber');
        var userName = document.getElementById('userName');
        var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
        var times = 60 // 别忘了改这里
        if(userName.value == "") {
            showMsgs('请输入用户名')
            return
        }else if (phoneNumber.value == '') {
            showMsg('请输入手机号');
            return;
        } else if (phoneNumberReg.test(phoneNumber.value) == false) {
                showMsg('请输入正确的手机号');
                return;
            } 

            // if(emailNumber.value == "") {
            //     showMsg('请输入邮箱');
            //     return;
            // }
            //   else if(phoneNumberReg.test(emailNumber.value) == false) {
            //     showMsg('请输入正确的邮箱');
            //     return
            // }
      
                send.value = times + '秒后重试'
                // 计时开始
                send.disabled = true;
                timer = setInterval(function () {
                    times--;
                    if (times <= 0) {
                        send.value = '获取验证码';
                        clearInterval(timer);
                        times = 10;  // 别忘了改这里
                        send.disabled = false;
                    } else {
                        send.value = times + '秒后重试'
                        send.disabled = true;
                    } console.log(times)
                }, 1000);
                // 发送请求获取验证码
                console.log("sending...")
              
            }
        }
//邮箱倒计时
export function emailtimer() {
    send()
    function send () {
       var  timer = null;
        var send = document.getElementById('send') //按钮ID
        var emailNumber = document.getElementById('emailNumber');
        var userName = document.getElementById('userName');
    var phoneNumberReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

        
        var times = 60 // 别忘了改这里
        if(userName.value == "") {
            showMsgs('请输入用户名')
            return
        }else if (emailNumber.value == '') {
            showMsg('请输入邮箱');
            return;
        } else if(phoneNumberReg.test(emailNumber.value) == false) {
                showMsg('请输入正确的邮箱');
                return
            }
      
                send.value = times + '秒后重试'
                // 计时开始
                send.disabled = true;
                timer = setInterval(function () {
                    times--;
                    if (times <= 0) {
                        send.value = '获取验证码';
                        clearInterval(timer);
                        times = 10;  // 别忘了改这里
                        send.disabled = false;
                    } else {
                        send.value = times + '秒后重试'
                        send.disabled = true;
                    } console.log(times)
                }, 1000);
                // 发送请求获取验证码
                console.log("sending...")
              
            }
        }
    


//from 日期
export function getNowFormatDate(a) {
    var date = a
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 1 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 1 && second <= 9) {
        second = "0" + second;
    } else if (minute == 0) {
        minute = "00"
    } else if (second == 0) {
        second = "00"
    }
    console.log(second,"ffffff")
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}

//to日期
export function FormatDate() {
    var date = new Date()
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 1 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 1 && second <= 9) {
        second = "0" + second;
    }else if (second == 0) {
        second = "00"
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hour + seperator2 + minute
            + seperator2 + second;
    return currentdate;
}


export function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}


//utc日期转化
export function getUTCtime(date) {
    var UTCyear = date.getUTCFullYear();
    var UTCmonth = date.getUTCMonth() + 1;
    var UTCday = date.getUTCDate();
    var UTChours = date.getUTCHours();
    var UTCmin = date.getUTCMinutes();
    var UTCseconds = date.getUTCSeconds();
     if (UTCday >= 0 && UTCday <= 9) {
        UTCday = "0" + UTCday;
    }
    if (UTChours >= 1 && UTChours <= 9) {
        UTChours = "0" + UTChours;
    }
    if (UTCmin >= 1 && UTCmin <= 9) {
        UTCmin = "0" + UTCmin;
    } else if(UTCmin == 0) {
        UTCmin = "00"
    }
    if (UTCseconds >= 1 && UTCseconds <= 9) {
        UTCseconds = "0" + UTCseconds;
    } else if (UTCseconds == 0) {
        UTCseconds = "00"
    }
    var UTCtimeStr = UTCyear + "-" + UTCmonth + "-" + UTCday + "T" + UTChours + ":" + UTCmin + ":" + UTCseconds + "Z";
    console.log(UTCtimeStr)
    return UTCtimeStr;

}


//充值检测
export function checkEntry() {
    var blance = document.getElementById('blance').value;
    var comment = document.getElementById('comment').value;
    if (blance == "" ) {
        dispaly1('金额不能为空');
        return
       
        }else if (comment == "" ) {
                dispaly2('请输入申请备注');
               
                }


}
  


 











