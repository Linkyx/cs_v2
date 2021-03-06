'use strict';

define(['ui', '../../apis/user', 'jquery.serializeObject'], function (require, exports, module) {
  require('jquery.serializeObject');

  var UI = require('ui');
  var User = require('../../apis/user');

  $('#selectForm .form-control').on('change', function (e) {
    window.location.href = '/admin/users?' + $(this).attr('name') + '=' + $(this).val();
  });

  $('table tbody .btn-delete').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    var id = $(this).data('id');
    var $row = $(this).parents('tr');
    User.delete(id).then(function () {
      UI.alert({
        message: '成员信息删除成功~'
      }).then(function () {
        $row.remove();
      });
    }).catch(function (err) {
      if (err && err.message) {
        UI.alert(err.message);
      } else {
        UI.alert('成员信息删除失败，请稍后再试~');
      }
    });
  });
});