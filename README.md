<p align="center">
  <a href="https://DinoscapeProgramming.github.io/Remote-Control">
    <picture>
      <source height="125" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/DinoscapeProgramming/Express-Documentation/master/docs/static/logo-dark.svg">
      <img height="125" alt="Remote Control" src="https://raw.githubusercontent.com/DinoscapeProgramming/Express-Documentation/master/docs/static/logo.svg">
    </picture>
  </a>
  <br>
  <a href="https://www.npmjs.com/package/electron-remote-control">
    <img src="https://badge.fury.io/js/electron-remote-control.svg">
  </a>
  <a href="https://opensource.org/license/apache-2-0">
    <img src="https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg">
  </a>
  <a href="https://github.com/DinoscapeProgramming/Remote-Control/releases/tag/v1.0.0">
    <img src="https://img.shields.io/badge/Release-1.0.0-brightgreen.svg">
  </a>
</p>
<p align="center">
  <em><b>Express Docs</b> is a minimal <b>markdown site creator</b> built on top of <a href="https://expressjs.com" target="_blank">Express</a>. Designed to <b>ease</b> things up for <b>better and faster</b> usage support with low effort in mind.</em>
</p>

---

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/DinoscapeProgramming/Express-Docs/master/docs/static/demonstration.gif)

## Key Features

* Instant Connection
* Control over connected devices
  - Be able to control the keyboard and mouse of your connected devices.
* Device History
  - Connect to known devices with one click.
* File Sharing across multiple devices
* Smart Bar with commands
  - Navigate faster by typing commands in the upper smart bar.
* Device Monitoring for CPU, Memory and WLAN Usage
* Script Execution with Node.js Integration
* Script Store for non-programmers
* Dark/Light Mode
* Feedback Writing and Viewing
* Full screen mode
  - Work distraction free.
* Auto Launch
  - Remote Control launches automatically after you start your device.
* Auto Update
  - Remote Control automatically updates when new updates are released.
* Custom WebRTC Server
  - Configure Remote Control in order to use your custom WebRTC server.
* Debug Mode
  - Activate debug mode to help us fix issues faster.
* Cross platform
  - Windows, macOS and Linux ready.
* In-built Tutorial Page

## How To Use

To install this package, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Install this package
$ npm install express-documentation ejs
```

### Building and opening your own installable
To build and open your own installable, you'll need [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

```js
const express = require("express");
const app = express();
const expressDocs = require("express-docs");

app.use("/", expressDocs(app, {
  title: "Express Docs Demo", // required website title
  favicon: "./favicon.ico", // required relative or absolute path to the favicon
  logo: "./logo.png", // required relative or absolute path to the logo
  directory: "./docs", // required relative or absolute path to the folder containing the documentation
  options: {
    customMarkdownParser: (markdownContent) => {
      // your optional custom markdown parser
    },
    customHTML: `
      your optional custom HTML
    `,
    customCode: () => {
      // your optional custom code
    }
    customStyle: `
      your optional custom style
    `
  } // all optional
}));
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.
>
> If you're not using Windows, change the ```./node_modules/electron-remote-control/client/package.json``` file accordingly to [this guide](https://www.electron.build/index.html/).

## Credits

This software uses the following open source packages:

- [Express.js](https://github.com/expressjs/express)
- [Node.js](https://nodejs.org)
- [EJS](https://ejs.co)

## Support

<a href="https://www.patreon.com/DinoscapeArmy">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## You may also like...

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