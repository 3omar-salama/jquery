$(function () {
  "use strict";

  // Calculate Body Padding Top Depend On Navbar Height
  $("body").css("paddingTop", $(".navbar").innerHeight());

  // Smothly Scroll To Element
  $(".navbar li a").click(function (e) {
    e.preventDefault(); // Prevent the default action of the anchor tag

    var target = $("#" + $(this).data("scroll"));
    if (target.length) {
      // Check if the target element exists
      $("html, body").animate(
        {
          scrollTop: target.offset().top + 1,
        },
        1000
      );
    }
  });

  // Add Active Class On NavBar Link And Remove From Siblings
  $(".navbar li a").click(function () {
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find("a")
      .removeClass("active");

    // another solution
    // $(".navbar a").removeClass("active");
    // $(this).addClass("active");
  });

  // Scroll To Top Button
  $(window).scroll(function () {
    var scrollToTop = $(".scroll-to-top");
    if ($(window).scrollTop() >= 1000) {
      if (scrollToTop.is(":hidden")) {
        scrollToTop.fadeIn(400);
      }
    } else {
      scrollToTop.fadeOut(400);
    }

    // Sync Navbar Link With Sections
    $(".block").each(function () {
      if ($(window).scrollTop() > $(this).offset().top) {
        var blockID = $(this).attr("id");
        $(".navbar a").removeClass("active");
        $('.navbar li a[data-scroll="' + blockID + '"]').addClass("active");
      }
    });
  });

  // Click On scroll To Top To Go Up
  $(".scroll-to-top").click(function (e) {
    e.preventDefault(); // Prevent the default action of the anchor tag
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // Popup
  $(".show-popup").click(function () {
    $($(this).data("popup")).fadeIn();
  });

  $(".popup").click(function () {
    $(this).fadeOut();
  });

  $(".popup .inner").click(function (e) {
    e.stopPropagation();
  });

  $(".popup .close").click(function (e) {
    e.preventDefault();
    $(this).parentsUntil(".popup").parent().fadeOut();
  });

  $(document).keydown(function (e) {
    if (e.keyCode == 27) {
      $("popup").fadeOut();
    }
  });

  // Buttons With Efects

  $(".buttons-effects button").each(function () {
    $(this).prepend("<span></span>");
  });

  $(".from-left, .border-left").hover(
    function () {
      $(this).find("span").eq(0).animate(
        {
          width: "100%",
        },
        300
      );
    },
    function () {
      $(this).find("span").eq(0).animate(
        {
          width: "0",
        },
        300
      );
    }
  );

  $(".from-top, .border-top").hover(
    function () {
      $(this).find("span").eq(0).animate(
        {
          height: "100%",
        },
        300
      );
    },
    function () {
      $(this).find("span").eq(0).animate(
        {
          height: "0",
        },
        300
      );
    }
  );

  // Animated Progress
  $(".animated-progress span").each(function () {
    $(this).animate(
      {
        width: $(this).attr("data-progress") + "%",
      },
      1000,
      function () {
        $(this).text($(this).attr("data-progress") + "%");
      }
    );
  });

  // Fixed Menu
  $(".fixed-menu .fa-gear").on("click", function () {
    $(this).parent(".fixed-menu").toggleClass("is-visible");
    if ($(this).parent(".fixed-menu").hasClass("is-visible")) {
      $($(this).parent(".fixed-menu")).animate(
        {
          left: "0",
        },
        500
      );

      $("body").animate(
        {
          paddingLeft: "220px",
        },
        500
      );
    } else {
      $(this).parent(".fixed-menu").animate(
        {
          left: "-220px",
        },
        500
      );
      $("body").animate(
        {
          paddingLeft: "0",
        },
        500
      );
    }
  });

  // Change Colors
  $(".change-colors li").on("click", function () {
    $("body").attr("data-default-color", $(this).data("color"));
  });

  // Thumbnails Gallery
  var numOfThumbnails = $(".thumbnails").children().length;
  var marginBetweenThumbnails = 0.5; // in percentage
  var totalMarginBetweenThumbnails =
    (numOfThumbnails - 1) * marginBetweenThumbnails;
  var thumbnailWidth = (100 - totalMarginBetweenThumbnails) / numOfThumbnails;

  $(".thumbnails img").css({
    width: thumbnailWidth + "%",
  });

  $(".thumbnails img").on("click", function () {
    $(this).addClass("selected").siblings().removeClass("selected");
    $(".master-img img").hide().attr("src", $(this).attr("src")).fadeIn(500);
  });

  $(".gallery .master-img .fa-chevron-right").on("click", function () {
    if ($(".thumbnails .selected").is(":last-child")) {
      $(".thumbnails img").eq(0).click();
    } else {
      $(".thumbnails .selected").next().click();
    }
  });

  $(".gallery .master-img .fa-chevron-left").on("click", function () {
    if ($(".thumbnails .selected").is(":first-child")) {
      $(".thumbnails img:last").click();
    } else {
      $(".thumbnails .selected").prev().click();
    }
  });
});
