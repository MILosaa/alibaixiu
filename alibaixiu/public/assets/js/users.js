//添加用户提交表单
$('#userForm').on('submit', function () {
	// 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();

	// 向服务器端发送添加用户的请求
	$.ajax({
		type: 'post',
		url: '/users',
		data: formData,
		success: function () {
			// 刷新页面
			location.reload();
		},
		error: function () {
			alert('用户添加失败')
		}
	})
	// 阻止表单的默认提交行为
	return false;
});
//上传头像
$('#modifyBox').on('change','#avatar',function(){
    var formDate = new FormData();
    formDate.append('avatar',this.files[0]);
    $.ajax({
       type:'post',
       url:'/upload',
       //禁止$.ajax解析请求参数
       processData:false,
       //禁止$.ajax设置请求参数类型
       contentType:false,
       success:function(response){
            $('#preview').attr('src',response[0].avatar);
            //头像预览
            $('#hiddenAvatar').val(response[0].avatar);
       }
    })
});
//渲染信息列表
$.ajax({
    type:'get',
    url:'/users',
    success:function(response){
        var html = template('userTpl',{
            data:response
        })
        $('#userBox').html(html);
    }
})
//用事件委托为编辑按钮添加事件
$('#userBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    //根据id查询用户信息
    $.ajax({
        type:'get',
        url:'/users/'+id,
        success:function(response){        
            var html = template('modifyTpl',response);
            $('#modifyBox').html(html);
        }
    })
});
//为修改表单提交表单提交事件
$('#modifyBox').on('submit','#modifyForm',function(){
  var formData = $(this).serialize();
  var id = $(this).attr('data-id');
  $.ajax({
      type:'put',
      url:'/users/'+id,
      data:formData,
      success:function(response){
          location.reload();
      }
  });
  return false;
});
//用事件委托为编辑按钮删除事件
$('#userBox').on('click','.delete',function(){
    if(confirm('你真的要删除用户吗？')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/users/'+id,
            success:function(response){
               location.reload();
            }
        });
    }
})
//获取全选按钮
var selectAll = $('#selectAll');
var deleteMany = $('#deleteMany');
//当全选按钮状态发生改变时
selectAll.on('change',function(){
    //获取全选按钮当前状态
    var status = $(this).prop('checked');
    if(status){
       deleteMany.show(); 
    }else{
        deleteMany.hide();
    }
    //获取所有用户并设置状态
    $('#userBox').find('input').prop('checked',status);
});
//用户复选框发生改变时
$('#userBox').on('change','.userStatus',function(){
    var inputs = $('#userBox').find('input');
    if(inputs.length == inputs.filter(':checked').length){
        selectAll.prop('checked',true)
    }
    else{
        selectAll.prop('checked',false)
    }

    if(inputs.filter(':checked').length>0){
        deleteMany.show(); 
    }else{
        deleteMany.hide(); 
    }
});
//批量删除事件
deleteMany.on('click',function(){
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    //循环复选框获得data-id属性值
    checkedUser.each(function(index,element){
        ids.push($(element).attr('data-id'));
    });
    if(confirm('删除确认')){
        $.ajax({
            type:'delete',
            url:'/users/'+ids.join('-'),
            success:function(){
                location.reload();
            }
        })
    }
});