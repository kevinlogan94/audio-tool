<h1 align="center">audio-tool</h1>

<h3 align="center">A native audio custom web component</h3>

<p align="center">
    <a href="https://prettier.io">
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
    <a href="https://www.npmjs.com/package/audio-tool">
        <img alt="npm version" src="https://img.shields.io/npm/v/audio-tool.svg?style=flat-square">
    </a>
    <a href="https://travis-ci.org/kevinlogan94/audio-tool">
      <img alt="Build Status" src="https://travis-ci.org/kevinlogan94/audio-tool.svg?branch=master">
    </a>
    <a href="https://www.webcomponents.org/element/audio-tool">
        <img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg">
    </a>
</p>

## Description

An audio custom web component built with the native [customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) function and on top of the [HTML Audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio). No javascript library or framework attached.

## Live Demo

Check out a live demo [here.](http://www.kevinmlogan.com/audio-tool/)

## Install

```
npm install audio-tool
```

## How to use

1. Inject in the script through a script tag in the HEAD of your index.html.

```html
<script src="node_modules/audio-tool/dist/audio-tool.min.js"></script>
```

2. Start using it in an html file.

<!--
```html
<custom-element-demo>
  <template>
    <script src="https://unpkg.com/@webcomponents/custom-elements"></script>
    <script src="dist/audio-tool.min.js"></script>
  </template>
</custom-element-demo>
```
-->

```html
<audio-tool src="content/ff7-prelude.m4a" title="FF7 Prelude"></audio-tool>
```

## PolyFill

Using a browser that doesn't natively support custom web components?

Add the following to the HEAD of your index.html.

```html
<script src="https://unpkg.com/@webcomponents/custom-elements"></script>
```

or go [here](https://github.com/webcomponents/custom-elements) to learn more...

## Responsiveness

Add the following meta tag for responsiveness across all devices.

> This tag is not specific to this component. This is required for any app to understand the screen size in mobile browsers.

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes" />
```

## Customizations

| Attribute |                type                |                          Description                           |           Default           |
| :-------: | :--------------------------------: | :------------------------------------------------------------: | :-------------------------: |
|    src    |               string               |                  the path to your audio file                   |            none             |
|   title   |               string               |                    Define the track title.                     | The path to your audio file |
| auto-play |              boolean               |          Automatically start playing the track onload          |            false            |
|  styles   |              boolean               |  Defines whether the element uses the default styles or not.   |            true             |
|  preload  | string: `auto`, `metadata`, `none` | Defines if the audio file should be loaded when the page loads |            auto             |

_Note:_ The preload attribute is ignored if autoplay is present.

## Browser Compatibility

[Mozilla Browser Compatibility Table for customElements.define](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#Browser_compatibility)

## Specs

- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Babel](https://babeljs.io/)
- [Babel Minifier](https://github.com/babel/minify#readme)
- [Live Sass compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)
- [customElements.define()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)
- [Material UI SVG Icons](https://www.materialui.co/icons)
- [Audio HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

## Contribute

[Contribution Guidelines](https://github.com/kevinlogan94/audio-tool/blob/master/CONTRIBUTING.md)

## License

[MIT License](https://github.com/kevinlogan94/audio-tool/blob/master/README.md)
