//用户退出功能
$('#logout').on('click',function(){
    if(confirm('是否确认退出')){
       $.ajax({
         type:'post',
         url:'/logout',
         success:function(){
            location.href='login.html';
         },
         error:function(){
           alert('退出失败！');
         }
       })
    }
 });

 //获取登录信息
 $.ajax({
    type:'get',
    url:'/users/'+userId,
    success:function(response){
       $('.avatar').attr('src',response.avatar);
       $('.profile .name').html(response.nickName);
    }
 })
 //处理时间格式
function formateDate(date){
   //将传入日期时间字符串转换成日期对象
   date = new Date(date);
   return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

