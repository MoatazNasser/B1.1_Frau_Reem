var content = document.getElementById("content");
var stopZoom = document.getElementById("stopZoom");
var checkZoom = false;
var temp = ""; 
for (var i = 1; i <= 11; i++) {
  temp += `
  <h2 class="text-center text-light"> Num: #${i}</h2>

  <div class=" d-flex flex-column justify-content-center align-items-center my-4 ">
                    <div class=" w-100 ">
                        <div class="rounded-4 overflow-hidden w-100">
                            <img id="myimage${i}" src="images/${i}.jpg" class=" w-100">
                        </div>
                    </div> 
                </div>
  `;
}

content.innerHTML = temp;

stopZoom.addEventListener("click", function () {
  // alert("clicked");
  if(this.innerText == "Start zoom-in")
  {
    checkZoom = true;
    stopZoom.innerHTML= `<div class="Files w-100 p-2 my-2 bg-danger fs-4 fw-semibold bg-opacity-50 rounded-4 text-center">
    Stop zoom-in
</div>`
    console.log("yes");
    content.innerHTML = ``;
  var temp = ""; 
  for (var i = 1; i <= 11; i++) {
    temp += `
    <h2 class="text-center text-light"> Num: #${i}</h2>
  
    <div class="img-zoom-container d-flex flex-column justify-content-center align-items-center my-4 ">
                      <div class=" w-100 ">
                          <div class="rounded-4 overflow-hidden w-100">
                              <img id="myimage${i}" src="images/${i}.jpg" class=" w-100">
                          </div>
                      </div> 
                      <div id="myresult${i}" class="img-zoom-result my-2 w-100"></div>
      </div>
    `;
  }
  content.innerHTML = temp;
  }
  else if(this.innerText == "Stop zoom-in")
  {
    checkZoom = false;
    stopZoom.innerHTML= `<div class="Files w-100 p-2 my-2 bg-danger fs-4 fw-semibold bg-opacity-50 rounded-4 text-center">
    Start zoom-in
</div>`
    console.log("no");
    content.innerHTML = ``;
  var temp = ""; 
  for (var i = 1; i <= 11; i++) {
    temp += `
    <h2 class="text-center text-light"> Num: #${i}</h2>
  
    <div class=" d-flex flex-column justify-content-center align-items-center my-4 ">
                      <div class=" w-100 ">
                          <div class="rounded-4 overflow-hidden w-100">
                              <img id="myimage${i}" src="images/${i}.jpg" class=" w-100">
                          </div>
                      </div> 
      </div>
    `;
  }
  content.innerHTML = temp;
  }
});

document.addEventListener("mouseover", function () {
  if(checkZoom){
  for (var i = 1; i <= 11; i++) {
    imageZoom(`myimage${i}`, `myresult${i}`);
  }
}
});

window.onresize = function () {
  if(checkZoom){
  for (var i = 1; i <= 11; i++) {
    imageZoom(`myimage${i}`, `myresult${i}`);
  }}
};

function lensStart() {
  if(checkZoom){
  for (var i = 1; i <= 11; i++) {
    imageZoom(`myimage${i}`, `myresult${i}`);
  }}
}

function imageZoom(imgID, resultID) {
  var img, lens, result, cx, cy;
  img = document.getElementById(imgID);
  result = document.getElementById(resultID);
  /*create lens:*/
  lens = document.createElement("DIV");
  lens.setAttribute("class", "img-zoom-lens");
  /*insert lens:*/
  img.parentElement.insertBefore(lens, img);
  /*calculate the ratio between result DIV and lens:*/
  cx = result.offsetWidth / lens.offsetWidth;
  cy = result.offsetHeight / lens.offsetHeight;
  /*set background properties for the result DIV:*/
  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";
  /*execute a function when someone moves the cursor over the image, or the lens:*/
  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);
  /*and also for touch screens:*/
  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
  function moveLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;
    /*prevent the lens from being positioned outside the image:*/
    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    /*set the position of the lens:*/
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    /*display what the lens "sees":*/
    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
