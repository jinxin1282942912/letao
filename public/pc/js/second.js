/**
 * Created by 鑫 on 2018/3/6.
 */
$(function () {
    var page =1 ;
  var pageSize =5 ;

  function render() {
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function (info) {
        $('tbody').html(template('tmp-tr',info))

        $('#pagenation').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function (a,b,c,p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render();

  $('.btn-add').on('click',function () {
      $('#secondModal').modal('show');

    $.ajax({
      type:'GET',
      url:"/category/queryTopCategoryPaging",
      data: {
        page:1,
        pageSize:100
      },
      success:function (info) {
        console.log(info);

        $(".dropdown-menu").html( template("tmp-li",info) );
      }
    });
  })

  $('.dropdown-menu').on('click','a',function () {
      var text = $(this).text();
    $('.dropdown-text').text(text);
    var id = $(this).parent().data('id');
    $('[name="categoryId"]').val(id);

    $('form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })

  $('#fileupload').fileupload({
    dataType:'json',
    done:function (e,data) {
      var pic=data.result.picAddr;
      $('.img-box img').attr('src',pic);

      $('[name="brandLogo"]').val(pic)

      $('form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");

    }
  })

  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一级分类'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'请输入品牌的名称'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传品牌的图片'
          }
        }
      }
    },
    excluded:[]
  });

  $('form').on('success.form.bv',function (e) {
    e.preventDefault();

    $.ajax({
      type:'POST',
      url:"/category/addSecondCategory",
      data: $('form').serialize(),
      success:function (info) {
        if(info.success) {
          //关闭模态框
          $("#secondModal").modal("hide");
          //重新渲染第一页
          page = 1;
          render();
          $('form').data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择一级分类");
          $(".img-box img").attr("src", "images/none.png");
        }
      }
    })
  })




})