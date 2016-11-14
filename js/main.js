(function($) {

  "use strict";

  var $window = $(window);


  /*  TOPに戻るボタン
  ------------------------------------------------------------*/
  var $backToTopBtn = $("#js-back-to-top-btn");

  // 600pxスクロールしたらTOPに戻るボタンをふわっと表示する
  $window.on("scroll", function() {
    if ($window.scrollTop() > 600) {
      $backToTopBtn.fadeIn(500);
    } else {
      $backToTopBtn.fadeOut(500);
    }
  });

  // TOPに戻るボタンを押したら、0.5秒かけてアニメーションしてTOPに戻る
  $backToTopBtn.on("click", function(e) {
    e.preventDefault();
    $("body, html").animate({ scrollTop: 0 }, 500);
  });


  /*  サイドメニュー固定
  ------------------------------------------------------------*/
  var navbar = {},  $navbar = $("#js-navbar"),
      header = {},  $header = $("#js-header"),
      sideNav = {}, $sideNav = $("#js-side-nav"),

      calc = function() {
        navbar.height = $navbar.outerHeight()

        header.height = $header.outerHeight();
        header.bottom = $header.offset().top + $header.outerHeight();

        sideNav.top = $sideNav.offset().top;
        sideNav.left = $sideNav.offset().left;
        sideNav.marginTop = sideNav.top - header.bottom;
      };

  // 各要素の位置・サイズを計算する
  calc();

  $window
    .on("resize", function() {
      // ウィンドウサイズが変わったら計算し直す
      calc();
    })
    .on("scroll", function() {
      if ($window.scrollTop() > header.height) {

        // スクロール量がヘッダーの高さより大きくなったら
        // サイドメニューの位置を固定する
        $sideNav.css({
          position: "fixed",
          top: (sideNav.marginTop + navbar.height),
          left: sideNav.left
        });

      } else {

        // スクロール量がヘッダーの高さより小さくなったら
        // サイドメニューの位置を元に戻す
        $sideNav.css({
          position: "relative",
          top: 0,
          left: 0
        });

      }
    });


  /*  サイドメニューの scroll spy
  ------------------------------------------------------------*/
  var $linkList = $("#js-side-nav").find("[href^='#']"),
      map = {};

  // リンクとセクションのマップをつくる
  $linkList.each(function() {
    var $link = $(this),
        id = $link.attr("href"),
        $section = $(id);

    map[id] = {
      id: id,
      $link: $link,
      position: $section.offset().top - 110
    };
  });

  $linkList.on("click", function(e) {
    // リンク先と現在のハッシュが同じだったら何もしない
    if ($(this).attr("href") === location.hash) {
      e.preventDefault();
    }
  });

  $window
    .on("scroll", function() {
      // スクロールしたら現在地に応じたナビゲーションをハイライトする
      for (var id in map) {
        if (map.hasOwnProperty(id)) {
          if ($window.scrollTop() > map[id].position - 10) {
            $linkList.removeClass("active");
            map[id].$link.addClass("active");
          }
        }
      }
    })
    .on("hashchange", function(e) {
      // ハッシュに応じたセクションまでスクロールする
      if (map[location.hash]) {
        $window.scrollTop(map[location.hash].position);
      }
    });


  /*  ローディング表示
  ------------------------------------------------------------*/
  $window.on("load", function() {
    setTimeout(function() {
      $("#js-loading-overlay").fadeOut();
    }, 1000);
  });


  /*  Pretty Print
  ------------------------------------------------------------*/
  PR.prettyPrint();

})(jQuery);
