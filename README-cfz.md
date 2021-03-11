
# 说明
 - 本仓库发布的Script项目中涉及的任何解锁和解密分析脚本，仅用于测试和学习研究，禁止用于商业用途，不能保证其合法性，准确性，完整性和有效性，请根据情况自行判断.

 - 本项目内所有资源文件，禁止任何公众号、自媒体进行任何形式的转载、发布。

 - qianx443对任何脚本问题概不负责，包括但不限于由任何脚本错误导致的任何损失或损害.

 - 间接使用脚本的任何用户，包括但不限于建立VPS或在某些行为违反国家/地区法律或相关法规的情况下进行传播, qianx443 对于由此引起的任何隐私泄漏或其他后果概不负责.

 - 请勿将Script项目的任何内容用于商业或非法目的，否则后果自负.

 - 如果任何单位或个人认为该项目的脚本可能涉嫌侵犯其权利，则应及时通知并提供身份证明，所有权证明，我们将在收到认证文件后删除相关脚本.

 - 任何以任何方式查看此项目的人或直接或间接使用该Script项目的任何脚本的使用者都应仔细阅读此声明。qianx443 保留随时更改或补充此免责声明的权利。一旦使用并复制了任何相关脚本或Script项目的规则，则视为您已接受此免责声明.

 - 您必须在下载后的24小时内从计算机或手机中完全删除以上内容. 


# 获取cookie
 - 安装春风转刷金币，脚本为自动阅读新闻，每30秒可以获取60个金币，但是似乎存在每天三元上限，且薅且珍惜？
 - 下载地址 https://ss.tblk.me/R1MuJ
 - 使用HttpCanary等抓包工具，打开软件后，点击文章赚钱，下拉刷新一下，获得阅读数据，随便进入一篇文章阅读，获得金币奖励后提示获得上报数据
 - 搜索article/list，页面中抓取header信息,将格式转换为json数据填入cfzhd，url填入cfzurl
 - 搜索ad_sense/report，页面中抓取header信息,将格式转换为json数据填入fzsbhd

 - 示例参数：

```
let cfzurl = 'http://cf-api.douzhuanapi.cn:10002/api/article/list?page=1&tag_id=0&slide=1&type=1&city_type=1'
let cfzhd = '{"X-V":" 1","Authorization":" Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJWF0IjoxNjE1NDI5MDYwLCJuYmYiOjE2MTU0MjkwNjAsImV4cCI6MTYxODAyMTA2MCwidWlkIjoxMjEyMzQzLCJuYW1lIjoiQmUgSHVtYmxlIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDMtMTEgMTA6MTc6NDAiLCJjaXR5X25hbWUiOiJcdTU0MDhcdTgwYTUiLCJjaXR5X2NvZGUiOiIzNDAxMDAifQ.74XhAZ6pKQGJ0SonQNqGnqf9kDE-j-WUPdMvpVSoB3A","phoneModel":" TAS-AN00","X-LAT":" 32","osType":" android","REC-REQUEST-ID":" ","X-IMEI":" id832710","X-LNG":" 117.2774","Content-Type":" application/x-www-form-urlencoded","X-CCMS":" SXBFwYQ=="}'
let cfzsbhd = '{"X-V":" 1","Authorization":" Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiIjoxNjE1NDI5MDYwLCJuYmYiOjE2MTU0MjkwNjAsImV4cCI6MTYxODAyMTA2MCwidWlkIjoxMjEyMzQzLCJuYW1lIjoiQmUgSHVtYmxlIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDMtMTEgMTA6MTc6NDAiLCJjaXR5X25hbWUiOiJcdTU0MDhcdTgwYTUiLCJjaXR5X2NvZGUiOiIzNDAxMDAifQ.74XhAZ6pKQGJ0SonQNqGnqf9kDE-j-WUPdMvpVSoB3A","phoneModel":" TAS-AN00","X-LAT":" 31.8672","User-Agent":" okhttp/4.3.1","osType":" android","REC-REQUEST-ID":" ","X-IMEI":" id1832710","X-LNG":" 114","Content-Type":" application/x-www-form-urlencoded","X-CCMS":" eUlwaw=="}'
```

# 操作步骤
## Step 1 Fork仓库
打开[代码链接](https://github.com/qianx443/dkd)并Fork我的仓库

##  Step 2 设置Cookie
fork完之后,如图点击<font color="red">Settings</font>
进去之后依次点击<font color="red">Secrets----new secret</font>
点击之后
 - Name输入cfzurl, value输入你的cfzurl
 - 完成后点击add secret 
 - Name输入cfzhd, value输入你的cfzhd，注意参考上文中示例，修改成json格式
 - 完成后点击add secret 
 - Name输入cfzsbhd, value输入你的cfzsbhd，注意参考上文中示例，修改成json格式


## Step 3 启用Actions
点击Action，再点击**I understand my workflows, go ahead and enable them**  
![avatar](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/687474703a2f2f74752e79616f68756f2e6d652f696d67732f323032302f30362f333463613136306339373262393932372e706e67.png)
## Step 4 运行结果 
点击Actions-cfz查看


## 其它说明
 - 设置好之后要点击Actions启用下
 - 如果没有自动触发workflow，请先确认是否已经enable workflow，然后任意修改下readme.md文件并commit changes




