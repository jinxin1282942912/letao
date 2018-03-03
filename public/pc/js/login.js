/**
 * Created by 鑫 on 2018/3/3.
 */
$(function () {
  $("form").bootstrapValidator({

    fields: {
      username:{
        validators:{
          notEmpty: {
            message: '用户名不能为空'
          },
          stringLength:{
            min:2,
            max:8,
            message:'长度应该在2-8位'
          },
          callback: {
            message:'用户名错误'
          }

        }

      },

      password: {
        validators:{
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'密码长度应该是6-12位'
          },
          callback: {
            message:'密码错误'
          }

        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  });

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    $.ajax({
      type:'post',
      url:"/employee/employeeLogin",
      data: $("form").serialize(),
      dataType:'json',
      success:function (info) {

        if(info.error === 1000) {
          //把username这个字段改成校验失败
          $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }

        if(info.error === 1001) {
          $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
        }

        if(info.success) {
          location.href = "index.html";
        }
      }
    })
  });

  $("[type='reset']").on("click", function () {

    $("form").data("bootstrapValidator").resetForm(true);

  });
})
