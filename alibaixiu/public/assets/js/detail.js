//获取地址栏中的文章id
var postId = getUrlParams('id');
//评论是否经过人工审核
var review;
$.ajax({
    type:'get',
    url:'/posts/'+postId,
    success:function(response){
        var html = template('postTpl',response);
        $('#article').html(html)
    }
})
//点赞功能
$('#article').on('click','#like',function(){
    $.ajax({
        type:'post',
        url:'/posts/fabulous/'+postId,
        success:function(){
            
        }
    })
})

//获取网站配置信息
$.ajax({
   type:'get',
   url:'/settings',
   success:function(response){
       review = response.review;
       //判断是否开启评论功能
       if(response.comment){
          var html = template('commentTpl');
          $('#comment').html(html)  
       }
   }
});

//提交评论表单
$('#comment').on('submit','form',function(){
    var content =  $(this).find('textarea').val();
    //判断评论是否要经过人工审核
    if(review){
        state = 0;
    }else{
        state = 1;
    }
    var data = {content:content,
        post:postId,
        state:state}
        console.log(data)
        $.ajax({
            type:'post',
            url:'/comments',
            data:data,
            success:function(response){
                console.log(response)
                alert('评论成功')
                location.reload();
            },
            error:function(response){
                console.log(response)
                alert('评论失败')
            } 
        })
    return false; 
})