const students = {};

const renderToDom = (divId, htmlToRender) => {
  let targetedDiv = document.getElementById(divId);
  targetedDiv.innerHTML = htmlToRender;
};

const cardOnDom = (cardsArr) => {
  let domString = "";
  cardsArr.forEach((card) => {
    domString += `
    
    `;
  });
  renderToDom(cards, domString);
};
