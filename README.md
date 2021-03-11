春风赚操作教程请访问README-cfz.md获取

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
安装多看点刷金币，使用HttpCanary等抓包工具，打开软件后进入我的页面
搜索user/index地址，页面中抓取cookie,参数类似

```
let dkdurl ='http://dkd-api.dysdk.com/user/index'
let dkdhd = '{"headerInfo":"eyJvcXXXXXXXwOWMyOTdkMjcXXXXXXXbiI6IjEwODAqcXXXXXXX=","Content-Type":"application/x-www-form-urlencoded"}'
let dkdbody = 'params=cc14402e1XXXXXXX5c2845'
```

# 操作步骤
## Step 1 Fork仓库
打开[代码链接](https://github.com/qianx443/dkd)并Fork我的仓库

##  Step 2 设置Cookie
fork完之后,如图点击<font color="red">Settings</font>
进去之后依次点击<font color="red">Secrets----new secret</font>
点击之后
 - ame输入dkdurl, value输入你的dkdurl
 - 完成后点击add secret 
 - Name输入dkdhd, value输入你的dkdhd，注意参考上文中示例，修改成json格式，仅需替换headerInfo内容
 - Name输入dkdbody, value输入你的dkdbody
 - 同理再添加一个sckey,  value输入你的server酱Key [获取地址](https://qmsg.zendee.cn)以及sckey(server酱)


## Step 3 启用Actions
点击Action，再点击**I understand my workflows, go ahead and enable them**  
![avatar](https://cdn.jsdelivr.net/gh/Wenmoux/wenpic/687474703a2f2f74752e79616f68756f2e6d652f696d67732f323032302f30362f333463613136306339373262393932372e706e67.png)
## Step 4 运行结果 
点击Actions-dkd-auto-coin查看
![avatar](https://attach.52pojie.cn/forum/202102/05/092214uaii8arlvaqmf04r.png)
![avatar](https://attach.52pojie.cn/forum/202102/05/090000hqub17o591v979nn.png)

## 其它说明
 - 设置好之后要点击Actions启用下
 - 可以自己改定时时间
 - 还没想到
 - 不介意的话请输入作者邀请码13209301得500金币
 - 如果没有自动触发workflow，请先确认是否已经enable workflow，然后任意修改下readme.md文件并commit changes
