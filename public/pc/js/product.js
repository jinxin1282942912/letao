/**
 * Created by 鑫 on 2018/3/6.
 */
$(function () {
  var page = 1;
  var pageSize=3;
  var result=[];

  function render() {
    $.ajax({
      type: 'get',
      url: "/product/queryProductDetailList",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        //console.log(info); aa
        $("tbody").html(template("tmp1", info));

        //渲染分页
        $("#pagenation").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          size:"normal",

          //itemTexts这个回调函数会给每一个按钮都执行一次，返回值就是每一个按钮显示的内容
          //type:指每个按钮的类型   首页-first  上一页-prev  页码-page  下一页-next 最后一个-last
          //page:指的是每个按钮对应的页码值
          itemTexts: function (type, page, current) {


            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
                return "第"+page+"页";
            }
          },
          tooltipTitles: function (type, page, current) {
            //console.log(type, page, current);
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              default:
                return "第"+page+"页";
            }
          },
          useBootstrapTooltip:true,
          onPageClicked: function (a, b, c, p) {
            page = p;
            render();
          }
        });

      }
    });
  }

  render();

  $('.btn-add').on('click',function () {
    $('#productModal').modal('show');

    $.ajax({
      type:'get',
      url:"/category/querySecondCategoryPaging",
      data: {
        page:1,
        pageSize:100
      },
      success: function (info) {
        console.log(info);
        $(".dropdown-menu").html( template("tmp2", info) );
      }
    })
  });

  $('.dropdown-menu').on('click','a',function () {
      $('.dropdown-text').text($(this).text());

    $("[name='brandId']").val( $(this).data("id") );

    $("form").data("bootstrapValidator").updateStatus("brandId", "VALID");
  });

  $("#fileupload").fileupload({
    dataType:'json',
    done: function (e, data) {

      if(result.length >= 3){
        return;
      }

      var pic = data.result.picAddr;

      $(".img-box").append('<img src="'+pic+'" width="100" height="100" alt="">');

      result.push(data.result);

      if(result.length === 3) {
        $("form").data("bootstrapValidator").updateStatus("productLogo", "VALID");
      }else {
        $("form").data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }

    }
  });

  $("form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{

      brandId:{
        validators:{
          notEmpty:{
            message:"请选择品牌"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入一个有效的商品库存"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入一个合法的尺码（例如32-44）"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          }
        }
      },
      productLogo: {
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
    },
    excluded:[]
  });

  $("form").on("success.form.bv", function (e) {
    e.preventDefault();

    var param = $('form').serialize();

    param += "&picName1="+result[0].picName + "&picAddr1="+result[0].picAddr;
    param += "&picName2="+result[1].picName + "&picAddr2="+result[1].picAddr;
    param += "&picName3="+result[2].picName + "&picAddr3="+result[2].picAddr;

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data: param,
      success:function (info) {
        if(info.success) {
          $("#productModal").modal('hide');
          page = 1;
          render();

          $("form").data("bootstrapValidator").resetForm(true);
          $(".dropdown-text").text("请选择二级分类");
          $(".img-box img").remove();

          result = [];
        }
      }
    })
  });


})