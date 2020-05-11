
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

//utc日期转化  中国标准时间转化utc
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
    var blance1 = document.getElementById('blance1');
    // var comment = document.getElementById('comment').value;
    if (blance == ""||blance < 10  ) {
        blance1.classList.remove("none");
        setTimeout(function () {
            blance1.classList.add("none");
        }, 1500);
        return
       
        }


}




  


 











