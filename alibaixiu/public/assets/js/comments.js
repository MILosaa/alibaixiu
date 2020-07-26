//获取评论列表
$.ajax({
    type:'get',
    url:'/comments',
    success:function(response){
        var html = template('commentsTpl',response);
        $('#commentsBox').html(html);
        var pageHtml = template('pageTpl',response);
        $('#pageBox').html(pageHtml)
    }
});
//实现分页
function changPage(page){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:page
        },
        success:function(response){
            var html = template('commentsTpl',response);
            $('#commentsBox').html(html);
            var pageHtml = template('pageTpl',response);
            $('#pageBox').html(pageHtml)
        }
    });
}
//批准按钮
$('#commentsBox').on('click','.status',function(){
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:status == 0 ? 1 : 0
        },
        success:function(){
            location.reload()
        }
    })
})
//删除评论
$('#commentsBox').on('click','.delete',function(){
    if(confirm('删除确认!')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/comments/'+id,
            success:function(){
                location.reload()
            }
        })
    }
})