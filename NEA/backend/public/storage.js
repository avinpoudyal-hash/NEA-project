let check = localStorage.getItem("LogCount")
if (check == 1) {
  localStorage.setItem("LogCount", 1)
  console.log("LogCount = 1")
}
else if (check == 0) {
  localStorage.setItem("LogCount", 0)
  console.log("LogCount = 0")
}
else if (check == 2) {
  localStorage.setItem("LogCount", 2)
  console.log("LogCount = 2")
}
else {
  localStorage.setItem("LogCount", 3)
  console.log("LogCount = 3")
}

let check2 = localStorage.getItem("SavedCount")
if (check2 == 0) {
    localStorage.setItem("SavedCount", check2)
    console.log("check2 = 0")
}
if (check2 == 1) {
    localStorage.setItem("SavedCount", check2)
    console.log("check2 = 1")
}
if (check2 == 2) {
    localStorage.setItem("SavedCount", check2)
    console.log("check2 = 2")
}
if (check2 == '3') {
    localStorage.setItem("SavedCount", check2)
    console.log("check2 = 3")
}
if (check2 == '4') {
    localStorage.setItem("SavedCount", check2)
    console.log("check2 = 4")
}
//else{
//    localStorage.setItem("SavedCount", 0)
//    console.log("check2: "+ check2)
//}

let loginStatus = localStorage.getItem("login")
if (loginStatus == 'true') {
    localStorage.setItem("login", true)
}
else if (loginStatus == 'false') {
    localStorage.setItem("login", false)
}
else {
    localStorage.setItem("login", false)
}