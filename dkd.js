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
const download = require('download')
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
         body : 'code=13152063&' + dkdbody,}
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
          body : 'code=13152063&'+dkdbody,}
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
await dkdbx()
await dkdbxfb()
await dkdyq()
await dkdcj()
await dkdfx()
await dkdxs()
await dkdxx()
await dkdtx() 
await dkdyq()

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
        await server($.name+'运行完毕！',"",'用户信息回执:成功🌝\n'+'用户名: '+result.data.nickname+'\n当前余额:'+result.data.cash+'\n总金币:'+result.data.gold+'\n今日金币:'+result.data.today_gold)

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

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
