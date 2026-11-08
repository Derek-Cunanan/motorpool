const userId = localStorage.getItem("userId")

if (userId === null){
    window.location.href = "../index.html"
}

document.addEventListener("DOMContentLoaded", () => {

    // NAVBAR TOGGLE
    const toggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");

    if (toggle && navbar) {
        toggle.addEventListener("click", () => {
            navbar.classList.toggle("open");
        });
    }
});

// ADD DRIVER
const driverForm = document.getElementById("addDriver")
driverForm.addEventListener("submit" , async (e)=> {
    e.preventDefault()
    const newDriverForm = new FormData(driverForm)

    const response = await fetch(`http://localhost:3000/api/auth/registerDriver/${userId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            userName: newDriverForm.get("driverName"),
            password: newDriverForm.get("driverPassword"),
        })
    })
    const data = await response.json()
    console.log(data.message)
})
// LOAD VEHICLES
const tablebody = document.getElementById("tablebody")
async function loadVehicles() {
    try {
        const response = await fetch(`http://localhost:3000/api/vehicle/all/${userId}`)
        
        if (!response.ok) {
            throw new Error("Failed to fetch vehicles.")
        }

        const result = await response.json()
        const vehicleList = result.vehicle 

        let availCount = 0;
        let unavailCount = 0;

        tablebody.innerHTML = ""

        for (let i = vehicleList.length-1; vehicleList.length-5 < i; i--) {

            const row = document.createElement("tr")

            const vehicle = document.createElement("td")
            vehicle.textContent = vehicleList[i].brand

            const driver = document.createElement("td")
            if(vehicleList[i].driverId === null){
                driver.textContent = "No driver"
            }else{
                driver.textContent = vehicleList[i].driverId
            }

            const status = document.createElement("td")
            status.textContent = vehicleList[i].status

            const plateNo = document.createElement("td")
            plateNo.textContent = vehicleList[i].plateNo

            row.appendChild(vehicle)
            row.appendChild(driver)
            row.appendChild(status)
            row.appendChild(plateNo)
            tablebody.appendChild(row)
        }

        document.getElementById("numUnavail").textContent = unavailCount;
        document.getElementById("numAvail").textContent = availCount;

    } catch (error) {
        console.error("Vehicle Loading Error:", error);
    }
}

loadVehicles();

