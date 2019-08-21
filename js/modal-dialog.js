// ModalDialog
(function ($) {
    "use strict";

    $.ModalDialog = function (options) {
        options = $.extend({}, defaults, options)

        let easyCloseString = "",
            easyCloseClass = "close";
        
        if (!options.easy_close) {
            easyCloseString = "data-keyboard='false' data-backdrop='static'";
            easyCloseClass = "close d-none";
        }

        let modal = $([
            "<div class='modal fade in' ", easyCloseString," >",
            "    <div class='modal-dialog'>",
            "        <div class='modal-content ", options.modal_class, "'>",
            "            <div class='modal-header ", options.header_class, "' id='modal-header-js'>",
            "                <h6 class='modal-title ", options.title_class , "'>",
            options.title,
            "                </h6>",
            "                <button type='button' class='", easyCloseClass ,"' id='modal-dialog-close' data-dismiss='modal'>",
            "                    <span aria-hidden='true'>&times;</span>",
            "                    <span class='sr-only'>",
            options.close_button_text,
            "                    </span>",
            "                </button>",
            "            </div>",
            "            <div class='modal-body ", options.modal_body_class, "' id='modal-body-js' style='word-break: break-word;'>",
            options.modal_body,
            "            </div>",
            "            <div class='modal-footer ", options.footer_class, "' id='modal-footer-js'>",
            "                <button type='button' class='btn ", options.primary_button_class ," btn-default' id='btn-primary-js-modal'>",
            "                    <i class='fa fa-", options.primary_fa, "  fa-fw' id='btn-primary-js-modal-fa'></i>&nbsp;",
            options.primary_button_text,
            "                </button>",
            "                <button type='button' class='btn ", options.secondary_button_class," ' id='btn_secondary_js_modal'",
            "                                data-dismiss='modal'>",
            "                    <i class='fa fa-", options.secondary_fa, "  fa-fw'></i>&nbsp;",
            options.secondary_button_text,
            "                </button>",
            "            </div>",
            "        </div>",
            "    </div>",
            "</div>"
            ].join("")),
            done = false,
            primaryButton = $('#btn-primary-js-modal', modal),
            secondaryButton = $('#btn_secondary_js_modal', modal);



        primaryButton.on("click", function () {
            var event = $.Event("js.modal.primary.button.click");
            modal.trigger(event);
            done = true;
            modal.remove();
            $('.modal-backdrop').remove();
        });


        secondaryButton.on("click", function () {
            var event = $.Event("js.modal.secondary.button.click");
            modal.trigger(event);
            modal.remove();
            $('.modal-backdrop').remove();
        })

        // On Hide
        $(modal).on('hidden.bs.modal', function () {
            modal.remove();
        })

        // On Shown
        $(modal).on('shown.bs.modal', function () {
            var event = $.Event("js.modal.shown");
            modal.trigger(event);
        });


        $(document.body).append(modal);
        modal.modal();

        // Remove secondary button if set to null
        if (!options.secondary_button_text) {
            $('#btn_secondary_js_modal').remove()
        }

        return modal;
    };

    var defaults = {
        "modal_class": null,
        "header_class": "bg-primary",
        "title": "Modal Dialog",
        "title_class": null,
        "close_button_text": "",
        "primary_button_text": "OK",
        "primary_button_class": "btn-success",
        "primary_fa": "check",
        "secondary_button_text": null,
        "secondary_button_class": "btn-success",
        "secondary_fa": "window-close",
        "modal_body": "",
        "modal_body_class": null,
        "footer_class": null,
        "easy_close": false
    };

})(jQuery);
