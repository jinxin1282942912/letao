/**
 * Created by 鑫 on 2018/3/4.
 */
$(function () {
  var page=1;
  var pageSize=5;

  function render() {
    $.ajax({
      type : 'get',
      url : '/user/queryUser',
      data : {
        page : page,
        pageSize : pageSize
      },
      success : function (info) {
        console.log(info);
        $('tbody').html(template('tmp',info))

        $('#pagenation').bootstrapPaginator({
          bootstrapMajorVersion : 3,
          currentPage : page,
          totalPages : Math.ceil(info.total/info.size),
          numberOfPages : 5,
          onPageClicked : function (a,b,c,p) {
              page = p;
            render();
          }
        })
      }

    })
  }
  render();

  $('tbody').on('click','.btn',function () {
    $('#userModal').modal('show');

    var id = $(this).parent().data('id');
    var isDelete = $(this).hasClass('btn-success')?1:0;

    $('.btn-confirm').off().on('click',function () {
      console.log(1);
      $.ajax({
        type:'post',
        url:'/user/updateUser',
        data:{
          id : id,
          isDelete : isDelete
        },
        success : function (info) {
         if(info.success){
           $("#userModal").modal('hide');
           render();
         }
        }
      })
    })
  })
})