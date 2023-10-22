const signupFormHandler = async (event) => {
    event.preventDefault();
  
    try {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const email = document.getElementById("email").value.trim();
  
      console.log(password, username, email);
  
      if (username && email && password) {
        const response = await fetch("/api/users/signup", {
          method: "POST",
          body: JSON.stringify({ username, email, password }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Sign-up failed!");
        }
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "User was not created check login endpoint!" });
    }
  };
  
  document.querySelector("form").addEventListener("submit", signupFormHandler);
  