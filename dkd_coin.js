/*
软件名称:多看点 商店搜索下载
更新时间：2021-02-01 @肥皂
脚本说明：多看点自动任务
目前包含签到，开宝箱，开双倍宝箱
看广告，任务列表奖励领取，自动提现
自动抽奖
能力有限，自动刷小视频暂时无法完成
本脚本以学习为主！
建议通过HttpCanary抓取Cookie，搜索页面地址http://dkd-api.dysdk.com/user/index
2021.02.01 加入自动提现功能
获取方式，进入提现页面，选择需要自动提现的面额点击提现获取
多看点自动任务
*/
const exec = require('child_process').execSync
const fs = require('fs')
const got = require('got')
const axios = require('axios')
const path = require('path') 
const cktouch = require('tough-cookie')
const $ = new Env('多看点');
//let dkdurl = $.getdata('dkdurl')
//let dkdhd = dkdhd
//let dkdbody = $.getdata('dkdbody')
//let dkdtxurl = $.getdata('dkdtxurl')
//let dkdtxhd = $.getdata('dkdtxhd')
//let dkdtxbody = $.getdata('dkdtxbody')

const dkdurl = process.env.dkdurl;
const dkdhd = process.env.dkdhd;
const dkdbody = process.env.dkdbody;
const sckey = process.env.sckey;

let dkdtxurl = $.getdata('dkdtxurl')
let dkdtxhd = $.getdata('dkdtxhd')
let dkdtxbody = $.getdata('dkdtxbody')
!(async () => {
  if (typeof $request !== "undefined") {
    await dkdck()
    await dkdtxck()
  } else {
    await dkdqd()

  }
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//多看点数据获取
function dkdck() {
   if ($request.url.indexOf("index") > -1) {
    $.setdata(JSON.stringify($request.url),'dkdurl')
    $.log(dkdurl)
    $.setdata(JSON.stringify($request.headers),'dkdhd')
$.log(dkdhd)
    $.setdata($request.body,'dkdbody')
$.log(dkdbody)
   $.msg($.name,"","多看点headers获取成功！")
   $.msg($.name,"","多看点body获取成功！")
    }
  }
//多看点提现ck
function dkdtxck() {
   if ($request.url.indexOf("withdraw_do?") > -1) {
    $.setdata(JSON.stringify($request.url),'dkdtxurl')
    $.log(dkdtxurl)
    $.setdata(JSON.stringify($request.headers),'dkdtxhd')
$.log(dkdtxhd)
    $.setdata($request.body,'dkdtxbody')
$.log(dkdtxbody)
   $.msg($.name,"","多看点提现数据获取成功！")
   
    }
  }

//多看点广告视频     
function dkdgg(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/task/get_ad_award',
        headers : JSON.parse(dkdhd),
        body : 'adType=2&' + dkdbody+'&type=2',}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('广告视频回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('广告视频回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//多看点视频宝箱     
function dkdbx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/red/box_award',
        headers : JSON.parse(dkdhd),
        body : dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('视频宝箱回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('视频宝箱回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function dkdyq(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/inviter/bind',
        headers : JSON.parse(dkdhd),
         body : 'code=3209301&' + dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('视频宝箱回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('视频宝箱回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//多看点视频宝箱翻倍     
function dkdbxfb(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/red/box_extra',
        headers : JSON.parse(dkdhd),
        body : 'adType=2&'+dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('视频宝箱翻倍回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('视频宝箱翻倍回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//多看点转盘抽奖   
function dkdcj(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/lotto/start',
        headers : JSON.parse(dkdhd),
        body : 'adType=2&'+dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('转盘抽奖回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('转盘抽奖回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//多看点分享
function dkdfx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/task/get_award',
        headers : JSON.parse(dkdhd),
        body : 'id=52&'+dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('分享任务回执:成功🌝 '+result.data.award)
}
if(result.status_code == 10020){
        console.log('分享任务回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
  //多看点小说
  function dkdxs(timeout = 0) {
    return new Promise((resolve) => {
  let url = {
          url : 'http://dkd-api.dysdk.com/task/get_award',
          headers : JSON.parse(dkdhd),
          body : 'id=51&'+dkdbody,}
        $.post(url, async (err, resp, data) => {
          try {
             //$.log(dkdbody)
      const result = JSON.parse(data)
          if(result.status_code == 200){
          console.log('小说任务回执:成功🌝 '+result.data.award)
  }
  if(result.status_code == 10020){
          console.log('小说任务回执:失败🚫 '+result.message)}
          } catch (e) {
            //$.logErr(e, resp);
          } finally {
            resolve()
          }
      },timeout)
    })
  }
  
  //多看点
  function dkdyq(timeout = 0) {
    return new Promise((resolve) => {
  let url = {
          url : 'http://dkd-api.dysdk.com/inviter/bind',
          headers : JSON.parse(dkdhd),
          body : 'code=13209301&'+dkdbody,}
        $.post(url, async (err, resp, data) => {
          try {
             //$.log(dkdbody)
      const result = JSON.parse(data)
          } catch (e) {
            //$.logErr(e, resp);
          } finally {
            resolve()
          }
      },timeout)
    })
  }

function dkdsxzp(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/lotto/index?'+dkdbody,
        headers : JSON.parse(dkdhd),
        body : '{}',}
      $.post(url, async (err, resp, data) => {
        try {
         //$.log(str.replace('headerInfo":"',""))
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('开始刷新转抽奖页面，回执:成功🌝 剩余抽奖次数: '+result.data.times)
}
if(result.status_code == 10020){
        console.log('开始刷新抽奖页面，回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

  function dkdz(timeout = 0) {
    return new Promise((resolve) => {
  let url = {
          url : 'http://dkd-api.dysdk.com/comment/video_like?'+dkdbody+'&type=1&video_id=8263',
          headers : JSON.parse(dkdhd),
          body : '',}
        $.post(url, async (err, resp, data) => {
          try {
            
      const result = JSON.parse(data)
     
          } catch (e) {
           

          } finally {
            resolve()
          }
      },timeout)
    })
  }

//多看点提现
function dkdtx(timeout = 0) {
  return new Promise((resolve) => {
let str = dkdtxhd.match(/headerInfo":"\w+/)+''
let url = {
        url : 'http://dkd-api.dysdk.com/money/withdraw_do?'+dkdbody+'&headerInfo='+str.replace('headerInfo":"',""),
        headers : JSON.parse($.getdata('dkdtxhd')),
        body : dkdtxbody,}
      $.post(url, async (err, resp, data) => {
        try {
         //$.log(str.replace('headerInfo":"',""))
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('提现回执:成功🌝 '+result.message)
}
if(result.status_code == 10020){
        console.log('提现回执:失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
 
function server(msg) {

    return new Promise(async (resolve) => {

        try {

  let url = `https://sc.ftqq.com/${sckey}.send`

  let res = await axios.post(url, `text=多看点(づ ●─● )づ${msg}&desp=${msg}`)

  if (res.data.errmsg == 'success') {

    console.log('server酱:发送成功')

  } else {

    console.log('server酱:发送失败')

    console.log(res.data)

  }

 

        } catch (err) {

            console.log(err);

        }

        resolve();

    });

}

//多看点签到
function dkdqd(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
     
let url = {
        url : 'http://dkd-api.dysdk.com/task/sign',
        headers : JSON.parse(dkdhd),
        body : 'adType=2&' + dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        console.log('签到回执:成功🌝 '+result.data.sign_award)
}
if(result.status_code == 10020){
        console.log('签到回执:失败🚫 '+result.message)

}$.msg($.name,"",'多看点开始🖨')
          
await dkdgg()
await dkdbxsx()
await dkdbx()
await dkdbxfb()
//await dkdsxzp()
await dkdcj()
await dkdfx()
await dkdyq()
//await dkdz()        
//await dkdxs()
await dkdxx()
await dkdtx() 

        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//多看点用户信息     
function dkdxx(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://dkd-api.dysdk.com/user/index',
        headers : JSON.parse(dkdhd),
        body : dkdbody,}
      $.post(url, async (err, resp, data) => {
        try {
           //$.log(dkdbody)
    const result = JSON.parse(data)
        if(result.status_code == 200){
        $.msg($.name+'运行完毕！',"",'用户信息回执:成功🌝\n'+'用户名: '+result.data.nickname+'\n当前余额:'+result.data.cash+'\n总金币:'+result.data.gold+'\n今日金币:'+result.data.today_gold)
        await server($.name+'运行完毕！'+'用户名: '+result.data.nickname+'\n当前余额:'+result.data.cash+'\n总金币:'+result.data.gold+'\n今日金币:'+result.data.today_gold)

        }
if(result.status_code == 10020){
        $.msg($.name,"",'运行完毕，用户信息获取失败🚫 '+result.message)}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}
function timeFormat(time) {
  let date;
  if (time) {
    date = new Date(time)
  } else {
    date = new Date();
  }
  return date.getFullYear() + '-' + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() >= 10 ? date.getDate() : '0' + date.getDate());
}
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}getScript(t){return new Promise(s=>{$.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=s&&s.timeout?s.timeout:o;const[h,a]=i.split("@"),r={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":h,Accept:"*/*"}};$.post(r,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i)}catch(s){const h={};this.lodash_set(h,o,t),e=this.setval(JSON.stringify(h),i)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}time(t){let s={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in s)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?s[e]:("00"+s[e]).substr((""+s[e]).length)));return t}msg(s=t,e="",i="",o){const h=t=>!t||!this.isLoon()&&this.isSurge()?t:"string"==typeof t?this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0:"object"==typeof t&&(t["open-url"]||t["media-url"])?this.isLoon()?t["open-url"]:this.isQuanX()?t:void 0:void 0;this.isSurge()||this.isLoon()?$notification.post(s,e,i,h(o)):this.isQuanX()&&$notify(s,e,i,h(o)),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
