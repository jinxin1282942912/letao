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
    $(".header").toggleClass("now");
  })

//  退出功能
  $('.icon-logout').on('click',function () {
    $("#logoutModal").modal("show");

  })

  $('.btn-logout').on('click',function () {
    $.ajax({
      type:'GET',
      url:'/employee/employeeLogout',
      success:function (info) {
        if(info.success) {
          location.href = "login.html";
        }
      }
    })
  })

  if(location.href.indexOf("login.html") == -1){
    $.ajax({
      type:"GET",
      url:"/employee/checkRootLogin",
      success:function (info) {
        console.log(info);
        if(info.error === 400) {
          location.href = "login.html";
        }
      }
    })
  }
})