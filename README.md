# Cogsistency

Creating consistent (appearing) UI for common element types

## Installation / Setup

### Build extension

```sh
$ npm install && npm run build
```

### Load extension

- Go to `chrome://extensions`
- Check developer mode
- Click "Load unpacked extension..."
- Select the `dist/` directory of this project

### Debugging in the browser

Open up the devtools console and set the desired debug flag(s):

```js
localStorage.debug = 'cogsistency:*';
```

## See it in action

For proof of concept purposes, I've added a simple overlay for all submit buttons. Go to any page with a submit button.

## TODO

- write tests
- create a popup with UI to easily add new overlay types (utilize persistent background script to "permanently" store overlay data)
