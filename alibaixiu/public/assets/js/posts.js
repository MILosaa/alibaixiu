//获取文章列表数据
$.ajax({
    type:'get',
    url:'/posts',
    success:function(response){
        var html = template('postsTpl',{data:response});
        $('#postsBox').html(html);
        var page = template('pageTpl',{data:response});
        $('#pageBox').html(page);
    }
});

//获得文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(response){
       var html = template('categoryTpl',{data:response});
       $('#categoryBox').html(html);
    }
 });
//提交筛选表单
 $('#filterForm').on('submit',function(){
    var formDate = $(this).serialize();
    $.ajax({
        type:'get',
        url:'/posts',
        data:formDate,
        success:function(response){
            var html = template('postsTpl',{data:response});
            $('#postsBox').html(html);
            var page = template('pageTpl',{data:response});
            $('#pageBox').html(page);
        }
    })
    return false;
 });
//列表删除事件
$('#postsBox').on('click','.delete',function(){
     if(confirm('确认删除')){
        var id = $(this).attr('data-id'); 
        $.ajax({
            type:'delete',
            url:'/posts/'+id,
            success:function(){
                location.reload();
            }
        })
     } 
});



//定义changePage函数
function changePage(page){ 
    $.ajax({
        type:'get',
        url:'/posts',
        data:{
            page:page
        },
        success:function(response){
            var html = template('postsTpl',{data:response});
            $('#postsBox').html(html);
            var pag = template('pageTpl',{data:response});
            $('#pageBox').html(pag);
        }
    });
}