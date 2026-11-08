const userId = localStorage.getItem("userId")

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
const vehicleBody = document.getElementById("vehicleBody")
const renderVehicles = async () => {
    try{
        const response = await fetch(`http://localhost:3000/api/vehicle/all/${userId}`)
        const data = await response.json()
        const vehicleList = data.vehicle

        vehicleBody.innerHTML = ""

        for (let i = vehicleList.length-1; 0 <=  i; i--){
            
                const row = document.createElement("tr")

                const plateNo = document.createElement("td")
                plateNo.textContent = vehicleList[i].plateNo

                const odoMeter = document.createElement("td")
                odoMeter.textContent = vehicleList[i].odoMeter

                const vehicle = document.createElement("td")
                vehicle.textContent = vehicleList[i].brand

                const type = document.createElement("td")
                type.textContent = vehicleList[i].type

                const mainDate = document.createElement("td")
                mainDate.textContent = vehicleList[i].maintenancedate

                const status = document.createElement("td")
                status.textContent = vehicleList[i].status

                const driver = document.createElement("td")
                if(vehicleList[i].driverId === null){
                    driver.textContent = "No driver"
                }else{
                    driver.textContent = vehicleList[i].driverId
                }

                row.appendChild(plateNo)
                row.appendChild(odoMeter)
                row.appendChild(vehicle)
                row.appendChild(type)
                row.appendChild(mainDate)
                row.appendChild(status)
                row.appendChild(driver)
                vehicleBody.appendChild(row)
        }
    }
    catch(e){
        console.log(e)
    }
}

renderVehicles();