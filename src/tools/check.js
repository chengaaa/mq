

export function showMsg(msg) {
    console.log('msg、', msg);
    var message = document.getElementById('message');
    // console.log(message);

    message.innerText = msg;
    message.classList.remove("none");
    setTimeout(function () {
        message.innerText = '';
        message.classList.add("none");
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
export function checkUser() {
    // var fOver = true; // 获取登录按钮是否可点击
    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;
    var button = document.getElementById('button');

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username == '') {
        showMsg('请输入手机号');
        return;
    } else {
        // if (phoneNumberReg.test(username) == false) {
        //     showMsg('请输入正确的手机号');
        //     return
        // }


    }



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
//倒计时
export function timer() {
    var phoneNumber = document.getElementById('phoneNumber');
    var phoneNumberReg = /^[1]{1}[3|5|7|8]{1}\d{9}$/;



    var send = document.getElementById('send'), //按钮ID
        times = 10, // 别忘了改这里
        timer = null;
    send.onclick = function () {
        if (phoneNumber.value == '') {
            showMsg('请输入手机号');
            return;
        } else {
            if (phoneNumberReg.test(phoneNumber.value) == false) {
                showMsg('请输入正确的手机号');
                return;
            } else {
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
    }
}









