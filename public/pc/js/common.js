/**
 * Created by 鑫 on 2018/3/3.
 */
$(function () {
  //禁用进度环
  NProgress.configure({
    showSpinner: false
  })

  $(document).ajaxStart(function () {
    //进度条加载效果
    NProgress.start();
  });

  $(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    }, 500);
  });

//  二级菜单显示与隐藏
  $(".second").prev().on('click',function () {
    $(this).next().slideToggle();
  })

//  侧边栏的显示与隐藏
  $('.icon-menu').on('click',function () {
    $('.lt-aside').toggleClass('now');
    $('.lt-main').toggleClass('now');
  })
})