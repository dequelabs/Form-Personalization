import Overlay from './overlay';
/**
 * TODO: My idea is that we could have a popup interface in which this stuff could be configured
 */

new Overlay({
  selector: 'input[type="submit"], button[type="submit"]',
  styles: {
    default: `
      background-color: #000;
      color: #FFF;
      border: 3px dashed #F00;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    active: `
      background-color: #FFF;
      color: #000;
      border: 3px dashed #00F;
    `
  },
  fallbackText: 'Submit'
});
