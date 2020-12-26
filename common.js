document.getElementById("run").addEventListener("click", function() {
  // スタート連打を無効化
  if (startFlag01 === false && startFlag02 === false) {
      runRoullet1();
      runRoullet2();
      startFlag01 = true;
      startFlag02 = true;
  } else {
      startFlag01 = false;
      startFlag02 = false;
  }

});

let firstClick = true;

document.getElementById("stop").addEventListener("click", function() {
  if (firstClick) {
    if (startFlag01) {
      stopFlag01 = true;
    }
    firstClick = false;
  } else {
    if (startFlag02) {
      stopFlag02 = true;
    }
    stopFlag01 = true;
  }


});