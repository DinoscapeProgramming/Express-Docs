<p align="center">
  <a href="https://DinoscapeProgramming.github.io/Remote-Control">
    <picture>
      <source height="125" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DinoscapeProgramming/Express-Documentation/master/docs/static/logo-dark.svg">
      <img height="125" alt="Remote Control" src="https://raw.githubusercontent.com/DinoscapeProgramming/Express-Documentation/master/docs/static/logo.svg">
    </picture>
  </a>
  <br>
  <a href="https://www.npmjs.com/package/express-documentation">
    <img src="https://badge.fury.io/js/express-documentation.svg">
  </a>
  <a href="https://opensource.org/license/apache-2-0">
    <img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg">
  </a>
  <a href="https://www.npmjs.com/package/express-documentation?activeTab=dependencies">
    <img src="https://img.shields.io/badge/Dependencies-up%20to%20date-brightgreen.svg">
  </a>
</p>
<p align="center">
  <em><b>Express Docs</b> is a minimal <b>markdown site creator</b> built on top of <a href="https://expressjs.com" target="_blank">Express</a>. Designed to <b>ease</b> things up for <b>better and faster</b> usage support with low effort in mind.</em>
</p>

---

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/DinoscapeProgramming/Express-Docs/master/docs/static/demonstration.gif)

## How To Use

To install this package, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install this package
$ npm install express ejs express-documentation
```

### Documentation
Express Docs should be used as middleware in Express.js at the path where you want your docs to be located at. This translates to using the `app.use` method of your Express.js app and setting the location path as the first argument and the executed `expressDocs` method as the second property with the `app` variable as a parameter.

```js
app.use("/docs", expressDocs(app));
```

**This will use the default parameters for Express Docs:**

| Parameter | Default Value |
| --- | --- |
| 📲 Title | `productName`; `name`; `"Documentation"` |
| 🎨 Favicon | `"./favicon.ico"` |
| ⏱️ Logo | `"./logo.png"` |
| 👨‍💻 Directory | `"./docs"` |

<br />

**All of these value should be modified like this:**
```js
app.use("/docs", expressDocs(app, {
  title: "Express Docs Demo",
  favicon: "./assets/favicon.ico",
  logo: "./assets/logo.png",
  directory: "./assets/docs"
}));
```

**Additional options include:**
| Optional Parameter |
| --- |
| 📲 Custom Markdown Parser |
| 🎨 Custom HTML |
| ⏱️ Custom Code |
| 👨‍💻 Custom Style |

<br />

```js
app.use("/docs", expressDocs(app, {
  options: {
    customMarkdownParser: () => {}, // --> return value in plain HTML
    customHTML: ``, // --> plain HTML,
    customCode: () => {}, // --> JavaScript function
    customStyle: `` // --> plain CSS
  }
}));
```

The default markdown parser uses Marked and all contents of the markdown parser, no matter which, are being sanitized with DOMPurify.

### Example Documentation with dark mode
To build and open your own installable, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

```js
const express = require("express");
const app = express();
const expressDocs = require("express-docs");

app.use("/", expressDocs(app, {
  title: "Express Docs Demo",
  favicon: "./favicon.ico",
  logo: "./logo.png",
  directory: "./docs",
  options: {
    customMarkdownParser: (markdownContent) => `
      <div style="font-family: system-ui">${markdownContent}</div>
    `,
    customHTML: `
      <div style="
        font-family: system-ui;
        position: fixed;
        right: 7.5px;
        padding-top: calc(100vh - 27.5px);
      ">Made by Express Docs</div>
    `,
    customCode: () => {
      console.log("This documentation page was made by Express Docs.");
    }
    customStyle: `
      body: {
        background-color: #1c1c1c;
        invert(95%) hue-rotate(180deg);
      }
    `
  }
}));
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
>
> If you're not using Windows, change the ```./node_modules/express-documentation/package.json``` file accordingly to [this guide](https://www.electron.build/index.html/).

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org)
- [Express.js](https://github.com/expressjs/express)
- [EJS](https://ejs.co)

## Support

<a href="https://www.patreon.com/DinoscapeArmy">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## You may also like...


- [Remote Control](https://github.com/DinoscapeProgramming/Remote-Control) - An advanced, but easy-to-use Remote Desktop Application Program
- [Youtube Offline](https://github.com/DinoscapeProgramming/Youtube-Offline) - A lightweight YouTube video downloader
- [Appify](https://github.com/DinoscapeProgramming/Appify) - A tiny tool that allows you to turn your website into an app
- [Meetings](https://github.com/DinoscapeProgramming/Meetings) - A meetings app with lots of features
- [DinoChess](https://github.com/DinoscapeProgramming/DinoChess) - A chess platform for chess lovers

## License

[Apache-2.0](https://raw.githubusercontent.com/DinoscapeProgramming/Express-Docs/master/LICENSE)

---

> [dinoscape.com](https://dinoscape.com) &nbsp;&middot;&nbsp;
> GitHub [@DinoscapeProgramming](https://github.com/DinoscapeProgramming) &nbsp;&middot;&nbsp;
> Scratch [@Dinoscape](https://scratch.mit.edu/users/Dinoscape)