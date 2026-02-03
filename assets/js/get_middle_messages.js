import getCatOffset from "./cat_offset.js";

export function travelGetMiddleMessagesList(
  catOffsets,
  messages,
  middleIndex,
  direction,
  scrollDistance,
) {
  let messagesIndexList = [];

  if (direction === "left") {
    //* check the right edge of current "middle" message (ater adding the scroll distance) is still away from
    while (
      messages[middleIndex].getBoundingClientRect().right + scrollDistance >
      catOffsets.catLeftOffset
    ) {
      messages[middleIndex].style.border = "1px solid red";

      messagesIndexList.push(middleIndex);
      middleIndex++;

      document.querySelector(".threshold-bar-y-3").style.left =
        messages[middleIndex].getBoundingClientRect().right + "px";
    }

    //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
    //* note: right to left of the array --> 0 to last element of the array
  } else if (direction === "right") {
    while (
      messages[middleIndex].getBoundingClientRect().left - scrollDistance <
      catOffsets.catRightOffset
    ) {
      messages[middleIndex].style.border = "1px solid green";
      messagesIndexList.push(middleIndex);
      middleIndex--;
    }
  } else {
    messagesIndexList.push(middleIndex - 1);
    messagesIndexList.push(middleIndex);
    messagesIndexList.push(middleIndex + 1);
  }

  //* we return an array of ranges of middle messages near the cat (left to right order of the messages)
  return messagesIndexList;
}

//* the purpose 0f catHeightThreshold is for initial messages drop down, the cat height is different than that after the messages dropped down
//* we need scrollDirection and scrollDistance for mobile (for PC, we would put the value 'center' )
export function checkMessageListBlockingCat(
  messagesIndexList,
  catOffsets,
  catHeightThreshold,
  scrollDirection,
  scrollDistance,
) {
  let start;
  let end;

  if (scrollDirection === "right") {
    start = messagesIndexList[messagesIndexList.length - 1];
    end = messagesIndexList[0];
  } else {
    start = messagesIndexList[0];
    end = messagesIndexList[messagesIndexList.length - 1];
  }

  //* loop through the middle ranged messages list (IMPORTANT: WE LOOP THROUGH THE INDEXES OF THE MESSAGES, NOT THE MESSAGES ITSELF)
  while (start <= end) {
    const message = document
      .querySelectorAll(".message")
      [start].querySelector("p");
    message.style.border = "1px solid white";
    console.log("=============== INDEX ", start, "=======================");

    //* get offset objects of individual middle messages
    const messageOffsets = message.getBoundingClientRect();
    let msgRightOffset = messageOffsets.right;
    let msgLeftOffset = messageOffsets.left;

    console.log("msgRightOffset ===> ", msgRightOffset);

    if (scrollDirection === "left") {
      msgRightOffset += scrollDistance;
      msgLeftOffset += scrollDistance;
    } else if (scrollDirection === "right") {
      msgRightOffset -= scrollDistance;
      msgLeftOffset -= scrollDistance;
    }

    console.log("msgRightOffset AFTER ===> ", msgRightOffset);
    console.log("catOffsets.catLeftOffset   =====> ", catOffsets.catLeftOffset);
    console.log("catOffsets.catRightOffset ====> ", catOffsets.catRightOffset);

    //* if individual message right edge is within cat blocking range OR if  individual message left edge is within cat blovking range
    if (
      (msgRightOffset > catOffsets.catLeftOffset &&
        msgRightOffset < catOffsets.catRightOffset) ||
      (msgLeftOffset > catOffsets.catLeftOffset &&
        msgLeftOffset < catOffsets.catRightOffset)
    ) {
      document.querySelector(".threshold-bar-cat").style.top =
        catHeightThreshold + "px";

      console.log("message MESSAGE ====> ", message.innerHTML);
      document.querySelector(".threshold-bar-x").style.top =
        messageOffsets.bottom + "px";
      //* if individual message left or right edge is within cat blocking range AND that individual message is below the cat height threshold
      //* that means the individual message is indeed blocking the cat
      if (messageOffsets.bottom > catHeightThreshold) {
        message.style.border = "1px solid gold";

        //* return true and the index of the latest middle message that is blocking the cat
        return {
          isBlockingCat: true,
          latestMiddleMessageIndex: start,
        };
      }
    }

    console.log(
      "___________________________________________________________________",
    );
    start++;
  }

  //* return true and the index of the latest middle message (last message in the list) that is blocking the cat
  return {
    isBlockingCat: false,
    latestMiddleMessageIndex: end,
  };
}
