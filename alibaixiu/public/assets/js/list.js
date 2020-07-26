//获取地址中的id参数
 var categoryId = getUrlParams('categoryId');
 //根据id获取文章列表
 $.ajax({
     type:'get',
     url:'/posts/category/'+categoryId,
     success:function (response){
        var html = template('listTpl',{data:response});
        $('#listBox').html(html)
     }
 });
 //获取分类详情数据
 $.ajax({
     type:'get',
     url:'/categories/'+categoryId,
     success:function(response){
         $('#categoryTitle').html(response.title)
     }
 })
