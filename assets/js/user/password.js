$(function() {
	let form = layui.form;
	let layer=layui.layer;
	form.verify({
		pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		asmepass: function(value) {
			if(value === $('[name=oldPwd]').val()) {
				return '新旧密码不能一样'
			}
		},
		repwd: function(value) {
			if(value !== $("[name=newPwd]").val()) {
				return '俩次密码不一样请重置'
			}
		}
	})
	$('.layui-form').on('submit',function(e){
	e.preventDefault()
	$.ajax({
		method:'POST',
		url:'/my/updatepwd',
		data:$(this).serialize(),
		success:function(res){
			if(res.status!==0){
				console.log(res.message)
				return layer.msg ('修改密码失败了')
				
			}
			layer.msg('更新密码成功')
			$('.layui-form')[0].reset()
		}
	});
	})
})