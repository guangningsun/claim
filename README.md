# claim
----

物品申领前后台代码

- 小程序登录后展示订单列表（界面1）
- 打开相机扫二维码展示所有物品列表+部门码（界面2）
- 添加物品到购物车 （界面3）
- 提交订单（结果界面 4）


##### 后台创建管理员账户方法

::

    python manage.py createsuperuser

 - 创建表结构

::

   $ python manage.py migrate  

- 让 Django 知道我们在我们的模型有一些变更

::

    $ python manage.py makemigrations AppModel  

-  创建表结构

::

    $ python manage.py migrate AppModel  
- 