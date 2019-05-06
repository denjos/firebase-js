const createCustomeElement = (element, atttributes, children) => {
  let customElement = document.createElement(element);
  if (children !== undefined) {
    children.forEach(el => {
      if (el.nodeType) {
        if (el.nodeType === 1 || el.nodeType === 11) {
          customElement.appendChild(el);
        }
      } else {
        customElement.innerHTML += el;
      }
    });
  }
  addAttributes(customElement, atttributes);
  return customElement;
};

const addAttributes = (element, attrs) => {
  for (let attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      element.setAttribute(attr, attrs[attr]);
    }
  }
};

const printModal=content=>{
    const modalContent=createCustomeElement('div',{
        id:'modal-content',
        class:'modal-content'
    },[content]);
    const modalContainer=createCustomeElement('div',{
        id:'modal-container',
        class:'modal-container'
    },[modalContent]);
    document.body.appendChild(modalContainer);
    const removeModal=()=>{document.body.removeChild(modalContainer)}
    modalContainer.addEventListener('click',e=>{
        if (e.target===modalContainer) {
            removeModal();
        }
    });
}
