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

module.exports = (app, { title, favicon, logo, directory, options: { security: { csp } = {}, analytics, customMarkdownParser, customHTML: { head: customHTMLHead, body: customHTMLBody } = {}, customCode, customStyle, extensions } = {} } = {}) => {
  let isValidURL = (urlString) => {
		let url;
		try { 
      url = new URL(urlString); 
    } catch { 
      return false; 
    };
    return ["http:", "https:"].includes(url.protocol);
	};
  (extensions || []).forEach(({ setup } = {}) => (setup || (() => {}))());
  if (!isValidURL(favicon)) fs.createReadStream(favicon || "./favicon.ico").pipe(fs.createWriteStream("./node_modules/express-documentation/src/favicon." + favicon.split(".").at(-1)));
  if (!isValidURL(logo)) fs.createReadStream(logo || "logo.png").pipe(fs.createWriteStream("./node_modules/express-documentation/src/logo." + logo.split(".").at(-1)));
  if (customMarkdownParser) fs.writeFileSync("./node_modules/express-documentation/src/customMarkdownParser.js", customMarkdownParser.toString(), "utf8");
  if (customHTMLHead) fs.writeFileSync("./node_modules/express-documentation/src/customHTMLHead.html", customHTMLHead, "utf8");
  if (customHTMLBody) fs.writeFileSync("./node_modules/express-documentation/src/customHTMLBody.html", customHTMLBody, "utf8");
  if (customCode) fs.writeFileSync("./node_modules/express-documentation/src/customCode.js", customCode.toString(), "utf8");
  if (customStyle) fs.writeFileSync("./node_modules/express-documentation/src/customStyle.css", customStyle, "utf8");
  app.set("views", process.cwd());
  app.set("view engine", "ejs");
  app.use("/expressDocsAssets", express.static("node_modules/express-documentation/src"));
  app.use("/expressDocsMarkdownAssets", express.static(directory || "./docs"));
  return (req, res, next) => {
    (extensions || []).forEach(({ middleware } = {}) => (middleware || (() => {}))());
    if (csp) res.setHeader("Content-Security-Policy", csp);
    res.render("node_modules/express-documentation/src/index.ejs", {
      title: title || (JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8") || "{}") || {}).productName || (JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8") || "{}") || {}).name.split("-").map((namePiece) => namePiece[0].toUpperCase() + namePiece.slice(1)) || "Documentation",
      [(isValidURL(favicon)) ? "faviconURL" : "faviconFileExtension"]: (isValidURL(favicon)) ? favicon : (favicon || "./favicon.ico").split(".").at(-1),
      [(isValidURL(logo)) ? "logoURL" : "logoFileExtension"]: (isValidURL(logo)) ? logo: (logo || "logo.png").split(".").at(-1),
      directoryLayout: JSON.stringify(layoutDirectory(directory || "./docs")),
      analytics,
      enabledOptions: JSON.stringify([
        ...(customMarkdownParser) ? [
          "customMarkdownParser"
        ] : [],
        ...(customHTMLHead) ? [
          "customHTMLHead"
        ] : [],
        ...(customHTMLBody) ? [
          "customHTMLBody"
        ]: [],
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