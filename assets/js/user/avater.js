
$(function(){
	let layer=layui.layer
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
// 纵横比 裁剪框
aspectRatio: 1,
// 指定预览区域
preview: '.img-preview'
}
// 1.3 创建裁剪区域 传入进去
$image.cropper(options)

//为上传按钮绑定点击事件
$('#btn').on('click',function(){
	$('#file').click()
})
$('#file').on('change',function(e){
	//找到文件上传的图片
	let filelist=e.target.files
	//判断是否有图片
	if(filelist.length===0){
		return layer.msg('请选择图片')
	}
	//拿到用户选择的图片
	let flie=e.target.files[0]
	//将文件转换为路径
	let imgURL=URL.createObjectURL(flie)
	//重新初始化裁剪区域
$image
.cropper('destroy') // 销毁旧的裁剪区域
.attr('src', imgURL) // 重新设置图片路径
.cropper(options) // 重新初始化裁剪区域
})
$('#btnload').on('click',function(){
	var dataURL = $image
.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
width: 100,
height: 100
})
.toDataURL('image/png')

//然后调用接口，把头像上传到服务器
$.ajax({
	method:'POST',
	url:'/my/update/avatar',
	data:{
		avatar:dataURL
	},
	success:function(res){
		if(res.status!==0){
			return layer.msg('更换头像失败！')
		}
		layer.msg('更换头像成功')
	window.parent.getUserInfo()    
	}
})
})
})
