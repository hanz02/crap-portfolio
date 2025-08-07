$(document).ready(function () {
  var isBurst = false;

  const startPos = [
    $("#hero-btn").find(".star-container.__3").position().left,
    $("#hero-btn").find(".star-container.__3").position().top,
  ];

  //* in and out hover to display the stars
  $("#hero-btn").mouseenter(function () {
    $("#hero-btn")
      .find(".star-container")
      .each(function () {
        $(this).addClass("hovered");
      });

    $(".tooltips").addClass("hovered");
  });

  $("#hero-btn").mouseleave(function () {
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

    //* delay and disable tooltips
    setTimeout(function () {
      $(".tooltips").removeClass("hovered");
    }, 2000);

    //* 1st delay 3000
    //* curtain down
    $el.css({
      height: fullHeight + "px",
      transition: "height 3000ms cubic-bezier(.05, .52, .07, 1.02) 2000ms",
    });

    //* 1st delay 3000 + 3000 = 6000
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
    }, 5000);

    //* 3rd delay 3000 + 3000 + 3000 = 9000
    //* close dark cat -> display light cat
    setTimeout(
      function () {
        //* display the closing message block
        $("#closing-img").css("display", "flex");
        //* collpase the welcome message using clip path
        $("#welcome-curtain").addClass("collapse");
      },
      6500,
      function () {
        $("#welcome-curtain").css({
          height: $("#welcome-curtain").css("height", 0) + "px",
          transition: "height 1000ms cubic-bezier(.05, .52, .07, 1.02)",
        });
      }
    );

    setTimeout(function () {
      $(".banner__graphics .floor").addClass("expand");
    }, 7500);

    setTimeout(function () {
      $("#main-star").addClass("shrink");
    }, 7500);

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

      //* duration for the animation
      const burstDuration = 2000;

      var currLeft = $(this).position().left;
      var currTop = $(this).position().top;

      $("#hero-btn").off("mouseleave");
      $("#hero-btn").off("mouseenter");

      $("#hero-btn").addClass("hovered");

      $("#hero-btn")
        .find(".star-container")
        .each(function () {
          //* get current position relative to the parent
          var currLeft = $(this).position().left;
          var currTop = $(this).position().top;

          //* ignore the element if it's the big star
          if ($(this).attr("id")) return;

          if (currLeft < 12) {
            if (currTop > 12) {
              //* LEFT: Bottom
              burstRangeY = 50;
              burstRangeX = currLeft;
              $(this).animate(
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
              $(this).animate(
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
              $(this).animate(
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
              $(this).animate(
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

          //* shrink each of the small stars at the end
          var $thisElement = $(this);
          setTimeout(function () {
            console.log($thisElement);

            $thisElement.addClass("shrink");
            $thisElement.removeClass("hovered");
          }, 7500);
        });
    }
  });
});

// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// const rndInt = randomIntFromInterval(
//   0,
//   $("#hero-btn").find(".star-container").length - 1
// );

// console.log(rndInt);

// $("#hero-btn").find(".star-container").length;
