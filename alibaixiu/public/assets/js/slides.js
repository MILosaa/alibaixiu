//选择文件
$('#file').on('change',function(){
    var file = this.files[0];
    var formDate = new FormData();
    formDate.append('image',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formDate,
        processData:false,
        contentType:false,
        success:function(response){
            $('#image').val(response[0].image)
        }
    })
});
//提交轮播图事件
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
})
//获取图片轮播列表数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(response){
        var html = template('slidesTpl',{data:response});
        $('#slidesBox').html(html);
    }
});
//删除事件
$('#slidesBox').on('click','.delete',function(){
    if(confirm('删除确认')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/slides/'+id,
            success:function(){
                location.reload();
            }
        })
    }
})