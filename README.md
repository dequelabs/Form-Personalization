# Form Personalization

Creating consistent UI for common input fields as we as calling out input fields that present security or privacy concerns.

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
