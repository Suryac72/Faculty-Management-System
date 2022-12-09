function showDiv(){
  window.onload(function(){console.log("Hello Method")
  var x = document.getElementById("flash-messages");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
  }