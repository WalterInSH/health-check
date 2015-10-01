$(document).ready(function() {
    $('select').material_select();
});

$('#create').click(function () {
    var title = $('#title').val();
    var address = $('#url').val();
    var frequency = $('#frequency').find(':selected').val();

    var param = {
        title:title,
        address: address,
        frequency:frequency
    }

    $.post('/admin/new-checker', param).done(function(data){
        console.log("su")
    });
});
