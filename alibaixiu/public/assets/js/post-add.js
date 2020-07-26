

//获取文章分类数据
$.ajax({
   type:'get',
   url:'/categories',
   success:function(response){
      var html =  template('categoryTpl',{data:response}) ;
      $('#category').html(html);
   }
});
//管理员选择文件
$('#feature').on('change',function(){
  var file  = this.files[0];
  var formData = new FormData();

  formData.append('cover',file);
  $.ajax({
      type:'post',
      url:'/upload',
      data:formData,
      processData:false,
      contentType:false,
      success:function(response){
         $('#thumbnail').val(response[0].cover);
      }
  })
});

//添加文章表单提交
$('#addForm').on('submit',function(){
  var formData = $(this).serialize();
  $.ajax({
      type:'post',
      url:'/posts',
      data:formData,
      success:function(){
          //添加成功跳转到文章列表页面
          location.href = '/admin/posts.html'
      }
  })
  return false;

});
//提交修改表单
$('#parentBox').on('submit','#modifyForm',function(){
   var formData = $(this).serialize();
   var id = $(this).attr('data-id');
   $.ajax({
       type:'put',
       url:'/posts/'+id,
       data:formData,
       success:function(){
           location.href = '/admin/posts.html'
       }
   })
   return false;
});


//从地址栏获取参数
function getUrlParams(name){
    var paramsAry = location.search.substr(1).split('&');
    for(var i = 0;i < paramsAry.length;i++){
        var tmp = paramsAry[i].split('=');
        if(tmp[0]==name){
            return tmp[1];
        }
    }
    return -1;
}
//查询地址栏中的id参数
var id = getUrlParams('id');
if(id!=-1){
    $.ajax({
        type:'get',
        url:'/posts/'+id,
        success:function(response){
            $.ajax({
                type:'get',
                url:'/categories',
                success:function(categories){
                    response.categories = categories;
                    var html = template('modifyTpl',response);
                    $('#parentBox').html(html);
                }
             })
        }
    }); 
}