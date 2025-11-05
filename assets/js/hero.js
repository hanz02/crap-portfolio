function getParentOffset(element, direction) {
  switch (direction) {
    case "top":
      return (
        element.getBoundingClientRect().top -
        element.offsetParent.getBoundingClientRect().top
      );
    case "left":
      return (
        element.getBoundingClientRect().left -
        element.offsetParent.getBoundingClientRect().left
      );

    default:
      return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const catFloor = document.querySelector(".banner__graphics .floor");

  var isBurst = false;

  //* set css styling more easier
  function setStyles(el, styles) {
    for (const prop in styles) {
      el.style[prop] = styles[prop];
    }
  }

  //* get element font size
  function getElementFontSize(element) {
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      const fontSizeString = computedStyle.getPropertyValue("font-size");
      //* Extract the numeric part and convert to a number
      const fontSizeInPixels = parseFloat(fontSizeString);
      return fontSizeInPixels;
    }
    return null;
  }

  // //* swap two elements on the dom tree
  function swapElements(el1, el2) {
    if (!(el1 instanceof Element) || !(el2 instanceof Element)) return;

    // Create placeholders
    const temp1 = document.createElement("div");
    const temp2 = document.createElement("div");

    // Insert placeholders right before both elements
    el1.parentNode.insertBefore(temp1, el1);
    el2.parentNode.insertBefore(temp2, el2);

    // Move elements to each other's placeholders
    temp1.parentNode.insertBefore(el2, temp1);
    temp2.parentNode.insertBefore(el1, temp2);

    // Remove placeholders
    temp1.remove();
    temp2.remove();
  }

  var catHeightThreshold = 0;
  //* shuffle messages while checking for cat threshold
  function shuffle(elements) {
    var j;
    var midIndex = Math.ceil(elements.length / 2) - 1;
    catHeightThreshold =
      $(".floor").offset().top - $(".hero-cat").outerWidth() + 40; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon (floor height + cat height - margin bottom roughly 40px)

    console.log("cat threshold: " + catHeightThreshold);

    for (var i = 0; i < elements.length; i++) {
      // $(elements[i]).before($(elements[j]));
      // } while (parseInt($(elements[midIndex]).css("height")) > 490);
      j = Math.floor(Math.random() * elements.length);
      elements[i].parentNode.insertBefore(elements[j], elements[i]);

      // console.log("$(elements[i]).css(top) :: " + $(elements[i]).css("top"));
      elements[i].style.transform = "translateY(0)";
    }

    //* refresh the message array order from th dorm tree after shuffle
    elements = document.querySelectorAll(".message");

    var midLeft = midIndex - 1;
    var midRight = midIndex + 1;
    //* if there are odd number of messages, check for middle, left and right
    if (elements.length % 2 == 1) {
      var midOffset =
        elements[midIndex].offsetHeight +
        elements[midIndex].getBoundingClientRect().top;

      var midLeftOffset =
        elements[midLeft].offsetHeight + $(elements[midLeft]).offset().top;

      var midRightOffset =
        elements[midRight].offsetHeight +
        elements[midRight].getBoundingClientRect().top;

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
        elements = document.querySelectorAll(".message");
        midLeftOffset =
          elements[midLeft].offsetHeight +
          elements[midLeft].getBoundingClientRect().top;

        midRightOffset =
          elements[midRight].offsetHeight +
          elements[midRight].getBoundingClientRect().top;

        midOffset =
          elements[midIndex].offsetHeight +
          elements[midIndex].getBoundingClientRect().top;

        if (midOffset > catHeightThreshold) {
          console.log("TOO HIGH offset middle: " + midLeftOffset);
          // $(elements[midIndex]).css("border", "1px solid red");
          swapElements(elements[counter], elements[midIndex]);

          counter += 1;
          console.log("counter: :: " + counter);
        }

        //* if long message is in the middle right
        if (midRightOffset > catHeightThreshold) {
          // $(elements[midRight]).css("border", "1px solid goldenrod");
          swapElements(elements[counter], elements[midRight]);
          counter += 1;
        }

        //* if long message is in the middle left
        if (midLeftOffset > catHeightThreshold) {
          console.log("TOO HIGH offset left: " + midLeftOffset);
          // $(elements[midLeft]).css("border", "1px solid green");
          swapElements(elements[midLeft], elements[counter]);
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
      // elements = $(".message");
      // $("#the__one").swapElements($(elements[midIndex]));
      //! debug use
      elements = document.querySelectorAll(".message");

      midLeftOffset =
        elements[midLeft].offsetHeight +
        elements[midLeft].getBoundingClientRect().top;

      midRightOffset =
        elements[midRight].offsetHeight +
        elements[midRight].getBoundingClientRect().top;

      midOffset =
        elements[midIndex].offsetHeight +
        elements[midIndex].getBoundingClientRect().top;

      console.log("----> AFTER offset middle: " + midOffset);
      console.log("----> AAFTER offset left: " + midLeftOffset);
      console.log("----> AFTER offset right: " + midRightOffset);

      //! debug border message
      // elements[midLeft].style.border = "1px solid var(--hero-white)";
      // elements[midRight].style.border = "1px solid var(--hero-white)";
      // elements[midIndex].style.border = "1px solid var(--hero-white)";
    } else {
      //* if there are even number of messages, check for left and right
      midLeft = midIndex;
      midRight = midIndex + 1;

      // console.log("midLeft  " + midLeft);
      // console.log("midRight  " + midRight);

      var midLeftOffset =
        elements[midLeft].offsetHeight +
        elements[midLeft].getBoundingClientRect().top;

      var midRightOffset =
        elements[midRight].offsetHeight +
        elements[midRight].getBoundingClientRect().top;

      // console.log("THRESHOLD " + catHeightThreshold);
      // console.log("$(elements[midLeft]).offset() " + midLeftOffset);
      // console.log("$(elements[midRight]).offset() " + midRightOffset);

      var counter = 0;
      // //* check for right and left, make sure no long ass messages are in the middle
      while (
        midRightOffset > catHeightThreshold ||
        midLeftOffset > catHeightThreshold
      ) {
        elements = document.querySelectorAll(".message");
        midLeftOffset =
          elements[midLeft].offsetHeight +
          elements[midLeft].getBoundingClientRect().top;

        midRightOffset =
          elements[midRight].offsetHeight +
          elements[midRight].getBoundingClientRect().top;

        //* if long message is in the middle right
        if (midRightOffset > catHeightThreshold) {
          console.log("TOO HIGHH offset right: " + midRightOffset);
          // $(elements[midRight]).css("border", "1px solid skyblue");
          swapElements(elements[midRight], elements[counter]);
          counter += 1;
        }

        //* if long message is in the middle left
        if (midLeftOffset > catHeightThreshold) {
          console.log("TOO HIGHHHH offset left: " + midLeftOffset);
          // $(elements[midLeft]).css("border", "1px solid purple");
          swapElements(elements[midLeft], elements[counter]);
          counter += 1;
        }

        if (counter >= elements.length) break;

        // elements = $(".message");
        // $("#the__one").swapElements($(elements[midRight]));
      }

      // $(elements[midLeft]).css("border", "1px solid magenta");
      // $(elements[midRight]).css("border", "1px solid skyblue");

      //! debug border message
      // elements[midLeft].style.border = "solid white 1px";
      // elements[midRight].style.border = "solid white 1px";

      midLeftOffset =
        elements[midLeft].offsetHeight +
        elements[midLeft].getBoundingClientRect().top;

      midRightOffset =
        elements[midRight].offsetHeight +
        elements[midRight].getBoundingClientRect().top;
    }
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  //* secondaryExpand
  function secondaryExpand(star, currLeft, currTop) {
    var burstRangeY = 50;
    var burstRangeX = currLeft;

    //* duration for the animation
    const burstDuration = 2000;
    if (currLeft < 12) {
      if (currTop > 12) {
        //* LEFT: Bottom
        burstRangeY = 50;
        burstRangeX = currLeft;

        //todo continue here
        star.animate(
          [
            {
              left: getComputedStyle(star).left,
              top: getComputedStyle(star).top,
            },
            {
              // transition: "all 300ms ease-out",
              left: currLeft + -burstRangeX + "px",
              top: currTop + -burstRangeY + "px",
            },
          ],
          {
            duration: burstDuration,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)", // equivalent to easeOutExpo
            fill: "forwards", // keeps final position
          }
        );
      } else {
        //* LEFT: Top
        burstRangeY = -50;
        burstRangeX = 130;
        star.animate(
          [
            {
              left: currLeft + burstRangeX + "px",
              top: currTop + -burstRangeY + "px",
            },
          ],
          {
            duration: burstDuration,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)", // equivalent to easeOutExpo
            fill: "forwards", // keeps final position
          }
        );
      }
    } else {
      if (currTop > 12) {
        //* RIGHT: Bottom
        burstRangeY = 0;
        burstRangeX = 120;
        star.animate(
          [
            {
              left: currLeft + -burstRangeX + "px",
              top: currTop + burstRangeY + "px",
            },
          ],
          {
            duration: burstDuration,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)", // equivalent to easeOutExpo
            fill: "forwards", // keeps final position
          }
        );
      } else {
        //* RIGHT: Top
        burstRangeY = 40;
        burstRangeX = 20;
        star.animate(
          [
            {
              left: currLeft + burstRangeX + "px",
              top: currTop + burstRangeY + "px",
            },
          ],
          {
            duration: burstDuration,
            easing: "cubic-bezier(0.19, 1, 0.22, 1)", // equivalent to easeOutExpo
            fill: "forwards", // keeps final position
          }
        );
      }
      burstRangeX = 20;
      burstRangeY = 10;
    }
  }

  const hero_btn = document.querySelector("#hero-btn");
  const tooltips = document.querySelector(".tooltips");

  var isHovered = false;
  //* in and out hover to display the stars
  function heroMouseEnter() {
    isHovered = true;

    hero_btn.classList.add("hovered");

    hero_btn.querySelectorAll(".star-container").forEach(function (element) {
      element.classList.add("hovered");
    });

    tooltips.classList.add("hovered");
  }
  hero_btn.addEventListener("mouseenter", heroMouseEnter);

  function heroMouseLeave() {
    isHovered = false;
    hero_btn.classList.remove("hovered");
    hero_btn.querySelectorAll(".star-container").forEach(function (element) {
      if (element.id === "main-star") return;
      element.classList.remove("hovered");
    });
    tooltips.classList.remove("hovered");

    setTimeout(() => {
      if (isHovered || isBurst) {
        return;
      }

      document.querySelector("#main-star").classList.remove("hovered");
    }, 2000);
  }

  hero_btn.addEventListener("mouseleave", heroMouseLeave);

  const main_star = document.querySelector("#main-star");
  const detachment_quote = document.querySelector(".detachment");

  //* on click hero button
  hero_btn.addEventListener("click", function (event) {
    event.stopPropagation();
    isBurst = true;

    //* open the curtain briefly to get the height
    const welcome_curtain = document.querySelector("#welcome-curtain");

    //* Reset height to auto to get full scroll height
    const fullHeight = welcome_curtain.scrollHeight;
    //* get welcome container and set it to curtain height when it's fit content full height
    document.querySelector("#welcome-container").style.height =
      fullHeight + "px";

    //* close the curtain height to 0 and trigger reflow
    welcome_curtain.style.height = "0";
    welcome_curtain.offsetHeight;

    //* disable and close off the button
    hero_btn.disabled = true;

    //* add burst class to button and welcome message
    hero_btn.classList.add("burst");

    //* rise the main star
    main_star.classList.add("burst");

    //* turn off mouse leave and mouse enter hover event
    hero_btn.removeEventListener("mouseleave", heroMouseLeave);
    hero_btn.removeEventListener("mouseenter", heroMouseEnter);

    //* permanently set the button to hovered
    hero_btn.classList.add("hovered");

    //* delay and disable tooltips
    setTimeout(function () {
      tooltips.classList.add("hovered");
    }, 2000);

    var startAnimTime = 2300;
    setTimeout(() => {
      //* start burst animation on quote
      detachment_quote.classList.add("burst");
    }, startAnimTime);

    startAnimTime += 3000;
    //* 1st delay 3000
    //* curtain down
    setStyles(welcome_curtain, {
      height: fullHeight + "px",
      transition:
        "height 3000ms cubic-bezier(.05, .52, .07, 1.02) " +
        startAnimTime +
        "ms",
    });

    startAnimTime += 2500;
    //* expand out
    setTimeout(function () {
      document.querySelector("#welcome-container").classList.add("expand");

      //* expand the height bby 30px
      const fullHeight =
        document.querySelector("#welcome-curtain").scrollHeight;

      setStyles(welcome_curtain, {
        height: fullHeight + 30 + "px",
        transition: "height 1000ms cubic-bezier(.05, .52, .07, 1.02)",
      });

      //* move up the welcome message to make space for black star
      document.querySelector("#welcome-msg h5").classList.add("expand");
      //* counter move down the dark cat
      document.querySelector(".dark-cat").classList.add("expand");
      //* move up and show the black star
      document.querySelector(".star-dark").classList.add("active");
      //* inflate the big star a bit
      main_star.classList.add("expand");

      //* hide all the messages
      document.querySelector(".messages-container").classList.add("hide");
    }, startAnimTime);

    startAnimTime += 1200;
    //* close dark cat -> display light cat
    setTimeout(
      function () {
        //* display the closing message block
        document.querySelector("#closing-img").style.display = "flex";
        //* collpase the welcome message using clip path
        welcome_curtain.classList.add("collapse");
      },
      startAnimTime,
      function () {
        setStyles(welcome_curtain, {
          height: $("#welcome-curtain").css("height", 0) + "px",
          transition: "height 1000ms cubic-bezier(.05, .52, .07, 1.02)",
        });
      }
    );

    //* lower the floor and car, shrink the moon down to the white cat, rise the background words a little bit
    startAnimTime += 1100;
    setTimeout(function () {
      document.querySelector(".banner__graphics").classList.add("expand");
      main_star.classList.add("shrink");
      detachment_quote.classList.add("rise");
    }, startAnimTime);

    //* display the floor
    startAnimTime += 3000;
    setTimeout(function () {
      catFloor.classList.add("active");
      catHeightThreshold =
        $(".floor").offset().top - $(".hero-cat").outerWidth() + 40;
    }, startAnimTime);

    startAnimTime += 300;
    //* increase the time to display the messages one by one, drop down one by one
    setTimeout(function () {
      const messages = document.querySelectorAll(
        ".messages-container .message"
      );

      // //* loop through each message
      messages.forEach(function (message) {
        const innerMessage = message.querySelector(".msg-inner");

        //* randomize the opacity of the messages, and reduce the horizontal margin of the small sized messages
        const fontSize = getElementFontSize(innerMessage) * 0.063;
        // console.log("Font size is " + fontSize);
        var opacity = 1;
        var padding = 13;

        //* if message font is small, reduce the opacity
        if (fontSize < 0.6) {
          opacity = Math.random() * 0.4 + 0.4;
          padding = randomIntFromInterval(1, 3);
        } else if (fontSize < 0.8) {
          padding = randomIntFromInterval(2, 5);
        }

        setStyles(message, {
          transform: " translateY(0)",
          opacity: opacity,
          "padding-block": padding + "px",

          transition:
            "top " +
            randomIntFromInterval(1000, 5000) +
            "ms cubic-bezier(.05, .52, .07, 1.02)," +
            "opacity 5000ms cubic-bezier(.05, .52, .07, 1.02)," +
            "transform " +
            randomIntFromInterval(2000, 7000) +
            "ms cubic-bezier(.05, .52, .07, 1.02), " +
            "background 2000ms cubic-bezier(.05, .52, .07, 1.02)",
        });

        message.classList.add("active");

        // //* append a message predict span into the msg-inner p tag
        // $(this)
        //   .find(".msg-inner")
        //   .append("<span class='message-predict'></span>");

        // console.log($(this).find(".hover-message").height());

        // //* then copy it's sibling height to the message predict that we have just appended
        // $(this)
        //   .find(".message-predict")
        //   .css({
        //     height: $(this).find(".hover-message").height() + "px",
        //   });

        message.dataset.defaultPadding = parseFloat(
          getComputedStyle(message).paddingBlock
        );

        innerMessage.dataset.defaultFont = getElementFontSize(innerMessage);

        //* add a bit of delay for the animation to end before user can hover on the messages
        setTimeout(() => {
          message.addEventListener("mouseenter", function () {
            messageHoverIn(message, catHeightThreshold);
          });
          message.addEventListener("mouseleave", function () {
            messageHoverOut(message);
          });
        }, 1000);
      });

      // const middleScrollOffset =
      //   ($(".messages-container").outerWidth(true) -
      //     $(".banner__graphics").width()) /
      //   2;
      // $(".banner__graphics").scrollLeft(middleScrollOffset);

      // //* after drop down of each message, set left and right overflow width for scroll button
      // console.log(
      //   '$(".banner__graphics").width() : : ' + $(".banner__graphics").width()
      // );
      // console.log('' + $(".messages-container").outerWidth(true));

      const msg_container = document.querySelector(".messages-container");
      var rightOffset =
        window.innerWidth -
        (msg_container.getBoundingClientRect().left +
          msg_container.offsetWidth);

      msg_container.style.left =
        msg_container.getBoundingClientRect().left + "px";
      msg_container.style.right = rightOffset + "px";

      if (window.innerWidth < msg_container.offsetWidth) {
        console.log("SMALL SIZE SCREEN");
        document.querySelector(".scroll-button").classList.add("active");

        document
          .querySelector("#btn-left")
          .addEventListener("click", function () {
            messageLeftScroll(catHeightThreshold);
          });

        document
          .querySelector("#btn-right")
          .addEventListener("click", function () {
            messageRightScroll(catHeightThreshold);
          });
      }
    }, startAnimTime);

    var smallFontQuota = 5;
    //* check for floor threshhold, and reduce hoizontal margin if the font size is small
    document
      .querySelectorAll(".messages-container .message p")
      .forEach(function (element) {
        var fontSize = 0;

        if (smallFontQuota <= 0) {
          fontSize = Math.random() * 0.9 + 0.5;
        } else fontSize = Math.random() * 0.2 + 0.4;

        const parentMessage = element.closest(".message");

        element.style.fontSize = fontSize + "rem";

        parentMessage.style.top = randomIntFromInterval(1, 40) + 5 + "px";

        // var messageOffset = $(this).offsetHeight(true) + $(this).offset().top;
        if (fontSize < 0.7) smallFontQuota -= 1;
        // console.log("current messageOffset: " + messageOffset);
        // console.log("catHeightThreshold: : " + catHeightThreshold);
        // console.log("\n");

        const floorHeightThreshold =
          document.querySelector(".floor").getBoundingClientRect().top + 60; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon

        while (
          parentMessage.offsetHeight +
            parentMessage.getBoundingClientRect().top >
          floorHeightThreshold
        ) {
          // console.log(
          //   "!!! Font too big: reducing size  " +
          //     parseInt($(this).css("font-size"))
          // );
          element.style.fontSize =
            parseFloat(
              window
                .getComputedStyle(element, null)
                .getPropertyValue("font-size")
            ) -
            1 +
            "px";

          // console.log(
          //   "!!! after reduce size  " + parseInt($(this).css("font-size"))
          // );
        }

        const messageText = element.innerText;

        const newElement = document.createElement("span");
        newElement.classList.add("hover-message");
        newElement.textContent = messageText;

        element.append(newElement);
      });

    const messages = document.querySelectorAll(".messages-container .message");

    //todo: replace shuffle to check middle message blur
    shuffle(messages);

    // console.log($("#main-star").position().top);

    var notHovered =
      getParentOffset(document.querySelector("#main-star"), "top") > 11;

    // notHovered
    //   ? console.log("MOON: not hovered")
    //   : console.log("MOON: hovered");

    //* small stars shrink and expand
    document
      .querySelector("#hero-btn")
      .querySelectorAll(".star-container")
      .forEach(function (element) {
        //* ignore the element if it's the big star
        if (element.id === "main-star") return;

        //* shrink all stars at the end
        var thisElement = element;
        setTimeout(function () {
          thisElement.classList.remove("hovered");
          thisElement.classList.add("shrink");
        }, 10000);

        if (notHovered) {
          setTimeout(function () {
            document
              .querySelector("#hero-btn")
              .querySelectorAll(".star-container")
              .forEach(function (star) {
                star.classList.add("hovered");
              });

            $(".tooltips").classList.add("hovered");
          });

          setTimeout(function () {
            //todo conitnue here
            secondaryExpand(
              thisElement,
              getParentOffset(thisElement, "left"),
              getParentOffset(thisElement, "top")
            );
          }, 700);
        } else
          secondaryExpand(
            thisElement,
            getParentOffset(thisElement, "left"),
            getParentOffset(thisElement, "top")
          );

        return;
      });
  });
});
