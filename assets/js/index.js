$(function() {
	getUserInfo()
	let layer = layui.layer;
	$('#btnlogin').on('click', function() {
		//询问框
		layer.confirm('你是否点击退出', {
			icon: 3,
			title: '提示'
		}, function(index) {
			localStorage.removeItem('token')
			location.href = 'login.html'
			//关闭询问框
			layer.close(index);
		});
	})

})
//获取用户的权限以及数据
function getUserInfo() {
	$.ajax({
		method: 'GET',
		url: '/my/userinfo',
		success: function(res) {
			if(res.status !== 0) {
				return layui.layer.msg('获取用户失败')
			}
			renderAvata(res.data)
		},

	})
}

function renderAvata(user) {
	//先获取用户名
	let name = user.nickname || user.username;
	//设置欢迎文本
	$('#welcome').html('欢迎&nbsp;&nbsp' + name);
	//按需加载头像
	if(user.user_pic !== null) {
		//加载图像图片 
		$('.text-avatar').hide()
		$('.layui-nav-img').attr('src', user.user_pic)
			.show()
      
	}else{
		//加载文字图片
	$(".layui-nav-img").hide()
	let one = name[0].toUpperCase()
	$('.text-avatar').html(one).show()
	}
	
}