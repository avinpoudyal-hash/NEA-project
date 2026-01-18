const User = require("./models/User");

async function saveUser() {
  try {
    const user = new User({
      username: "avinpoudyal",
      password: "mandem2020",
      age: 25,
    });

    const result = await user.save();
    console.log("User saved:", result);
  } catch (err) {
    console.error(err);
  }
}

saveUser();