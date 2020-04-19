[TOC]

### 1.登录api

请求方式：POST

Url: http://118.25.157.209:3389/api/login

数据类型：JSON

输入参数举例:

```json
{
	"username":"admin",
	"password":"admin"
}
```

请求成功返回：

```json
{
    "result": "success",
    "userid": 2 //管理员id
}
```

请求失败返回:

```json
{
    "result": "error"
}
```

### 2.管理员基本信息修改

请求方式：POST

URL：http://118.25.157.209:3389/api/updateBasicInfo

数据类型：JSON

输入参数举例:

```json
{
	"userid":2,
	"person_name":"王五",
	"age":8,
  "sex":'男',
  "birthday":"1996-02-28"
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 3.管理员公告信息修改

请求方式：POST

URL：http://118.25.157.209:3389/api/updateBulletin

数据类型：JSON

输入参数举例:

```json
{
	"bulletin_id":1,
	"bulletin":"这是公告信息",
	"publishTime":"2020-04-05 12:00:12"
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 4.管理员新增公告信息

请求方式：POST

URL：http://118.25.157.209:3389/api/addBulletin

数据类型：JSON

输入参数举例:

```json
{
	"bulletin":"这是公告信息"
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 5.管理员修改阈值

请求方式：POST

URL：http://118.25.157.209:3389/api/updateLightThreshold

数据类型：JSON

输入参数举例:

```json
{
	"threshold_light":40
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 6.获取管理员基本信息

请求方式：GET

URL：http://118.25.157.209:3389/api/getBasciInfo

输入参数举例:http://118.25.157.209:3389/api/getBasciInfo?userid=2

请求成功返回：

```json
{
    "data": [
        {
            "age": 8,
            "birthday": "1996-02-28",
            "person_name": "王五",
            "sex": "男",
            "userid": 1
        }
    ],
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 7.获取路灯传感器信息

请求方式：GET

URL：http://118.25.157.209:3389/api/getLightData

无参数

请求成功返回：

```json
{
    "data": [
        {
            "date": 1577836800000,
            "hongwaiData": 1,
            "index": 0,
            "lightData": 210,
            "light_id": 1,
            "voiceData": 1
        }
    ],
  "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 8.获取系统所有的公告

请求方式：GET

URL：http://118.25.157.209:3389/api/getBulletin

无参数

请求成功返回：

```json
{
    "data": [
        {
            "bulletin": "山东无本地住院疑似病例、确诊病例。累计报告确诊病例759例，死亡病例7例，治愈出院752例。\n\n　　山东无新增境外输入疑似病例，济南市报告英国输入确诊病例1例。累计报告境外输入确诊病例20例。无新增治愈出院病例，累计治愈出院3例。\n\n　　山东无新增无症状感染者，正在隔离观察治疗的无症状感染者12例(其中境外输入11例)。\n\n　　目前共追踪到密切接触者20988人，尚有1373人正在接受医学观察。",
            "bulletin_id": 2,
            "publishTime": "2020-04-05 15:36:12"
        },
        {
            "bulletin": "asfafsdgsfgdgdhdghghh",
            "bulletin_id": 7,
            "publishTime": "2020-04-05 20:18:20"
        }
    ],
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 9.获取路灯的开关状况

请求方式：GET

URL：http://118.25.157.209:3389/api/getLightStatus

输入参数举例:http://118.25.157.209:3389/api/getLightStatus?light_id=1&date=2020-01-01

请求成功返回：

```json
{
    "comment": "开",
    "status": "良"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 10.路灯状态修改

请求方式：POST

URL：http://118.25.157.209:3389/api/updateLightStatus

数据类型：JSON

输入参数举例:

```json
{
	"light_id":1,
	"light_status":"关"
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

###  11.路灯故障信息修改

请求方式：POST

URL：http://118.25.157.209:3389/api/updateLightStatus

数据类型：JSON

输入参数举例:

```json
{
	"light_id":1,
	"light_status":"关"
}
```

请求成功返回：

```json
{
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 12.路灯故障信息查看

请求方式：GET

URL：http://118.25.157.209:3389/api/getBreakinfo

无输入参数

请求成功返回：

```json
{
   "data": [
        {
            "content": "路灯灯泡损坏，需要更换。",
            "index": null,
            "light_id": 2,
            "publishTime": "2020-04-18 19:23:16",
            "time": 1587237796000
        }],
    "status": "success"
}
```

请求失败返回:

```json
{
    "status": "error"
}
```

### 