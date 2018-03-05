/**
 * Created by 鑫 on 2018/3/5.
 */
$(function () {
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function (info) {
      $('.category').html(template('tmp-cate',info));

      render(info.rows[0].id);
    }
  });

  $('.category').on('click','li',function () {
      $(this).addClass('now').siblings().removeClass('now');
    var id = $(this).data('id');
    render(id);

    mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,300);
  });

  function render(id) {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data: {
        id:id
      },
      success:function (info) {
        $(".cate-con").html( template("tmp-cate-con", info) );
      }
    })
  }
})