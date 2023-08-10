// dom elements
// let overlay = document.getElementById('overlay'),
// closeBtn = document.getElementById('closeBtn'),
// submitBtn = document.getElementById('submitBtn'),
// formWrapper = document.getElementById('form_container');
// let form = document.getElementById('form');
// let taskName = document.getElementById('title');
// taskDate = document.getElementById('taskDate');
// taskDetail = document.getElementById('taskDesc');
// taskImportance = document.getElementById('important'),
// taskStatus = document.getElementById('completed');
// import { v4 as uuidv4 } from './uuid';



// these are funcs to access elements ( get rid of above repitetions)
let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

// these are flags, to add and remove classes dynamically
let isList = false;
let isFavourite = false;

let titleField = id("title"),
  dateField = id("taskDate"),
  detailField = id("taskDesc"),
  formWrapper = id("form_container"),
  totalTasks = id("totalTasks"),
  form = id("form"),
  taskStatus = id("completed"),
  overlay = id("overlay"),
  closeBtn = id("closeBtn"),
  deleteTaskBtn = id("delete_task_Btn"),
  cardWrapper = id("card_wrapper"),
  errorMsg = classes("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateFields();
});


// it'll handle validation
function validateFields() {
  errorHandler(titleField, 0, "Title field can't be empty!!!");
  errorHandler(dateField, 1, "Date field can't be empty!!!");
  errorHandler(detailField, 2, "Description field can't be empty!!!");

  clearFields();
}

// responsible to clear fields on submission
const clearFields = () => {
  getAndStoreData();

  titleField.value = "";
  dateField.value = "";
  detailField.value = "";
};

// responsible to generate unique id for each task-card
let idGenerator = () => {
  let idStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxwz";
  let finalId = "";
  for (let char of idStr) {
    finalId += idStr.charAt(Math.floor(Math.random() * idStr.length));
  }
  return finalId;
};


// responsible to list-down the data;
let data = [];
const getAndStoreData = () => {
  // checking for empty values
  if (
    titleField.value.trim() === "" ||
    dateField.value.trim() === "" ||
    detailField.value.trim() === ""
  ) {
    return;
  }

  let taskData = {
    taskName: titleField.value,
    taskDate: dateField.value,
    taskDescription: detailField.value,
    taskId: idGenerator(),
  };

  data.unshift(taskData);
  localStorage.setItem("data", JSON.stringify(data));

//   console.log(data);
  renderingHandler();
};

// responsible to add new task dynamically
const renderingHandler = () => {
  if (data.length > 0 && data !== null) {
    cardWrapper.innerHTML = "";
    data.map((task) => {
      let { taskName, taskDate, taskDescription, taskId } = task;
      return (cardWrapper.innerHTML += `
            <div
              class=" task-card bg-[#141e33] py-4 px-3 flex flex-col rounded-md transition-all duration-700 ease-in-out "
              id='task_card'
            >
              <div class="card-header flex flex-col mb-4 ">
                <h3 class="text-lg text-[#fff] tracking-wide">${taskName}</h3>
                <span class="text-[#fff] opacity-50 tracking-wide"
                  >${taskDescription}</span
                >
              </div>

              <div class="card-footer flex flex-col gap-2">
                <div class="flex items-center justify-start gap-4">
                  <!-- Date Icon -->
                  <span class="date-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-calendar2-week text-[#fff] opacity-50"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"
                      />
                      <path
                        d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zM11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
                      />
                    </svg>
                  </span>
                  <span class="text-lg text-[#fff] opacity-50 tracking-wide"
                    >${taskDate}</span
                  >
                </div>
                <hr class="text-[#fff] border-1 border-dashed" />
                <div
                  class="card-actions flex md:flex-row items-center justify-between"
                >
                <div class="icons-wrapper flex items-center gap-2">
                    <!-- Star -->
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg"
                       width="20" 
                       height="20" 
                       class="bi bi-star-fill  text-white opacity-50 hover:opacity-100 hover:cursor-pointer" viewBox="0 0 16 16"
                       id="favourite"
                       onclick=" isFavourite=!isFavourite;  isFavouriteHandler(event); "
                       >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </span>
                    <!-- Delete -->
                    <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-trash3 text-white opacity-50 hover:opacity-100 hover:cursor-pointer"
                      viewBox="0 0 16 16"
                      id='delete_task_Btn'
                      onclick=deleteTaskHandler(this)
                    >
                      <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                      />
                    </svg>
                    </span>
                   
                  </div>
                </div>
              </div>
            </div>
            `);
    });
    taskCounter();
  } else {
    cardWrapper.innerHTML = urgentMessageHandler(
      "Click here to add new task..."
    );
    taskCounter();
  }
};

const deleteTaskHandler = (target) => {
  let permition = prompt("Are you sure to delete the tast?");
  if (permition.toLocaleLowerCase().trim() === "yes" && permition !== "") {
    target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    data.splice(
      target.parentElement.parentElement.parentElement.parentElement
        .parentElement,
      1
    );
  } else {
    return;
  }

  taskCounter();
  localStorage.setItem("data", JSON.stringify(data));

  if (data.length === 0) {
    location.reload();
    return;
  }
};

// This function will remove all tasks form the task list
let formateTaskListHandler = () => {
  data.length = 0;
  localStorage.setItem("data", JSON.stringify(data));
  cardWrapper.innerHTML = urgentMessageHandler("Click here to add new task...");
  taskCounter();
};
document
  .getElementById("deleteAllTask")
  .addEventListener("click", formateTaskListHandler);

// This fun is responsible to handle as task list is empty;
function urgentMessageHandler(msg) {
  return `
    <div
    onclick="showFormHandler()"
            class="error-message bg-[#141e33] min-h-[50px] h-56 rounded-md border-2 border-dashed border-gray-500 border-opacity-50 "
          >

          <h1 class="text-lg font-semibold text-[#fff] opacity-50">${msg}</h1>
    </div>
`;
}

// responsble to hide the form
const closeFormHandler = () => {
  formWrapper.style.top = "-200%";
};
// responsble to show the form
function showFormHandler() {
  formWrapper.style.top = "0";
}

// responsible to show message for invalid submission
const errorHandler = (id, order, message) => {
  if (id.value.trim() === "") {
    errorMsg[order].innerHTML = message;
    id.style.border = "1px solid red";
    id.style.background = "rgba(219, 170, 170, 0.612)";
  } else {
    errorMsg[order].innerHTML = "";
    id.style.border = "none";
    id.style.background = "#141e33";
    closeFormHandler();
  }
};

// responsible for data retrevial
(() => {
  data = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : [];
  renderingHandler();
})();

// responsible to show total added tasks
function taskCounter() {
  if (data.length === 1) totalTasks.innerHTML = `${data.length} task`;
  else if (data.length < 1) totalTasks.innerHTML = `${data.length} tasks`;
  else {
    totalTasks.innerHTML = `${data.length} tasks`;
  }
  //   console.log(data.length);
}


// This function is responsible for top calender
(
    ()=>{

        const dateObj = new Date();
        let date = dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate();
        let month =
          dateObj.getMonth() > 9
            ? dateObj.getMonth()
            : "0" + (Number(dateObj.getMonth()) + 1);
        // console.log(typeof month)
        let year = dateObj.getFullYear();
        
        let fullDate = `${date}/${month}/${year}`;
        // console.log(time)
        document.getElementById("date").innerHTML = fullDate;
    }
)()



// This function is responsible to toogle list and grid classes
function toogleClasses() {
  if (isList === true) {
    cardWrapper.classList.add("grid-cols-12");
    cardWrapper.classList.remove(
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-3"
    );
  } else {
    cardWrapper.classList.remove("grid-cols-12");
    cardWrapper.classList.add(
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "lg:grid-cols-3"
    );
  }

  let cards = document.querySelectorAll(".task-card");
  cards.forEach((card) => {
    if (isList) {
      card.classList.remove("flex-col");
      card.classList.add("items-center", "justify-between");
    } else {
      card.classList.remove("items-center", "justify-between");
      card.classList.add("flex-col");
    }
  });
}


// responsible for favourite element 
function isFavouriteHandler(e) {
  if (isFavourite) {
    // document.getElementById("favourite").setAttribute('fill', '#5b21b6')
    e.target.setAttribute('fill', '#5b21b6')
  } else {
    // document.getElementById("favourite").removeAttribute('fill', '#5b21b6')
    e.target.removeAttribute('fill', '#5b21b6')
  }
}
