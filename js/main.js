$(function () {
  ("use strict");

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

  // Bounce Button Effects function
  function bounceElement(selector, times, distance, speed) {
    for (var i = 0; i < times; i++) {
      $(selector)
        .animate(
          {
            top: "-=" + distance,
          },
          speed
        )
        .animate(
          {
            top: "+=" + distance,
          },
          speed
        );
    }
  }

  $(".bounce-one").on("click", function () {
    bounceElement($(this), 3, 20, 400);
  });

  $(".bounce-two").on("click", function () {
    bounceElement($(this), 5, 30, 500);
  });

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

  // Toggle Product Description
  $(".products .product i, .items .item i").on("click", function () {
    $(this).toggleClass("fa-plus fa-minus").next("p").slideToggle();
  });

  // Switch List And Grid View
  $(".view-options i").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".items")
      .removeClass("list-view grid-view")
      .addClass($(this).data("class"));
  });

  // Error Message Effect
  $(".error-message").each(function () {
    $(this).animate(
      {
        right: 0,
      },
      1000,
      function () {
        $(this).delay(3000).fadeOut();
      }
    );
  });

  // Hide Placeholder On Focus & Restore On Blur
  var placeAttr = "";
  $("[placeholder]")
    .focus(function () {
      placeAttr = $(this).attr("placeholder");
      $(this).attr("placeholder", "");
    })
    .blur(function () {
      $(this).attr("placeholder", placeAttr);
    });

  // Show Message When Field Is Empty
  $("[required]").blur(function () {
    if ($(this).val() == "") {
      $(this).next("span").fadeIn().delay(2000).fadeOut();
    }
  });

  // Add Asterisk To All Required Field
  $('<span class="asterisk">*</span>').insertBefore(":input(required)");

  // Customize The Asterisk With jQuery
  $(".asterisk").parent("div").css("position", "relative");
  $(".asterisk").each(function () {
    $(this).css({
      position: "absolute",
      top: 13,
      left: $(this).parent("div").find(":input").innerWidth() - 20,
      color: "#f00",
      "font-weight": "bold",
    });
  });

  // CustomizeThe Input Field
  $('.our-form input[type="file"]').wrap('<div class="custom-file"></div>');
  $(".custom-file").prepend("<span>Upload Your Files</span>");
  $(".custom-file").append("<i class='fa fa-upload' fa-lg skin-color></i>");
  $('.our-form input[type="file"]').change(function () {
    $(this).prev("span").text($(this).val());
  });

  // Detect Unicode Of Keyboard Keys
  $(".detect-unicode").on("keyup", function (event) {
    var keyboardKey = event.keyCode || event.which;
    $(".unicode").html(
      "The Unicode For The Key You Pressed Is: " + keyboardKey
    );
  });

  // change Input Direction Depend On The Language
  $(".auto-direction").on("keyup", function () {
    if ($(this).val().charCodeAt(0) < 200) {
      $(this).css("direction", "ltr");
    } else {
      $(this).css("direction", "rtl");
    }
  });

  // Convert Input Value To Tags
  $(".add-tag").on("keyup", function (event) {
    var keyboardKey = event.keyCode || event.which;
    if (keyboardKey === 188) {
      // If Comma Pressed
      var thisValue = $(this).val().slice(0, -1);
      $(".tags").append(
        '<span class="tag-span"><i class="fa fa-times"></i>' +
          thisValue +
          "</span>"
      );
      // Empty The Input Field After Appending The Tag
      $(this).val("");
    }
  });
  // Remove Tage On Click
  $(".tags").on("click", ".tag-span i", function () {
    // Travers To Parent And Fade It
    $(this).parent(".tag-span").fadeOut(800);
  });

  // Trim Paragraph Text Characters
  function trimText(selector, maxLength) {
    $(selector).each(function () {
      if ($(this).text().length > maxLength) {
        var trimmedText = $(this).text().substr(0, maxLength);
        $(this).text(trimmedText + " ...");
      }
    });
  }

  trimText(".trimmed-texts .p-one", 100);
  trimText(".trimmed-texts .p-two", 200);
  trimText(".trimmed-texts .p-three", 300);

  // Adjust Elements Height To Be The Same
  var theMaxHeight = 0;

  // Loop On Elements To You Want To Adjust Height
  $(".same-height div").each(function () {
    // Check If Element Height > Max height
    if ($(this).height() > theMaxHeight) {
      // Make The Max Height Egual To The Element Biggest Height
      theMaxHeight = $(this).height();
    }
  });
  // Set The Max Height On All Elements
  $(".same-height div").height(theMaxHeight);

  // Shuffle Cards
  var zIndexValue = 0;
  $(".cards .card").on("click", function () {
    $(this)
      .animate(
        {
          left: "20%",
          marginTop: 30,
        },
        400,
        function () {
          zIndexValue--;
          $(this).css("z-index", zIndexValue);
        }
      )
      .animate(
        {
          left: $(this).css("left"),
          marginTop: 0,
        },
        400
      );
  });

  // Create Blink Worning
  blinkWarning();

  function blinkWarning() {
    $(".blink-warning").fadeOut(1000, function () {
      $(this).fadeIn(1000);
      blinkWarning();
    });
  }

  // ToDo List
  var newTask = $(".task-input");
  $(".add-task").on("submit", function (e) {
    e.preventDefault();
    if (newTask.val() != "") {
      $("<li>" + newTask.val() + "</li>").appendTo(".tasks");
      newTask.val("");
    }
  });

  $(".tasks").on("click", "li", function () {
    $(this)
      .css("text-decoration", "line-through")
      .delay(200)
      .fadeOut(400, function () {
        $(this).remove();
      });
  });

  // Type Write Effects
  var theText = $(".typer").data("text"),
    theTextLength = theText.length,
    n = 0,
    theTyper = setInterval(function () {
      $(".typer").each(function () {
        $(this).html($(this).html() + theText[n]);
      });
      n += 1;
      if (n >= theTextLength) {
        clearInterval(theTyper);
      }
    }, 100);

  // Calculate Table Cell Price Value
  var theSummary = 0;
  $(".price").each(function () {
    theSummary += parseInt($(this).text()); // Will Not Work
  });
  $(".the-total").text(theSummary);

  // Auto Change Content
  (function autoChange() {
    $(".ticker-list .active").each(function () {
      if (!$(this).is(":last-child")) {
        $(this)
          .delay(1000)
          .fadeOut(1000, function () {
            $(this).removeClass("active").next().addClass("active").fadeIn();
            autoChange();
          });
      } else {
        $(this)
          .delay(1000)
          .fadeOut(1000, function () {
            // Remove Class Active
            $(this).removeClass("active");
            // Add Active Class To The First Element
            $(".ticker-list li").eq(0).addClass("active").fadeIn();
            // Trigger Function Again
            autoChange();
          });
      } // End If Condition
    }); // End Each Loop
  })(); // End Self Invoked Function

  // Dynamic Tabs
  $(".tabs-list li").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".content-list > div").hide();
    $($(this).data("content")).fadeIn();
  });

  // Switch Tabs View
  $(".switch-tabs").on("click", function () {
    $(this).next(".dynamic-tabs").toggleClass("left-tabs");
  });

  // Email Suggest Box
  var emailProvider = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com"],
    finalString = "";
  $(".email-suggest").on("keyup", function () {
    finalString = ""; // Reset FVariable
    if (!$(this).next().is(".suggest-box")) {
      $('<ul class="suggest-box"></ul>').insertAfter($(this));
    }
    for (let i = 0; i < emailProvider.length; i++) {
      finalString += "<li>" + $(this).val() + "@" + emailProvider[i] + "</li>";
    }
    $(".suggest-box").html(finalString);
  });

  $("body").on("click", ".suggest-box li", function () {
    $(".email-suggest").val($(this).text());
    $(this).parent().fadeOut(3000).remove();
  });
});
