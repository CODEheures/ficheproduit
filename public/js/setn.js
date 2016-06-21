$(document).ready(function () {

    //gestion du menu
    $('.menu').hide();
    $('.main-menu').each(function () {
        var $menuLink = $(this);
        $(this).click(function (e) {
            e.preventDefault();
            $('.main-menu').parent().removeClass('active');
            $menuLink.parent().addClass('active');
            var $data = $menuLink.data('menu');
            $('.menu:not(#menu-'+$data+')').hide();
            $('#menu-'+$data).slideToggle();
        })
    });

    //gestion des tabs
    $('.tab-selector').each(function () {
        var $tabLink = $(this);
        $(this).click(function (e) {
            e.preventDefault();
            $('.tab-selector').removeClass('active');
            $tabLink.addClass('active');
            var $data = $tabLink.data('tab');
            $('.tab').hide();
            $('#'+$data).show();
        })
    })

});