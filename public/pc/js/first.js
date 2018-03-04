/**
 * Created by 鑫 on 2018/3/4.
 */
$(function () {
  var page =1;
  var pageSize = 3;

  function render() {
    $.ajax({
       type : 'get',
        url : '/category/queryTopCategoryPaging',
        data : {
          page : page,
          pageSize : pageSize
        },
      success : function (info) {
        $('tbody').html(template('tmp',info));

        $('#pagenation').bootstrapPaginator({
          bootstrapMajorVersion : 3,
          currentPage : page,
          totalPages : Math.ceil(info.total / info.size),
          onPageClicked : function (a,b,c,p) {
            page = p;
            render();
          }
        })
      }
    })
  }
  render()

//  添加分类
  $('.btn-add').on('click',function () {
      $('#firstModal').modal('show')
  })

  var $form = $('form');
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      categoryName: {
        validators:{
          notEmpty:{
            message:'一级分类的名称不能为空'
          }
        }
      }
    }
  })

  $form.on('success.form.bv',function (e) {
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      data:$form.serialize(),
      success:function (info) {
        console.log(info);
        $("#firstModal").modal("hide");

        //重置表单的样式和内容
        $form.data("bootstrapValidator").resetForm(true);

        //重新渲染第一页
        page = 1;
        render();
      }
    })
  })

})

