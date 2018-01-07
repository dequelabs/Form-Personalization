
// TODO: this could probably be more robust
export default el => el.innerText || el.value || el.getAttribute('aria-label');
