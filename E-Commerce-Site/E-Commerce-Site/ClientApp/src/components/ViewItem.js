import React, { useEffect, useState } from 'react';
import { getItemDetails } from "../api/products";
import {Button} from "reactstrap";

const ViewItem = () => {
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const itemId = getCookie("itemId");
            const data = await getItemDetails(itemId);
            setItemData(data[0]);
        };
        fetchData();
    }, []);

    function getCookie(name) {
        let cookieArr = document.cookie.split("; ");
        let cookieValue = cookieArr.find(row => row.startsWith(`${name}=`));
        return cookieValue ? cookieValue.split("=")[1] : null;
    }

    if (!itemData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="my-5 row">
            <div className="col-md-8 order-md-2">
                <div className="row" style={{ overflowX: 'hidden' }}>
                    <div className="col-9">
                        <h1 className="item-heading">{itemData.title}</h1>
                    </div>
                    <div className="col-3 text-right">
                        <h1 className="item-heading">£{itemData.cost}</h1>
                    </div>
                </div>
                <hr />
                <p>{itemData.description}</p>
                <p>{itemData.retailer}</p>
                <Button href={itemData.link} className="rounded-pill purchase-link d-none d-md-block" variant="primary" target="_blank" rel="noopener noreferrer">
                    Purchase Here
                </Button>
            </div>
            <div className="col-md-4 order-md-1">
                <div className="image-container">
                    <img src={`images/${itemData.imagePath}`} alt={`images/${itemData.imagePath}`} className="product-image img-fluid centered-image" />
                </div>
            </div>
            <Button href={itemData.link} className="my-3 rounded-pill purchase-link d-block d-md-none" variant="primary" target="_blank" rel="noopener noreferrer">
                Purchase Here
            </Button>
        </div>
    );
}

export default ViewItem;
