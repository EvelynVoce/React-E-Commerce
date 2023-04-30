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
        card.className="card rounded my-5 itemCard ";
        card.innerHTML = 
            `
            <div class="row mx-1 mx-md-5">
                <h1 class="mt-5 d-flex justify-content-center"><u>${item.title}</u></h1>
                <div class="col-md-6">
                    <p class="mt-4">${item.description}</p>
                </div>
                <div class="col-md-6 mt-4">
                    <img
                      src=""
                      alt="${item.alt}"
                      class="img-fluid"
                      width="1200"
                    />
                </div>
            </div>
             `
        const container = document.getElementById("container");
        container.appendChild(card);
    });
}
