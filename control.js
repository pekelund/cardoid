function toggle() {
  var x = document.getElementById("cardoidWrapper");
  var y = document.getElementById("sinWrapper");
  var button = document.getElementById("toggleBtn");
  
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    button.innerHTML = "Sinus";
  } else {
    x.style.display = "none";
    y.style.display = "block";
    button.innerHTML = "Cardoid";
  }
}
