//切换
$(function(){
	//点击登录界面跳转注册
	$('#link-reg').on('click',function(){
	$('.login-box').hide()
	$('.reg-box').show()
	})
	
	$('#link-login').on('click',function(){
	$('.login-box').show()
	$('.reg-box').hide()
	})	

//表单验证
//获取layui里面的form
let form = layui.form
//接收layui里面的layer方法
let layer=layui.layer
form.verify({
	pass:[/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
	//获取第二个文本框的值
	repass:function(value){
	//获取第一次文本框的值
	//获取第一次文本框里面的值
	let pwd = $('.reg-box [name=password]').val()
	//比较
	if(pwd !== value){
		return '俩次密码不正确！'
	}
	}
})
//注册用的表单
 $('#form-reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    let data={
      username:$('#form-reg [name=username]').val(),
      password:$('#form-reg [name=password]').val()
    }
    // 2. 发起Ajax的POST请求
    $.post('/api/reguser', data
    //post里面的
    , function(res) {
      if(res.status!==0){
      	return layer.msg(res.message)
      }
     layer.msg('注册成功,请登录');
     //异步执行函数
     async function index(){
     	setTimeout(()=>{
     		$('#link-login').click()
     	},2000)
     }
     async function fun(){
     	await index()
     }
     fun()
    })
  })
$('#form-login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method:'POST',
      // 快速获取表单中的数据
     data:$('#form-login').serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败,请检查你的用户名或者密码是否正确')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage中 
       //  token是用于有权限接口的身份认证
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = 'index.html'
      }
    })
  })
})