document.getElementById("run").addEventListener("click", function() {
  // スタート連打を無効化
  if (startFlag01 === false) {
    console.log('OK');
      runRoullet1();
      runRoullet2();
      startFlag01 = true;
  } else {
      startFlag01 = false;
  }

});

document.getElementById("stop").addEventListener("click", function() {
  if (startFlag01) {
      stopFlag01 = true;
  }
});