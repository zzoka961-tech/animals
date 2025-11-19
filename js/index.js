const container = document.querySelector("#right");
const btnsearch = document.querySelector("#btn");
const searchinput = document.querySelector("input");

const baseUrl = "https://api.api-ninjas.com/v1/animals";
const keyUrl = "6WeldMN6/GQLPM6eF3iRGA==JBxwRZdh4ZdFX2gV";


async function fechanimal(name) {
    const response = await fetch(`${baseUrl}?name=${name}`, {
        headers: {
            "X-Api-Key": keyUrl
        }
    });
    const data = await response.json();
        console.log(data[0]);
    return data[0];
    
   

}

// دالة البحث
async function getanimal() {
    const getinput = searchinput.value.trim(); 
    if (!getinput) {
        container.innerHTML = `<h1>Please enter an animal's name</h1>`;
        return;
    }


    container.innerHTML = `
        <div class="loader-container">
            <span class="loader"></span>
        </div>
    `;

    const animaldata = await fechanimal(getinput);
    displayAnimal(animaldata);
}


function displayAnimal(animal) {
    if (!animal) {
        container.innerHTML = `<h1>No animal found</h1>`;
        return;
    }

    container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
        <div class="card shadow-sm" style="width: 380px; border-radius: 12px; overflow: hidden;">
            <div class="card-header bg-primary text-white text-center">
                <h4 class="mb-0"><i class="fas fa-paw me-2"></i>${animal.name}</h4>
                <small>${animal.taxonomy?.scientific_name || "Unknown"}</small>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-tree me-2"></i>Habitat:</span>
                        <span>${animal.characteristics?.habitat || "Unknown"}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-utensils me-2"></i>Diet:</span>
                        <span>${animal.characteristics?.diet || "Unknown"}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-hourglass-half me-2"></i>Lifespan:</span>
                        <span>${animal.characteristics?.lifespan || "Unknown"}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span><i class="fas fa-tachometer-alt me-2"></i>Top Speed:</span>
                        <span>${animal.characteristics?.top_speed || "Unknown"}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
}



btnsearch.addEventListener("click",function(){
     getanimal()
});
