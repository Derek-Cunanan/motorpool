const login = document.getElementById("login")
login.addEventListener("submit", async (event) => {
    event.preventDefault();
    const loginForm = new FormData(login)

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ 
                username: loginForm.get("name"), 
                password: loginForm.get("password")}),
        })

        const result = await response.json();

        if (result.ok === true){
            localStorage.setItem("userId", result.userId)
            console.log(localStorage.getItem("userId"))
            window.location.href = "frontend/main.html"
        }
        else{
            console.log("no")
        }
    } catch (error) {
        console.error(error);
    }
})

