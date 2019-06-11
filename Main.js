// HTML元素抓手声明
const videoes = new Array(document.getElementById('video1'),document.getElementById('video2'),document.getElementById('video3'))
const VedioSelectBox = document.getElementById("vedioSelect");
const vedioDate = document.getElementById("vedioDate");
const playSpeed = document.getElementById("playSpeed");
// 变量声明
var files;
var playPauseFlag = false;
var item_Index;
var selectItemIndex;

// file Load event
document.getElementById("filepicker").addEventListener("change", function(event) {
//init
  files = event.target.files;
  item_Index = 0;
//setSelectBox
  setSelectBox();
  loadVedioById(item_Index)
  showPlaySpeed();
}, false);

function setSelectBox(){
  //init
  VedioSelectBox.innerHTML = ""; // clean up the list
  selectItemIndex = 0;
  //update the content of selectBox
  if((files.length)%3 == 0){
    for (let i=0; i<(files.length)/3; i++) {
      let item_opt = document.createElement("OPTION");
      // item_opt.innerHTML = files[i*3].name.split("-front.mp4")[0];
      item_opt.innerHTML = parseNameToDate(files[i*3].name);
      VedioSelectBox.appendChild(item_opt);
    }
  }
  else {
    alert("文件数量出错")
  }
}
function listVedio(){
  selectItemIndex = VedioSelectBox.selectedIndex;
  // let vedio_Index = Math.floor((selectItemIndex+1)/3);
  loadVedioById(selectItemIndex);
}
//display date
// add vedio control
function loadVedioById(item_Index){

  vedioDate.innerHTML = parseNameToDate(files[item_Index*3].name);
  // load the three vedio
  for(var i=0;i<3;i++){
    let file = files[item_Index*3+i];
    let obj_url =  window.URL.createObjectURL(file);
    videoes[i].src =obj_url;
    videoes[i].load()
  }
}

function parseNameToDate(filename){
  let nameArry = filename.split("_");
  let dateArry = nameArry[0].split("-");
  let hourArry = nameArry[1].split("-");
  return dateArry[0]+"年"+dateArry[1]+"月"+dateArry[2]+"日"
                        +hourArry[0]+"时"+hourArry[1]+"分";
}

//button functions
function playPause() {
  if (playPauseFlag!=true){
    for (var i=0;i<3;i++){
      videoes[i].play();
    }
    playPauseFlag = true;
  }
  else{
    for (var i=0;i<3;i++){
      videoes[i].pause();
    }
    playPauseFlag = false;
  }
  showPlaySpeed();
}
function playNext()
{
  item_Index=item_Index+3
  loadVedioById(item_Index);
  showPlaySpeed();
}
function playPrev()
{
  if( item_Index>=3){
    item_Index=item_Index-3
  }
  loadVedioById(item_Index);
  showPlaySpeed();
}
function playRateSlow() {
    // playRate = playRate+0.5;
    for (var i=0;i<3;i++){
      videoes[i].playbackRate=0.5;
    }
    showPlaySpeed();
}
function playRateNormal() {
    // playRate = playRate+0.5;
    for (var i=0;i<3;i++){
      videoes[i].playbackRate=1;
    }
    showPlaySpeed();
}
function playRateMax() {
    // playRate = playRate+0.5;
    for (var i=0;i<3;i++){
      videoes[i].playbackRate=8;
    }
    showPlaySpeed();
}
function showPlaySpeed(){
  playSpeed.innerHTML =  "当前播放速度"+videoes[0].playbackRate+"x";
}
