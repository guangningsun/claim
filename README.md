# claim
----

物品申领前后台代码

- 注册用户
  
```
方法：POST
URL: http://127.0.0.1:8010/userinfo/
参数：
    login_name
    weixin_id
    phone_number
    category
返回值：
    {
        "login_name": "test",
        "weixin_id": "123333333",
        "phone_number": "138111111",
        "category": 1
    }

```

- 小程序登录后展示订单列表（界面1）

```
方法GET
URL：http://127.0.0.1:8010/record_list/123333333
参数：微信id
返回值：
{
    "error": 0,
    "msg": {
        "claim_record_info": [
            {
                "claim_username": "test",
                "claim_count": "20",
                "claim_phone_num": "138111111",
                "claim_name": "中性笔",
                "claim_date": "2020-03-25",
                "category": 1
            }
        ]
    }
}
```  

- 打开相机扫二维码展示所有物品列表+部门码（界面2）

```
方法： GET
URL: http://127.0.0.1:8010/asset
返回值: 
        {
            "error": 0,
            "msg": {
                "asset_info": [
                    {
                        "asset_name": "中性笔",
                        "asset_count": "100"
                    },
                    {
                        "asset_name": "笔记本",
                        "asset_count": "100"
                    },
                    {
                        "asset_name": "订书器",
                        "asset_count": "100"
                    }
                ]
            }
        }
```

- 添加物品到购物车 （界面3）
- 提交订单（结果界面 4）

```
方法：POST
URL：http://127.0.0.1:8010/claim_asset/
参数
<!-- claim_username -->
claim_count
<!-- claim_phone_num -->
claim_name
category
返回值：
{
    "error": 0,
    "msg": "申领成功"
}
数量大于5
{
    "error": 1,
    "msg": "抱歉,该部门没有权限申请过多商品"
}
库存不足

{
    "error": 1,
    "msg": "中性笔库存商品不足"
}

类型不正确

{
    "error": 1,
    "msg": "仓库中没有该类型商品"
}
```


##### 后台命令行操作命令

- 后台创建管理员账户方法

    python manage.py createsuperuser

- 创建表结构

    $ python manage.py migrate  

- 让 Django 知道我们在我们的模型有一些变更

    $ python manage.py makemigrations AppModel  

- 创建表结构

    $ python manage.py migrate AppModel  

- 本地配置https

    pip install django-extensions
    pip install django-werkzeug-debugger-runserver
    pip install pyOpenSSL
    python manage.py runserver_plus --cert server.crt 0.0.0.0:8015