let layoutDirectory = (layoutDirectoryInput, layoutDirectoryElement) => layoutDirectoryInput.forEach(async (layoutDirectoryInputItem) => {
  if (Array.isArray(layoutDirectoryInputItem[1])) {
    let layoutDirectoryInputItemButton = document.createElement("button");
    let layoutDirectoryInputItemButtonArrowIcon = document.createElement("div");
    let layoutDirectoryInputItemButtonContainer = document.createElement("div");
    layoutDirectoryInputItemButtonArrowIcon.style.width = "0";
    layoutDirectoryInputItemButtonArrowIcon.style.height = "0";
    layoutDirectoryInputItemButtonArrowIcon.style.border = "4px solid";
    layoutDirectoryInputItemButtonArrowIcon.style.borderColor = "#212121 #212121 transparent transparent";
    layoutDirectoryInputItemButtonArrowIcon.style.transform = "rotate(45deg)";
    layoutDirectoryInputItemButtonArrowIcon.style.marginTop = "-12.5px";
    layoutDirectoryInputItemButtonArrowIcon.style.marginLeft = "237.5px";
    layoutDirectoryInputItemButton.style.fontWeight = "800";
    layoutDirectoryInputItemButton.style.padding = "7px 17.5px";
    layoutDirectoryInputItemButton.style.textAlign = "left";
    layoutDirectoryInputItemButton.style.color = "#000000bd";
    layoutDirectoryInputItemButton.style.backgroundColor = "transparent";
    layoutDirectoryInputItemButton.style.border = "none";
    layoutDirectoryInputItemButton.style.cursor = "pointer";
    layoutDirectoryInputItemButton.innerText = layoutDirectoryInputItem[0].split("_").map((directoryItemPiece) => directoryItemPiece.toUpperCase()).join(" ");
    layoutDirectoryInputItemButton.addEventListener("click", () => {
      if (new Set(Array.from(layoutDirectoryInputItemButtonContainer.children).map((layoutDirectoryInputItemFileButton) => layoutDirectoryInputItemFileButton.matches(":hover"))).has(true)) return;
      layoutDirectoryInputItemButtonContainer.style.display = (layoutDirectoryInputItemButtonContainer.style.display === "block") ? "none" : "block";
      layoutDirectoryInputItemButtonArrowIcon.style.transform = (layoutDirectoryInputItemButtonContainer.style.display === "block") ? "rotate(135deg)" : "rotate(45deg)";
      layoutDirectoryInputItemButtonArrowIcon.style["-webkit-animation-name"] = (layoutDirectoryInputItemButtonContainer.style.display === "block") ? "animateDown" : "animateRight";
      layoutDirectoryInputItemButtonArrowIcon.style["-webkit-animation-duration"] = "0.2s";
      layoutDirectoryInputItemButtonArrowIcon.style.animationName = (layoutDirectoryInputItemButtonContainer.style.display === "block") ? "animateDown" : "animateRight";
      layoutDirectoryInputItemButtonArrowIcon.style.animationDuration = "0.2s";
      setTimeout(() => {
        layoutDirectoryInputItemButtonArrowIcon.style.removeProperty("-webkit-animation-name");
        layoutDirectoryInputItemButtonArrowIcon.style.removeProperty("animation-name");
        layoutDirectoryInputItemButtonArrowIcon.style.removeProperty("-webkit-animation-nuration");
        layoutDirectoryInputItemButtonArrowIcon.style.removeProperty("animation-duration");
      }, 400);
    });
    layoutDirectoryInputItemButtonContainer.style.display = "none";
    layoutDirectoryInputItemButtonContainer.style.paddingTop = "4px";
    layoutDirectoryInputItemButtonContainer.dataset.path = layoutDirectoryInputItem[0];
    layoutDirectoryInputItemButton.appendChild(layoutDirectoryInputItemButtonArrowIcon);
    layoutDirectoryInputItemButton.appendChild(layoutDirectoryInputItemButtonContainer);
    layoutDirectoryElement.appendChild(layoutDirectoryInputItemButton);
    layoutDirectory(layoutDirectoryInputItem[1], layoutDirectoryInputItemButtonContainer);
  } else {
    let layoutDirectoryInputItemButton = document.createElement("button");
    let layoutDirectoryItemMarkdownContainer = document.createElement("div");
    let layoutDirectoryPath = "";
    let layoutDirectoryPathCurrentElement = layoutDirectoryElement;
    layoutDirectoryInputItemButton.className = "layoutDirectoryInputItemFileButton";
    layoutDirectoryInputItemButton.style.width = "260px";
    layoutDirectoryInputItemButton.style.padding = "7px 17.5px";
    layoutDirectoryInputItemButton.style.fontSize = "13.5px";
    layoutDirectoryInputItemButton.style.fontWeight = "600";
    layoutDirectoryInputItemButton.style.color = "#7953dc";
    layoutDirectoryInputItemButton.style.backgroundColor = "transparent";
    layoutDirectoryInputItemButton.style.border = "none";
    layoutDirectoryInputItemButton.style.textAlign = "left";
    layoutDirectoryInputItemButton.style.opacity = "0.95";
    layoutDirectoryInputItemButton.style.cursor = "pointer";
    layoutDirectoryInputItemButton.innerText = layoutDirectoryInputItem[0].split(".").toSpliced(-1).join("").split("_").map((directoryItemPiece) => directoryItemPiece[0].toUpperCase() + directoryItemPiece.slice(1)).join(" ");
    layoutDirectoryInputItemButton.addEventListener("click", () => {
      Array.from(document.getElementById("markdownDocumentationContainer").children).forEach((markdownDocumentationContainer) => {
        markdownDocumentationContainer.style.display = "none";
      });
      layoutDirectoryItemMarkdownContainer.style.display = "block";
      window.scrollTo(0, 0);
    });
    while (layoutDirectoryPathCurrentElement.id !== "directoryLayoutContainer") {
      layoutDirectoryPath += layoutDirectoryPathCurrentElement.dataset.path + "/";
      layoutDirectoryPathCurrentElement = layoutDirectoryPathCurrentElement.parentElement.parentElement;
    };
    layoutDirectoryItemMarkdownContainer.innerHTML = DOMPurify.sanitize(await (((options.includes("customMarkdownParser")) ? async (markdownDocumentationContent) => eval("(async (customMarkdownDocumentationContent) => (" + (await (await fetch("/expressDocsAssets/customMarkdownParser.js")).text()) + ")(customMarkdownDocumentationContent))(`" + markdownDocumentationContent.replace(/`/g, "\\`") + "`);") : marked.parse)(await (await fetch("/expressDocsMarkdownAssets/" + layoutDirectoryPath + layoutDirectoryInputItem[0])).text())));
    layoutDirectoryItemMarkdownContainer.style.display = (document.getElementById("markdownDocumentationContainer").children.length) ? "none" : "block";
    Array.from(layoutDirectoryItemMarkdownContainer.getElementsByTagName("source")).forEach((sourceElement) => {
      sourceElement.media = "(prefers-color-scheme: white)";
    });
    layoutDirectoryElement.appendChild(layoutDirectoryInputItemButton);
    document.getElementById("markdownDocumentationContainer").appendChild(layoutDirectoryItemMarkdownContainer);
    hljs.highlightAll();
  };
});

layoutDirectory(directoryLayout, document.getElementById("directoryLayoutContainer"));

if (options.includes("customHTML")) {
  fetch("/expressDocsAssets/customHTML.html")
  .then((response) => response.text())
  .then((response) => {
    let customHTMLContainer = document.createElement("div");
    customHTMLContainer.innerHTML = response;
    document.body.appendChild(customHTMLContainer);
  });
};

if (options.includes("customCode")) {
  fetch("/expressDocsAssets/customCode.js")
  .then((response) => response.text())
  .then((response) => {
    eval("(async () => (" + response + ")())();");
  });
};