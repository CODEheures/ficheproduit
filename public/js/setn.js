$(document).ready(function () {

    //gestion du menu
    function menu($isMenuHamburger) {
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

        if ($isMenuHamburger) {
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
            $phoneLocation.hide();

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
    function tabs($isTabHamburger) {
        var $tabSelectors = $('.tab-selector');


        //unbind des clicks dans le cas du on resize
        $tabSelectors.off();


        if($isTabHamburger) {
            $('.tabs').find('.tab').hide();
            $tabSelectors.removeClass('active');
            $tabSelectors.find('img:not(.note)').each(function () {
                $(this).attr('src', '/css/assets/plus.png');
            });
        } else {
            var $data = $('.tab-selector.active').data('tab');
            if ($data) {
                $('#' + $data).show();
            } else {
                var $firstTab = $('.tab-selector:first-of-type');
                $data = $firstTab.data('tab');
                $firstTab.addClass('active');
                $('#' + $data).show();
            }
        }


        $tabSelectors.each(function () {
            var $tabLink = $(this);
            $(this).click(function (e) {
                e.preventDefault();
                var $data = $tabLink.data('tab');
                //cas 1: menu tabs type hamburger le clic ouvre et ferme le tab
                if($isTabHamburger) {
                    if($tabLink.hasClass('active')) {
                        //on desactive et on ferme le tab
                        console.log('ici');
                        $tabLink.removeClass('active');
                        $tabLink.find('img:not(.note)').each(function () {
                            $(this).attr('src', '/css/assets/plus.png');
                        });
                        $('#' + $data).slideUp();
                    } else {
                        //on desactive et on ferme tous les tabs
                        $tabSelectors.removeClass('active');
                        $tabSelectors.find('img:not(.note)').each(function () {
                            $(this).attr('src', '/css/assets/plus.png');
                        });
                        $('.tab:not(#' + $data + ')').slideUp();
                        //on active et on ouvre le tab
                        $tabLink.addClass('active');
                        $tabLink.find('img:not(.note)').attr('src', '/css/assets/moins.png');
                        $('#' + $data).slideDown();
                    }
                //cas 2: tabs non hamburger le clic ne desactive et ne referme jamais le tab
                } else {
                    $tabSelectors.removeClass('active');
                    $tabSelectors.find('img:not(.note)').each(function () {
                        $(this).attr('src', '/css/assets/plus.png');
                    });
                    $('.tab:not(#' + $data + ')').hide();
                    $tabLink.addClass('active');
                    $tabLink.find('img:not(.note)').attr('src', '/css/assets/moins.png');
                    $('#' + $data).show();
                }
            })
        });
    }

    function isTabHamb() {
        return ($('.tabs .selectors').css('flex-direction') === 'column');
    }



    function main() {
        var $isMenuHamburger = isMenuHamb();
        var $isTabHamburger = isTabHamb();
        menu($isMenuHamburger);
        tabs($isTabHamburger);
        $(window).resize(function () {
            if ($isMenuHamburger !== isMenuHamb()) {
                $isMenuHamburger = isMenuHamb();
                menu($isMenuHamburger);
            }
            if ($isTabHamburger !== isTabHamb()) {
                $isTabHamburger = isTabHamb();
                tabs($isTabHamburger);
            }
        });
    }

    var $flagHtmlForDesktopOk = false;
    main();
});