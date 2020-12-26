$('#stop').attr('disabled', 'true');

document.getElementById("run").addEventListener("click", function() {
  $('#stop').removeAttr('disabled');
  // スタート連打を無効化
  if (startFlag01 === false) {
      runRoullet1();
      startFlag01 = true;
  } else {
      startFlag01 = false;
  }
});


document.getElementById("stop").addEventListener("click", function() {
  if (startFlag01) {
    $('#stop').attr('disabled', 'true');
    stopFlag01 = true;
  }
});