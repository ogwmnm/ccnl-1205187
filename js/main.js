(function($) {

  "use strict";

  var $window = $(window),
      $backToTopBtn = $("#js-back-to-top-btn");

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

})(jQuery);
