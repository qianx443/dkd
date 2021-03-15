/*
软件名称:春风转 
脚本说明：春风转
脚本为自动阅读新闻，每30秒可以获取60个金币，但是似乎存在每天三元上限，且薅且珍惜？
下载地址 https://ss.tblk.me/R1MuJ
或者扫描二维码 https://ftp.bmp.ovh/imgs/2021/03/468716c311812030.png
本脚本以学习为主！
使用方法:
打开春风转，点击文章赚钱，下拉刷新一下，获得阅读数据
随便进入一篇文章阅读，获得金币奖励后提示获得上报数据

3.12更新，修改缩小分页的随机数范围，加入部分每日任务和时段奖励，修改为每次运行十次，每日的阅读次数上限是200次，所以每天跑二十次就行了，请避开高峰期运行脚本，错开脚本的运行时间，不要cron都设置的一样
比如可以设置为 15,45 10-21 * * *   15和45可以自己修改，自己计算二十次的运行时间来设置cron最好
3.13更新 修复因官方修改阅读的间隔时长而导致的循环阅读失败的问题，修复每日任务执行过快的问题，现在每次阅读的奖励只有30一次，每次阅读间隔变成了一分钟，自行修改一下cron吧
*/


const $ = new Env('春风转');
const exec = require('child_process').execSync
const fs = require('fs')
const got = require('got')
const axios = require('axios')
const path = require('path') 
const cktouch = require('tough-cookie')
let status;
status = (status = ($.getval("cfzstatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const cfzurlArr = [], cfzhdArr = [],cfzsbhdArr = [],cfzcount = ''
const cfzurl = process.env.cfzurl;
const cfzhd = process.env.cfzhd;
const cfzsbhd = process.env.cfzsbhd;


//let cfzurl = 'http://cf-api.douzhuanapi.cn:10002/api/article/list?page=1&tag_id=0&slide=1&type=1&city_type=1'
//let cfzhd = '{"X-V":" 1","Authorization":" Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MDQ5N2RjNDExYzA0IiwiaWF0IjoxNjE1NDI5MDYwLCJFwYQ=="}'
//let cfzsbhd = '{"X-V":" 1","Authorization":" Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJJamdkeUlwaw=="}'
let cfzlb = '',cfzid = '',cfzmc = '',page = 1
let tc = 0

!(async () => {
 
          console.log(`\n开始【春风转】`)
          //await cfzhhb();
            await  execTask()


})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())



function execTask() {
  return new Promise(async resolve => {
    try {
		await $.wait(1000)
		for (let i = 0; i < 10; i++) {   
			$.log(`春风转开始执行循环阅读，本次共执行10次，已执行${i+1}次`)
			await cfzqd()
			let sjs = 60000+Math.floor(Math.random()*10000); //随机等待60秒到70秒
			await $.wait(sjs)
		  }
		await cfzrw1() 
		await $.wait(1000)
		await cfzrw2()
		await $.wait(1000)
		await cfzrw3()
		await $.wait(1000)
		await cfzrw4()
		await $.wait(1000)
		await cfzsdid()
    } catch (e) {
      $.logErr(` 循环执行任务出现异常: ${e}`)
    } finally {
      resolve()
    }
  })
}

//春风转数据获取
function cfzck() {
   if ($request.url.indexOf("list?city_type") > -1) {
 const cfzurl = $request.url
  if(cfzurl)     $.setdata(cfzurl,`cfzurl${status}`)
    $.log(cfzurl)
  const cfzhd = JSON.stringify($request.headers)
        if(cfzhd)    $.setdata(cfzhd,`cfzhd${status}`)
   $.log(cfzhd)
   $.msg($.name,"",'春风转'+`${status}` +'阅读数据获取成功！')
  }
}


//春风转阅读
function cfzyd(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_report?item_id='+cfzid,
        headers : JSON.parse(cfzhd),
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
		const result = JSON.parse(data)
        if(result.code == 200){
           console.log('\n春风转[领取阅读奖励]回执:成功🌝 \n获得奖励: '+result.data.amount+'金币，等待60秒继续领取')       
           await cfzsb();         
    	} else {
			 if(result.message == '您的自阅已超过次数'){
				   tc =1
			}
			if(result.message=='系统错误！'){
			console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'\n恭喜您，您的账号黑了，尝试上报数据修复，提示上报数据成功请关闭脚本等待一分钟再次运行试试')
			await cfzxf();
			}else{
			console.log('\n春风转[领取阅读奖励]回执:失败🌚'+result.message+'脚本已停止运行')
			}
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转上报数据
function cfzsb( timeout = 0) {
  return new Promise((resolve) => {
	let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/self_read_init?item_id='+ac.cfzid,
        headers : JSON.parse(cfzhd),        
        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
        const result = JSON.parse(data)
        if(result.code == 200){
        //console.log('\n春风转[数据上报]回执:成功🌝'+result.message)  
		await cfztj()
		} else {
		console.log('\n春风转[上报数据]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转上报提交数据
function cfztj(timeout = 0) {
  return new Promise((resolve) => {
	let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
        headers : JSON.parse(cfzhd),
        body : 'ad_source=1&location=3&position=8&report_type=1',
        
        }
      $.post(url, async (err, resp, data) => {
        try {
          if (err) {
			 console.log('\n春风转[提交数据]🌚'+data)
            $.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
			const result = JSON.parse(data)
				if(result.code == 200){
				console.log('\n春风转[数据上报]回执:成功🌝'+result.data)  
				} else {
				console.log('\n春风转[上报数据]回执:失败🌚'+result.message)

				}
			}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转修复系统错误
function cfzxf(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/ad_sense/report',
				headers : JSON.parse(cfzhd),
				body : 'ad_source=1&location=3&position=8&report_type=1',        
				}
			  $.post(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
				console.log('\n春风转[数据上报]回执:成功🌝'+result.data)  
		} else {
			console.log('\n春风转[上报数据]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//春风转列表
function cfzqd(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{      
		page++
		let sjs = Math.floor(Math.random()*1000); //生成随机数
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/article/list?city_type=1&page='+sjs+'&slide='+sjs+'&tag_id=0&type=1',
				headers : JSON.parse(cfzhd),
				
		}
		  $.get(url, async (err, resp, data) => {
		   console.log('\n春风转[阅读列表]:'+data)
			cfzlb = data.match(/"list":(.*)/)[1]
			cfzid = cfzlb.match(/"id":(\w+),/)[1]
			cfzmc = cfzlb.match(/"title":"(.+?)","/)[1]
			//console.log(cfzmc)
			//$.done()
				try {
				const result = JSON.parse(data)
					if(result.code == 200){
				 	console.log('\n春风转[阅读列表]回执:成功🌝  \n📄阅读ID:'+cfzid+'\n📑开始阅读:'+cfzmc)
				    await $.wait(1000);
					await cfzyd();
			} else {
				console.log('春风转[阅读列表]回执:失败🚫 '+result.message)				 
			}
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

//春风转每日任务阅读新闻
function cfzrw1(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=13',
        headers : JSON.parse(cfzhd),
        }
		$.get(url, async (err, resp, data) => {
        try {
			if (err) {
				$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
			  } else {
			const result = JSON.parse(data)
			if(result.code == 200){
			console.log('\n春风转[领取每日任务阅读新闻]回执:成功🌝 \n获得奖励: '+result.data.amount)                
			   
			} else {
				 
			console.log('\n春风转[领取每日任务阅读新闻]回执:失败🌚'+result.message)
			}
			}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//春风转每日任务阅读60分钟
function cfzrw2(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=14',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
				const result = JSON.parse(data)
					if(result.code == 200){
					console.log('\n春风转[领取每日任务阅读60分钟]回执:成功🌝 \n获得奖励: '+result.data.amount)      
					  
				} else {
					 
				console.log('\n春风转[领取每日任务阅读60分钟]回执:失败🌚'+result.message)
				}
			}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务福利视频
function cfzrw3(timeout = 0) {
  return new Promise((resolve) => {
let url = {
        url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=15',
        headers : JSON.parse(cfzhd),

        }
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
    const result = JSON.parse(data)
        if(result.code == 200){
        console.log('\n春风转[领取每日任务福利视频]回执:成功🌝 \n获得奖励: '+result.data.amount)       
           
           
} else {
     
if(result.message =='该任务您还未完成'){
console.log('\n春风转[领取每日任务福利视频]回执:失败🌚'+result.message)
for (let i = 0; i < 3; i++) {
         
        $.log(`春风转开始执行观看福利视频，本次共执行3次，已执行${i+1}次`)
        await cfzrwsp()
        await $.wait(10000)
      }
}else{console.log('\n春风转[领取每日任务福利视频]回执:失败🌚'+result.message)}

}
}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务晒图奖励
function cfzrw4(timeout = 0) {
  return new Promise((resolve) => {
	let url = {
			url : 'http://cf-api.douzhuanapi.cn:10002/api/get_red_task_gold?id=5',
			headers : JSON.parse(cfzhd),
			}
      $.get(url, async (err, resp, data) => {
        try {
          if (err) {
            $.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
          } else {
		const result = JSON.parse(data)
			if(result.code == 200){
			console.log('\n春风转[领取每日任务晒图奖励]回执:成功🌝 \n获得奖励: '+result.data.amount)       
			   
			   
		} else {
			 
		if(result.message =='该任务您还未完成'){
		console.log('\n春风转[领取每日任务晒图奖励]回执:失败🌚'+result.message)
		for (let i = 0; i < 3; i++) {
				 
				$.log(`春风转开始执行观看福利视频，本次共执行3次，已执行${i+1}次`)
				await cfzrwst()
		await $.wait(10000)
			  }
		}else{console.log('\n春风转[领取每日任务晒图奖励]回执:失败🌚'+result.message)}

		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}


//春风转每日任务看视频
function cfzrwsp(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/red_task_report?item_id=15&task_type=2',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
				console.log('\n春风转[看广告视频]回执:成功🌝 \n'+result.data)       
				   
				   
		} else {
			 
		console.log('\n春风转[看广告视频]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每日任务晒图
function cfzrwst(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/red_task_report?item_id=5&task_type=5',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
				console.log('\n春风转[晒图奖励]回执:成功🌝 \n'+result.data)       
				   
				   
		} else {
			 
		console.log('\n春风转[晒图奖励]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}

//春风转每时段id
function cfzsdid(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_opt',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
		 sdid = result.data.treasureBox_id
				console.log('\n春风转[时段ID]回执:成功🌝 \n时段ID: '+sdid)       
				   await cfzsdlq();
				   
		} else {
			 
		console.log('\n春风转[时段ID]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//时段领取
function cfzsdlq(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_gain?treasure_box_id='+sdid+'&type=1',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
		 sdlqid = result.data.gold_gain_id
				console.log('\n春风转[时段领取]回执:成功🌝 \n时段ID: '+result.data.gold_amount)       
				   await cfzsdfb();
				   
		} else {
			 
		console.log('\n春风转[时段领取]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}
//时段翻倍领取
function cfzsdfb(timeout = 0) {
  return new Promise((resolve) => {
		let url = {
				url : 'http://cf-api.douzhuanapi.cn:10002/api/treasure_box_gain?gold_gain_id='+sdlqid+'&treasure_box_id='+sdid+'&type=2',
				headers : JSON.parse(cfzhd),
				}
			  $.get(url, async (err, resp, data) => {
				try {
				  if (err) {
					$.logErr(`❌ 账号 API请求失败，请检查网络后重试\n url: ${url.url} \n data: ${JSON.stringify(err, null, 2)}`)
				  } else {
			const result = JSON.parse(data)
				if(result.code == 200){
				console.log('\n春风转[时段翻倍]回执:成功🌝 \n时段ID: '+result.data.gold_amount)       
				   
		} else {
			 
		console.log('\n春风转[时段翻倍]回执:失败🌚'+result.message)
		}
		}
        } catch (e) {
          $.logErr(`======== 账号 ========\nurl: ${url.url}\n${e}\ndata: ${resp && resp.body}`);
        } finally {
          resolve()
        }
    },timeout)
  })
}


function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=
