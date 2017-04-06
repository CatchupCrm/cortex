
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// Bind variables to window object
window.$ = window.jQuery = require('jquery');
window.routes = require('./routes');
window.moment = require('moment');

// Populate pace object
const pace = require('./vendor/pace');

require('bootstrap-sass');
require('moment-timezone');
require('bootstrap-notify');
require('bootstrap-daterangepicker');
require('./vendor/jquery.chained');
require('jquery-slimscroll');
require('datatables.net');
require('datatables.net-bs');
require('datatables.net-buttons');
require('datatables.net-buttons-bs');
require('datatables.net-buttons/js/buttons.html5');
require('datatables.net-buttons/js/buttons.colVis');
require('./vendor/datatables.net-buttons.server-side');
require('datatables.net-responsive');
require('datatables.net-responsive-bs');
require('datatables.net-keytable');
require('select2');
require('icheck');
require('admin-lte');

$(function () {
    // Bind Select2 menus
    $('.select2').select2({
        placeholder: "Select Option"
    });

    $('.datepicker').attr('readonly', true);
    $('.datepicker').daterangepicker({
        autoApply: true,
        showDropdowns: true,
        singleDatePicker: true,
        locale: {format: 'YYYY-MM-DD'},
    });

    // Custom Datatables length change select menu
    oTable = $('#dataTableBuilder').DataTable();
    $('#dataTableBuilderLengthChanger').on('change.DT', function () {
        oTable.page.len($(this).val()).draw();
    });
});
