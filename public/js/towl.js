var csrftoken = "";



function fbLogoutUser() {
    FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
            //console.log("pass fblogout")
            FB.logout(function(response) {

            });
        }
    });
}
<!-- FB  javascript-->


function user_logout_send(){
    $.ajax({
        url: "/logout/",
        type: "POST",
        dataType: "json",
        success: function (data) {

        }
    });
}



function logout(access_token){
    fbLogoutUser();
    if(access_token != undefined || access_token != null){
        console.log("pass")
        console.log(access_token)
        disconnectUser(access_token);
    }
    else {
        $.ajax({
            url: "/get_access_token/",
            type: "POST",
            dataType: "json",
            data: {
                user_id: $("#id_user_id").val()
            },
            success: function (data) {
                console.log(data.data.access_token)
                if (data.status == "success") {
                    var access_token = data.data.access_token;
                    if (access_token != "") {
                        disconnectUser(access_token);

                    }

                }
            }

        }).done(function(){setTimeout("location.href='/index/'", 1000);});

    }
    user_logout_send();
}
<!-- google+  javascript end -->


function drop_out(){
        fbLogoutUser();
}


function open_sign_up(){
        $("#login").hide("fast");
        $('#sign_up').addClass('in');
        $('#sign_up').show("fast");
}



$(function(){
    $('p').wordBreakKeepAll();
    var $navbarScroll = $("#navbar-scroll");

    if($("#ideas-navbar-scroll").length > 0){
        $navbarScroll = $("#ideas-navbar-scroll");
    }
    //var time = 10;
//    if($(window).width()>767) {
//        $(document).scroll(function(){
//            var scrollTop = $(this).scrollTop();
//
//            if(scrollTop<=20) {
//                //$navbarScroll.fadeOut(time);
//                //$navbarScroll.fadeTo(time, 0.10);
//                //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
//                $("#navbar-scroll").addClass("class_top");
//                //$("#ideas-navbar-scroll").addClass("class_top")
//
//            }
//            else {
//                //$navbarScroll.fadeIn(time, 0.99);
//                //$navbarScroll.fadeTo(time, 1);
//                //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
//                $("#navbar-scroll").removeClass("class_top");
//                //$("#ideas-navbar-scroll").removeClass("class_top")
//                //console.log("ASDF")
//            }
//        });
//    }else {
//        $navbarScroll.show();
//    }

    $('#scroll-to-top, #scroll-to-top-logo').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 750);
        return false;
    });


    $(window).resize(resizeWindow);
    function resizeWindow() {
        var height = $(window).height();
        $(".full-screen").height(height);
        $(".full-screen .section").height(height);
		$(".full-screen .section .full").height(height);
    }
    resizeWindow();

    $('.smooth-scroll').onePageNav();

});



//페이스북
function goFacebook(url, id) {
    window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+url+id,
        'facebook-share-dialog',
        'width=800,height=600');
    return false;

}

function goTwitter(url, id, title) {
    window.open('https://twitter.com/share?url='+url+id+'&text='+title, 'pop', 'width=600,height=400');
    return false;

}


function goGoogleplus(url, id, title) {

    window.open('https://plus.google.com/share?url='+url+id+'&text='+title, 'pop', 'width=600,height=400');
    return false;
}


function goMail(url, id, title) {
    var SendInfo= [];
    var data = {
        url:url+id,
        title:title
    }

    SendInfo.push(data);

    $.ajax({
        url: "/gomail/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        csrfmiddlewaretoken: csrftoken,
        data: JSON.stringify(SendInfo),
        processData: false,
        type: 'POST',
        success: function(data){
            alert(data.data);
        }
      });
    return false;
}




/* 신애 스크립트 */

/*!
 * jQuery word-break keep-all Plugin
 * ver 1.3.0
 *
 * Copyright 2012, Ahn Hyoung-woo (mytory@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * https://github.com/mytory/jquery-word-break-keep-all
 * http://mytory.co.kr/archives/2801
 *
 * Date: 2013-09-04
 */

jQuery.fn.wordBreakKeepAll = function(option) {
    var is_there_end_angle_bracket = function(str){
        return str.lastIndexOf('<') < str.lastIndexOf('>');
    };

    var is_there_start_angle_bracket = function(str){
        return str.lastIndexOf('>') < str.lastIndexOf('<');
    };

    var is_there_no_angle_bracket = function(str){
        //only -1
        return str.lastIndexOf('>') == str.lastIndexOf('<');
    };

    var defaultOption = {
        OffForIE: false, // If IE, turn off plugin.
        useCSSonIE: true // on IE, use CSS word-break: keep-all
    };

    var opt = $.extend(defaultOption,option);

    if( /MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == true){
        var addWordBreakKeepAll = function(obj){
            $(obj).css({
                'word-break': 'keep-all',
                'word-wrap': 'break-word'
            });
            if($(obj).css('display') == 'inline'){
                $(obj).css('display','block');
            }
        };
    }else if( ! /MSIE/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == false ){
        var addWordBreakKeepAll = function(obj){

            var html = $(obj).html();

            // to store line break
            html = html.replace(/(\r\n|\n|\r)/gm, ' ＃＆＊＠§ ');

            // .html() 로 집어 넣었을 때, 여는 태그만 있으면 브라우저가 자동으로 닫는 태그를 집어 넣기 때문에 <,>를 다 없앤다.
            var textArr = html.split(' ');

            // remove empty array
            textArr = textArr.filter(function(e){return e;});
            $(obj).text('');
            var skip = false;
            var full_str = '';

            for(var i=0,j=textArr.length; i<j; i++){
                var str = textArr[i];

                /*
                 * 태그가 닫히고 끝났으면 일단 이놈은 적용하지 않고 다음 놈부터 skip = false;
                 * 태그가 열리고 끝났으면 skip = true;
                 * 태그가 없는 경우 특별히 skip을 조정하지 않는다. 태그 안의 속성도 글자만 있을 수 있다.
                 *
                 * nowrap 적용할 경우 : 태그가 없다 and skip == false
                 * nowrap 적용 안 하는 경우 : 태그가 있는 경우 or skip == true
                 *
                 * skip = true 로 변경하는 경우 : 지금 태그가 열린 경우
                 * skip = false 로 변경하는 경우 : 지금 태그가 닫힌 경우
                 */
                if(skip == false && is_there_no_angle_bracket(str) &&  str.indexOf('＃＆＊＠§') == -1 ){
                    full_str += '<span style="white-space: nowrap">'+str+'</span> ';
                }else{
                    full_str += str + ' ';
                }

                if(is_there_start_angle_bracket(str)){
                    skip = true;
                }
                if(is_there_end_angle_bracket(str)){
                    skip = false;
                }
            };
            $(obj).html(full_str.replace(/＃＆＊＠§/g, "\n"));
        };
    }
    return this.each(function(){
        addWordBreakKeepAll(this);
    });
};
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

    // our plugin constructor
    var OnePageNav = function(elem, options){
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.metadata = this.$elem.data('plugin-options');
        this.$win = $(window);
        this.sections = {};
        this.didScroll = false;
        this.$doc = $(document);
        this.docHeight = this.$doc.height();
    };

    // the plugin prototype
    OnePageNav.prototype = {
        defaults: {
            navItems: 'a',
            currentClass: 'current',
            changeHash: false,
            easing: 'swing',
            filter: '',
            scrollSpeed: 750,
            scrollThreshold: 0.5,
            begin: false,
            end: false,
            scrollChange: false
        },

        init: function() {
            // Introduce defaults that can be extended either
            // globally or using an object literal.
            this.config = $.extend({}, this.defaults, this.options, this.metadata);

            this.$nav = this.$elem.find(this.config.navItems);

            //Filter any links out of the nav
            if(this.config.filter !== '') {
                this.$nav = this.$nav.filter(this.config.filter);
            }

            //Handle clicks on the nav
            this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

            //Get the section positions
            this.getPositions();

            //Handle scroll changes
            this.bindInterval();

            //Update the positions on resize too
            this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

            return this;
        },

        adjustNav: function(self, $parent) {
            self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
            $parent.addClass(self.config.currentClass);
        },

        bindInterval: function() {
            var self = this;
            var docHeight;

            self.$win.on('scroll.onePageNav', function() {
                self.didScroll = true;
            });

            self.t = setInterval(function() {
                docHeight = self.$doc.height();

                //If it was scrolled
                if(self.didScroll) {
                    self.didScroll = false;
                    self.scrollChange();
                }

                //If the document height changes
                if(docHeight !== self.docHeight) {
                    self.docHeight = docHeight;
                    self.getPositions();
                }
            }, 250);
        },

        getHash: function($link) {
            return $link.attr('href').split('#')[1];
        },

        getPositions: function() {
            var self = this;
            var linkHref;
            var topPos;
            var $target;

            self.$nav.each(function() {
                linkHref = self.getHash($(this));
                $target = $('#' + linkHref);

                if($target.length) {
                    topPos = $target.offset().top;
                    self.sections[linkHref] = Math.round(topPos);
                }
            });
        },

        getSection: function(windowPos) {
            var returnValue = null;
            var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

            for(var section in this.sections) {
                if((this.sections[section] - windowHeight) < windowPos) {
                    returnValue = section;
                }
            }

            return returnValue;
        },

        handleClick: function(e) {
            var self = this;
            var $link = $(e.currentTarget);
            var $parent = $link.parent();
            var newLoc = '#' + self.getHash($link);

            if(!$parent.hasClass(self.config.currentClass)) {
                //Start callback
                if(self.config.begin) {
                    self.config.begin();
                }

                //Change the highlighted nav item
                self.adjustNav(self, $parent);

                //Removing the auto-adjust on scroll
                self.unbindInterval();

                //Scroll to the correct position
                self.scrollTo(newLoc, function() {
                    //Do we need to change the hash?
                    if(self.config.changeHash) {
                        window.location.hash = newLoc;
                    }

                    //Add the auto-adjust on scroll back in
                    self.bindInterval();

                    //End callback
                    if(self.config.end) {
                        self.config.end();
                    }
                });
            }

            e.preventDefault();
        },

        scrollChange: function() {
            var windowTop = this.$win.scrollTop();
            var position = this.getSection(windowTop);
            var $parent;

            //If the position is set
            if(position !== null) {
                $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

                //If it's not already the current section
                if(!$parent.hasClass(this.config.currentClass)) {
                    //Change the highlighted nav item
                    this.adjustNav(this, $parent);

                    //If there is a scrollChange callback
                    if(this.config.scrollChange) {
                        this.config.scrollChange($parent);
                    }
                }
            }
        },

        scrollTo: function(target, callback) {
            var offset = $(target).offset().top;

            $('html, body').animate({
                scrollTop: offset
            }, this.config.scrollSpeed, this.config.easing, callback);
        },

        unbindInterval: function() {
            clearInterval(this.t);
            this.$win.unbind('scroll.onePageNav');
        }
    };

    OnePageNav.defaults = OnePageNav.prototype.defaults;

    $.fn.onePageNav = function(options) {
        return this.each(function() {
            new OnePageNav(this, options).init();
        });
    };

})( jQuery, window , document );





$(document).ready(function() {
    csrftoken = $.cookie('csrftoken');

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    $("#navbar-scroll").removeClass("class_top");


//    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//        $.getScript( '//travelingowl.com/static/js/jquery.fullPage.min.js', function() {
//
//        })
//    }
//    $.ajax({
//      url: "/get_themes/",
//      type: "POST",
//      dataType: "json",
//      success: function (data) {
//            if (data.status == "success") {
//
//                    $theme_title = data.data.theme_title;
//                    $theme_code = data.data.theme_code;
//                    for(var index in $theme_title){
//                            $("#build_trip_theme").append("<option value="+$theme_code[index]+">"+$theme_title[index]+"</option>");
//                    }
//
//                    //console.log(get_today());
//                    //blid trip 데이트타임피커
//                    $("#build_trip_datetimepicker").val(get_today());
//
//                    $('#build_trip_datetimepicker').datetimepicker({
//                        pickTime: false
//                    });
//            }
//        }
//    });



    $("#menu_build_trip_start_datetimepicker").val(get_today());
    $('#menu_build_trip_start_datetimepicker').datetimepicker({
        pickTime: false
    });
    $("#menu_build_trip_end_datetimepicker").val(get_today());
    $('#menu_build_trip_end_datetimepicker').datetimepicker({
        pickTime: false
    });

    $("#build_trip_start_datetimepicker").val(get_today());
    $('#build_trip_start_datetimepicker').datetimepicker({
        pickTime: false
    });
    $("#build_trip_end_datetimepicker").val(get_today());
    $('#build_trip_end_datetimepicker').datetimepicker({
        pickTime: false
    });

    $('#navigation_id').on('click', function(){
       $("#side-drawer").collapse('hide');
    });

    $("#a_forgot_password").on("click", function(){
       $("#sign_up").hide()
        $("#login").hide()
    });

    $("#find_pw").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            alert(data.message);
            location.reload(true);
        },
        error: function(data) {
            alert("Unknown error.");
        }
    });

});


function now_today(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'_'+dd+'_'+yyyy;

    return today
}


function get_today(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;

    return today
}

function formatAMPM() {
  var date = new Date();
  var hours = date.getHours();
  //var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  //minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + '00' + ' ' + ampm;
  return strTime;
}


function address_search(address_number){
    var address_text = $("#search_adress"+address_number).val();
    var select_box_name = "spot_location"+address_number;
    //console.log(address_text, address_number, select_box_name);
    search_google_map(address_text, select_box_name);
    return false;
}

function runScript(e, address_number) {
    if (e.keyCode == 13) {
        var address_text = $("#search_adress"+address_number).val();
        var select_box_name = "spot_location"+address_number;
        //console.log(address_text, address_number, select_box_name);
        search_google_map(address_text, select_box_name);
        return false;
    }
}


function run_google_search(e, address_number) {
    if (e.keyCode == 13) {
        var address_text = $("#idea_search_adress"+address_number).val();
        var select_box_name = "idea_location"+address_number;
        //console.log(address_text, address_number, select_box_name);
        search_google_map(address_text, select_box_name);
        return false;
    }
}

function run_google_search_button(address_number){
    var address_text = $("#idea_search_adress"+address_number).val();
    var select_box_name = "idea_location"+address_number;
    search_google_map(address_text, select_box_name);
    return false;
}

function search_google_map(address_text, select_box_name){
     //console.log(address_text, select_box_name)
     $.ajax({
         url: "/search_google_map/",
         type: "get",
         dataType: "json",
         data: {
             location_name: address_text
         },
         success: function (data) {
             if (data.status == "success") {
                 //console.log(data.data.return_json.results)
                $('#' + select_box_name).find('option').remove();
                var return_list = data.data.return_json.results;
                 if( return_list.length == 0){
                     $('#' + select_box_name).append($('<option></option>', {text:'Search results do not exist.'}));
                 }else{
                     for (var i in return_list) {
                         //console.log(return_list[i].name);
                         //console.log(return_list[i].formatted_address.replace('대한민국 ', ''));
                         //console.log(return_list[i].geometry.location.lat);
                         //console.log(return_list[i].geometry.location.lng);
                         //console.log(select_box_name)
                         $('#' + select_box_name).append($('<option></option>', {
                             value: return_list[i].name + "_" + return_list[i].formatted_address.replace('대한민국 ', '') + "_" + return_list[i].geometry.location.lat + "_" +
                                     return_list[i].geometry.location.lng,
                             text: return_list[i].name + "-" + return_list[i].formatted_address.replace('대한민국 ', '')
                         }));
                     }
                 }

             }
         }
     });
}



function attachSecretMessage(marker, number) {
  var message = ["This","is","the","secret","message"];
  var infowindow = new google.maps.InfoWindow(
      { content: message[number],
        size: new google.maps.Size(50,50)
      });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });
}


function maker_distance(points_list){
    //console.log("inner maker_distanse");
    max_distance = 0;
    center_distance = [0,0];
    point_equl_check = true;

    for(point in points_list){
        for(compare_point in points_list) {
            if (point != compare_point) {
                if(points_list[point][0] != points_list[compare_point][0]){
                    point_equl_check = false;
                }
                if(points_list[point][1] != points_list[compare_point][1]){
                    point_equl_check = false;
                }

            }
        }
    }
    //console.log(point_equl_check);

    if(point_equl_check == false) {


        for (point in points_list) {
            //console.log(points_list[point][0])
            //console.log(points_list[point][1])

            for (compare_point in points_list) {
                if (point != compare_point) {
                    cal_dist = (Math.sqrt(Math.pow((points_list[compare_point][0] - points_list[point][0]), 2) + Math.pow((points_list[compare_point][1] - points_list[point][1]), 2)))
                    if (cal_dist > max_distance) {
                        max_distance = cal_dist;
                        center_distance.length = 0;
                        if (points_list[compare_point][0] < points_list[point][0]) {
                            center_distance.push(points_list[compare_point][0])
                        } else {
                            center_distance.push(points_list[point][0])
                        }
                        center_distance.push(Math.sqrt(Math.pow((points_list[compare_point][0] - points_list[point][0]), 2)) / 2);
                        if (points_list[compare_point][1] < points_list[point][1]) {
                            center_distance.push(points_list[compare_point][1])
                        } else {
                            center_distance.push(points_list[point][1])
                        }
                        center_distance.push(Math.sqrt(Math.pow((points_list[compare_point][1] - points_list[point][1]), 2)) / 2);
                    }
                }
            }
        }

        m = max_distance * 60;
        s = (max_distance - (m / 60)) * 3600;

        center_distance.push(m)
        return center_distance
    }
    else{
        center_distance = [points_list[0][0], 0, points_list[0][1], 0, 0];
        return center_distance
    }
}


function update_review(id){
    console.log(id);
    review_pk = id.replace("update_", "");
    console.log(review_pk);
    $("#review_id").val($("#review_pk_"+review_pk).val());
    $("#review_text").val($("#review_comment_"+review_pk).val());
}


function delete_review(id){
    id = id.replace("delete_", "");
    $.ajax({
        url: "/review_delete/"+id+"/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            alert(data.message);
            location.reload(true);
        }
      });
}



function form_post(id){
    //console.log(id);
//    alert($("#change_admin_id").val());
    if($("#change_admin_id").val()=="true"){
        $("#id_save_value").val('publish');
    }else{
        $("#id_save_value").val(id);
    }

}


function idea_form_post(id){
    //console.log("pass");
    if($("#change_admin_id").val()=="true") {
        $("#idea_status").val('publish-ideas');
    }
    else{
        $("#idea_status").val(id);
    }



}
function add_price(){
    var price_count = parseInt($("#id_price_count").val())+1;
    $("#id_price_count").val(price_count);
    var add_price = "" +
        "<div class='price_list' id='price_list"+price_count+"'><input type='hidden' name='pk_price"+price_count+"' id='id_pk_price"+price_count+
        "'><input type='text' name='from_price"+price_count+
        "' id='id_from_price"+price_count+"'  class='form-control form-control-xs'><input type='text' name='to_price"+price_count+
        "' id='id_to_price"+price_count+"' class='form-control form-control-xs'><span class='text'>People</span>"+
        "<input type='text' name='price"+price_count+"' id='id_price"+price_count+"' class='form-control form-control-sm'>"+
        "<span class='text'>USD</span><label class='radio-inline'><input type='radio' name='level"+price_count+"' value='per_persion' id='id_per_persion' class='px' checked>"+
        "<span class='lbl'>Per person</span></label><label class='radio-inline'><input type='radio' name='level"+price_count+"' value='flat_rate' id='id_flat_rate' class='px'>"+
        "<span class='lbl'>Flat ate</span></label></div>";


    //console.log(add_price);
    $("#div_price").append(add_price);
}

function add_spot(){
    var spot_name_list = ['', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var spot_count = parseInt($("#id_spot_count").val())+1;
            $("#id_spot_count").val(spot_count);
            var add_spot = "" +
                "<div class='spot-wrap'><input type='hidden' value='0' id='spot_"+spot_count+"' name='spot_"+spot_count+"'><div class='spot-header'><span><i></i>Spot "+spot_name_list[spot_count]+"</span></div>"+
                "<div class='form-wrap'><div class='form-group'><label for='id_title"+spot_count+"' class='header-form header-sm'>Title</label>"+
                "<input type='text' name='spot_title"+spot_count+"' id='spot_title"+spot_count+"' class='form-control' placeholder='Ex: Gallery tour'></div>"+
                "<div class='form-group'>"+
                "<label for='id_overview' class='header-form header-sm'>Picture</label>"+
                "<div class='input-wrap'>"+
                "<div class='info-img' id='id_add_image_file"+spot_count+"' class='product_image_file' >"+
                "<input type='hidden' id='id_location_photos"+spot_count+"' name='location_photos"+spot_count+"'>"+
                "<input type='hidden' id='id_location_photos_count_"+spot_count+"' name='id_location_photos_count_"+spot_count+"' value='0'>"+
                "</div>"+
                "<div class='btn-file-wrap text-center' id='product_image_file"+spot_count+"'>"+
                "<span>Add picture</span>"+
                "<input type='file' multiple name='photo"+spot_count+"' id='id_photo"+spot_count+"'>"+
                "</div>"+
                "<span class='text' style='padding-left:10px;'>Maximum 5 pictures</span>"+
                "<div id='loading_"+spot_count+"' class='timer' style='display:none;'></div>"+
                "</div>"+
                "</div>"+
                "<div class='form-group'>"+
                "<label for='id_duration' class='header-form header-sm'>Description</label>"+
                "<textarea  name='description"+spot_count+"' id='description"+spot_count+"' class='form-control-lg form-control' rows='5'></textarea></div>"+
                "<div class='form-group'><label for='id_search_address"+spot_count+"' class='header-form header-sm'>Address</label>"+
                "<input type='text' name='search_address"+spot_count+"' id='search_adress"+spot_count+"' class='form-control wide' placeholder='' "+
                "onkeypress='return runScript(event,"+spot_count+")'>" +
                "<button type='button' class='btn-gray' onclick=address_search('"+spot_count+"')> Search</button>"+
                "</div>"+
                "<div class='form-group'>"+
                "<label for='spot_location"+spot_count+"' class='header-form header-sm'>location</label>"+
                "<select class='form-control form-group-margin' name='spot_location"+spot_count+"' id='spot_location"+spot_count+"'></select></div>"+
                "</div></div>";

            //console.log(add_spot);
            $("#div_spot").append(add_spot);
}
function delete_image(id){
    var get_id_list = id.split("_");
    var remove_pk = $("#id_" + get_id_list[1] + "_image_pk_"+get_id_list[4]).val();
    var remove_string = $("#id_location_photos"+get_id_list[1]).val();

    //,숫자 로 시작한다면 ,와 같이 제거 아니면 숫자만 제거
    if(remove_string.indexOf(remove_pk+",")>-1){
        remove_string = remove_string.replace(remove_pk+",", "");
    }else if(remove_string.indexOf(","+remove_pk)>-1) {
        remove_string = remove_string.replace(","+remove_pk, "");
    }else{
        remove_string = remove_string.replace(remove_pk, "");
    }


     $.ajax({
        url: "/listing/image/delete/"+remove_pk+"/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            $("#id_location_photos"+get_id_list[1]).val(remove_string);
            $("#id_"+get_id_list[1]+"_image_"+get_id_list[4]).remove();
            $("#id_" + get_id_list[1] + "_image_pk_"+get_id_list[4]).remove();
            $("#down_url_" + get_id_list[1] + "_"+get_id_list[4]).remove();
            $("#"+id).remove();
        }
      });

}

function delete_spot(){
    var spot_num = parseInt($("#id_spot_count").val());
    if(spot_num == 1){
        alert("The first spot will not be deleted.")
        return;
    }else{
        $("#spot_"+spot_num).parent("div.spot-wrap").remove();
        $("#id_spot_count").val(spot_num-1);
    }

}

function delete_page(){
//    console.log($("#page_pk"+page_num).val());
//    console.log($("#page_count").val());
    var page_num = parseInt($("#page_count").val());
    if(page_num == 1){
        alert("The first page will not be deleted.")
        return;
    }
    else{
        $("#page_pk"+page_num).parent("div.page-wrap").remove();
        $("#page_count").val(parseInt(page_num)-1);
    }

}

function add_page(){
    var page_count = parseInt($("#page_count").val())+1;
    $("#page_count").val(page_count);
    
    var add_page = ""+
                    "<div class='page-wrap'>"+
                    "<input type='hidden' value='0' id='page_pk"+page_count+"' name='page"+page_count+"'>"+
                    "<input type='hidden' name='ides_theme_"+page_count+"_1' value='' id='ides_theme_value_"+page_count+"_1'>"+
                    "<input type='hidden' name='ides_theme_"+page_count+"_2' value='' id='ides_theme_value_"+page_count+"_2'>"+
                    "<input type='hidden' name='ides_theme_"+page_count+"_3' value='' id='ides_theme_value_"+page_count+"_3'>"+
                    "<input type='hidden' name='ides_theme_"+page_count+"_4' value='' id='ides_theme_value_"+page_count+"_4'>"+
                    "<input type='hidden' name='ides_theme_"+page_count+"_5' value='' id='ides_theme_value_"+page_count+"_5'>"+
                    "<input type='hidden' name='ides_theme_count_"+page_count+"' value='0' id='ides_theme_count_"+page_count+"'>"+
                    "<input type='hidden' name='page_iamge_count_"+page_count+"' value='0' id='page_image_count_"+page_count+"' >"+
                    "<div class='page-header'>"+
                    "<span>Page "+page_count+"</span>"+
                    "</div>"+
                    "<div class='form-wrap'>"+
                    "<div class='form-group'>"+
                    "<label for='id_title' class='header-form header-sm'>Style</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='form_style"+page_count+"' id='style1' value='form_style_1' checked>"+
                    "<span class='form-style'></span>"+
                    "</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='form_style"+page_count+"' id='style2' value='form_style_2'>"+
                    "<span class='form-style form-2'></span>"+
                    "</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='form_style"+page_count+"' id='style3' value='form_style_3'>"+
                    "<span class='form-style form-3'></span>"+
                    "</label>"+
                    "<label class='radio-inline'>"+
                    "<input type='radio' name='form_style"+page_count+"' id='style4' value='form_style_4'>"+
                    "<span class='form-style form-4'></span>"+
                    "</label>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label for='id_title' class='header-form header-sm'>Title</label>"+
                    "<input type='text' name='page_title"+page_count+"' id='page_title"+page_count+"' class='form-control wide input-st placeholder-st' placeholder='Ex: Gallery tour'>"+
                    "<span class='help-block error-block'>Title field is required.</span>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label for='id_overview' class='header-form header-sm'>Picture</label>"+
                    "<div class='input-wrap'>"+
                    "<div class='info-img' id='id_idea_image_file"+page_count+"'>"+
                    "<input type='hidden' id='id_idea_photos_list"+page_count+"' name='idea_photos_list"+page_count+"'>"+
                    "<input type='hidden' id='idea_photos_list_count_"+page_count+"' name='idea_photos_list_count_"+page_count+"' value='0'>"+
                    "</div>"+
                    "<div class='btn-file-wrap text-center' id='idea_photo"+page_count+"'>"+
                    "<span>Add picture</span>"+
                    "<input type='file' multiple name='photo"+page_count+"' id='id_idea_photo"+page_count+"'>"+
                    "</div>"+
                    "<div id='loading_idea_"+page_count+"' class='timer' style='display:none;'></div>"+
                    "</div>"+
                    "<span class='help-block error-block'>Cover picture is   required.</span>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label for='page_description1' class='header-form header-sm'>Description</label>"+
                    "<textarea  name='page_description"+page_count+"' id='page_description"+page_count+"' class='form-control-lg form-control' rows='5' onkeyup='textarea_count(this)'></textarea>"+
                    "<span class='textarea_count' id='count_text"+page_count+"'></span>"+
                    "<span class='help-block error-block'>Descrition field is required.</span>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label for='page_ovewview"+page_count+"' class='header-form header-sm'>Footnote</label>"+
                    "<textarea  name='page_overview"+page_count+"' id='page_overview"+page_count+"' class='form-control-lg form-control' rows='2'></textarea>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label for='id_duration' class='header-form header-sm'>Country</label>"+
                    "<div class='select-wrap'>"+
                    "<div class='select wide'>"+
                    "<select class='form-control wide' name='page_country"+page_count+"' id='page_country"+page_count+"'>"+
                    "</select>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='form-group'>"+
                    "<label class='header-form header-sm'>Region</label>"+
                    "<div class='select-wrap'>"+
                    "<div class='select wide'>"+
                    "<select class='form-control wide' name='page_region"+page_count+"' id='page_region"+page_count+"'>"+
                    "</select>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='form-group' id='page_theme"+page_count+"'>"+
                    "<label class='header-form header-sm'>Theme</label>"+
                    "</div>"+
                    "</div>"+
                    "</div>";


    $("#div_page").append(add_page);

    var $select_list = $("#page_country1 > option").clone();
    $("#page_country"+page_count).append($select_list);

    var $select_list = $("#page_region1 > option").clone();
    $("#page_region"+page_count).append($select_list);

    var $select_list = $("#page_theme_hidden > div").clone();
    $("#page_theme"+page_count).append($select_list);
    $("#page_theme"+page_count+" input[type=checkbox]").each(function(){
       //console.log($(this).attr("name"));
       $(this).attr("name", "");
       $(this).attr("name", "idea_theme_"+page_count);

       var temp_id = $(this).attr("id");
        $(this).attr("id", "");
        temp_id = temp_id.replace("1", page_count);
        $(this).attr("id", temp_id);
    });

}


function delete_image_idea(id){
    console.log("id : "+id)
    var get_id_list = id.split("_");
    console.log(get_id_list)
    var remove_pk = $("#id_idea_" + get_id_list[2] + "_image_pk_"+get_id_list[5]).val();
    var remove_string = $("#id_idea_photos_list"+get_id_list[2]).val();
    console.log(remove_pk)
    console.log(remove_string)

    //,숫자 로 시작한다면 ,와 같이 제거 아니면 숫자만 제거
    if(remove_string.indexOf(remove_pk+",")>-1){
        remove_string = remove_string.replace(remove_pk+",", "");
    }else if(remove_string.indexOf(","+remove_pk)>-1) {
        remove_string = remove_string.replace(","+remove_pk, "");
    }else{
        remove_string = remove_string.replace(remove_pk, "");
    }


     $.ajax({
        url: "/idea/image/delete/"+remove_pk+"/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            $("#id_idea_photos_list"+get_id_list[2]).val(remove_string);
            $("#id_idea_"+get_id_list[2]+"_image_"+get_id_list[5]).remove();
            $("#id_idea_" + get_id_list[2] + "_image_pk_"+get_id_list[5]).remove();
            $("#down_url_"+ get_id_list[2] +"_"+get_id_list[5]).remove();
            $("#"+id).remove();
            $("#idea_photos_list_count_"+get_id_list[2]).val(parseInt($("#idea_photos_list_count_"+get_id_list[2]).val())-1);
        }
      });

}

function delete_cover_image(){
    $("#idea_cover_div").css("display", "none");
    $('#idea_main_picture').val('');
    //var cover_img_name = $("input[type='file'][name='idea_main_photo']")[0].files;
    //console.log(cover_img_name)
}

function image_down(filename, id){
    var SendInfo= [];
    var data = {
        filname:filename,
        id:id
    }
    SendInfo.push(data);

    $.ajax({
        url: "/image_down/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        data: JSON.stringify(SendInfo),
        processData: false,
        contentType: false,
        type: 'get',
        success: function(data){

        },
        error: function(data) {
            console.log("error");
            alert("Unknown error.");
        }
    });
}

function product_delete_cover_image(){
    $("#product_cover_div").css("display", "none");
    $('#product_main_picture').val('');
    //var cover_img_name = $("input[type='file'][name='idea_main_photo']")[0].files;
    //console.log(cover_img_name)
}


function get_date() {
    var now = new Date();
    var year = now.getFullYear();
    var mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
    var day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();

    return year + '_' + mon + '_' + day;
}


function select_book_people(option_val){
    //console.log($( "#book_people option:selected" ).val());

    $.ajax({
        url: "/book_change_people/",
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        data: {
            "reservation_pk": $("#reservation_pk").val(),
            "people_count": $( "#book_people option:selected" ).val()
        },
        type: 'POST',
        success: function(data){
            $("#bid").text(data.data[0].bid);
        }
    });
}


function move_page(move_href){
    window.location.href='/'+move_href+'/';
}


function move_paypal(){
    $('#loading_background').css({'display': 'block'});
    $('#loading').css({'display': 'block'});
}

function valid_check_price(){
    //alert($("#id_price_count").val());
    var price_list_count = parseInt($("#id_price_count").val());
    for(var index=1; index<=price_list_count; index++){
        //console.log("form : "+$("#id_from_price"+index).val());
        //console.log("to : "+$("#id_to_price"+index).val());

        var x = parseInt($("#id_from_price"+index).val());
        var y = parseInt($("#id_to_price"+index).val());

        for(var inner_index=1; inner_index<=price_list_count; inner_index++){
            if( index != inner_index){
                var if_x = parseInt($("#id_from_price"+inner_index).val());
                var if_y = parseInt($("#id_to_price"+inner_index).val());

                if ( if_x <= x && x <= if_y){
        //            alert("from 걸림"+ x)
                    return false
                }
                if (if_x <= y && y<= if_y){
         //           alert("to 걸림" + y)
                    return false
                }
            }
        }
    }

    return true
}
function valid_check_product(){

    if( $("#id_title").val() == ""){
        return "id_title"
    }

    if( $("#id_overview").val() == ""){
        return "id_overview"
    }

    if($("#product_cover_div").css('display') != "block"){
        return "product_main_picture"
    }

    var cnt = $("input[name=theme_checkbox]:checkbox:checked").length;
    if( cnt == 0){
        return "theme_checkbox"
    }

    if ( $("#id_duration").val() == ""){
        return "id_duration"
    }

    if( $("#id_from_price1").val() == ""){
        return "id_from_price1"
    }

    if( $("#id_to_price1").val() == ""){
        return "id_to_price1"
    }

    if( $("#id_price1").val() == ""){
        return "id_price1"
    }

    if( $("#id_min_group_size").val() == ""){
        return "id_min_group_size"
    }

    if( $("#id_max_group_size").val() == ""){
        return "id_max_group_size"
    }

    if( $("#id_included").val() == ""){
        return "id_included"
    }

    if( $("#id_excluded").val() == ""){
        return "id_excluded"
    }

    if( valid_check_price() == false){
        return "price_list1"
    }
    return true;

}

function valid_check_idea_first(){


    if ( $("#article_title").val() == ""){
        return "article_title"
    }

    if ($("#sub_title").val() == ""){
        return "sub_title"
    }

    if($("#idea_cover_div").css('display') != "block"){
        return "idea_cover_div"
    }
    return true;
}


function valid_check_idea_second(){


    var count = parseInt($("#page_count").val());

    for( var index=1; index<=count; index++){
        if($("#page_title"+index).val() == ""){
            return "page_title"+index
        }

        if( $("#page_description"+index).val() == ""){
            return "page_description"+index;
        }

        var check_form_style = $("input[name='form_style"+index+"']:checked").attr("id");
        var page_image_count = $("#idea_photos_list_count_"+index).val();


        if(check_form_style == "style1" && parseInt(page_image_count) < 1) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style2" && parseInt(page_image_count) < 3) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style3" && parseInt(page_image_count) < 2) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style4" && parseInt(page_image_count) < 1) {
            return "id_idea_photo"+index
        }

        if(check_form_style == "style1" && parseInt(page_image_count) > 1) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style2" && parseInt(page_image_count) > 3) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style3" && parseInt(page_image_count) > 2) {
            return "id_idea_photo"+index
        }else if(check_form_style == "style4" && parseInt(page_image_count) > 1) {
            return "id_idea_photo"+index
        }
    }

    return true;
}


function valid_custom(){

    if( $("#search_user").val() == ""){
       return "search_user"
    }
    if( $("#user_email").val() == ""){
       return "search_user"
    }
    if( $("#user_mobile").val() == ""){
        return "user_mobile"
    }
    if( $("#start_time").val() == ""){
        return "start_time"
    }
    if( $("#end_time").val() == ""){
        return "end_time"
    }
    if( $("#bid").val() == ""){
        return "bid"
    }
    if( $("#custom_people").val() == ""){
        return "custom_people"
    }

    return true;
}


function textarea_count(count){
//    console.log(count);
    var len = count.value.length;
    var enter_count = count.value.split('\n');
    len = len+(enter_count.length-1)*70;
    var check_type = count.id.search("page_description");
//    console.log(check_type)
    if(check_type >= 0){
        var textarea_id = count.id.replace('page_description', "");
        var check_form_style = $("input[name='form_style"+textarea_id+"']:checked").attr("id");

        var max_count = 470;
        if(check_form_style == "style1"){
            max_count = 470;
        }
        else if(check_form_style == "style2"){
            max_count = 900;
        }
        else if(check_form_style == "style3"){
            max_count = 580;
        }
        else if(check_form_style == "style4"){
            max_count = 1200;
        }
        var add_html = "Characters (Max <span id=max_text"+textarea_id+">"+max_count+"</span>):  "+  len;
        $("#count_text"+ textarea_id).html(add_html);
    }
    check_type = count.id.search("idea_description");

    if(check_type >= 0){
        var textarea_id = count.id.replace('idea_description', "");
//        console.log(textarea_id)
        $("#count_text_map_"+ textarea_id).text("Characters (Max 200):  "+  len);
    }
}

jQuery(function($){

    /* 회원가입 */
    $("#account_sing_up").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            alert(data.message);
            console.log(data)
            if(data.status=="success") {
                window.location.href='/index/'
            }else{

            }
        },
        error: function(data) {

            console.log("error");
            alert("Unknown error.");
        }
    });


    /* 로그인 */
    $("#account_login").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            if(data.status=="success") {
                window.location.href='/index/';
            }else{
                alert(data.message);
            }
        },
        error: function(data) {
            console.log("error");
            alert("Unknown error.");
        }
    });


    /* 사용자 정보 변경 */
    $("#user_account").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {

            alert(data.message);
            if(data.status=="success") {
                window.location.reload(true);
            }else{

            }
        },
        error: function(data) {
            console.log("error");
            alert("Unknown error.");
        }
    });




    /* 회원탈퇴*/
    $("#model_drop_out").ajaxForm({
        dataType: "json",

        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            $('#loading').css({'display': 'none'});
            alert(data.message);
            if(data.status=="success") {
                logout(data.data);
                drop_out();
            }else{

            }
        },
        error: function(data) {
            $('#loading').css({'display': 'none'});
            console.log("error");
            alert("Unknown error.");
        }
    });

    $("#send_message").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            alert(data.message);
            window.location.reload(true);
        },
        error: function(data) {
            alert("Unknown error.");
        }
    });

    $("#nickname").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            if(data.message=="already exists") {
                alert("The nickname that already exists.");
                return false;
            }
            else{
               window.location.reload(true);
            }
        },
        error: function(data) {
            console.log("error");
            alert("Unknown error.");
        }
});

    $("#search_product").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            console.log(data.data[0].product)
            console.log(data.data[0].idea)
            $product = data.data[0].product;
            $("#container").empty();
            for(var index in $product){

                 add_product = ""+
                "<li class='col-sm-4'>"+
                "<a class='thumb' href='/experiences/"+$product[index].pk+"'>"+
                "<img src='/resource/"+$product[index].thumbnail+"' alt=''>"+
                "<div class='info'>"+
                "<span>"+$product[index].region+" / "+$product[index].duration+$product[index].duration_type+" / $"+$product[index].price+"</span>"+
                "<small class='name'>With By "+$product[index].last_name+" "+$product[index].first_name+"</small>"+
                "</div>"+
                "<div class='overlay'></div>"+
                "<div class='back'>"+
                "<span>"+
                "<strong>"+$product[index].title+"</strong>"+
                "</span>"+
                "</div>"+
                "</a>"+
                "</li>";

                $("#container").append(add_product);
            }

            $idea = data.data[0].idea;
            $("#idea_container").empty();

            for(var index in $idea){
                console.log($idea[index].thumbnail)
                add_idea = ""+
                    "<li class='col-sm-4'>"+
                    "<a class='thumb' href='/travel_ideas/"+$idea[index].pk+"'>"+
                    "<img src='/resource/"+$idea[index].thumbnail+"' alt=''>"+
                    "<div class='info'>"+
                    "<small class='name'>By "+$idea[index].last_name+" "+$idea[index].first_name+"</small>"+
                    "</div>"+
                    "<div class='overlay'></div>"+
                    "<span class='back'>"+
                    "<strong>"+$idea[index].title+"</strong>"+
                    "</span>"+
                    "</a>"+
                    "</li>";
                $("#idea_container").append(add_idea);
            }

        },
        error: function(data) {
            alert("Unknown error.");
        }
    });


    $home = $("#home");
    if($home.length>0){
        $("#navbar-scroll").addClass("class_top");
        if($(window).width()>767) {
            $(document).scroll(function(){
                var scrollTop = $(this).scrollTop();

                if(scrollTop<=20) {
                    //$navbarScroll.fadeOut(time);
                    //$navbarScroll.fadeTo(time, 0.10);
                    //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
                    $("#navbar-scroll").addClass("class_top");
                    //$("#ideas-navbar-scroll").addClass("class_top")

                }
                else {
                    //$navbarScroll.fadeIn(time, 0.99);
                    //$navbarScroll.fadeTo(time, 1);
                    //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
                    $("#navbar-scroll").removeClass("class_top");
                    //$("#ideas-navbar-scroll").removeClass("class_top")
                    //console.log("ASDF")
                }
            });
        }else {
            $navbarScroll.show();
        }


        today = get_today();

        $("#datetimepicker").val(today);

        $('#datetimepicker').datetimepicker({
            pickTime: false
        });
    }


    $(".build_trip").ajaxForm({
        dataType: "json",
        csrfmiddlewaretoken: csrftoken,
        success: function(data) {
            alert(data.message);
            window.location.reload(true);
        },
        error: function(data) {
            alert("Unknown error.");
        }
    });

    $experiences = $("#experiences");
    if($experiences.length > 0){
        $("#navbar-scroll").addClass("class_top");
         if($(window).width()>767) {
            $(document).scroll(function(){
                var scrollTop = $(this).scrollTop();

                if(scrollTop<=20) {
                    //$navbarScroll.fadeOut(time);
                    //$navbarScroll.fadeTo(time, 0.10);
                    //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
                    $("#navbar-scroll").addClass("class_top");
                    //$("#ideas-navbar-scroll").addClass("class_top")

                }
                else {
                    //$navbarScroll.fadeIn(time, 0.99);
                    //$navbarScroll.fadeTo(time, 1);
                    //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
                    $("#navbar-scroll").removeClass("class_top");
                    //$("#ideas-navbar-scroll").removeClass("class_top")
                    //console.log("ASDF")
                }
            });
        }else {
            $navbarScroll.show();
        }
    }

    $travelideas = $("#travel_ideas");
    if($travelideas.length > 0){
        $("#navbar-scroll").addClass("class_top");
         if($(window).width()>767) {
            $(document).scroll(function(){
                var scrollTop = $(this).scrollTop();

                if(scrollTop<=20) {
                    //$navbarScroll.fadeOut(time);
                    //$navbarScroll.fadeTo(time, 0.10);
                    //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
                    $("#navbar-scroll").addClass("class_top");
                    //$("#ideas-navbar-scroll").addClass("class_top")

                }
                else {
                    //$navbarScroll.fadeIn(time, 0.99);
                    //$navbarScroll.fadeTo(time, 1);
                    //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
                    $("#navbar-scroll").removeClass("class_top");
                    //$("#ideas-navbar-scroll").removeClass("class_top")
                    //console.log("ASDF")
                }
            });
        }else {
            $navbarScroll.show();
        }


    }

    $bookingdetail = $("#booking_detail");

    if($bookingdetail.length > 0){


        $("#datetimepicker").val($("#book_date_detail").val());
        var disabledates = $("#datetimepicker_disable_range").val().replace("[", "").replace("]", "").split(",");
        $('#datetimepicker').datetimepicker({
            pickTime: false,
            disabledDates: disabledates
        });


        experiences_date_check();

        $("#datetimepicker").on("change", function(){
            experiences_date_check();
        });

        function experiences_date_check(){
            $.ajax({
                url: "/experiences_date_check/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: {
                  "select_date": $("#datetimepicker").val(),
                  "product_pk": $("#product_pk").val()
                },
                type: 'POST',
                success: function(data){
                    //console.log(data.data);
                    $("#book_time").find('option').remove();
                    add_temp = "";
                    if(data.data.length == 0){
                        add_temp = "<option>Reservations are not possible.</option>";
                        $("#book_time").append(add_temp);
                    }
                    else{
                        for(var index=0; index<data.data.length; index++){
                            add_temp += "<option value="+data.data[index]+">"+data.data[index]+"</option>";
                        }
                        $("#book_time").append(add_temp);
                    }


                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });
        }

        var people_max = $("#people_max").val()
        var people_min = $("#people_min").val()
        var add_people = "";
        for(var index=parseInt(people_min); index<=parseInt(people_max); index++){
            add_people+= "<option value="+index+">"+index+"</option>";
        }
        $("#book_people").append(add_people)

        $("#book_change").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {

                if(data.status == "error"){
                    $(".form-group").removeClass("has-error");
                    $("#"+data.data).focus().parents(".form-group").addClass("has-error");
                }else if (data.status=="success"){
                    console.log(data.data)
                    $("#paypal_product_name").val(data.data[0].paypal_product_name);
                    $("#paypal_product_number").val(data.data[0].paypal_product_number);
                    $("#paypal_amount").val(data.data[0].paypal_amount);
                    $("#paypal_custom").val(data.data[0].paypal_custom);

                    $("#bill").modal("show");
                }

            },
            error: function(data) {

                console.log(data)
            }
        });

//        $("#book_time option[value='"+$("#book_time_detail").val()+"']").attr('selected', 'selected');
//
//        $("#book_people option[value='"+$("#book_people_detail").val()+"']").attr('selected', 'selected');

    }

    $bookcustompaid = $("#book_custom_paid");
    if($bookcustompaid.length > 0){
        $("#book_custom_user_confirm").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                console.log(data)
                if(data.status == "error"){
                    alert(data.data)
                }else if (data.status=="success"){
                    console.log(data.data)
                    $("#paypal_product_name").val(data.data[0].paypal_product_name);
                    $("#paypal_product_number").val(data.data[0].paypal_product_number);
                    $("#paypal_amount").val(data.data[0].paypal_amount);
                    $("#paypal_custom").val(data.data[0].paypal_custom);

                    $("#bill").modal("show");
                }

            },
            error: function(data) {

                console.log(data)
            }
        });
    }

    $bookingcustom = $("#booking_custom");

    if($bookingcustom.length > 0){

        var disabledates = $("#datetimepicker_disable_range").val().replace("[", "").replace("]", "").split(",");

        $('#start_datetimepicker').datetimepicker({
            pickTime: false,
            disabledDates: disabledates
        });

        $('#end_datetimepicker').datetimepicker({
            pickTime: false,
            disabledDates: disabledates
        });

        $('#start_time').datetimepicker({
             format: 'HH:mm',
            pickDate: false,
            pickSeconds: false,
            pick12HourFormat: false
        });

        $('#end_time').datetimepicker({
             format: 'HH:mm',
            pickDate: false,
            pickSeconds: false,
            pick12HourFormat: false
        });

        $("#book_custom").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {

                if(data.status == "error") {
                    alert(data.data)
                }else if (data.status == "success"){
                    alert("request guide confirm")
                    window.location.href='/traveler/reservation/';
                }

            },
            error: function(data) {
                console.log(data)
            }
        });
    }

    $localExpertProfile = $("#local-expert-profile");


    if($localExpertProfile.length>0) {

        $("#profile_preview").on("click", function(){
           $("#status_loading_background").css('display', 'block');
           $("#status_loading").css('display', 'block');
           $("#submit_type").val("preview");
        });
        $("#profile_save").on("click", function(){
           $("#status_loading_background").css('display', 'block');
           $("#status_loading").css('display', 'block');
           $("#submit_type").val("");
        });

        $("#select_country_code").on('change', function(){
            if($("#mobile").val() == ""){
                $("#id_mobile").val();
                $("#id_mobile").val(this.value);
            }
        });

        $("#mobile_verify").on('click', function(){
            var phone_number = $("#id_mobile").val()
//            console.log(phone_number);

            $.ajax({
                url: "/mobile_verify/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: {
                    'phone':phone_number
                },

                type: 'POST',
                success: function(data){
                    if(data.data.status == "SUCCESS"){
                        $("#mobile_verify_token").val(data.data.token);
                        $("#phone_verify_div").css("display", "block");
                        $("#mobile_verify").hide();
                    }
                    else if(data.data.status == "ERROR"){
                        if(data.data.reason == "ERROR_INVALID_NUMBER_LENGTH" || data.data.reason == "ERROR_INVALID_NUMBER"){
                            alert("Retry with a valid number")
                        }
                        else if(data.data.reason == "ERROR_WAIT_TO_RETRY" || data.data.reason == "ERROR_COUNTRY_NOT_SUPPORTED"){
                            alert("Wait “retry_in” seconds before trying again")
                        }
                    }
                }
              });
        });

        $("#verify_number_confirm").on('click', function(){
            var verify_number = $("#id_verify_number").val()
            var mobile_verify_token = $("#mobile_verify_token").val()
            //console.log(verify_number);

            $.ajax({
                url: "/verify_number_confirm/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: {
                    'verify_number':verify_number,
                    'mobile_verify_token':mobile_verify_token
                },

                type: 'POST',
                success: function(data){
                    if(data.data.status == "SUCCESS"){
                        $("#mobile").val(data.data.phone);
                        $("#phone_verify_div").hide();
                        $("#id_mobile").prop('disabled', true);
                    }else{
                        console.log(data.data)
                        alert(data.status);
                    }
                }
              });
        });



        /* 가이드 등록 */
        $("#modal_guide").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                $("#status_loading_background").css('display', 'none');
                $("#status_loading").css('display', 'none');
                if(data.status=="success") {
                    //console.log(data.data);
                    if(data.data[0]=="preview"){
                        window.location.href='/local_expert/guide/'+data.data[2];
                    }else {
                        alert(data.message);
                        window.location.reload(true);
                    }
                }else{
                    alert(data.message);
                }
            },
            error: function(data) {
                $("#status_loading_background").css('display', 'none');
                $("#status_loading").css('display', 'none');
                console.log("error");
                alert("Unknown error");
            }
        });

        $("#id_photo").change(function(){
            var data = new FormData();
            $.each($('#id_photo')[0].files, function(i, file) {
                data.append('file-' + i, file);
            });
            console.log(data);
            $.ajax({
                url: "/profile/photo/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    var img_url = data.data.photo_url;
                    //console.log(data.data.photo_url)
                    $("#guide-image").attr('src',"/../../resource/"+img_url);
                    $("#guide_image_pk").val(data.data.photo_pk);
                }
              });
        });

        if($('#id_selected_location').val()!='') {
            $("#id_location option[value=" + $('#id_selected_location').val() + "]").attr('selected', 'selected');
        }
        if($('#id_hidden_first_name').val() != ''){
            $('#first-name').val($('#id_hidden_first_name').val());
        }
        if($('#id_hidden_last_name').val() != '') {
            $('#last-name').val($('#id_hidden_last_name').val());
        }
        if($('#id_hidden_email').val() != '') {
            $('#id_email').val($('#id_hidden_email').val());
        }
        if($('#id_hidden_mobile').val() != '') {
            $('#id_mobile').val($('#id_hidden_mobile').val());
        }else{
            $('#id_mobile').val("+82");
        }
        if( parseInt($('#id_language_count').val()) == 0) {
            $('#id_language_count').val(1);
        }

        var user_id = $('#id_user_id').val();



        $('#id_add_language').click(function(){
            var language_count = parseInt($("#id_language_count").val())+1;

            if( language_count > 5 ){
                alert("Only five can be selected.")
                return false;
            }
            $("#id_language_count").val(language_count);
            var add_language = "<select class='form-control form-group-margin' name='language"+language_count+"' id='id_language"+language_count+"'>";
            var $select_list = $("#id_language1 > option").clone();
//            console.log($select_list)
            //add_language +=  select_list
            add_language += "</select>";
//            console.log(add_language)
            $("#div_language").append(add_language);
            $("#id_language"+language_count).append($select_list);

        });


        $("#id_remove_language").click(function(){
            var language_count = parseInt($("#id_language_count").val());
            if(language_count != 1){
                var $language_list = $("#id_select_language").children("div.select-wrap");
//                console.log($language_list)
                $language_list.last().remove();

                $("#id_language_count").val(language_count-1);
            }
        });



        //해당 유저의 선택된 expertise(skill)이 있을 경우 체크 표
        $("input[name=skill_checkbox]").each(
              function(){
                if( this.value == $("#id_skill_value1").val()){
                    $(this).attr('checked','checked');
                    $("#id_skill_count").val(parseInt($("#id_skill_count").val())+1);
                }
                else if( this.value == $("#id_skill_value2").val()){
                   $(this).attr('checked','checked');
                    $("#id_skill_count").val(parseInt($("#id_skill_count").val())+1);
                }
              }
        );





        $('.px').change(function() {
            var cnt = $("input[name=skill_checkbox]:checkbox:checked").length;
            $("#id_skill_count").val(cnt);
//            if(cnt >= 3){
//
//                 alert("The only two choices.")
//            }else{
                $("#id_skill_value1").val("");
                $("#id_skill_value2").val("");
                $("input:checkbox[name=skill_checkbox]:checked").each(function(index)
                {
                    //console.log(index);
                    count = index+1
                    $("#id_skill_value"+count).val(this.value)
                });
//            }
        });
    }


    $localexpertlisting = $("#local-expert-listing");

    if($localexpertlisting.length>0) {

        $(".class_top").removeClass("class_top");

        if( $("#reservation_change_id").val() != ""){

            $(".nav.nav-tabs.text-center>li").removeClass("active");
            $(".add").addClass('active');

            $("#listing").removeClass("active");
            $("#add").addClass("active");
            $("#radio_custom_made").prop("checked", true);
            $("a[href='#custom_made-form']").tab('show');

        }
        else{
            today = get_today();

            $("#start_date").val(today);
            $("#end_date").val(today);
        }

        $('#start_date').datetimepicker({
            pickTime: false
        });
        $('#end_date').datetimepicker({
            pickTime: false
        });

        $('#start_time').datetimepicker({
             format: 'HH:mm',
            pickDate: false,
            pickSeconds: false,
            pick12HourFormat: false
        });
        $('#end_time').datetimepicker({
            format: 'HH:mm',
            pickDate: false,
            pickSeconds: false,
            pick12HourFormat: false
        });

        $("#listing table tr").each(function(){
//           console.log($(this).attr('data-guide-user-id'), $("#id_user_id").val())
            if($(this).attr('data-guide-user-id')){
                if($(this).attr('data-guide-user-id') != $("#id_user_id").val()){
                    $(this).css('display', 'none');
                }
            }

        });


        $("#user_name").select2();
        $("#user_name").on('change', function(){
//            console.log($("#user_name").select2("val"))
            var user_id = $("#user_name").select2("val");
            $.ajax({
                url: "/get_user_profile/"+user_id,
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    console.log(data.data)
                    console.log(data.data.email)
                    $("#user_email").val(data.data.email);
                    $("#user_mobile").val(data.data.mobile);
                }
            });
        });

        $ideaspage = $("#ideas-page");

        if($ideaspage.length>0){

            $(document).on("change", "input[type='radio'][name^='form_style']", function() {
                var form_style_id = $(this).attr('name').replace("form_style", "");
                var check_form_style = $(this).attr('id');

                if (check_form_style == "style1") {
                    $("#max_text" + form_style_id).text("470");
                }
                else if (check_form_style == "style2") {
                    $("#max_text" + form_style_id).text("900");
                }
                else if (check_form_style == "style3") {
                    $("#max_text" + form_style_id).text("580");
                }
                else if (check_form_style == "style4") {
                    $("#max_text" + form_style_id).text("1200");
                }

            });

        }

        $("#check_type #experiences").on("click", function(){
            $("a[href='#experiences-form']").tab('show')
        });
        $("#check_type #tab_experiences").on("click", function(){
            $("#experiences").prop("checked", true);

        });
        $("#check_type #ideas").on("click", function(){
            $("a[href='#ideas-form']").tab('show');
        });
        $("#check_type #tab_ideas").on("click", function(){
            $("#ideas").prop("checked", true);
        });

        $("#radio_custom_made").on("click", function(){
            $("a[href='#custom_made-form']").tab('show');
        });

        $("#tab_custom_made").on("click", function(){
            $("#radio_custom_made").prop("checked", true);
        });

        $("#tab_details").on("click", function(){
           var return_value = valid_check_product();
           if( return_value == true) {
               $("#tab_ul").children().removeClass("active");
               $("#tab_ul>li:nth-child(2)").addClass("active");
               $("#overview").removeClass("active");
               $("#details").addClass("active")
           }else{
               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
               return false;
           }
        });

        $("#id_form_local_expert_add #preview").on("click", function(){
           $("#id_save_value").val("preview");
           $("#status_loading_background").css('display', 'block');
           $("#status_loading").css('display', 'block');
        });


        $("#custom_btn").on('click', function(){
            var return_value = valid_custom();
            if( return_value == true) {
            }
            else {
                $(".form-group").removeClass("has-error");
                $("#"+return_value).focus().parents(".form-group").addClass("has-error");
                return false;
            }
        });

        $("#id_custom_made_form").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    $("#reservation_change_id").val("");
                    window.location.href = '/local_expert/listing/';
                }

            },
            error: function(data) {
                console.log("error");
                alert("Unknown error");
            }
        });

        $("#id_form_travel_ideas").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            beforeSubmit : function(arr, $form, options){
                $("#status_loading_background").css('display', 'block');
                $("#status_loading").css('display', 'block');
           },
            success: function(data) {

                alert(data.message);
                $("#status_loading_background").css('display', 'none');
                $("#status_loading").css('display', 'none');

                if(data.status=="success") {
                    if(data.data.return_message == "publish-ideas"){
                        window.location.reload(false);
                    }
                    else if(data.data.return_message == "preview-ideas"){
                        $("#id_idea_id").val(data.data.pk);
//                        alert(data.data.pk);
                        for(var page_index in data.data.page_list) {
                            $("#page_pk" + (parseInt(page_index)+1)).val(data.data.page_list[page_index]);
                        }
                        for(var map_index in data.data.map_list) {
                            $("#map_pk" + (parseInt(map_index)+1)).val(data.data.map_list[map_index]);
                        }
                        window.open("/travel_ideas/"+data.data.pk, "_blink")
                    }
                    else if(data.data.return_message == "cover-save"){
                        $("#id_idea_id").val(data.data.pk)
                    }
                    else if (data.data.return_message == "page-save") {
                        $("#id_idea_id").val(data.data.pk);
                        for(var page_index in data.data.page_list) {
                            $("#page_pk" + (parseInt(page_index)+1)).val(data.data.page_list[page_index]);
                        }
                    }
                    else if (data.data.return_message == "map-save") {
                        $("#id_idea_id").val(data.data.pk);
                        for(var page_index in data.data.page_list) {
                            $("#page_pk" + (parseInt(page_index)+1)).val(data.data.page_list[page_index]);
                        }
                        for(var map_index in data.data.map_list) {
                            $("#map_pk" + (parseInt(map_index)+1)).val(data.data.map_list[map_index]);
                        }
                    }
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error");
            }
        });

        $("#id_form_local_expert_add").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            beforeSubmit : function(arr, $form, options){
                $("#status_loading_background").css('display', 'block');
                $("#status_loading").css('display', 'block');
           },
            success: function(data) {
                alert(data.message);
                $("#status_loading_background").css('display', 'none');
                $("#status_loading").css('display', 'none');

                if(data.status=="success") {
                    //window.location.reload(false);
                    if(data.message == "Changes saved") {

//                        console.log(data.data);

                        $("#id_product").val(data.data.product_id);

                        var price_list = data.data.price_list;
//                        console.log("price_list : "+price_list);

                        if(price_list.length > 0){
                            for(var index in price_list){
//                                console.log((parseInt(index)+1) + "  "+ price_list[index]);
                                $("#id_pk_price"+(parseInt(index)+1)).val(price_list[index]);
                            }
                        }

                        var spot_list = data.data.spot_list;
//                        console.log("spot_list ; "+spot_list);
                        if(spot_list.length > 0){
                            for(var index in spot_list){
//                                console.log((parseInt(index)+1) +"  "+ spot_list[index]);
                                $("#spot_"+(parseInt(index)+1)).val(spot_list[index]);
                            }
                        }

                        //$("a[href='#details']").tab('show');
                        //페이지 overview 에서 detail 로 이동
                        $("#tab_ul").children().removeClass("active");
                        $("#tab_ul>li:nth-child(2)").addClass("active");
                        $("#overview").removeClass("active");
                        $("#details").addClass("active");
                    }
                    else if(data.message == "Preview"){
                        window.open("/experiences/"+data.data, "_blink")

                    }
                    else{
                        window.location.reload(false);
                    }
                    //$("#tab_overview").removeClass('active');
                    //$("#tab_details").addClass('active');

                }
                else if(data.status == "error"){
                    //alert(data.status)
                }

            },
            error: function(data) {
                $("#status_loading_background").css('display', 'none');
                $("#status_loading").css('display', 'none');
                console.log("error");
                alert("Unknown error");
            }
        });


        $(document).on("change", "input[type='file']", function() {
            if($(this).attr("name") == "idea_main_photo"){

                var cover_img_name = $("input[type='file'][name='idea_main_photo']")[0].files[0].name;
                //var cover_img_name1 = $("input[type='file'][name='idea_main_photo']")[0].files;
                //console.log(cover_img_name1)
                $("#idea_cover_image_text").val(cover_img_name);
                $("#idea_cover_div").css("display", "block");

            }
            else if($(this).attr("name") == "product_main_photo"){

                var cover_img_name = $("input[type='file'][name='product_main_photo']")[0].files[0].name;
                //var cover_img_name1 = $("input[type='file'][name='idea_main_photo']")[0].files;
                //console.log(cover_img_name)
                $("#product_cover_image_text").val(cover_img_name);
                $("#product_cover_div").css("display", "block");
            }
            else{
                var compare_id = $(this).attr("id").replace("id_photo", "").replace("id_idea_photo", "");
                console.log("compare_id : ", compare_id)
                var check_type = 0;
                if( $(this).parent().attr("id") == "product_image_file"+compare_id ){
                    check_type = "product";
                }else if( $(this).parent().attr("id") =="idea_photo"+compare_id){
                    check_type = "idea";
                }

                var data = new FormData();
                var count = 0
                $.each($('#'+this.id)[0].files, function(i, file) {
                    data.append('file-' + i, file);
                    count++;
                });
                //console.log(count);
                if(count == 0){
                    return false
                }
                if(check_type =="product") {
                    location_photo = $("#id_location_photos" + this.id.replace("id_photo", "")).val().split(",");

                    var photo_list_count = $("#id_location_photos_count_"+compare_id).val();
//                    console.log("count : "+ photo_list_count);
//                    console.log("location_photo.length :", location_photo.length);
//                    console.log("사진갯수 : ", location_photo.length + count)
                    if (parseInt(photo_list_count) + parseInt(count) > 5) {
                        alert("Only five picture for this page style.");
                        return false
                    }
                    else {
                        $("#loading_"+this.id.replace("id_photo", "")).css("display", 'block');
                        listing_product_file_upload(data, this.id);
                    }
                }else if(check_type == "idea"){

                    //console.log("photo count : "+ count);

                    var this_picture_count = $("#id_idea_photos_list"+compare_id).val().split(",").length;
                    if($("#id_idea_photos_list"+compare_id).val() == ""){
                        this_picture_count = 0;
                    }

                    var check_form_style = $("input[name='form_style"+compare_id+"']:checked").attr("id");
                    //console.log(check_form_style)
                    if(check_form_style == "style1" && count+this_picture_count > 1) {
                        alert("Only one picture for this page style.");
                        return false
                    }else if(check_form_style == "style2" && count+this_picture_count > 3) {
                        alert("Only three pictures for this page style.");
                        return false
                    }else if(check_form_style == "style3" && count+this_picture_count > 2) {
                        alert("Only two pictures for this page style.");
                        return false
                    }else if(check_form_style == "style4" && count+this_picture_count > 1) {
                        alert("Only one picture for this page style.");
                        return false
                    }
                    else {
                        $("#loading_idea_"+compare_id).css("display", 'block');
                        listing_idea_file_upload(data, compare_id)
                    }
                }
            }
        });

        function listing_idea_file_upload(data, photo_id){
            $.ajax({
                url: "/idea/photo/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    var idea_id = photo_id;
                    var id_upload_photo_pk_list = []
                    var id_upload_photo_name_list = []
                    for( index_data in data.data){
                        id_upload_photo_pk_list.push(data.data[index_data].pk);
                        id_upload_photo_name_list.push(data.data[index_data].title);

                    }
                    if($('#id_idea_photos_list'+idea_id).val() != ""){
                       $('#id_idea_photos_list' + idea_id).val($('#id_idea_photos_list' + idea_id).val()+","+id_upload_photo_pk_list);
                    }else {
                        $('#id_idea_photos_list' + idea_id).val(id_upload_photo_pk_list);
                    }
                    //var img_url = data.data.photo_url;
                    //console.log(id_upload_photo_name_list)
                    //console.log($("#id_idea_image_file"+idea_id).children().last().attr('id'));

//                    var last_child_id = $("#id_idea_image_file"+idea_id).children().last().attr('id');
//                    console.log("last_child_id :"+last_child_id + "  idea_id:"+idea_id)
//                    var image_input_number = 0
//                    if(last_child_id != "id_idea_photos_list"+idea_id){
//                        image_input_number = last_child_id.replace("id_idea_" + idea_id + "_image_", "");
//                        image_input_number = parseInt(image_input_number) + 1;
//                    }


                    for(image_temp in id_upload_photo_name_list) {
                        var image_count = $("#idea_photos_list_count_"+idea_id).val();
                        image_count = parseInt(image_count)+1;
                        $("#idea_photos_list_count_"+idea_id).val(image_count);


                        $("#id_idea_image_file"+idea_id).append("<input type='text' value='" + id_upload_photo_name_list[image_temp] + "' id='id_idea_" + idea_id + "_image_" +
                            image_count + "'> "+
                            "<input type='hidden' value='" + id_upload_photo_pk_list[image_temp] + "' id='id_idea_" + idea_id + "_image_pk_" +
                            image_count + "'> "+
                        "<input type='button 'id='id_idea_"+idea_id+"_image_delete_"+image_count+
                            "' value='X' onclick='javascript:delete_image_idea(this.id)'>");

                    }

                    $("#loading_idea_"+idea_id).css("display", 'none');
                }
            });
        }


        function listing_product_file_upload(data, photo_id){
            console.log("pass")
            $.ajax({
                url: "/listing/photo/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    var input_text = photo_id.replace("id_photo", "");
                    var id_upload_photo_pk_list = []
                    var id_upload_photo_name_list = []
                    for( index_data in data.data){
                        //console.log(data.data[index_data].pk);
                        //console.log(data.data[index_data].title);
                        id_upload_photo_pk_list.push(data.data[index_data].pk);
                        id_upload_photo_name_list.push(data.data[index_data].title);

                    }
                    if($('#id_location_photos'+input_text).val() != ""){
                       $('#id_location_photos' + input_text).val($('#id_location_photos' + input_text).val()+","+id_upload_photo_pk_list);
                    }else {
                        $('#id_location_photos' + input_text).val(id_upload_photo_pk_list);
                    }
                    //var img_url = data.data.photo_url;
//                    console.log(id_upload_photo_name_list)
//                    console.log($("#id_add_image_file"+input_text).children().last().attr('id'));
//
//                    last_child_id = $("#id_add_image_file"+input_text).children().last().attr('id');
//
//                    var image_input_number = 0
//                    if(last_child_id != "id_location_photos"+input_text){
//                        image_input_number = last_child_id.replace("id_" + input_text + "_image_", "");
//                        image_input_number = parseInt(image_input_number) + 1;
//                    }

                    for(image_temp in id_upload_photo_name_list) {
                        var photo_list_count = $("#id_location_photos_count_"+input_text).val();
                        $("#id_location_photos_count_"+input_text).val(parseInt(photo_list_count)+1);
                        //console.log($("#id_location_photos_count_"+input_text).val());


                        $("#id_add_image_file"+input_text).append("<input type='text' value='" + id_upload_photo_name_list[image_temp] + "' id='id_" + input_text + "_image_" +
                            parseInt(photo_list_count) + "'> "+
                            "<input type='hidden' value='" + id_upload_photo_pk_list[image_temp] + "' id='id_" + input_text + "_image_pk_" +
                            parseInt(photo_list_count) + "'> "+
                        "<input type='button 'id='id_"+input_text+"_image_delete_"+parseInt(photo_list_count)+
                            "' value='X' onclick='javascript:delete_image(this.id)'>");


                    }
                    $("#loading_"+input_text).css("display", 'none');
                    //$("#guide-image").attr('src',"/../../resource/"+img_url);
                    //$("#guide_image_pk").val(data.data.photo_pk);
                }
            });
        }


        $('.theme_select_box').change(function() {
//            var cnt = $("input[name=theme_checkbox]:checkbox:checked").length;
//            console.log(cnt)
//            var checked_theme_list = $("input[name=theme_checkbox]:checkbox:checked");
//            console.log(checked_theme_list)
//            for( var index in checked_theme_list){
//                console.log(checked_theme_list[index])
//            }
//            $("#id_theme_count").val(cnt);
//            if(cnt > 2){
//
//                 alert("두개만 선택 가능합니다.")
//            }else{
//                $("#id_theme_value1").val("");
//                $("#id_theme_value2").val("");
//                $("input:checkbox[name=theme_checkbox]:checked").each(function(index)
//                {
//                    //console.log(index);
//                    count = index+1
//                    $("#id_theme_value"+count).val(this.value)
//                });
//            }
        });


        $(document).on("change", "input[type='checkbox']", function() {
            /*var cnt = $("input[name=theme_checkbox]:checkbox:checked").length;
            $("#id_theme_count").val(cnt);
            if(cnt > 2){

                 alert("두개만 선택 가능합니다.")
            }else{
                $("#id_theme_value1").val("");
                $("#id_theme_value2").val("");
                $("input:checkbox[name=theme_checkbox]:checked").each(function(index)
                {
                    //console.log(index);
                    count = index+1
                    $("#id_theme_value"+count).val(this.value)
                });
            }*/

            //console.log($(this).attr('name'));
            var theme_value_name = $(this).attr('name').replace("idea_theme_", "ides_theme_value_");
            var theme_count_name = $(this).attr('name').replace("idea_theme_", "ides_theme_count_");
            var theme_count = $(this).attr('name').replace("idea_theme_", "");
//            console.log(theme_value_name)
//            console.log(theme_count_name)
//            console.log(theme_count)
            var cnt = $("input[name=idea_theme_"+theme_count+"]:checkbox:checked").length;
            $("#ides_theme_count_"+theme_count).val(cnt);
//            console.log(cnt)
            if(cnt > 5){
                 alert("다섯개까지 선택 가능합니다.")
            }else{
//                console.log("pass")

                $("#"+theme_value_name+"_1").val("");
                $("#"+theme_value_name+"_2").val("");
                $("#"+theme_value_name+"_3").val("");
                $("#"+theme_value_name+"_4").val("");
                $("#"+theme_value_name+"_5").val("");

                $("input[name=idea_theme_"+theme_count+"]:checkbox:checked").each(function(index)
                {
                    //console.log(index);
                    count = index+1
                    $("#"+theme_value_name+"_"+count).val(this.value)
                });
            }
        });

         $('#id_add_price').click(function(){
            add_price();
        });


        $('#id_add_spot').click(function(){
            add_spot();
        });

        $('#add-page').click(function(){
            add_page();
        });

       $("#next").click(function(){
           var return_value = valid_check_product();
           if( return_value == true) {
               $("#tab_ul").children().removeClass("active");
               $("#tab_ul>li:nth-child(2)").addClass("active");
               $("#overview").removeClass("active");
               $("#details").addClass("active");
           }else{
               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
           }
        });

        $("#previous").click(function(){
           $("#tab_ul").children().removeClass("active");
           $("#tab_ul>li:nth-child(1)").addClass("active");
           $("#details").removeClass("active");
           $("#overview").addClass("active");
        });

        $("#ideas_next_page_1").click(function(){
           var return_value = valid_check_idea_first();
           if( return_value == true) {
               $("#idea_menu").children().removeClass("active");
               $("#idea_menu>li:nth-child(2)").addClass("active");
               $("#cover").removeClass("active");
               $("#ideas-page").addClass("active");
           }else{
               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
           }
        });

        $("#move_to_page").click(function(){

           var return_value = valid_check_idea_first();
           if( return_value == true) {
           }else{

               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
               return false;
           }
        });


       $("#ideas_previous_page_2").click(function(){

           $("#idea_menu").children().removeClass("active");
           $("#idea_menu>li:nth-child(1)").addClass("active");
           $("#ideas-page").removeClass("active");
           $("#cover").addClass("active");

       });

        $("#ideas_next_page_2").click(function(){
           var return_value = valid_check_idea_second();
           if( return_value == true) {

               $("#idea_menu").children().removeClass("active");
               $("#idea_menu>li:nth-child(3)").addClass("active");
               $("#ideas-page").removeClass("active");
               $("#map").addClass("active");
           }else{
                $(".form-group").removeClass("has-error");
                $("#"+return_value).focus().parents(".form-group").addClass("has-error");
               return false;
           }

        })

        $("#move_to_map").click(function(){

           var return_value = valid_check_idea_first();
           if( return_value == true) {
           }else{

               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
               return false;
           }

           var return_value = valid_check_idea_second();
           if( return_value == true) {
           }else{

               $(".form-group").removeClass("has-error");
               $("#"+return_value).focus().parents(".form-group").addClass("has-error");
               return false;
           }
        });

        $("#ideas_previous_page_3").click(function(){
           $("#idea_menu").children().removeClass("active");
           $("#idea_menu>li:nth-child(2)").addClass("active");
           $("#map").removeClass("active");
           $("#ideas-page").addClass("active");
        });


        $localexpertlisting.on("click", ".btn-delete", function() {
            if(confirm("Are you sure you want to delete this?")) {
                var product_id = $(this).parents("tr").attr("data-product-id");
                var idea_id = $(this).parents("tr").attr("data-idea-id");

                var nodes = $(this).parents("tr").children("td.theme").text();
                var url = "/local_expert/listing/delete/"
                if( nodes == "Travel ideas"){
                    url = "/travel_ideas/delete/"
                }
                //console.log(url);
                $.ajax({
                    url: url,
                    dataType: "json",
                    type: "post",
                    data: {"product_id":product_id, "idea_id":idea_id},
                    success: function (data) {
                        alert(data.message);
                        if (data.status == "success") {
                            window.location.reload(false);
                        }

                    }
                });


            }
        });

        function update_idea(idea_id){
            $("#ideas").prop("checked", true);
            $("ul.nav.nav-tabs.text-center li:eq(0)").removeClass("active");
            $("ul.nav.nav-tabs.text-center li:eq(1)").addClass("active");
            $("#listing").removeClass("active");
            $("#add").addClass("active");
            $("#experiences-form").removeClass("active");
            $("#ideas-form").addClass("active");

            var $tr = $("*[data-idea-id="+idea_id+"]");
            var title = $tr.find(".title").text();
            var overview = $tr.find(".overview").text();
            var main_image_title = $tr.find(".main_image_title").text();
            var main_image_title_url = $tr.find(".main_image_title_url").text();
            $("#idea_cover_image_text").addClass("down_image");
            $("#idea_cover_picture").append("<a href='' download='' id='idea_cover_image' class='down_url'><img src='/static/img/down.png'></a>");


            $("#idea_cover_image").prop("download", main_image_title);
            $("#idea_cover_image").prop("href", "/resource/"+main_image_title_url);


           var $modal = $("#id_form_travel_ideas");

           $modal.find("[name=idea_id]").val(idea_id);
           $modal.find("[name=idea_title]").val(title);
           $modal.find("[name=idea_sub_title]").val(overview);
           if(main_image_title != "None"){
                $("#idea_cover_image_text").val(main_image_title);
                $("#idea_cover_div").css("display", "block");
           }

            $.ajax({
                url: "/idea/page/" + idea_id + "/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {

                    console.log(data.data)
                    list_len = data.data.length;
                    for( var index=0; index<list_len; index++){
                        //console.log(data.data[index]);
                        if( index >=1){
                            add_page();
                        }
                        $("#page_pk"+(index+1)).val(data.data[index].pk);
                        $("input:radio[name='form_style"+(index+1)+"'][value='"+data.data[index].status+"']").attr("checked", true);
                        $("#page_title"+(index+1)).val(data.data[index].title);
                        $("#page_description"+(index+1)).val(data.data[index].description);
                        var javascript_this = $("#page_description"+(index+1)).get(0);
                        textarea_count(javascript_this);

                        //console.log("page_overview"+(parseInt(index)+1));
                        $("#page_overview"+(parseInt(index)+1)).val(data.data[index].overview);

                        $("#page_country"+(index+1)+" option[value="+data.data[index].country+"]").attr('selected', 'selected');
                        $("#page_region"+(index+1)+" option[value="+data.data[index].region+"]").attr('selected', 'selected');

                        for( theme_index in data.data[index].themes){
                            $("input:checkbox[name='idea_theme_"+(index+1)+"'][value='"+data.data[index].themes[parseInt(theme_index)]+"']").attr("checked", true);
                            $("#ides_theme_value_"+(index+1)+"_"+(parseInt(theme_index)+1)).val(data.data[index].themes[parseInt(theme_index)]);
                        }
                        $("#ides_theme_count_"+(index+1)).val(data.data[index].themes.length);


                        $("#idea_photos_list_count_"+(index+1)).val(data.data[index].image.length);
                        for(image_index in  data.data[index].image) {

                            if($('#id_idea_photos_list'+(index+1)).val() != ""){
                               $('#id_idea_photos_list' + (index+1)).val($('#id_idea_photos_list' + (index+1)).val()+","+data.data[index].image[image_index].pk);
                            }else {
                                $('#id_idea_photos_list' + (index+1)).val(data.data[index].image[image_index].pk);
                            }

                            $("#id_idea_image_file"+(index+1)).append("<input type='text' class='down_image' value='" + data.data[index].image[image_index].img_title + "' id='id_idea_" + (index+1) + "_image_" +
                                (parseInt(image_index)+1) + "'> "+
                                "<input type='hidden' value='" +  data.data[index].image[image_index].pk + "' id='id_idea_" + (index+1) + "_image_pk_" +
                                (parseInt(image_index)+1) + "'> "+
                            "<input type='button 'id='id_idea_"+(index+1)+"_image_delete_"+(parseInt(image_index)+1)+
                                "' value='X' onclick='javascript:delete_image_idea(this.id)'><a class='down_url' id='down_url_"+ (index+1) +"_"+(parseInt(image_index)+1)+"' href='/resource/"+data.data[index].image[image_index].image_url+"' download='"+data.data[index].image[image_index].img_title+"' ><img src='/static/img/down.png'></a> ");
                        }
                    }
                }
            });


            $.ajax({
                url: "/idea/map/" + idea_id + "/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    console.log(data.data)
                    list_len = data.data.length;
                    for( var index=0; index<list_len; index++){
                        $("#map_pk"+(parseInt(index+1))).val(data.data[index].pk);
                        $("#idea_description"+(parseInt(index+1))).val(data.data[index].description);

                        var javascript_this = $("#idea_description"+(index+1)).get(0);
                        textarea_count(javascript_this);

                        if( data.data[index].area_name != "None") {

                            $("#idea_search_adress" + (parseInt(index + 1))).val(data.data[index].search_address);
                            $('#idea_location' + (parseInt(index + 1))).append($('<option></option>', {
                                value: data.data[index].location_value,
                                text: data.data[index].location
                            }));
                        }

                    }
                }
            });

        }

       $localexpertlisting.on("click", ".btn-update-idea", function() {
            var $tr = $(this).parents("tr");
            var idea_id = $tr.attr("data-idea-id");
            update_idea(idea_id);
       });

        function update_product(product_id){
            $("ul.nav.nav-tabs.text-center li:eq(0)").removeClass("active");
            $("ul.nav.nav-tabs.text-center li:eq(1)").addClass("active");
            $("#listing").removeClass("active");
            $("#add").addClass("active");

            var $tr = $("*[data-product-id="+product_id+"]");
            var product_id = $tr.attr("data-product-id");
            var title = $tr.find(".title").text();
            var overview = $tr.find(".overview").text();
            var country = $tr.find(".country").text();
            var region = $tr.find(".region").text();
            var themes = $tr.find(".themes").text();
            var duration = $tr.find(".duration").text();
            var duration_type = $tr.find(".duration_type").text();
            var price = $tr.find(".price").text();
            var min = $tr.find(".min").text();

            var max = $tr.find(".max").text();
            var option_inclusion = $tr.find(".option_inclusion").text();
            var option_exclusion = $tr.find(".option_exclusion").text();
            var video_link = $tr.find(".video_link").text();
            var main_image_title = $tr.find(".main_image_title").text();
            var main_image_title_url = $tr.find(".main_image_title_url").text();
            $("#product_cover_image_text").addClass("down_image");
            $("#cover_picture").append("<a href='' download='' id='product_cover_image' class='down_url'><img src='/static/img/down.png'></a>");

            $("#product_cover_image").prop("download", main_image_title);
            $("#product_cover_image").prop("href", "/resource/"+main_image_title_url);

            //console.log(title, overview, country, region, themes, duration, duration_type, price, option_inclusion, option_exclusion, video_link)


            var $modal = $("#id_form_local_expert_add");

            $modal.find("[name=product_id]").val(product_id);
            $modal.find("[name=title]").val(title);
            $modal.find("[name=overview]").val(overview);
            $("[name=country] option[value="+country+"]").attr('selected', 'selected');
            $("[name=region] option[value="+region+"]").attr('selected', 'selected');
            theme_list = themes.substr(1,themes.length).split(',')
            for( i_theme in theme_list){
                $("#id_"+theme_list[i_theme]).attr("checked", true);
            }
            $("input:checkbox[name=theme_checkbox]:checked").each(function(index)
            {
                //console.log(index);
                count = index+1
                $("#id_theme_value"+count).val(this.value)
            });


            price = price.replace(/\s/g,'');
            price_list = price.split(',');
            for( i_price in price_list){
                if(price_list[i_price] != ""){
                    //console.log(price_list[i_price]);

                    if(i_price>=1){
                        add_price();
                    }
                    price_count = parseInt($("#id_price_count").val())
                    //console.log(price_count)
                    price_temp = price_list[i_price].split('/');
                    $("#id_pk_price"+price_count).val(price_temp[0]);
                    $("#id_from_price"+price_count).val(price_temp[1]);
                    $("#id_to_price"+price_count).val(price_temp[2]);
                    $("#id_price"+price_count).val(price_temp[3]);

                    if (price_temp[4] == "per_persion") {
                        $("input:radio[name=level"+price_count+"]")[0].checked = true;
                    } else {
                        $("input:radio[name=level"+price_count+"]")[1].checked = true;
                    }
                }
            }


            $modal.find("[name=duration]").val(duration);
            $("[name=duration_type] option[value="+duration_type+"]").attr('selected', 'selected');
            $modal.find("[name=group_min]").val(min);
            $modal.find("[name=group_max]").val(max);
            $modal.find("[name=included]").val(option_inclusion);
            $modal.find("[name=excluded]").val(option_exclusion);
            $modal.find("[name=video_link]").val(video_link);

            $("#product_cover_image_text").val(main_image_title);
            $("#product_cover_div").css("display", "block");

            $.ajax({
                url: "/listing/spot/"+product_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    var spot_data_list = data.data;
                    //console.log(spot_data_list)
                    for(i_spot in spot_data_list){
                        if(i_spot>=1){
                            //console.log("pass")
                            add_spot();
                        }

                        $("#spot_title"+(parseInt(i_spot)+1)).val(spot_data_list[i_spot].spot_title)
                        $("#description"+(parseInt(i_spot)+1)).text(spot_data_list[i_spot].desc)
                        $("#search_adress"+(parseInt(i_spot)+1)).val(spot_data_list[i_spot].area_name)
                        $("#spot_location"+(parseInt(i_spot)+1)).append("<option value='"+spot_data_list[i_spot].area_name+
                            "_"+spot_data_list[i_spot].address+"_"+spot_data_list[i_spot].x_coordinates+"_"+
                            spot_data_list[i_spot].y_coordinates+"'selected>"+spot_data_list[i_spot].area_name+
                            "-"+spot_data_list[i_spot].address+"</option>");
                        $("#spot_"+(parseInt(i_spot)+1)).val(spot_data_list[i_spot].pk);
                        var photos_pk_list = "";
                        $("#id_location_photos_count_"+(parseInt(i_spot)+1)).val(spot_data_list[i_spot].images.length);
                        for(image_temp in spot_data_list[i_spot].images) {
                           //console.log(spot_data_list[i_spot].images[image_temp].pk);
                           //console.log(spot_data_list[i_spot].images[image_temp].photo_title);

                            $("#id_add_image_file"+(parseInt(i_spot)+1)).append("<input type='text' class='down_image' value='" + spot_data_list[i_spot].images[image_temp].photo_title + "' id='id_" +(parseInt(i_spot)+1) + "_image_" +
                            image_temp+ "'> "+"<input type='hidden' value='" + spot_data_list[i_spot].images[image_temp].pk + "' id='id_" +(parseInt(i_spot)+1) + "_image_pk_" +
                            image_temp + "'> "+"<input type='button 'id='id_"+(parseInt(i_spot)+1) +"_image_delete_"+image_temp+
                            "' value='X' onclick='javascript:delete_image(this.id)'><a class='down_url' href='/resource/"+spot_data_list[i_spot].images[image_temp].image_url+"' download='"+spot_data_list[i_spot].images[image_temp].photo_title+"' ><img src='/static/img/down.png'></a>"
                            );
                            photos_pk_list += ","+spot_data_list[i_spot].images[image_temp].pk;
                        }
                        photos_pk_list  = photos_pk_list.replace(",","");
                        $("#id_location_photos"+(parseInt(i_spot)+1)).val(photos_pk_list);

                    }
                }
            });
        }
        $localexpertlisting.on("click", ".btn-update-product", function() {
            var $tr = $(this).parents("tr");
            var product_id = $tr.attr("data-product-id");
            update_product(product_id);

        });

        $("#btn_search_user").on("click", function(){
//            $("#search_user").val();

            $.ajax({
                url: "/search/user/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: { search_user: $("#search_user").val() },
                type: 'POST',
                success: function(data){
                    //console.log(data.data)
                    if(data.message == "success"){
                        $("#custom_made-form #user_email").val(data.data.email);
                        $("#custom_made-form #user_mobile").val(data.data.mobile);
                    }
                    else{
                        alert(data.message);
                    }

                },
                error: function(data) {
                    console.log("error");
                }
            });
        });


        if($("#edit_idea_id").val()){
            var idea_id = $("#edit_idea_id").val();
            update_idea(idea_id);
        }

        if($("#edit_product_id").val()){
            var product_id = $("#edit_product_id").val();
            update_product(product_id);
        }
    }

    $message = $("#message");

    if($message.length>0) {

        $message.on("click", ".delete", function() {
            var $tr = $(this).parents("tr");
            var message_id = $tr.attr("data-message-id");

             $.ajax({
                url: "/message/delete/"+message_id,
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    $tr.css('display', 'none');
                    alert("Your message is deleted.");
                },
                error: function(data) {
                    console.log("error");

                }
            });
        });


         var $accordion = $("#accordion");
         $accordion.on("click", ".btn-primary", function() {

            var $tr = $(this).parents("tr");

            var title_pk = $tr.find(".title_pk").text();
            var title = $tr.find(".title").text().replace(/  /g, '');
            var guide_id = $tr.find(".guide_id").text().replace(/ /g, '');
            var from_user_pk = $tr.find(".from_user_pk").text().replace(/ /g, '');
            var status = $tr.find(".message_status").text().replace(/ /g, '');
            var reservation_pk = $tr.find(".reservation_pk").text().replace(/ /g, '');

            console.log(title_pk);
            console.log(title);
            console.log(guide_id);
            console.log(from_user_pk);
            console.log(status);
            if(status == "traveler_0") {
                status = "traveler_1";
            }else if(status == "traveler_1") {
                status = "traveler_0";
            }

            var $modal = $("#send-message");

            $modal.find("[name=title]").val(title_pk);
            $modal.find("[name=message_title]").val("re : "+title.replace("to:", ""));
            $modal.find("[name=guide_id]").val(guide_id);
            $modal.find("[name=from_user_pk]").val(from_user_pk);
            $modal.find("[name=status]").val(status);
            $modal.find("[name=reservation_pk]").val(reservation_pk);


        });

        $accordion.on("click", ".active", function() {
            var $tr = $(this).parents("tr");
            var message_id = $tr.attr("data-message-id");

             $.ajax({
                url: "/message/click/"+message_id,
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){

                },
                error: function(data) {
                    console.log("error");

                }
            });
        });


    }



    $localexpertschedule = $("#local-expert-schedule");

    if($localexpertschedule.length>0) {


    }


    $localexpertreservation = $("#local-expert-reservation");

    if($localexpertreservation.length>0) {

        $("td > a.active").click(function(){
            if($(this).parent('td').hasClass("click_message")){
                $tr = $(this).parents("tr");
                $tr.children('td').removeClass('click_message');
            }else{
                $tr = $(this).parents("tr");
                $tr.children("td").addClass('click_message');
            }

        })

        $reservationtable = $("#reservation_table");
        $reservationtable.on("click", ".reply", function() {
          var $tr = $(this).parents("tr");

           var reservation_id = $tr.attr("data-reservation-id");
           var user_id = $tr.find(".user").text();
           var user_name = $tr.find(".username").text();
           var guide_id = $tr.find(".guide_id").text();

            $("#reservation_message #user_id").val(user_id);
            $("#reservation_message #reservation_pk").val(reservation_id);
            $("#reservation_message #message_title").val("to : "+user_name);
            $("#reservation_message #guide_id").val(guide_id);

            $("#reservation_message").modal("show");
        })

        $("#send_message_reservation").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $reservationtable.on("click", ".instant", function() {
            var $tr = $(this).parents("tr");

            var reservation_id = $tr.attr("data-reservation-id");

            $.ajax({
                url: "/instant_reservation_confirm/"+reservation_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    //alert(data.data);
                    if(data.status=="success") {
                        alert("confirm success");
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });


        })


        $reservationtable.on("click", ".confirm", function() {
            var $tr = $(this).parents("tr");

            var reservation_id = $tr.attr("data-reservation-id");

            $.ajax({
                url: "/reservation_confirm/"+reservation_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert(data.data);
                    if(data.status=="success") {
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });


        });

        $reservationtable.on("click", ".custom_change", function() {
            var $tr = $(this).parents("tr");

            var reservation_id = $tr.attr("data-reservation-id");

            $.ajax({
                url: "/custom_change/"+reservation_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    if(data.status=="success") {
                        window.location.href='/local_expert/listing/'+reservation_id;
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });
        });

         $reservationtable.on("click", ".guide_confirm", function() {
            var $tr = $(this).parents("tr");

            var reservation_id = $tr.attr("data-reservation-id");
//            alert(reservation_id)
            $.ajax({
                url: "/reservation_confirm/"+reservation_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert(data.data);
                    if(data.status=="success") {
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });
        });


        $reservationtable.on("click", ".cancel", function() {
            var $tr = $(this).parents("tr");

            var reservation_id = $tr.attr("data-reservation-id");
            alert(reservation_id)
//            $.ajax({
//                url: "/reservation_confirm/"+reservation_id+"/",
//                dataType: "json",
//                csrfmiddlewaretoken: csrftoken,
//                processData: false,
//                contentType: false,
//                type: 'POST',
//                success: function(data){
//                    alert(data.data);
//                    if(data.status=="success") {
//                        window.location.reload(true);
//                    }
//                },
//                error: function(data) {
//                    console.log("error");
//                    alert("Unknown error.");
//                }
//            });


        });

    }


    $localexpertpayout = $("#local-expert-payout");

    if($localexpertpayout.length>0) {
         $("#payout_setting").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });
    }

    $travelerreservation = $("#traveler-reservation");

    if($travelerreservation.length>0) {
        var $travelerreservationtable = $("#traveler_reservation_table");

        $travelerreservationtable.on("click", ".message", function(){
            var $tr = $(this).parents("tr");
            var reservation_id = $tr.attr("data-reservation-id");

            var user_id = $tr.find(".user_id").text();
            var guide_name = $tr.find(".guide_name").text();
            var guide_id = $tr.find(".guide_id").text();

            $("#reservation_message #user_id").val(user_id);
            $("#reservation_message #reservation_pk").val(reservation_id);
            $("#reservation_message #message_title").val("to : "+guide_name);
            $("#reservation_message #guide_id").val(guide_id);



            $("#reservation_message").modal("show");
        });

        $("#send_message_reservation").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    $("#reservation_message").modal("hide");
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $travelerreservationtable.on("click", ".cancel", function(){

            var $tr = $(this).parents("tr");
            var reservation_id = $tr.attr("data-reservation-id");

            $.ajax({
                url: "/reservation/cancel/"+reservation_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    alert("Your reservation is canceled.");
                    if(data.status=="success") {
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });

        });
    }

    $travelersetting = $("#traveler-setting");

    if($travelersetting.length>0) {
        var country_selected = $("#countrycode").val();
        $("#select_country_code option[value='"+country_selected+"']").attr("selected", "selected");
        $("#select_country_code").on('change', function(){
           var valueSelected = this.value;
           //console.log(valueSelected)
           $("#mobile-number").val(valueSelected);
        });

        $("#unsubscribe").on('click', function(){
           if (confirm("Are you sure you want to unsubscribe?")) {
               $.ajax({
                url: "/unsubscribe/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                type: 'POST',
                success: function(data){
                    window.location.href='/index/';
                }
              });
           }
        });

        $("#model_traveler_setting").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $("#id_photo").change(function(){
            var data = new FormData();
            $.each($('#id_photo')[0].files, function(i, file) {
                data.append('file-' + i, file);
            });

            $.ajax({
                url: "/profile/photo/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: data,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    console.log(data.data)
                    var img_url = data.data.photo_url;
                    console.log(data.data)
                    console.log(img_url)
                    $("#user-image").attr('src',"/../../resource/"+img_url);
                    $("#profile_image_pk").val(data.data.photo_pk);

                }
              });
        });


        $("#model_traveler_setting_password").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });
    }



    $travelerclips = $("#traveler-clips");

    if($travelerclips.length>0) {
        $(".cancel").on("click", function(){
           var $tr = $(this).parents("tr");
           var clip_id = $tr.attr("data-clip-id");

           $.ajax({
                url: "/clip/delete/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: {
                  "clip_id": clip_id
                },
                type: 'POST',
                success: function(data){
                    alert(data.message);
                    if(data.status=="success") {
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });
        });
    }

    $article = $("#id_article");
    if($article.length>0) {
//        var facebook_img_meta = "<meta property='og:image' content="+$('#main_image').val()+'>';
//        $('head').append(facebook_img_meta);

        function chat_string_create_urls(input)
        {
            return input
                .replace(/(ftp|http|https|file):\/\/[\S]+(\b|$)/gim,
                '<a href="$&" class="my_link" target="_blank" style="word-break: break-all;">$&</a>')
                .replace(/([^\/])(www[\S]+(\b|$))/gim,
                '$1<a href="http://$2" class="my_link" target="_blank">$2</a>');
        }
        $(".map .desc").each(function(){
            var note = $(this).text();
            note = note.replace(/\n/gi, "<br>");
            $(this).html(chat_string_create_urls(note));
        });


//        $("#navbar-scroll").hide();

        var $navbarScroll = $("#navbar-scroll");

        if($("#ideas-navbar-scroll").length > 0){
            $navbarScroll = $("#ideas-navbar-scroll");
        }
        $("#ideas-navbar-scroll").addClass("class_top");
         if($(window).width()>767) {
            $(document).scroll(function(){
                var scrollTop = $(this).scrollTop();

                if(scrollTop<=20) {
                    //$navbarScroll.fadeOut(time);
                    //$navbarScroll.fadeTo(time, 0.10);
                    //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
                    //$("#navbar-scroll").addClass("class_top");
                    $("#ideas-navbar-scroll").addClass("class_top")

                }
                else {
                    //$navbarScroll.fadeIn(time, 0.99);
                    //$navbarScroll.fadeTo(time, 1);
                    //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
                    //$("#navbar-scroll").removeClass("class_top");
                    $("#ideas-navbar-scroll").removeClass("class_top")
                    //console.log("ASDF")
                }
            });
        }else {
            $navbarScroll.show();
        }


        if($(window).width() < 768){
            $("#fullpage").removeAttr('id');
            //$(".full-page").removeClass('section');
            //$(".full-screen").removeClass('full-screen');
            //$(".full").removeClass('full');
            //$(".full-page").removeClass('full-page');
//            var $node = $(".full-screen").children();
//
//            //console.log($node)
//            $node.each(function(){
//                var node_temp = this;
//                node_temp.removeClass('section');
//            })
        }
        else {
            $('#fullpage').fullpage({
                scrollingSpeed: 500,
                //sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
                //css3: true
                onLeave: function(index, nextIndex, direction){
                    //console.log("1"+" "+index+" "+direction);
                },
                afterLoad: function(anchorLink, index){
                    //console.log("2"+ " " + index);
                    if(index == 1){
                        $("#ideas-navbar-scroll").addClass("class_top")
                    }else{
                        $("#ideas-navbar-scroll").removeClass("class_top")
                    }
                },
                afterRender: function(){
                    //console.log("3")
                },
                afterResize: function(){
                    //console.log("4");
                    $("body").removeAttr( 'style' );
                },
                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                    //console.log("5")
                },
                onSlideLeave: function(anchorLink, index, slideIndex, direction){
                    //console.log("6")
                }
            });
        }

        $("#id_comment_add").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });

        //찜(save)
        $("#save").on("click", function(){
            var product_id = $("#idea_pk").val();
            var SendInfo= [];
            var data = {
                status:"idea"
            }

            SendInfo.push(data);

            $.ajax({
                url: "/content/save/"+product_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: JSON.stringify(SendInfo),
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                    if(data.message == "not login"){
                        alert("Log-in required.");
                        $("#login").modal("show");
                    }else {
                        alert(data.data);
                    }
                },
                error: function(data) {

                    console.log("error");
                    alert("Unknown error.");

                }
            });


        });


        var name_list = ['', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        var image_name_list = ['a', 'b', 'c', 'd', 'e', 'f'];
        var count = 1;
        var map_maker_count = 1; 
        var map_maker_list = []
        for(var index=1; index<=6; index++){
//            console.log($("#line_"+index).text().length);
            if($("#map"+index).val() == 'None'  &&  $("#line_"+index).text().length < 30){
                $("#line_"+index).css("display", "none");
            }else{
                $("#line_"+index+" strong").text(name_list[count]);
                if ($("#x_coordinates_" + index).val() != "None" && $("#x_coordinates_" + index).val().length > 2) {
                    map_maker_list.push(count - 1);
                }
                count++;
            }
        }


//        console.log(map_maker_list)

        var latlng = new google.maps.LatLng(35.81905,127.8733);

        var mapOptions = {
          zoom: 6,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        if($("#map_view").val() != "False") {
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);


            google.maps.event.addDomListener(window, 'load');

            var maker_point_list = []
            var check_maker_value = false;
            for (var i = 1; i <= 6; i++) {
                if ($("#x_coordinates_" + i).val() != "") {
                    check_maker_value = true;
                }
            }

            var maker_index = 0;
//            console.log(map_maker_list)
            if (check_maker_value == true) {
                for (i = 1; i <= 6; i++) {

//                     console.log(i);
//                     console.log($("#address_"+i).val())
//                     console.log($("#area_name_"+i).val())
//                     console.log($("#x_coordinates_"+i).val())
//                     console.log($("#y_coordinates_"+i).val())
//

                    //console.log(icon);
                    if ($("#x_coordinates_" + i).val() != "None") {

                        var icon = '/static/img/spot_hover_' + image_name_list[map_maker_list[maker_index]] + '.png';
//                        console.log(i, icon, image_name_list[map_maker_list[maker_index]], map_maker_list[maker_index])
                        maker_index++;

                        var index = i+1;
                        maker_point = [$("#x_coordinates_" + i).val(), $("#y_coordinates_" + i).val()]
                        maker_point_list.push(maker_point);
                        var location = new google.maps.LatLng($("#x_coordinates_" + i).val(), $("#y_coordinates_" + i).val());
                        var marker = new google.maps.Marker({
                            position: location,
                            map: map,
                            icon: icon
                        });
                        var j = i + 1;
                        marker.setTitle(j.toString());
                        attachSecretMessage(marker, j);
                    }
                }
                if (maker_point_list.length > 1) {
                    center_pointer = maker_distance(maker_point_list);
                    console.log(center_pointer);
                    if (center_pointer[4] < 246) {
                        map.setZoom(7);
                    }
                    if (center_pointer[4] < 103) {
                        map.setZoom(8);
                    }
                    if (center_pointer[4] < 16) {
                        map.setZoom(10);
                    }
                    if (center_pointer[4] < 10) {
                        map.setZoom(11);
                    }
                    if (center_pointer[4] < 5 || center_pointer[4] < 7.7) {
                        map.setZoom(12);
                    }
                    if (center_pointer[4] < 3 || center_pointer[4] < 3.9) {
                        map.setZoom(13);
                    }
                    if (center_pointer[4] < 2) {
                        map.setZoom(14);
                    }
                    map.panTo(new google.maps.LatLng(parseFloat(center_pointer[0]) + parseFloat(center_pointer[1]), parseFloat(center_pointer[2]) + parseFloat(center_pointer[3])));
                }
                else {
                    map.panTo(new google.maps.LatLng(maker_point_list[0][0], maker_point_list[0][1]));
                    map.setZoom(17);
                }

            }
        }
        else{
            $(".map-wrap").css('display', 'none');
        }

//        $("#page_loading").css("opacity", "0");
//        $("#page_loading").css("z-index", "1");
//        $("#page_loading").hide();
    }

    //상품
    $contents = $("#id_contents");
    if($contents.length>0) {

//        $("#navbar-scroll").hide();
        $("#experience-navbar-scroll").addClass("class_top");

//        var $navbarScroll = $("#navbar-scroll");
//
//        if($("#ideas-navbar-scroll").length > 0){
//            $navbarScroll = $("#ideas-navbar-scroll");
//        }

         if($(window).width()>767) {

//            console.log($(window).height());
            $("#intro").css("height", $(window).height());
            $(document).scroll(function(){
                var scrollTop = $(this).scrollTop();

                if(scrollTop<=20) {
                    //$navbarScroll.fadeOut(time);
                    //$navbarScroll.fadeTo(time, 0.10);
                    //$navbarScroll.animate({backgroundColor: 'rgba(0,0,0,0.5)'}, 'linear');
                    //$("#navbar-scroll").addClass("class_top");
                    $("#experience-navbar-scroll").addClass("class_top")

                }
                else {
                    //$navbarScroll.fadeIn(time, 0.99);
                    //$navbarScroll.fadeTo(time, 1);
                    //$navbarScroll.animate({backgroundColor: 'rgba(255,255,255,1)'}, 'linear');
                    //$("#navbar-scroll").removeClass("class_top");
                    $("#experience-navbar-scroll").removeClass("class_top")

                }
            });
        }else {

             $("#intro").css("height", $(window).height()+'px');
             $("#content_main_img").css("height", $(window).height()+'px');
            //$navbarScroll.show();
        }

        today = get_today();
        //console.log(today)
        $("#datetimepicker").val(today);
        var disabledates = $("#datetimepicker_disable_range").val().replace("[", "").replace("]", "").split(",");
        $('#datetimepicker').datetimepicker({
            pickTime: false,
            disabledDates: disabledates
        });



        var people_max = $("#people_max").val()
        var people_min = $("#people_min").val()
        var add_people = "";
        for(var index=parseInt(people_min); index<=parseInt(people_max); index++){
            add_people+= "<option value="+index+">"+index+"</option>";
        }



        $("#people").append(add_people);

        function experiences_date_check(){
            $.ajax({
                url: "/experiences_date_check/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: {
                  "select_date": $("#datetimepicker").val(),
                  "product_pk": $("#product_pk").val()
                },
                type: 'POST',
                success: function(data){
                    //console.log(data.data);
                    $("#book_time").find('option').remove();
                    add_temp = "";
                    if(data.data.length == 0){
                        add_temp = "<option>No available time slots.</option>";
                        $("#book_time").append(add_temp);
                        $(".book-now .btn-primary").css('background-color', '#828282');
                        $(".book-now .btn-primary").prop('disabled', true)
                    }
                    else{
                        for(var index=0; index<data.data.length; index++){
                            add_temp += "<option value="+data.data[index]+">"+data.data[index]+"</option>";
                        }
                        $("#book_time").append(add_temp);
                        $(".book-now .btn-primary").css('background-color', '#FF5757');
                        $(".book-now .btn-primary").prop('disabled', false)
                    }


                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });
        }

        //당일 시간표 알아보
        experiences_date_check();

        $("#list_view").on('click', function(){
            $(".carousel").toggle()
        });


        $("#datetimepicker").on("change", function(){
            //console.log($("#datetimepicker").val())
            experiences_date_check();
        })

        $("#send_message").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    $('.modal.in').modal('hide');
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });

        $("#id_book").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                //alert(data.message);
                //console.log(data.status);
                //console.log(data.message)
                if(data.status=="success") {
                    //console.log(data.message)
                    if(data.message=="instant_check"){
                        alert("Thank you for your reservation. \nYour local expert will confirm your request within 36 hours and send you a link for your payment. \n\nIf you have any questions in the meantime, please email us at support@travelingowl.com. \n\nThank you. Traveling Owl.")
                        setTimeout("location.href='/traveler/reservation/'");
                        return false;
                    }
                    else{
                        setTimeout("location.href='/book/" + data.data + "'");
                    }

                }
                else{
                    if(data.message == "not login") {
                        alert("Log-in required.");
                        $("#login").modal("show");
                        return false;
                    }
                    else if (data.message == "Exist schedule."){
                        alert("Exist schedule.");
                        return false;
                    }
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $("#id_review_add").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });

        //찜(save)
        $("#save").on("click", function(){
            var product_id = $("#product_pk").val();
            var SendInfo= [];
            //alert($("#book_time").val())
            var data = {
                date:$("#datetimepicker").val(),
                time:$("#book_time").val(),
                people:$("#people").val(),
                status:"product"
            }
            SendInfo.push(data);

            $.ajax({
                url: "/content/save/"+product_id+"/",
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                data: JSON.stringify(SendInfo),
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){
                  if(data.message == "not login"){
                        alert("Log-in required.");
                        $("#login").modal("show");
                    }else {
                        alert(data.data);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("Unknown error.");
                }
            });

        });


        var image_name_list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var map;


    	var latlng = new google.maps.LatLng(35.81905,127.8733);

    	var mapOptions = {
    	  zoom: 6,
    	  center: latlng,
    	  mapTypeId: google.maps.MapTypeId.ROADMAP
    	}

    	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        /*
    	var contentString = '<div id="info">'+
    					'<h3>모란역 정보</h3>'+
    	    				'성남 모란역입니다'+
    	    				'</div>';

    	var infowindow = new google.maps.InfoWindow({
    	    content: contentString,
            maxWidth: 200
    	});

    	var marker = new google.maps.Marker({
    	    position: latlng,
    	    map: map
    	});


           */
        var address_count = parseInt($("#locationinfo_detail_count").val());

        var maker_point_list = []
        if(address_count > 0) {
            for (var i = 0; i < address_count; i++) {

//                 console.log(i);
//                 console.log($("#address_"+i).val())
//                 console.log($("#area_name_"+i).val())
//                 console.log($("#x_coordinates_"+i).val())
//                 console.log($("#y_coordinates_"+i).val())

                maker_point = [$("#x_coordinates_" + i).val(), $("#y_coordinates_" + i).val()]
                maker_point_list.push(maker_point);
                var icon = '/static/img/spot_hover_' + image_name_list[i] + '.png';
                //console.log(icon);
                var location = new google.maps.LatLng($("#x_coordinates_" + i).val(), $("#y_coordinates_" + i).val());
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                    icon: icon
                });
                var j = i + 1;
                marker.setTitle(j.toString());
                attachSecretMessage(marker, i);
            }
            //console.log(maker_point_list);
            if (maker_point_list.length > 1) {
                center_pointer = maker_distance(maker_point_list);
                //console.log(center_pointer);
                if (center_pointer[4] < 246) {
                    map.setZoom(7);
                }
                if (center_pointer[4] < 103) {
                    map.setZoom(8);
                }
                if (center_pointer[4] < 26) {

                    map.setZoom(11);
                }
                if (center_pointer[4] < 8) {
                    map.setZoom(11);
                }
                if (center_pointer[4] < 5 || center_pointer[4] < 7.7) {
                    map.setZoom(12);
                }
                if (center_pointer[4] < 3 || center_pointer[4] < 3.9) {
                    map.setZoom(13);
                }
                if (center_pointer[4] < 2) {
                    map.setZoom(14);
                }

                map.panTo(new google.maps.LatLng(parseFloat(center_pointer[0]) + parseFloat(center_pointer[1]), parseFloat(center_pointer[2]) + parseFloat(center_pointer[3])));
            }
            else {
                map.panTo(new google.maps.LatLng($("#x_coordinates_0").val(), $("#y_coordinates_0").val()));
                map.setZoom(15);
            }

//            google.maps.event.addListener(marker, 'click', function () {
//                infowindow.open(map, marker);
//            });

        }

        $("#page_loading").css("opacity", "0");
        $("#page_loading").css("z-index", "1");

    }



    $join = $("#join");
    if($join.length > 0){
        if($("#check_login").val() == "login") {
            $("#login").modal("show");
        }
    }


    $adminalluser = $("#admin_all_user");
    if($adminalluser.length>0) {


        init.push(function () {
            var table = $('#user-table').dataTable({"order": [
                [ 0, "desc" ]
            ]});
            var tableTools = new $.fn.dataTable.TableTools(table, {
                "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "copy",
                    {
                        "sExtends": "xls",
                        "mColumns": [0,1],
                        "sFileName": "사용자_"+get_date()+".xls"
                    }
                ]
            });
            $(tableTools.fnContainer()).prependTo('div.panel-footer.user');
            $(".DTTT_container a").addClass("btn btn-default");
            $('#user-table_wrapper .table-caption').text('User List');
            $('#user-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });


        init.push(function () {
            var table = $('#guide-table').dataTable({"order": [
                [ 0, "desc" ]
            ]});
            var tableTools = new $.fn.dataTable.TableTools(table, {
                "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "copy",
                    {
                        "sExtends": "xls",
                        "mColumns": [0,1],
                        "sFileName": "가이_"+get_date()+".xls"
                    }
                ]
            });
            $(tableTools.fnContainer()).prependTo('div.panel-footer.guide');
            $(".DTTT_container a").addClass("btn btn-default");
            $('#guide-table_wrapper .table-caption').text('Guide List');
            $('#guide-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });

        init.push(function () {
            var table = $('#message-table').dataTable({"order": [
                [ 0, "desc" ]
            ]});
            var tableTools = new $.fn.dataTable.TableTools(table, {
                "sSwfPath": "/static/swf/copy_csv_xls_pdf.swf",
                "aButtons": [
                    "copy",
                    {
                        "sExtends": "xls",
                        "mColumns": [0,1],
                        "sFileName": "메시지_"+get_date()+".xls"
                    }
                ]
            });
            $(tableTools.fnContainer()).prependTo('div.panel-footer.message');
            $(".DTTT_container a").addClass("btn btn-default");
            $('#message-table_wrapper .table-caption').text('Message List');
            $('#messge-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });


        var $guideTable = $("#guide-table");
        $guideTable.on("click", ".btn-edit", function() {

            var $tr = $(this).parents("tr");
            var user_id = $tr.attr("data-user-id");
            //alert(user_id)

            $("#guide_auth").prop("checked", false);
            $("#guide_grade option[value=1]").attr('selected', 'selected');
            $("#modal-user #idea_auth").prop("checked", false);
            $("#modal-user #middle_admin_auth").prop("checked", false);
            $("#modal-user #super_admin_auth").prop("checked", false);

              $.ajax({
                url: "/admin_info_user/"+user_id,
                dataType: "json",
                csrfmiddlewaretoken: csrftoken,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data){

                    $data = data.data[0];
                    console.log($data);
                    $("#modal-user input[id='id_user_id']").val(user_id);
                    if($data.guide_auth == true) {

                        $("#guide_auth").prop("checked", true);
                    }else{
                        $("#guide_auth").prop("checked", false);
                    }

                    $("#guide_grade option[value="+$data.guide_grade+"]").attr('selected', 'selected');

                    if($data.idea_auth == true) {
                        $("#modal-user #idea_auth").prop("checked", true);
                    }else{
                        $("#modal-user #idea_auth").prop("checked", false);
                    }

                    if($data.middle_admin_auth== true) {
                        $("#modal-user #middle_admin_auth").prop("checked", true);
                    }else{
                        $("#modal-user #middle_admin_auth").prop("checked", false);
                    }

                    if($data.super_admin_auth == true) {
                        $("#modal-user #super_admin_auth").prop("checked", true);
                    }else{
                        $("#modal-user #super_admin_auth").prop("checked", false);
                    }

                }
              });

        });

         $("#modal-user").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    $("#modal-user").modal('hide');
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });

        $(".btn-confirm").on('click', function(){
            var $tr = $(this).parents("tr");
            var user_id = $tr.attr("data-user-id");

//             $.ajax({
//                url: "/confirm_guide/"+user_id,
//                type: "POST",
//                dataType: "json",
//
//                success: function (data) {
//                    alert(data.message);
//                    if (data.status == "success") {
//                        window.location.reload(true);
//                    }
//                }
//
//            });

        });

        $(".find_guide").on('click', function(){
           var $tr = $(this).parents("tr");
            var user_id = $tr.attr("data-user-id");
//            alert(user_id);
            $.ajax({
                url: "/find_guide/"+user_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    console.log(data.data)
                    $("#modal-guide #guide_id").val(data.data.guide_id);
                    $("#modal-guide #guide_user_id").val(data.data.guide_user_id);
                    $("#modal-guide #first-name").val(data.data.first_name);
                    $("#modal-guide #last-name").val(data.data.last_name);
                    $("#modal-guide #id_email").val(data.data.email);
                    $("#modal-guide #id_mobile").val(data.data.mobile);
                    $("#modal-guide #info").text(data.data.info);
                    if(data.data.photo != ""){
                        $("#modal-guide #id_photo_check").val(data.data.photo);
                        $("#modal-guide #guide-image").prop("src", "/resource/"+data.data.photo);
                    }
                    else{
                        $("#modal-guide #id_photo_check").val(data.data.photo);
                        $("#modal-guide #guide-image").prop("src", "/static/img/user-256.png");
                    }


                    $("#id_location option[value='"+data.data.location+"']").attr('selected', 'selected');

                    var language_list = data.data.language.replace(',','').split(',')
                    //console.log(language_list)
                    if(language_list.length > 1){
                        for(var index=1; index<language_list.length; index++){
                            //console.log(language_list[index]);
                            add_language = ""+
                                 "<div class='select'>"+
                                 "<select class='form-control form-group-margin' name='language"+(index+1)+"' id='id_language"+(index+1)+"'>"+
                                 "</select>"+
                                 "</div>";

                            $("#id_select_language").append(add_language);

                            var $select_list = $("#id_language1 > option").clone();
                            $("#id_language"+(index+1) ).append($select_list);

                            //선택
                            $("#id_language"+(index+1)+" option[value='"+language_list[index]+"']").attr('selected', 'selected');

                        }
                    }

                    //첫번째(0번째) 는 무조건 존재하므로 이쪽으로 뺌.
                    $("#id_language1 option[value='"+language_list[0]+"']").attr('selected', 'selected');
                    $("#id_language_count").val(language_list.length);


                    var skill_list = data.data.skill.replace(',','').split(',')
                    //console.log(skill_list)
                    for(var index in skill_list){
                        $("#modal-guide input[name=skill_checkbox][value="+skill_list[index]+"]").prop("checked", true);
                    }

                    if(data.data.instant_check == true){
                        $("#instant_guide").prop('checked', true);
                    }
                }

            });
        });

        $("#modal-guide").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                window.location.reload(true);
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


    }

    $admincalculate = $("#admin_calculate");
    if($admincalculate.length>0) {

         init.push(function () {
            var table = $('#reservation_view-table').dataTable({"order": [
                [ 0, "desc" ]
            ]});

            $(".DTTT_container a").addClass("btn btn-default");
            $('#reservation_view-table_wrapper .table-caption').text('Reservation List');
            $('#reservation_view-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });

        init.push(function () {
            var table = $('#calculate-table').dataTable({"order": [
                [ 7, "asc" ]
            ]});

            $(".DTTT_container a").addClass("btn btn-default");
            $('#calculate-table_wrapper .table-caption').text('Payment list');
            $('#calculate-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });

        init.push(function () {
            var table = $('#refund-table').dataTable({"order": [
                [ 4, "desc" ]
            ]});

            $(".DTTT_container a").addClass("btn btn-default");
            $('#refund-table_wrapper .table-caption').text('Refund List');
            $('#refund-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });


        $(".btn-edit").on("click", function(){
            var $tr = $(this).parents("tr");
            var guide_grade_id = $tr.attr("data_guide_grade_id");
            var commission = $tr.find("input[class='commission']").val();
            var title = $tr.find("input[class='title']").val();

            $.ajax({
                url: "/update_commission/",
                type: "POST",
                dataType: "json",
                data: {
                    "guide_grade_id": guide_grade_id,
                    "commission":commission,
                    "title":title
                },
                success: function (data) {
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });

        $("#guide_grade_add").on('click', function(){
           $("#modal-guide-grade").modal('show');
        });

        $("#modal-guide-grade").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $(".calculate_confirm").on("click", function() {

            var $tr = $(this).parents("tr");
            var guide_id = $tr.attr("data_guide_id");

            $("#status_loading_background").css('display', 'block');
            $("#status_loading").css('display', 'block');

            $.ajax({
                url: "/confirm_commission/"+guide_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
        });


         $(".refund").on("click", function() {

             $("#status_loading_background").css('display', 'block');
            $("#status_loading").css('display', 'block');

            var $tr = $(this).parents("tr");
            var reservation_id = $tr.attr("data_reservation_id");
            //console.log(reservation_id)
            $.ajax({
                url: "/refund_confirm/"+reservation_id,
                type: "POST",
                dataType: "json",
                success: function (data) {
                    $("#status_loading_background").css('display', 'none');
                    $("#status_loading").css('display', 'none');
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                },
                error: function(data) {
                    console.log("error");
                    alert("paypal과의 연결이 끊겼습니다. 다시 시도해 주시기 바랍니다.");
                    window.location.reload(true);
                }

            });
        });

    }

    $adminallproduct = $("#admin_all_product");
    if($adminallproduct.length>0) {


         init.push(function () {
            var table = $('#refund-table').dataTable({"order": [
                [ 4, "desc" ]
            ]});

            $(".DTTT_container a").addClass("btn btn-default");
            $('#refund-table_wrapper .table-caption').text('Refund List');
            $('#refund-table_wrapper .dataTables_filter input').attr('placeholder', '검색');

        });

        $("#product_div .btn-confirm").on("click", function(){
            var $tr = $(this).parents("tr");
            var product_id = $tr.attr("data-product-id");

            $("#status_loading_background").css('display', 'block');
            $("#status_loading").css('display', 'block');

            $.ajax({
                url: "/confirm_product/"+product_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    $("#status_loading_background").css('display', 'none');
                    $("#status_loading").css('display', 'none');

                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });


        $(".btn-return").on("click", function(){
            var $tr = $(this).parents("tr");
            var product_id = $tr.attr("data-product-id");
           $("#product_pk").val(product_id);
        });

         $("#modal-return").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });




        $(".review-save").on("click", function(){
            var $tr = $(this).parents("tr");
            var review_id = $tr.attr("data-review-id");

            $.ajax({
                url: "/confirm_review/"+review_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });


        $(".review-return").on("click", function(){
            var $tr = $(this).parents("tr");
            var review_id = $tr.attr("data-review-id");
            //alert(review_id)
            $.ajax({
                url: "/return_review/"+review_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    alert(data.message);
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });


        $(".idea-save").on("click", function(){
            var $tr = $(this).parents("tr");
            var idea_id = $tr.attr("data-idea-id");
//            alert(idea_id)
            $.ajax({
                url: "/confirm_idea/"+idea_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    alert('Idea is Listed.');
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });


        $("#rank_order_form").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });


        $(".idea-return").on("click", function(){
            var $tr = $(this).parents("tr");
            var idea_id = $tr.attr("data-idea-id");
//            alert(idea_id)
            $.ajax({
                url: "/return_idea/"+idea_id,
                type: "POST",
                dataType: "json",

                success: function (data) {
                    alert("success.");
                    if (data.status == "success") {
                        window.location.reload(true);
                    }
                }

            });
         });




        $('.select_rank').change(function(){
            var selected_option_value = $(this).val()
            //alert(product_id);
            //console.log(product_id);
            //console.log(select_option_list.split('_'));
            var select_value = selected_option_value.split('_')[1];
            var check_equal_value = false;
            $("#product_rank_order-table > tbody > tr").each(function(){
                var rank = $(this).find('.select_rank option:selected').val();
                var this_select_rank = rank.split('_')[1];
                if(selected_option_value != rank &&  this_select_rank == select_value){
                    check_equal_value = true;
                }
            });
//            console.log(check_equal_value)
            if(check_equal_value == true) {
                $("#product_rank_order-table > tbody > tr").each(function () {

                    //var text_value = $(this).find('.select_rank option:selected').attr("text_value");
                    var rank = $(this).find('.select_rank option:selected').val();
                    var this_select_rank = rank.split('_')[1];
                    var selectbox = $(this).find('.select_rank');
//                selectbox.val(rank.split('_')[0]+"_9");


                    if (this_select_rank != 0 && rank != selected_option_value && this_select_rank >= select_value) {
                        if (this_select_rank != 9) {
                            selectbox.val(rank.split('_')[0] + "_" + (parseInt(this_select_rank) + 1));
                        } else {
                            selectbox.val(rank.split('_')[0] + "_0");
                        }
                    }
                });
            }
            else{

            }
        });

        $("#rank_order_save").on("click", function(){
            var $tr = $(this).parents("tr");
            var idea_id = $tr.attr("data-idea-id");
            $('#status_loading_background').css({'display': 'block'});
            $('#status_loading').css({'display': 'block'});

//            alert(idea_id)

        });

//        var rank_list_count = $("#rank_order_list_count").val();
//        $("#product_rank_order-table > tbody > tr").each(function(){
//
//            var rank = $(this).children('.order').text();
//            console.log(rank);
//
//            //$("#book_time option[value='"+$("#book_time_detail").val()+"']").attr('selected', 'selected');
//        });

    }

    $adminsetting = $("#admin_setting");
    if($adminsetting.length>0) {

        $("#skill_add").click(function(){
            $("#modal-setting #type").val("skill");
            $("#country_select").hide();
            $("#modal-setting").modal('show');
        });

        $("#theme_add").click(function(){
            $("#modal-setting #type").val("theme");
            $("#country_select").hide();
            $("#modal-setting").modal('show');
        });

        $("#language_add").click(function(){
            $("#modal-setting #type").val("language");
            $("#country_select").hide();
            $("#modal-setting").modal('show');
        });

        $("#country_add").click(function(){
            $("#modal-setting #type").val("country");
            $("#country_select").hide();
            $("#modal-setting").modal('show');
        });

        $("#region_add").click(function(){
            $("#modal-setting #type").val("region");
            $("#country_select").show();
            $("#modal-setting").modal('show');
        });

        $(".btn-edit").on("click", function(){

            var $tr = $(this).parents("tr");
            var type = $tr.attr("type");
            var title = $tr.find(".title").text();

            if(type == "skill"){
                var skill_id = $tr.attr("data-skill-id");
                $("#modal-setting #type").val("skill");
                $("#title").val(title);
                $("#modal-setting #skill_id").val(skill_id);
                $("#country_select").hide();
            }
            else if(type=="theme"){
                var theme_id = $tr.attr("data-theme-id");
                $("#modal-setting #type").val("theme");
                $("#title").val(title);
                $("#modal-setting #theme_id").val(theme_id);
                $("#country_select").hide();
            }
            else if(type=="language"){
                var lanuage_id = $tr.attr("data-language-id");
                $("#modal-setting #type").val("language");
                $("#title").val(title);
                $("#modal-setting #language_id").val(language_id);
                $("#country_select").hide();
            }
            else if(type=="country"){
                var country_id = $tr.attr("data-country-id");
                $("#modal-setting #type").val("country");
                $("#title").val(title);
                $("#modal-setting #country_id").val(country_id);
                $("#country_select").hide();
            }
            else if(type=="region"){
                var region_id = $tr.attr("data-region-id");
                $("#modal-setting #type").val("region");
                $("#title").val(title);
                $("#modal-setting #region_id").val(region_id);
                $("#country_select").show();
            }

            $("#modal-setting").modal('show');

        });

        $(".btn-delete").on("click", function(){

            var $tr = $(this).parents("tr");
            var type = $tr.attr("type");
            var id = 0;
            if(type == "skill"){
                id = $tr.attr("data-skill-id");
            }
            else if(type=="theme"){
                id = $tr.attr("data-theme-id");
            }
            else if(type=="language"){
                id = $tr.attr("data-language-id");
            }
            else if(type=="country"){
                id = $tr.attr("data-country-id");
            }
            else if(type=="region"){
                id = $tr.attr("data-region-id");
            }
            if (confirm("Are you sure you want to delete this?")) {
                $.ajax({
                    url: "/delete_setting/",
                    type: "POST",
                    dataType: "json",
                    data: {
                        id: id,
                        type: type
                    },
                    success: function (data) {
                        alert(data.message);
                        if (data.status == "success") {
                            window.location.reload(true);
                        }
                    }

                });
            }
        });

        $("#modal-setting").ajaxForm({
            dataType: "json",
            csrfmiddlewaretoken: csrftoken,
            success: function(data) {
                alert(data.message);
                if(data.status=="success") {
                    window.location.reload(true);
                }
            },
            error: function(data) {
                console.log("error");
                alert("Unknown error.");
            }
        });
    }

    $autologin = $("#auto_login");
    if($autologin.length>0) {
        window.location.href='/book/'+$("#reservation_id").val();
    }

    $test = $("#test");
    if($test.length >0){

//        $(".isotope").removeClass(".isotope");
//        $("#isotope").removeAttr("id");

        $(".radio_select").change(function() {

            var checked_region = $("input[name=raido_region]:checked").attr('data-filter');
            var checked_theme = $("input[name=radio_theme]:checked").attr('data-filter');

            var $container = $('#isotope');

            $container.isotope({
                filter: checked_region+checked_theme

            });
             return false;
        });

    }
});

// article background img
