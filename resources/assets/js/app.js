/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// Bind variables to window object
import 'expose-loader?$!expose-loader?jQuery!jquery';
import 'expose-loader?routes!../../../public/assets/js/routes';

// Mouse interaction
import 'jquery-mousewheel';
import 'jquery-slimscroll';

// Bootstrap
import 'bootstrap-sass';
import 'bootstrap-notify';

// Pickers
import 'timepicker';
import 'datepair.js';
import 'bootstrap-datepicker';
import 'bootstrap-colorpicker';
import 'fontawesome-iconpicker';
import 'bootstrap-daterangepicker';
import 'datepair.js/src/jquery.datepair';
import './vendor/bootstrap-popover-picker';

// Misc
import 'select2';
import './vendor/pace';
import './vendor/slugify';
import Dropzone from 'dropzone';
import './vendor/jquery.validation';
import 'expose-loader?moment!moment';
import 'expose-loader?implicitForms!./vendor/jquery.implicitforms';

// Translations
import Lang from './vendor/lang';
import messages from '../../../public/assets/js/messages';
window.Lang = new Lang({ messages });

// Theme
import 'admin-lte';

import Turbolinks from 'turbolinks';
Turbolinks.start();

Dropzone.options.mediaDropzone = {
    parallelUploads: 1,
    init: function() {
        this.on('error', function(file, response) {
            $(file.previewElement)
                .find('.dz-error-message')
                .text(response.errors.file[0]);
        });

        this.on('queuecomplete', function(file) {
            location.reload();
        });
    },
};

window.addEventListener('turbolinks:load', function() {

    // Color Picker
    $('.color-picker').colorpicker();

    // Icon Picker
    $('.icon-picker').iconpicker();

    // Style Picker
    $('.style-picker').picker({
        templates: {
            pickerItem: '<div class="picker-item"><i class="hidden"></i></div>',
        },
        selectedCustomClass: 'fa fa-check',
        items: [
            'bg-red',
            'bg-yellow',
            'bg-aqua',
            'bg-blue',
            'bg-light-blue',
            'bg-green',
            'bg-navy',
            'bg-teal',
            'bg-olive',
            'bg-lime',
            'bg-orange',
            'bg-fuchsia',
            'bg-purple',
            'bg-maroon',
            'bg-black',
        ],
    });

    // Linkable tabs
    let popState = false;
    let tabUrl = document.location.toString();

    // Match tab URL on first load
    if (tabUrl.match('#') && tabUrl.match(/\-tab/gi)) {
        $('.nav-tabs a[href="#' + tabUrl.split('#')[1] + '"]').tab('show');
    }

    // Match tab URL on back/forward
    window.onpopstate = function(e) {
        popState = true;
        tabUrl = document.location.toString();

        if (tabUrl.match('#') && tabUrl.match(/\-tab/gi)) {
            $('.nav-tabs a[href="#' + tabUrl.split('#')[1] + '"]').tab('show');
        }
    };

    // Save history on tab show
    $('.nav-tabs a').on('shown.bs.tab', function(e) {
        if (window.history.pushState && !popState) {
            history.pushState(null, null, e.target.hash);
        }

        popState = false;
    });

    // Slugify
    $('[data-slugify]').on('input', function(e) {
        if ($($(this).data('slugify')).val().length === 0) {
            $(this).on('keyup', function() {
                let input = $(this).data('slugify');
                let slug = $(this)
                    .val()
                    .slugify();
                $(input).val(slug);
            });
        }
    });

    // Bind Select2 menus
    $('.select2').select2({
        placeholder: 'Select Option',
    });

    // Configure datepicker
    $('.datepicker').attr('readonly', true);
    $('.datepicker').daterangepicker({
        autoApply: true,
        showDropdowns: true,
        singleDatePicker: true,
        locale: { format: 'YYYY-MM-DD' },
    });

    $('.datepicker').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('YYYY-MM-DD'));
    });

    $('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    // Handle file uploads inputs
    $('.file-name').on('click', function() {
        $(this)
            .parents('.input-group')
            .find(':file')
            .trigger('click');
    });

    $(':file').on('change', function() {
        let input = $(this);
        let numFiles = input.get(0).files ? input.get(0).files.length : 1;
        let label =
            numFiles > 1
                ? numFiles + ' files selected'
                : input
                      .val()
                      .replace(/\\/g, '/')
                      .replace(/.*\//, '');

        $(this)
            .parents('.input-group')
            .find(':text')
            .val(label);
    });

    // Handle dynamic form fields
    $(document)
        .on('click', '.btn-add', function(e) {
            e.preventDefault();

            // Initialize required variables
            let controlForm = $('#attributes-tab');
            let currentEntry = $(this).parents('.entry:first');
            let newEntry = $(currentEntry.clone()).appendTo(controlForm);

            // Remove error message & style
            newEntry
                .removeClass('has-error')
                .find('.help-block')
                .remove();
            newEntry.find('input').val('');

            // Replace add/remove buttons
            controlForm
                .find('.entry:not(:last) .btn-add')
                .removeClass('btn-add')
                .addClass('btn-remove')
                .removeClass('btn-success')
                .addClass('btn-danger')
                .html('<span class="glyphicon glyphicon-minus"></span>');
        })
        .on('click', '.btn-remove', function(e) {
            e.preventDefault();
            $(this)
                .parents('.entry:first')
                .remove();
        });

    $('#delete-confirmation').on('show.bs.modal', function(event) {
        // Initialize implicit forms
        implicitForms.initialize();

        var button = $(event.relatedTarget); // Button that triggered the modal
        var modalBody = button.data('modal-body');
        var modalTitle = button.data('modal-title');
        var modalAction = button.data('modal-action');

        var modal = $(this);
        modal.find('.modal-body').html(modalBody);
        modal.find('.modal-title').html(modalTitle);
        modal.find('.btn-danger').attr('href', modalAction);
    });

    // Build countries select menu
    function formatCountry(country_code) {
        if (!country_code.id) {
            return country_code.text;
        }

        var $country = $(
            '<span style="padding-right: 10px">' +
                country_code.emoji +
                '</span>' +
                '<span>' +
                country_code.text +
                '</span>'
        );

        return $country;
    }

    $("select[name='country_code']")
        .select2({
            placeholder: 'Select a country',
            templateSelection: formatCountry,
            templateResult: formatCountry,
            data: window.countries ? window.countries : [],
        })
        .val(window.selectedCountry ? window.selectedCountry : '')
        .trigger('change');
});
