$(document).ready(function () {

    //gestion du menu
    function menu($isHamburger) {
        //liste des variables utiles
        var $mainMenu = $('ul.primary');
        var $map = $('.map');
        var $phoneLocation = $('.phone-location');
        var $hamburgerLink = $('.hamburger a');
        var $primaryLinks = $mainMenu.children('li').children('a');
        var $menuLinks = $('.menu-link');
        var $desktopMenu = $('div.desktopMenu');

        //unbind des clicks dans le cas du on resize
        $hamburgerLink.off();
        $menuLinks.off();

        //on cache tout
        $mainMenu.find('li').hide();
        $mainMenu.removeClass('active');

        if ($isHamburger) {
            //si la version desktop du menu existe on la cache et on affiche la version hamburger
            if ($flagHtmlForDesktopOk) {
                $desktopMenu.hide();
            }

            //init du hamburger
            $mainMenu.find('li').removeClass('active');
            var $hamburgerImg = $hamburgerLink.children('img');
            $hamburgerImg.attr("src", '/css/assets/burger-close.svg');
            $map.hide();
            $phoneLocation.hide();
            $hamburgerLink.click(function () {
                $mainMenu.toggleClass('active');
                if (!$mainMenu.hasClass('active')) {
                    $mainMenu.find('li').each(function () {
                        $(this).removeClass('active');
                        $(this).slideUp();
                    });
                    $map.slideUp();
                    $phoneLocation.slideUp();
                    $hamburgerImg.attr("src", '/css/assets/burger-close.svg');
                } else {
                    $mainMenu.children('li').slideDown();
                    $map.slideDown();
                    $phoneLocation.slideDown();
                    $hamburgerImg.attr("src", '/css/assets/burger-open.svg');
                }
            });
            $menuLinks.each(function () {
                //on capte le li
                var $menuLinkLi = $(this).parent();
                $(this).click(function (e) {
                    e.preventDefault();

                    //1°) replier tous les li des freres et remove class active de tous leurs li
                    $menuLinkLi.siblings().removeClass('active');
                    $menuLinkLi.siblings().find('li').each(function () {
                        $(this).removeClass('active');
                        $(this).slideUp();
                    });

                    //2°) pour le lien de menu cliqué selon activation ou desactivation
                    if (!$menuLinkLi.hasClass('active')) {
                        //s'il est pas actif je le rend actif et je deplie son enfant ul
                        $menuLinkLi.addClass('active');
                        $menuLinkLi.find('li').hide();
                        $menuLinkLi.children('ul').children('li').slideDown();
                    } else {
                        //s'il est actif je le desactive et je repli tous les enfants li que je desactive aussi
                        $menuLinkLi.removeClass('active');
                        $menuLinkLi.find('li').each(function () {
                            $(this).removeClass('active');
                            $(this).slideUp();
                        });
                    }
                })
            });
        } else {
            //En desktop on affiche les liens du menu et le lien map
            $mainMenu.children('li').show();
            $map.show();

            //on clone 1 seule fois les elements ul.secondary dans le menu desktop
            if (!$flagHtmlForDesktopOk) {
                $primaryLinks.each(function () {
                    var $data = $(this).data('menu');
                    var $ul = $(this).siblings('ul.secondary').clone();
                    $ul.attr('id', $data);
                    $desktopMenu.children('.container').append($ul);
                });
            }
            $flagHtmlForDesktopOk = true;
            $desktopMenu.show();
            $desktopMenu.find('li').hide();

            //Evenements des clicks sur les liens primaires
            $primaryLinks.each(function () {
                var $menuLinkLi = $(this).parent();
                $(this).click(function (e) {
                    e.preventDefault();
                    var $data = $(this).data('menu');
                    $menuLinkLi.siblings().removeClass('active');
                    $desktopMenu.find('ul:not(#'+$data+')').find('li').slideUp();
                    $menuLinkLi.toggleClass('active');
                    $('#'+$data).find('li').slideToggle();
                })
            });
        }
    }

    function isMenuHamb() {
        return !($('.hamburger').css('display') === 'none');
    }

    //gestion des tabs
    $('.tab-selector').each(function () {
        var $tabLink = $(this);
        $(this).click(function (e) {
            e.preventDefault();
            $('.tab-selector').removeClass('active');
            $tabLink.addClass('active');
            var $data = $tabLink.data('tab');
            $('.tab').hide();
            $('#' + $data).show();
        })
    });


    function main() {
        var $isHamburger = isMenuHamb();
        menu($isHamburger);

        $(window).resize(function () {
            if ($isHamburger !== isMenuHamb()) {
                $isHamburger = isMenuHamb();
                menu($isHamburger);
            }
        });
    }

    var $flagHtmlForDesktopOk = false;
    main();
});