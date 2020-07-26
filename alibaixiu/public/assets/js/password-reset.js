$('#modifyForm').on('submit',function(){
    var forData = $(this).serialize();
    $.ajax({
        type:'put',
        url:'/users/password',
        data:forData,
        success:function(){
            location.href="/admin/login.html"
        }
    });
    return false;
});