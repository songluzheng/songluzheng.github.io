var __url = window.location.href;
var __ref = document.referrer;
 
function tongji() {
    var docid = getDocId();
    var cid = getCookie("_v_");
    if (cid == docid||docid==0) {
        return;
    }
 
    var rss = 0;
    if (__url.toLowerCase().indexOf("newrss.guancha.cn") >= 0) {
        rss = 1; // rss
    }
    var weixin = 0;
    if (rss==0&&isWeixn()) {
        weixin = 1; // weixin
    }
    var weibo = 0;
    if (rss==0&&(__ref.toLowerCase().indexOf("weibo.com") >= 0 || __ref.toLowerCase().indexOf("t.cn") >= 0)) {
        weibo = 1; // weibo
    }
document.write('<script type="text/javascript" src="/other/count.shtml?id=' + docid + '&rss=' + rss +'&weixin=' + weixin + '&weibo=' + weibo + '&r='+Math.random()+'"></script>');
 
 
}
tongji();
 
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
 
function getDocId() {
    var id = __url.match(/(\/\d\d\d\d_\d\d_\d\d_\d+_((\d+)|(\w|\d)))|(\/\d\d\d\d_\d\d_\d\d_\d+)/i);
    var rt = 0;
    try{rt =id[0].split('_')[3];}catch(err){rt = 0;} 
    return rt;
}

function isWeixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}