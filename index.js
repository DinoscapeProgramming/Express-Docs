const fs = require("fs");
const path = require("path");
const express = require("express");

let layoutDirectory = (directory) => fs.readdirSync(directory).map((directoryItem) => [
  ...[
    directoryItem
  ],
  ...(fs.statSync(path.join(directory, directoryItem)).isFile()) ? [
    null
  ] : [
    layoutDirectory(path.join(directory, directoryItem))
  ]
]);

module.exports = (app, { title, favicon, logo, directory, options: { customMarkdownParser, customHTML, customCode, customStyle } = {} } = {}) => {
  fs.createReadStream(logo).pipe(fs.createWriteStream("./node_modules/express-documentation/src/logo." + logo.split(".").at(-1)));
  fs.createReadStream(favicon).pipe(fs.createWriteStream("./node_modules/express-documentation/src/favicon." + favicon.split(".").at(-1)));
  if (customMarkdownParser) fs.writeFileSync("./node_modules/express-documentation/src/customMarkdownParser.js", customMarkdownParser.toString(), "utf8");
  if (customHTML) fs.writeFileSync("./node_modules/express-documentation/src/customHTML.html", customHTML, "utf8");
  if (customCode) fs.writeFileSync("./node_modules/express-documentation/src/customCode.js", customCode.toString(), "utf8");
  if (customStyle) fs.writeFileSync("./node_modules/express-documentation/src/customStyle.css", customStyle, "utf8");
  app.set("views", process.cwd());
  app.set("view engine", "ejs");
  app.use("/expressDocsAssets", express.static("node_modules/express-documentation/src"));
  app.use("/expressDocsMarkdownAssets", express.static(directory));
  return (req, res, next) => {
    res.render("node_modules/express-documentation/src/index.ejs", {
      title,
      faviconFileExtension: favicon.split(".").at(-1),
      logoFileExtension: logo.split(".").at(-1),
      directoryLayout: JSON.stringify(layoutDirectory(directory)),
      options: JSON.stringify([
        ...(customMarkdownParser) ? [
          "customMarkdownParser"
        ] : [],
        ...(customHTML) ? [
          "customHTML"
        ] : [],
        ...(customCode) ? [
          "customCode"
        ] : [],
        ...(customStyle) ? [
          "customStyle"
        ] : []
      ])
    });
    next();
  };
};