export default async function refreshItems() {
    await clearItems();
    const itemData = await getItems();
    await displayItemContent(itemData);
}

async function clearItems() {
    const items = document.getElementsByClassName("itemCard");
    for (let i = items.length-1; i >= 0; i--) {
        items[i].remove();
    }
}

async function getItems() {
    const path = "test.json";
    const itemContent = await fetch(path);
    return itemContent.json();
}

async function displayItemContent(itemData){
    itemData.forEach(item => {
        const card = document.createElement("div");
        card.className="col mb-4 itemCard";
        card.innerHTML = 
            `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <div class="col-md-6 mt-4">
                        <img
                          src=""
                          alt="${item.alt}"
                          class="img-fluid"
                          width="1200"
                        />
                    </div>
                </div>
            </div>
             `
        const container = document.getElementById("container");
        container.appendChild(card);
    });
}
