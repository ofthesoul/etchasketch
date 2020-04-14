const container = document.getElementById("container");
let rows = document.getElementsByClassName("gridRow");
const cells = document.getElementsByClassName("cell");
const clearbtn = document.querySelector('#clearbtn');
const colorbtn = document.querySelector('#colorbtn');
const rainbowbtn = document.querySelector('#rainbowbtn');
const realbtn = document.querySelector('#realbtn');
const gridInput = document.getElementById("gridInput");
let newClick = 0
let eraserChangeFlag = false;
let rainbowChangeFlag = false;
let realismChangeFlag = false;
const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "purple",
    "black",
    "gray"
];

//GRID CREATION/BEHAVIOR FUNCS

  //create a default grid sized 16x16       
makeRows(16, 16);  
function makeRows(rows, cols) {
  container.style.setProperty('--grid-rows', rows);
  container.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.setAttribute("id", "cell" + "r" + ("c" + c));
    cell.addEventListener("mouseover", e => {
          cellChange(cell.getAttribute("id"));
          //assigns individual ID on mouseover and calls cellChange
    });
    container.appendChild(cell).className = "grid-item";
  };
};

  //changes the color selection and on button itself
function colorChange() {
    newClick++;
    if (newClick >= 9) {
      newClick = 0;
    }
    eraserChangeFlag = false;
    rainbowChangeFlag = false;
    realismChangeFlag = false;
    colorbtn.style.backgroundColor = colors[newClick];
}

  //changes the color selection and on button itself
function rainbowChange(id) {
  const cell = document.getElementById(id);
  cell.style.backgroundColor = colors[Math.floor(Math.random() * Math.floor(colors.length))];
  cell.style.opacity = 1;
}
  //makes it act like a pencil/graphite, darkens each mouseover
function realChange(id) {
  const cell = document.getElementById(id);
	let opacity = Number(cell.style.opacity);
	cell.style.backgroundColor = 'black';	
	cell.style.opacity = opacity + 0.2;
}
function eraserChange(id) {
  const cell = document.getElementById(id);
  cell.style.backgroundColor = "white";
  cell.style.opacity = 1;
}

  //changes the background color of cell (used for mouseover)
function cellChange(id) {
  if (eraserChangeFlag === true) {  
    eraserChange(id);
  } else if (rainbowChangeFlag === true) { 
    rainbowChange(id);
  } else if (realismChangeFlag === true) {  
    realChange(id)
  } else {
    const cell = document.getElementById(id); 
    cell.style.backgroundColor = colors[newClick];
    cell.style.opacity = 1;
    }
}

  //remove all the created cells, still needs innerhtml reset to work (might be useless?)
function cellReset() {
    document.querySelectorAll('.cell').forEach(el => el.remove());
}

//BUTTON FUNCS (reset,color,rainbow,realism,eraser)

  //resets to default grid
clearbtn.addEventListener('click', (e) => {
   container.innerHTML=""
   cellReset();
   getInput(document.getElementById("gridInput").value);
   if (newGridArray[0] > 100 || newGridArray[1] > 100) {
     alert("Use a smaller grid size!")
     return;
   } else {
     container.innerHTML = "";
     makeRows(newGridArray[0], newGridArray[1]);
   };
});
  //changes color selection
colorbtn.addEventListener('click', (e) => { 
  eraserChangeFlag = false;
  eraserbtn.style.backgroundColor = "pink";
  realismChangeFlag = false;
  realbtn.style.backgroundColor = "lightgray"; 
  rainbowChangeFlag = false;
  rainbowbtn.style.backgroundColor = "violet";
    colorChange();
});
  //toggle rainbow mode - changes color every mouseover
rainbowbtn.addEventListener('click', (e) => {  
  rainbowChangeFlag = !rainbowChangeFlag;
    if (rainbowChangeFlag === true) {
      rainbowbtn.style.backgroundColor = "black";
      eraserChangeFlag = false;
      eraserbtn.style.backgroundColor = "pink";
      realismChangeFlag = false;
      realbtn.style.backgroundColor = "lightgray";
    } else {
      rainbowbtn.style.backgroundColor = "violet";
    };    
});
 //toggle realism mode - going over same color darkens it
realbtn.addEventListener('click', (e) => {  
  realismChangeFlag = !realismChangeFlag;
  if (realismChangeFlag === true) {
    realbtn.style.backgroundColor = "black";
    eraserChangeFlag = false;
    eraserbtn.style.backgroundColor = "pink";
    rainbowChangeFlag = false;
    rainbowbtn.style.backgroundColor = "violet";
  } else {
    realbtn.style.backgroundColor = "lightgray";
  };    
});
 //toggle eraser
eraserbtn.addEventListener('click', (e) => {  
  eraserChangeFlag = !eraserChangeFlag;
    if (eraserChangeFlag === true) {
      eraserbtn.style.backgroundColor = "black";
      realismChangeFlag = false;
      realbtn.style.backgroundColor = "lightgray";
      rainbowChangeFlag = false;
      rainbowbtn.style.backgroundColor = "violet";
    } else {
      eraserbtn.style.backgroundColor = "pink";
    };    
});

//GRID INPUT FUNCS & BUTTON

let gridUInput = "";
let gridArray = "";

  //taking input, turning into array, creating grid on click
function getInput(Input) {
    newGridArray = stringtoArray(Input);
    gridArray = newGridArray;
}
  //convert string to to array using either side of the X
function stringtoArray(gridUInput) {
    newGridArray = [];
    newGridArray = gridUInput.split("x");
    return newGridArray;
};
  //resets the grid and uses the userinput array specs for new one
submitbtn.addEventListener("click", (e) => {
  getInput(document.getElementById("gridInput").value);
  if (newGridArray[0] > 100 || newGridArray[1] > 100) {
    alert("Use a smaller grid size!")
    return;
  } else if (isNaN(newGridArray[0]) || isNaN(newGridArray[1])) {
    alert("Please type in rows x columns format. For example: '20x20'");
  } else { container.innerHTML = "";
    makeRows(newGridArray[0], newGridArray[1]);
  };
});
  //does the same as the submit button but hitting 'enter'
gridInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
   getInput(document.getElementById("gridInput").value);
    if (newGridArray[0] > 100 || newGridArray[1] > 100) {
    alert("Use a smaller grid size!")
    return;
    } else if (isNaN(newGridArray[0]) || isNaN(newGridArray[1])) {
      alert("Please type in rows x columns format. For example: '20x20'");
    } else {
    container.innerHTML = "";
    makeRows(newGridArray[0], newGridArray[1]);
  }};
});
