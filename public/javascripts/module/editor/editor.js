var editor = new MediumEditor('#editor',{
    placeholder: false
});

$('.datepicker').pickadate({
    format: 'yyyy-mm-dd',
    selectMonths: true,
    selectYears: 15
});

$(document).ready(function() {
    $('select').material_select();
});

$('#create').click(function () {
    var title = $('#title').val();
    var address = $('#address').val();
    var time = $('#time').val();
    var frequency = $('#frequency').find(':selected').val();
    var memberLimit = $('#memberLimit').find(':selected').val();
    var content = editor.serialize().editor.value;

    var param = {
        title:title,
        address: address,
        time: time,
        frequency:frequency,
        memberLimit:memberLimit,
        content:content
    }

    $.post('/admin/new_event', param).done(function(data){
        console.log("su")
    });
});
