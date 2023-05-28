import {getProducts} from "../api/products";

export default async function refreshItems() {
    await clearItems();
    const itemData = await getProducts();
    await displayItemContent(itemData);
}

async function clearItems() {
    const items = document.getElementsByClassName("itemCard");
    for (let i = items.length-1; i >= 0; i--) {
        items[i].remove();
    }
}

async function displayItemContent(itemData){
    itemData.forEach(item => {
        console.log(item);
        const card = document.createElement("div");
        card.className="col mb-3 itemCard";
        card.innerHTML = 
            `
            <div class="card h-100">
                <img
                    src="images/${item.imagePath}"
                    alt="${item.alt}"
                    class=card-img-top "img-fluid"
                />
                <div class="card-body">
                    <h5 class="card-title mb-5">${item.title}</h5>
                </div>
            </div>
             `
        const container = document.getElementById("container");
        container.appendChild(card);
    });
}
