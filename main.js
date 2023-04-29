const students = {};

const expelledStudents = {};

const renderToDom = (divId, htmlToRender) => {
  let targetedDiv = document.getElementById(divId);
  targetedDiv.innerHTML = htmlToRender;
};

const cardOnDom = (cardsArr, divId) => {
  let domString = "";
  if (divId === "currentStudents") {
    cardsArr.forEach((card) => {
      domString += `
    <div class="card" style="width: 18rem;">
  <img src="/houseimages/${card.house}.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${houseText(card.house)}</p>
    <button class="btn btn-warning expel--${card.id}">Expel</button>
  </div>
</div>
    `;
    });
    renderToDom(divId, domString);
  } else if (divId === "expelledStudents") {
    cardsArr.forEach((card) => {
      domString += `<div class="card" style="width: 18rem;">
  <img src="${voldeImageRandomizer()}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${voldeTextRandomizer()}</p>
    <button class="btn btn-secondary secondchance--${card.id}">Expel</button>
  </div>
</div>
    `;
    });
    renderToDom(divId, domString);
  }
};

const houseRandomizer = () => {
  let houseNumber = Math.floor(Math.random() * 4);
  let house = "";
  switch (houseNumber) {
    case 0:
      house = "gryffindor";
      break;
    case 1:
      house = "ravenclaw";
      break;
    case 2:
      house = "slytherin";
      break;
    case 3:
      house = "hufflepuff";
      break;
  }
  return house;
};

const houseText = (houseName) => {
  switch (houseName) {
    case "gryffindor":
      return "In Gryffindor, where dwell the brave at heart. their daring, nerve and chivalry set Gryffindor apart.";
    case "ravenclaw":
      return "In wise old Ravenclaw, if you have a ready mind, where those of wit and learning, will always find their kind.";
    case "slytherin":
      return "In Slytherin you will make your real friends, these cunning folk use any means to achieve their ends.";
    case "hufflepuff":
      return "In Hufflepuff,Where they are just and loyal,Those patient Hufflepuffs are true and unafraid of toil";
  }
};

const voldeTextRandomizer = () => {
  let randomNum = Math.floor(Math.random() * 5);
  switch (randomNum) {
    case 0:
      return "Somebody polyjuiced you into looking like Lucius Malfoy";
    case 1:
      return "It was only a kiss how did it end up like this";
    case 2:
      return "Caught in the second-floor girls bathroom speaking parseltongue";
    case 3:
      return "Shouldn't have hit on Professor McGonagall";
    case 4:
      return "Why does it feel so good to be bad";
  }
};

const voldeImageRandomizer = () => {
  let randomNum = Math.floor(Math.random() * 5);
  switch (randomNum) {
    case 0:
      return `/voldemortpics/cartoonvolde.png`;
    case 1:
      return `/voldemortpics/happyvolde.png`;
    case 2:
      return `/voldemortpics/teenyvolde.png`;
    case 3:
      return `/voldemortpics/voldeharry.png`;
    case 4:
      return `/voldemortpics/voldequirrel.png`;
  }
};

const addNewStudent = () => {
  newStudentObj = {
    id: students.length + 1,
    name: document.getElementById(nameBox).value,
    house: houseRandomizer(),
  };
  students.push(newStudentObj);
};

const onExpel = (e) => {
  if (e.target.id) {
    const [, id] = e.target.id.split("--");
    let studentIndex = students.findIndexOf(id);
    students.splice(studentIndex, 1);
    cardOnDom(students, "currentStudents");
    cardOnDom(expelledStudents, "expelledStudents");
  }
};
