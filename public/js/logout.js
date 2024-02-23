const logoutbtn = document.getElementById("btn");

const navlogout = document.getElementById("navlogout");

const logout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    }
  } catch (err) {
    res.status(404).json({ message: "Unable to logout!" });
  }
};

logoutbtn.addEventListener("click", logout);
navlogout.addEventListener("click", logout);
