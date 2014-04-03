$(document).ready(function () {

    'use strict';

    var $response = $('.response'),
        $forms = $('.forms'),
        appendResponse;

    appendResponse = function (jqXHR, css) {
        var json, html;
        json = JSON.stringify(jqXHR.responseJSON, null, '  ');
        html = '<div class="' + css + '">'
            + jqXHR.status + ' : '
            + json.replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;')
            + '</div>';
        $response.prepend(html);
    };

    $forms.find('form').each(function () {
        var $form = $(this);
        $form.on('submit', function (event) {
            event.preventDefault();
            $.ajax({
                type: $form.attr('method').toUpperCase(),
                url: $forms.data('url') + $form.attr('action'),
                crossDomain: true,
                data: $form.serialize()
            }).done(function (data, textStatus, jqXHR) {
                appendResponse(jqXHR, 'done');
            }).fail(function (jqXHR) {
                appendResponse(jqXHR, 'fail');
            });
        });
    });
});
