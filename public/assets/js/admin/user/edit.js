'use strict';

define(['ui', '../../apis/user', 'bootstrapValidator', 'jquery.serializeObject'], function (require, exports, module) {
  require('bootstrapValidator');
  require('jquery.serializeObject');

  var UI = require('ui');
  var User = require('../../apis/user');

  $('form').formValidation({
    autoFocus: true,
    framework: 'bootstrap',
    icon: {
      valid: false,
      invalid: false,
      validating: 'fa fa-refresh'
    },
    row: {
      valid: 'has-success'
    },
    fields: {
      'name': {
        validators: {
          notEmpty: {
            message: '姓名不能为空'
          }
        }
      },
      'phone': {
        validators: {
          notEmpty: {
            message: '手机号码不能为空'
          },
          phone: {
            country: 'countrySelectBox',
            message: '手机号码格式不正确'
          }
        }
      },
      'email': {
        validators: {
          notEmpty: {
            message: 'Email不能为空'
          },
          regexp: {
            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
            message: 'Email格式不正确'
          }
        }
      },
      'qq': {
        validators: {
          digits: {
            message: 'QQ号码只能包含数字'
          }
        }
      }
    }
  }).on('change', '[name="countrySelectBox"]', function (e) {
    $('form').formValidation('revalidateField', 'phone');
  }).on('success.form.fv', function (e) {
    e.preventDefault();

    var $form = $(e.target),
        fv = $form.data('formValidation');

    var data = $('form').serializeObject();

    var id = $('#data_user_id').val();

    if (id) {
      User.update(id, data).then(function (res) {
        if (res && res.id) {
          UI.alert({
            message: '成员信息更新成功~'
          }).then(function () {
            window.location.href = '/admin/users';
          });
        } else {
          UI.alert('成员信息更新失败，请稍后再试~');
        }
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('成员信息更新失败，请稍后再试~');
        }
      });
    } else {
      User.create(data).then(function (res) {
        if (res && res.id) {
          UI.alert({
            message: '成员信息添加成功~'
          });
        } else {
          UI.alert('成员信息添加失败，请稍后再试~');
        }
      }).catch(function (err) {
        if (err && err.message) {
          UI.alert(err.message);
        } else {
          UI.alert('成员信息添加失败，请稍后再试~');
        }
      });
    }
  });
});