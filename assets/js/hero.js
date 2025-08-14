$(document).ready(function () {
  jQuery.fn.swapWith = function (to) {
    return this.each(function () {
      var copy_to = $(to).clone(true);
      var copy_from = $(this).clone(true);
      $(to).replaceWith(copy_from);
      $(this).replaceWith(copy_to);
    });
  };

  var catHeightThreshold = 0;

  jQuery.fn.shuffle = function (elements) {
    var j;
    var midIndex = Math.ceil(elements.length / 2) - 1;
    catHeightThreshold = $(".floor").offset().top - 80; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon

    console.log("cat threshold: " + catHeightThreshold);

    for (var i = 0; i < elements.length; i++) {
      // $(elements[i]).before($(elements[j]));
      // } while (parseInt($(elements[midIndex]).css("height")) > 490);
      j = Math.floor(Math.random() * this.length);
      $(elements[i]).before($(elements[j]));

      opacityTime = randomIntFromInterval(1000, 5000);
      // console.log("$(elements[i]).css(top) :: " + $(elements[i]).css("top"));

      $(elements[i]).css({
        transform: "translateY(0)",
      });
    }
    //* refresh the message array order from th dorm tree after shuffle
    elements = $(".message");

    var midLeft = midIndex - 1;
    var midRight = midIndex + 1;
    //* if there are odd number of messages, check for middle, left and right
    if (elements.length % 2 == 1) {
      var midOffset =
        parseInt($(elements[midIndex]).outerHeight(true)) +
        $(elements[midIndex]).offset().top;

      var midLeftOffset =
        parseInt($(elements[midLeft]).outerHeight(true)) +
        $(elements[midLeft]).offset().top;

      var midRightOffset =
        parseInt($(elements[midRight]).outerHeight(true)) +
        $(elements[midRight]).offset().top;
      // console.log(elements);s
      // console.log("Message length: " + $(elements[midIndex]).css("height"));

      // console.log("current offset middle: " + midOffset);
      // console.log("current offset left: " + midLeftOffset);
      // console.log("current offset right: " + midRightOffset);

      var counter = 0;
      // * check for middle
      while (
        midLeftOffset > catHeightThreshold ||
        midRightOffset > catHeightThreshold ||
        midOffset > catHeightThreshold
      ) {
        elements = $(".message");
        midLeftOffset =
          parseInt($(elements[midLeft]).outerHeight(true)) +
          $(elements[midLeft]).offset().top;

        midRightOffset =
          parseInt($(elements[midRight]).outerHeight(true)) +
          $(elements[midRight]).offset().top;

        midOffset =
          parseInt($(elements[midIndex]).outerHeight(true)) +
          $(elements[midIndex]).offset().top;

        if (midOffset > catHeightThreshold) {
          console.log("TOO HIGH offset middle: " + midLeftOffset);
          // $(elements[midIndex]).css("border", "1px solid red");
          $(elements[midIndex]).swapWith($(elements[counter]));

          counter += 1;
          console.log("counter: :: " + counter);
        }

        //* if long message is in the middle right
        if (midRightOffset > catHeightThreshold) {
          console.log("TOO HIGH offset right: " + midRightOffset);
          // $(elements[midRight]).css("border", "1px solid goldenrod");
          $(elements[midRight]).swapWith($(elements[counter]));

          counter += 1;
          console.log("counter: :: " + counter);
        }

        //* if long message is in the middle left
        if (midLeftOffset > catHeightThreshold) {
          console.log("TOO HIGH offset left: " + midLeftOffset);
          // $(elements[midLeft]).css("border", "1px solid green");
          $(elements[midLeft]).swapWith($(elements[counter]));

          counter += 1;
          console.log("counter: :: " + counter);
        }

        // if (maxTries > 0) {
        //   console.log("!! MAX TRIES FINISHED!! ");
        //   break;
        // }

        if (counter >= $(".message").length) break;

        console.log("\n\n");
      }
      //! debug use
      // elements = $(".message");

      // // console.log(midIndex);
      // // console.log(midLeft);
      // // console.log(midRight);

      // midOffset =
      //   parseInt($(elements[midIndex]).outerHeight(true)) +
      //   $(elements[midIndex]).offset().top;

      // midLeftOffset =
      //   parseInt($(elements[midLeft]).outerHeight(true)) +
      //   $(elements[midLeft]).offset().top;

      // midRightOffset =
      //   parseInt($(elements[midRight]).outerHeight(true)) +
      //   $(elements[midRight]).offset().top;

      // console.log("----> AFTER offset middle: " + midOffset);
      // console.log("----> AAFTER offset left: " + midLeftOffset);
      // console.log("----> AFTER offset right: " + midRightOffset);

      // $(elements[midLeft]).css("border", "1px solid var(--hero-white)");
      // $(elements[midRight]).css("border", "1px solid var(--hero-white)");
      // $(elements[midIndex]).css("border", "1px solid var(--hero-white)");
    } else {
      //* if there are even number of messages, check for left and right
      midLeft = midIndex;
      midRight = midIndex + 1;

      // console.log("midLeft  " + midLeft);
      // console.log("midRight  " + midRight);

      var midLeftOffset =
        parseInt($(elements[midLeft]).outerHeight(true)) +
        $(elements[midLeft]).offset().top;

      var midRightOffset =
        parseInt($(elements[midRight]).outerHeight(true)) +
        $(elements[midRight]).offset().top;

      // console.log("THRESHOLD " + catHeightThreshold);
      // console.log("$(elements[midLeft]).offset() " + midLeftOffset);
      // console.log("$(elements[midRight]).offset() " + midRightOffset);

      var counter = 0;
      // //* check for right and left, make sure no long ass messages are in the middle
      while (
        midRightOffset > catHeightThreshold ||
        midLeftOffset > catHeightThreshold
      ) {
        elements = $(".message");
        midLeftOffset =
          parseInt($(elements[midLeft]).outerHeight(true)) +
          $(elements[midLeft]).offset().top;

        midRightOffset =
          parseInt($(elements[midRight]).outerHeight(true)) +
          $(elements[midRight]).offset().top;

        //* if long message is in the middle right
        if (midRightOffset > catHeightThreshold) {
          console.log("TOO HIGHH offset right: " + midRightOffset);
          // $(elements[midRight]).css("border", "1px solid skyblue");
          $(elements[midRight]).swapWith($(elements[counter]));
          counter += 1;
        }

        //* if long message is in the middle left
        if (midLeftOffset > catHeightThreshold) {
          console.log("TOO HIGHHHH offset left: " + midLeftOffset);
          // $(elements[midLeft]).css("border", "1px solid purple");
          $(elements[midLeft]).swapWith($(elements[counter]));
          counter += 1;
        }

        if (counter >= $(".message").length) break;
      }

      // $(elements[midLeft]).css("border", "1px solid magenta");
      // $(elements[midRight]).css("border", "1px solid skyblue");

      // //! for debug use only
      // $(elements[midLeft]).css("border", "solid white 1px");
      // $(elements[midRight]).css("border", "solid white 1px");

      // midLeftOffset =
      //   parseInt($(elements[midLeft]).outerHeight(true)) +
      //   $(elements[midLeft]).offset().top;

      // console.log("$(elements[midLeft]).offset() " + midLeftOffset);

      // midRightOffset =
      //   parseInt($(elements[midRight]).outerHeight(true)) +
      //   $(elements[midRight]).offset().top;

      // console.log("$(elements[midRight]).offset() " + midRightOffset);
    }
    return this;
  };

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //* secondaryExpand
  function secodaryExpand(star, currLeft, currTop) {
    //* duration for the animation
    const burstDuration = 2000;
    if (currLeft < 12) {
      if (currTop > 12) {
        //* LEFT: Bottom
        burstRangeY = 50;
        burstRangeX = currLeft;
        star.animate(
          {
            // transition: "all 300ms ease-out",
            left: currLeft + -burstRangeX + "px",
            top: currTop + -burstRangeY + "px",
          },
          3000,
          "easeOutExpo"
        );
      } else {
        //* LEFT: Top
        burstRangeY = -50;
        burstRangeX = 130;
        star.animate(
          {
            left: currLeft + burstRangeX + "px",
            top: currTop + -burstRangeY + "px",
          },
          burstDuration,
          "easeOutExpo"
        );
      }
    } else {
      if (currTop > 12) {
        //* RIGHT: Bottom
        burstRangeY = 0;
        burstRangeX = 120;
        star.animate(
          {
            left: currLeft + -burstRangeX + "px",
            top: currTop + burstRangeY + "px",
          },
          burstDuration,
          "easeOutExpo"
        );
      } else {
        //* RIGHT: Top
        burstRangeY = 40;
        burstRangeX = 20;
        star.animate(
          {
            left: currLeft + burstRangeX + "px",
            top: currTop + burstRangeY + "px",
          },
          burstDuration,
          "easeOutExpo"
        );
      }
      burstRangeX = 20;
      burstRangeY = 10;
    }
  }

  //* in and out hover to display the stars
  $("#hero-btn").mouseenter(function () {
    $("#hero-btn").addClass("hovered");

    $("#hero-btn")
      .find(".star-container")
      .each(function () {
        $(this).addClass("hovered");
      });

    $(".tooltips").addClass("hovered");
  });

  $("#hero-btn").mouseleave(function () {
    $("#hero-btn").removeClass("hovered");

    $("#hero-btn")
      .find(".star-container")
      .each(function () {
        $(this).removeClass("hovered");
      });
    $(".tooltips").removeClass("hovered");
  });

  //* on click hero button
  $("#hero-btn").on("click", function (event) {
    event.stopPropagation();

    const $el = $("#welcome-curtain");
    // Reset height to auto to get full scroll height
    $el.css({
      height: "fit-content",
    });

    const fullHeight = $el.prop("scrollHeight");
    //* get welcome container and set it to curtain height when it's fit content full height
    $("#welcome-container").css("height", fullHeight + "px");

    // Set to 0 and trigger reflow
    $el.css("height", "0");
    $el[0].offsetHeight;

    $(".detachment").addClass("burst");

    //* delay and disable tooltips
    setTimeout(function () {
      $(".tooltips").removeClass("hovered");
    }, 2000);

    var startAnimTime = 3000;
    //* 1st delay 3000
    //* curtain down
    $el.css({
      height: fullHeight + "px",
      transition:
        "height 3000ms cubic-bezier(.05, .52, .07, 1.02) " +
        startAnimTime +
        "ms",
    });

    startAnimTime += +3000;
    //* expand out
    setTimeout(function () {
      $("#welcome-container").addClass("expand");

      //* expand the height bby 30px
      const fullHeight = $("#welcome-curtain").prop("scrollHeight");
      $("#welcome-curtain").css({
        height: fullHeight + 30 + "px",
        transition: "height 1000ms cubic-bezier(.05, .52, .07, 1.02)",
      });

      //* move up the welcome message to make space for black star
      $("#welcome-msg h5").addClass("expand");
      //* counter move down the dark cat
      $(".dark-cat").addClass("expand");
      //* move up and show the black star
      $(".star-dark").addClass("active");
      //* inflate the big star a bit then shrink
      $("#main-star").addClass("expand");

      //* hide all the messages
      $(".messages-container").addClass("hide");
    }, startAnimTime);

    startAnimTime += 1000;
    //* 3rd delay 9000 + 3000 = 12 000
    //* close dark cat -> display light cat
    setTimeout(
      function () {
        //* display the closing message block
        $("#closing-img").css("display", "flex");
        //* collpase the welcome message using clip path
        $("#welcome-curtain").addClass("collapse");
      },
      startAnimTime,
      function () {
        $("#welcome-curtain").css({
          height: $("#welcome-curtain").css("height", 0) + "px",
          transition: "height 1000ms cubic-bezier(.05, .52, .07, 1.02)",
        });
      }
    );

    //* shrink the moon down to the white cat, rise the background words a little bit
    startAnimTime += 1100;
    setTimeout(function () {
      $(".banner__graphics").addClass("expand");
      $("#main-star").addClass("shrink");
      $(".banner__graphics .detachment").addClass("rise");
    }, startAnimTime);

    //* display the floor
    startAnimTime += 3000;
    setTimeout(function () {
      $(".banner__graphics .floor").addClass("expand");
    }, startAnimTime);

    var smallFontQuota = 3;

    //* check for floor threshhold, and reduce hoizontal margin if the font size is small
    $(".messages-container .message").each(function () {
      var fontSize = 0;

      if (smallFontQuota <= 0) {
        while (fontSize < 0.7) {
          fontSize = Math.random() * 0.9 + 0.5;
        }
      } else fontSize = Math.random() * 0.9 + 0.5;

      $(this).css({
        top: randomIntFromInterval(1, 40) + 5 + "px",
        "font-size": fontSize + "rem",
      });

      const floorHeightThreshold = $(".floor").offset().top + 60; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon

      $(".threshold-bar").css("top", floorHeightThreshold + "px");

      var messageOffset = $(this).outerHeight(true) + $(this).offset().top;
      if (fontSize < 0.7) smallFontQuota -= 1;
      // console.log("current messageOffset: " + messageOffset);
      // console.log("catHeightThreshold: : " + catHeightThreshold);
      // console.log("\n");
      var isBig = false;
      while (
        $(this).outerHeight(true) + $(this).offset().top >
        floorHeightThreshold
      ) {
        // console.log(
        //   "!!! Font too big: reducing size  " +
        //     parseInt($(this).css("font-size"))
        // );
        $(this).css({
          "font-size": parseInt($(this).css("font-size")) - 1 + "px",
          // border: "solid 1px yellow",
        });
        messageOffset = $(this).outerHeight(true) + $(this).offset().top;

        // console.log(
        //   "!!! after reduce size  " + parseInt($(this).css("font-size"))
        // );

        isBig = true;
      }
    });
    const messages = $(".messages-container .message");
    messages.shuffle(messages);

    //* increase the time to display the messages one by one, drop down one by one
    setTimeout(function () {
      $("#welcome-container").css("height", "fit-content");
      $("#welcome-curtain").css("height", "fit-content");
      $("#welcome-msg").css("height", "fit-content");
      $("#welcome-msg h5").css("height", "10px");

      const messages = $(".messages-container .message");

      //* randomize the opacity of the messages, and reduce the horizontal margin of the small sized messages
      messages.each(function () {
        var thisElement = $(this);

        setTimeout(function () {
          const fontSize = parseFloat(thisElement.css("font-size")) * 0.063;
          // console.log(fontSize);
          var opacity = 1;
          var margin = 0.7;

          if (fontSize < 0.6) {
            opacity = Math.random() * 0.4 + 0.4;
            margin = Math.random() * 0.2 + 0.1;
          } else if (fontSize < 0.8) {
            margin = Math.random() * 0.3 + 0.2;
          }

          thisElement.css({
            transform: " translateY(0)",
            opacity: opacity,
            "margin-block": margin + "rem",

            transition:
              "top " +
              randomIntFromInterval(1000, 5000) +
              "ms cubic-bezier(.05, .52, .07, 1.02)," +
              "opacity 5000ms cubic-bezier(.05, .52, .07, 1.02)," +
              "transform " +
              randomIntFromInterval(5000, 10000) +
              "ms cubic-bezier(.05, .52, .07, 1.02)",
          });

          thisElement.addClass("active");
        });
      });
    }, startAnimTime);

    if (event.target === event.currentTarget) {
      //* disable and close off the button
      $("#hero-btn").prop("disabled", true);
      $("#hero-btn").addClass("burst");
      $("#welcome-msg").addClass("burst");

      // $("#hero-btn").addClass("no-hover");
      //* rise the main star
      $("#hero-btn").find("#main-star").addClass("burst");
      burstRangeY = 50;
      burstRangeX = currLeft;

      var currLeft = $(this).position().left;
      var currTop = $(this).position().top;

      $("#hero-btn").off("mouseleave");
      $("#hero-btn").off("mouseenter");

      $("#hero-btn").addClass("hovered");

      //* 12 -> 0 : hovered
      //* > 11 : not hovered

      const startPos = [
        $("#hero-btn").find(".star-container.__3").position().left,
        $("#hero-btn").find(".star-container.__3").position().top,
      ];

      // console.log($("#main-star").position().top);

      var notHovered = $("#main-star").position().top > 11;

      notHovered
        ? console.log("MOON: not hovered")
        : console.log("MOON: hovered");

      //* small stars shrink and expand
      $("#hero-btn")
        .find(".star-container")
        .each(function () {
          //* get current position relative to the parent
          var currLeft = $(this).position().left;
          var currTop = $(this).position().top;

          // console.log(
          //   $(this).attr("class") +
          //     " : " +
          //     " top : " +
          //     currTop +
          //     " left : " +
          //     currLeft
          // );

          //* shrink all stars at the end
          var thisElement = $(this);

          //* ignore the element if it's the big star
          if ($(this).attr("id")) return;

          setTimeout(function () {
            thisElement.removeClass("hovered");

            thisElement.addClass("shrink");
          }, 7500);

          if (notHovered) {
            setTimeout(function () {
              $("#hero-btn")
                .find(".star-container")
                .each(function () {
                  $(this).addClass("hovered");
                });

              $(".tooltips").addClass("hovered");
            });

            setTimeout(function () {
              secodaryExpand(
                thisElement,
                thisElement.position().left,
                thisElement.position().top
              );
            }, 500);
          } else {
            secodaryExpand(
              thisElement,
              thisElement.position().left,
              thisElement.position().top
            );
          }

          return;
        });
    }
  });
});

// const rndInt = randomIntFromInterval(
//   0,
//   $("#hero-btn").find(".star-container").length - 1
// );

// console.log(rndInt);

// $("#hero-btn").find(".star-container").length;
