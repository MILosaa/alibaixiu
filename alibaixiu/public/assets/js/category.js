//添加分类列表内容
$('#addCategory').on('submit',function(){
    var formDate = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/categories',
        data:formDate,
        success:function(){
            location.reload();
        }
    });
    return false; 
});
//页面刷新展示分类列表
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
    var html = template('categoryListTpl',{data: response});
    $('#categoryBox').html(html);
    }
});
//分类列表编辑按钮
$('#categoryBox').on('click','.edit',function(){
    var id = $(this).attr('data-id');
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(response){
         var html =  template('modifyCategoryTpl',response);
         $('#formBox').html(html);
        }
    });
});
//修改表单提交
$('#formBox').on('submit','#modifyCategory',function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
    type:'put',
    url:'/categories/'+id,
    data:formData,
    success:function(){
        location.reload();
    }
    });
    return false;
});
//分类也列表删除按钮
$('#categoryBox').on('click','.delete',function(){
    var id = $(this).attr('data-id');
    if(confirm('删除确认！')){
        $.ajax({
            type:'delete',
            url:'/categories/'+id,
            success:function(){
            location.reload(); 
            }
         })
    }
   
})