const loginFormHandler = async (event) => {
    event.preventDefault();
    try {
      const username = document.getElementById("loginusername").value.trim();
      const password = document.getElementById("loginpassword").value.trim();
  
      console.log(username, password);
  
      if (username && password) {
        const response = await fetch("/api/users/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Failed to log in");
        }
      }
    } catch (err) {
      res.status(404).json({ message: "Check login script!" });
    }
  };
  
  document
    .getElementById("loginform")
    .addEventListener("submit", loginFormHandler);
  