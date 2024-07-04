const heroBtn = document.getElementById("heroBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

fetch("/isLoggedIn")
  .then(response => response.json())
  .then(data => {
    if(data.isLoggedIn){
        console.log("logged in");
        heroBtn.style.display = "none";
        dashboardBtn.style.display = "block";
    }
    else{
        heroBtn.style.display = "block";
        dashboardBtn.style.display = "none";
    }
  })
  .catch(error => console.error('Error:', error));

  