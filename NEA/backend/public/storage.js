let check = localStorage.getItem("LogCount")
if (check == 1) {
  localStorage.setItem("LogCount", 1)
}
else {
  localStorage.setItem("LogCount", 3)
}

let check2 = localStorage.getItem("SavedCount")
if (check2 == 1) {
    localStorage.setItem("SavedCount", check2)
}
if (check2 == 2) {
    localStorage.setItem("SavedCount", check2)
}
if (check2 == 3) {
    localStorage.setItem("SavedCount", check2)
}
if (check2 == 4) {
    localStorage.setItem("SavedCount", check2)
}
else {
    localStorage.setItem("SavedCount", 0)
}
