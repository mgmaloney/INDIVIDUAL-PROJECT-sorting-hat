const students = [];

const expelledStudents = [];

const renderToDom = (divId, htmlToRender) => {
  let targetedDiv = document.getElementById(divId);
  targetedDiv.innerHTML = htmlToRender;
};

const welcomeMessage = () => {
  let message =
    "<h1>Welcome! Please enter your name to be sorted into your house!<h1>";
  let welcomeDiv = "welcome-message";
  renderToDom(welcomeDiv, message);
};

const removeWelcome = () => {
  let welcome = document.getElementById("welcome-message");
  setTimeout(() => {
    welcome.remove();
  }, 5000);
};

const headings = () => {
  let title = `<h1>The Sorting Hat</h1>`;
  let currentStudentsHeader = `
    <h2>Current Students</h2>
    <div class="sortby">
      <select name="sortby" id="sortby">
        <option value="placeholdersort">Sort By:</option>
        <option value="nameAZ">Name A to Z</option>
        <option value="nameZA">Name Z to A</option>
        <option value="houseAZ">House A to Z</option>
        <option value="houseZA">House Z to A</option>
      </select>
    </div>`;
  let expelledStudentsHeader = `<h2>Voldemort's Army</h2>`;
  let titleDiv = "title";
  let currentStudentsDiv = "currentStudentsHeader";
  let expelledStudentsDiv = "expelledStudentsHeader";
  renderToDom(titleDiv, title);
  renderToDom(currentStudentsDiv, currentStudentsHeader);
  renderToDom(expelledStudentsDiv, expelledStudentsHeader);
};

const filterButtons = () => {
  let domString = `
  <button class='filter-button' id="gryffindor-button">Gryffindor</button>
  <button class='filter-button' id="slytherin-button">Slytherin</button>
  <button class='filter-button' id="ravenclaw-button">Ravenclaw</button>
  <button class='filter-button' id="hufflepuff-button">Hufflepuff</button>
  <button class='filter-button' id="show-all-button">Show All</button>

  `;
  renderToDom("filter-buttons", domString);
};

const formInit = () => {
  let domString = `
  <form class="new-student-form">
    <input
      type="text"
      name="nameBox"
      id="nameBox"
      placeholder="Please Enter Your Name"
      required
      />
    <button class="sort-button" type="submit">Sort Me!</button>
  </form>
  `;
  renderToDom("student-form-div", domString);
};

const cardOnDom = (cardsArr, divId) => {
  let domString = "";
  if (divId === "currentStudents") {
    cardsArr.forEach((card) => {
      domString += `
    <div class="card ${card.house}-card" style="width: 18rem;">
  <img class="${card.house}-img" src="/houseimages/${
        card.house
      }.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${houseText(card.house)}</p>
    <div class="btn-container">
      <button class="btn btn-warning" id="expel--${card.id}">Expel</button>
     </div
    </div>
    </div>
  </div>
    `;
    });
    renderToDom(divId, domString);
  } else if (divId === "expelledStudents") {
    cardsArr.forEach((card) => {
      domString += `<div class="card ${card.house}-card" style="width: 18rem;">
  <img src="${voldeImageRandomizer()}" class="card-img-top" alt="...">
  <div class="card-body card-body-secondchance">
    <h5 class="card-title">${card.name}</h5>
    <p class="card-text">${voldeTextRandomizer()}</p>
    <div class="btn-container">
      <button class="btn btn-secondary btn-secondchance" id="secondchance--${
        card.id
      }">Give a Second Chance</button>
    </div>
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

const filter = (studentArr, houseString) => {
  const filteredArr = studentArr.filter(
    (student) => student.house === houseString
  );
  console.log(filteredArr);
  cardOnDom(filteredArr, "currentStudents");
};

const eventListeners = () => {
  //new students
  const form = document.querySelector(".new-student-form");
  const addNewStudent = (e) => {
    e.preventDefault();
    newStudentObj = {
      id: students.length + 1,
      name: document.getElementById("nameBox").value,
      house: houseRandomizer(),
    };
    students.push(newStudentObj);
    cardOnDom(students, "currentStudents");
    form.reset();
  };

  form.addEventListener("submit", addNewStudent);

  //expel & secondChance
  const targetingApp = document.getElementById("app");
  const onExpel = (e) => {
    const [, id] = e.target.id.split("--");
    if (id) {
      console.log(id);
      let studentIndex = students.findIndex(
        (element) => element.id === Number(id)
      );
      console.log(studentIndex);
      console.log(students[studentIndex]);
      expelledStudents.push(students[studentIndex]);
      students.splice(studentIndex, 1);
      console.log(expelledStudents);
      cardOnDom(students, "currentStudents");

      cardOnDom(expelledStudents, "expelledStudents");
    }
  };

  const secondChance = (e) => {
    const [, id] = e.target.id.split("--");
    if (id) {
      console.log(id);
      let studentIndex = expelledStudents.findIndex(
        (student) => student.id === Number(id)
      );
      console.log(expelledStudents[studentIndex]);
      students.push(expelledStudents[studentIndex]);
      expelledStudents.splice(studentIndex, 1);
      cardOnDom(students, "currentStudents");

      cardOnDom(expelledStudents, "expelledStudents");
    }
  };

  targetingApp.addEventListener("click", (e) => {
    if (e.target.id.includes("expel")) {
      onExpel(e);
    } else if (e.target.id.includes("secondchance")) {
      secondChance(e);
    }
  });

  //filters
  let gryffindorButton = document.getElementById("gryffindor-button");
  let slytherinButton = document.getElementById("slytherin-button");
  let ravenclawButton = document.getElementById("ravenclaw-button");
  let hufflepuffButton = document.getElementById("hufflepuff-button");
  let showAllButton = document.getElementById("show-all-button");

  gryffindorButton.addEventListener("click", () => {
    filter(students, "gryffindor");
  });
  slytherinButton.addEventListener("click", () => {
    filter(students, "slytherin");
  });
  ravenclawButton.addEventListener("click", () => {
    filter(students, "ravenclaw");
  });
  hufflepuffButton.addEventListener("click", () => {
    filter(students, "hufflepuff");
  });
  showAllButton.addEventListener("click", () => {
    cardOnDom(students, "currentStudents");
  });

  //sortby
  const sortNameAlphaAZ = () => {
    const nameSortArr = students;
    nameSortArr.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    cardOnDom(nameSortArr, "currentStudents");
  };

  const sortNameAlphaZA = () => {
    const nameSortArr = students;
    nameSortArr.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });

    cardOnDom(nameSortArr, "currentStudents");
  };

  const sortHouseAlphaAZ = () => {
    const houseSortArr = students;
    houseSortArr.sort((a, b) => {
      const houseA = a.house.toUpperCase();
      const houseB = b.house.toUpperCase();
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (houseA > houseB) {
        return 1;
      }
      if (houseA < houseB) {
        return -1;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    cardOnDom(houseSortArr, "currentStudents");
  };

  const sortHouseAlphaZA = () => {
    const houseSortArr = students;
    houseSortArr.sort((a, b) => {
      const houseA = a.house.toUpperCase();
      const houseB = b.house.toUpperCase();
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (houseA < houseB) {
        return 1;
      }
      if (houseA > houseB) {
        return -1;
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    cardOnDom(houseSortArr, "currentStudents");
  };

  let sort = document.getElementById("sortby");
  sort.addEventListener("change", (e) => {
    if (e.target.value === "nameAZ") {
      sortNameAlphaAZ();
    } else if (e.target.value === "nameZA") {
      sortNameAlphaZA();
    } else if (e.target.value === "houseAZ") {
      sortHouseAlphaAZ();
    } else if (e.target.value === "houseZA") {
      sortHouseAlphaZA();
    }
  });
};

const startApp = () => {
  welcomeMessage();
  removeWelcome();
  filterButtons();
  formInit();
  headings();
  eventListeners();
};

startApp();
