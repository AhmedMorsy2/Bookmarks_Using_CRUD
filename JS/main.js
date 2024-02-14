var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var layer = document.getElementById("layer");
var back = document.getElementById("back");
var sitesList = [];

// Check if there is data to put in Storage or not
if (localStorage.getItem("site") != null) {
  sitesList = JSON.parse(localStorage.getItem("site"));
  displaySite();
}

// Add Function
function addSite() {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };
  if (checkName() && checkUrl()) {
    sitesList.push(site);
    localStorage.setItem("site", JSON.stringify(sitesList));
  } else {
    layer.classList.remove("d-none");
    back.classList.remove("d-none");
  }

  displaySite();
  clearSite();
}

// Clear Function
function clearSite() {
  siteName.value = "";
  siteUrl.value = "";
}

// Display Function
function displaySite() {
  var siteInfo = "";

  for (var i = 0; i < sitesList.length; i++) {
    var url =
      sitesList[i].url.startsWith("http://") ||
      sitesList[i].url.startsWith("https://")
        ? sitesList[i].url
        : "https://" + sitesList[i].url;
    siteInfo += `
        <tr>
            <td>${i + 1}</td>
            <td>${sitesList[i].name}</td>
            <td> <a href=${url} class='btn' id='view' target="_blank"> <i class="fa-solid fa-eye pe-2"></i>View</a> </td>
            <td> <button id='delete' class="btn" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button></td>
        </tr>`;
  }

  document.getElementById("tableData").innerHTML = siteInfo;
}

// Delete Function
function deleteSite(deleteIndex) {
  sitesList.splice(deleteIndex, 1);
  localStorage.setItem("site", JSON.stringify(sitesList));
  displaySite();
}

function checkName() {
  var nameToCheck = siteName.value;
  var namePattern = /[A-Za-z1-9]{3,}/;

  if (namePattern.test(nameToCheck)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function checkUrl() {
  var urlToCheck = siteUrl.value;
  var urlPattern = /[www\.]?[A-Za-z]*\.com/;

  if (urlPattern.test(urlToCheck)) {
    siteUrl.classList.add("is-valid");
    siteUrl.classList.remove("is-invalid");
    return true;
  } else {
    siteUrl.classList.add("is-invalid");
    siteUrl.classList.remove("is-valid");
    return false;
  }
}

function closeBox() {
  layer.classList.add("d-none");
  back.classList.add("d-none");
}
