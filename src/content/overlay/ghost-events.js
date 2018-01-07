import createDebug from 'debug';

const debug = createDebug('cogsistency:content:overlay:ghost-events');
const data = {
  bubbles: true,
  cancelable: true,
  view: window
};

export default (item, events) => {
  events.forEach(type => {
    item.overlay.addEventListener(type, () => {
      debug(`${type} fired, passing it through...`);
      const e = new MouseEvent(type, data);
      item.target.dispatchEvent(e);
    });
  });
};
