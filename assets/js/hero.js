import checkMiddleMessage from "./check_mid_fade.js";

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
  //* shuffle messages while checking for cat height threshold
  function shuffle(elements) {
    var j;
    var midIndex = Math.ceil(elements.length / 2) - 1;
    catHeightThreshold =
      $(".floor").offset().top - $(".hero-cat").outerWidth() + 40; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon (floor height + cat height - margin bottom roughly 40px)

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

      // console.log(elements);
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

    //* regardless of even or odd number of messages, we assign the middle elements to a global middle message element
    elements = document.querySelectorAll(".message");
    currentMiddleIndex = Math.ceil(elements.length / 2) - 1;

    document.querySelector(".debug_middleMessageContent").innerHTML =
      elements[currentMiddleIndex].querySelector(".hover-message").innerHTML;

    //todo: maybe set a border on the middle element?
    elements[currentMiddleIndex].style.border = "solid white 1px";

    // todo
    // todo: for each individual message, do the below:
    // const innerMessage = message.querySelector(".msg-inner");

    // //* randomize the opacity of the messages, and reduce the horizontal margin of the small sized messages
    // const fontSize = getElementFontSize(innerMessage) * 0.063;
    // // console.log("Font size is " + fontSize);
    // var opacity = 1;
    // var padding = 13;

    // //* if message font is small, reduce the opacity
    // if (fontSize < 0.6) {
    //   opacity = Math.random() * 0.4 + 0.4;
    //   padding = randomIntFromInterval(1, 3);
    // } else if (fontSize < 0.8) {
    //   padding = randomIntFromInterval(2, 5);
    // }
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

    //* if star origin position at left
    if (currLeft < 12) {
      //* if star original position at left and bottom --> animate to top left
      if (currTop > 12) {
        //* LEFT: Bottom
        burstRangeY = 50;
        burstRangeX = currLeft;

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
          },
        );
      } else {
        //* if star origin position at left and top --> animate to right and top
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
          },
        );
      }
    } else {
      //* if star origin position at right
      if (currTop > 12) {
        //* if star original position at right and bottom --> animate to left bottom
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
          },
        );
      } else {
        //* if star original position at right and top --> animate to right and bottom
        burstRangeY = 60;
        burstRangeX = 40;
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
          },
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

    //* START ANIMATION SEQUENCES ON CLICK: 1st delay 2300
    var startAnimTime = 2300;
    setTimeout(() => {
      //* start burst animation on quote
      detachment_quote.classList.add("burst");
    }, startAnimTime);

    //* 2nd delay 3000
    startAnimTime += 3000;
    //* curtain down
    setStyles(welcome_curtain, {
      height: fullHeight + "px",
      transition:
        "height 3000ms cubic-bezier(.05, .52, .07, 1.02) " +
        startAnimTime +
        "ms",
    });

    //* 3rd delay 2500
    startAnimTime += 2500;
    //* welcome text expand down
    setTimeout(function () {
      document.querySelector("#welcome-container").classList.add("expand");

      //* expand the welcome height by 30px
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

    //* 4th delay 1200
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
      },
    );

    //* 5th delay 1100
    startAnimTime += 1100;
    //* lower the floor and car, shrink the moon down to the white cat, rise the background words a little bit
    setTimeout(function () {
      document.querySelector(".banner__graphics").classList.add("expand");
      main_star.classList.add("shrink");
      detachment_quote.classList.add("rise");
    }, startAnimTime);

    //* 6th delay 3000
    startAnimTime += 3000;
    //* display the floor
    setTimeout(function () {
      catFloor.classList.add("active");
      catHeightThreshold =
        $(".floor").offset().top - $(".hero-cat").outerWidth() + 40;
    }, startAnimTime);

    //* 7th delay 300
    startAnimTime += 300;
    //* increase the time to display the messages one by one, drop down one by one
    setTimeout(function () {
      const messages = document.querySelectorAll(
        ".messages-container .message",
      );

      catHeightThreshold =
        $(".floor").offset().top - $(".hero-cat").outerWidth() - 20; //* make the threshold limit to be the top edge of the moon, means no message should cross the moon (floor height + cat height - margin bottom roughly 40px)

      // //* loop through each message
      messages.forEach(function (message) {
        // const innerMessage = message.querySelector(".msg-inner");

        // //* randomize the opacity of the messages, and reduce the horizontal margin of the small sized messages
        // const fontSize = getElementFontSize(innerMessage) * 0.063;
        // // console.log("Font size is " + fontSize);
        // var opacity = 1;
        // var padding = 13;

        // //* if message font is small, reduce the opacity
        // if (fontSize < 0.6) {
        //   opacity = Math.random() * 0.4 + 0.4;
        //   padding = randomIntFromInterval(1, 3);
        // } else if (fontSize < 0.8) {
        //   padding = randomIntFromInterval(2, 5);
        // }

        //* set style to each individual message
        //* drop down each message: set random opacity + set random top offset from the scree (Each message suspend differently)
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

        //* each message store their own original padding as their own data set
        message.dataset.defaultPadding = parseFloat(
          getComputedStyle(message).paddingBlock,
        );

        //* each message store their own original font size as their own data set
        innerMessage.dataset.defaultFont = getElementFontSize(innerMessage);

        //* add a bit of delay for the animation to end before user can hover on the messages
        setTimeout(() => {
          message.addEventListener("mouseenter", function () {
            console.log("catHeightThreshold ======> ", catHeightThreshold);

            messageHoverIn(message, catHeightThreshold);
          });
          message.addEventListener("mouseleave", function () {
            messageHoverOut(message);
          });
        }, 1000);
      });

      //* get the container that wrap all the messages (to check for mobile screen size)
      const msg_container = document.querySelector(".messages-container");
      var rightOffset =
        window.innerWidth -
        (msg_container.getBoundingClientRect().left +
          msg_container.offsetWidth);

      //* get the container left and right offset relative to the window
      msg_container.style.left =
        msg_container.getBoundingClientRect().left + "px";
      msg_container.style.right = rightOffset + "px";

      //* if mobile/smaller screen size, we display the left and right scroll button
      if (window.innerWidth < msg_container.offsetWidth) {
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

    //* ============ end of animation sequences ===================

    //* ============ before any animation sequences starts ===================
    //* only allow up to maximum 5 small font messages
    var smallFontQuota = 5;
    //* check for floor threshhold, and reduce hoizontal margin if the font size is small
    document
      .querySelectorAll(".messages-container .message p")
      .forEach(function (element) {
        var fontSize = 0;

        //* if small font messages quota has reached, generate random larger font sizes
        if (smallFontQuota <= 0) {
          fontSize = Math.random() * 0.9 + 0.5;
        } else fontSize = Math.random() * 0.3 + 0.5;

        element.style.fontSize = fontSize + "rem";

        //* for each individual message container, set a random top offset to the parent
        const parentMessage = element.closest(".message");
        parentMessage.style.top = randomIntFromInterval(1, 40) + 5 + "px";

        // var messageOffset = $(this).offsetHeight(true) + $(this).offset().top;
        if (fontSize < 0.7) smallFontQuota -= 1;
        // console.log("current messageOffset: " + messageOffset);
        // console.log("catHeightThreshold: : " + catHeightThreshold);
        // console.log("\n");

        //* make the threshold limit to be the top edge of the moon, means no message should cross the moon
        const floorHeightThreshold =
          document.querySelector(".floor").getBoundingClientRect().top + 60;

        //* Keep reducing the font size until the message doesn't exceed the floor threshold
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
                .getPropertyValue("font-size"),
            ) -
            1 +
            "px";

          // console.log(
          //   "!!! after reduce size  " + parseInt($(this).css("font-size"))
          // );
        }

        //* generate hovered inner text (with white background after hover on individual message)
        const messageText = element.innerHTML;

        const newElement = document.createElement("span");
        newElement.classList.add("hover-message");
        newElement.innerHTML = messageText;

        element.append(newElement);
      });

    const messages = document.querySelectorAll(".messages-container .message");

    //todo: replace shuffle to check middle message blur
    shuffle(messages);

    // console.log($("#main-star").position().top);

    //* get original main star/moon offset
    var notHovered =
      getParentOffset(document.querySelector("#main-star"), "top") > 11;

    // notHovered
    //   ? console.log("MOON: not hovered")
    //   : console.log("MOON: hovered");

    //* small stars PRIMARY EXPAND
    document
      .querySelector("#hero-btn")
      .querySelectorAll(".star-container")
      .forEach(function (element) {
        //* ignore the element if it's the big star
        if (element.id === "main-star") return;

        //* shrink all stars at the end of animation
        var thisElement = element;
        setTimeout(function () {
          thisElement.classList.remove("hovered");
          thisElement.classList.add("shrink");
        }, 10000);

        //* if original main star position is not out and above the main button (that means user is on a mobile phone and just tapped the main button only)
        //* then we want to primary expand it and then secondary expand all the stars in sequence
        //* otherwise the user must have already hovered the button and so in that case we just do secondary expand on all the stars
        if (notHovered) {
          //* primary expand on all the stars
          setTimeout(function () {
            document
              .querySelector("#hero-btn")
              .querySelectorAll(".star-container")
              .forEach(function (star) {
                star.classList.add("hovered");
              });

            $(".tooltips").classList.add("hovered");
          });
          //* shortly after primary expand, secondary expand on all the stars
          setTimeout(function () {
            secondaryExpand(
              thisElement,
              getParentOffset(thisElement, "left"),
              getParentOffset(thisElement, "top"),
            );
          }, 700);
        } else
          secondaryExpand(
            thisElement,
            getParentOffset(thisElement, "left"),
            getParentOffset(thisElement, "top"),
          );

        return;
      });
  });
});
