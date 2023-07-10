import React  from 'react';

const Card = ({ title, imagePath, retailer, cost }) => {
    

    return (
        <div className="card my-3">
            <div className="row">
                <div className="col-md-4">
                    <img src={`images/${imagePath}`} className="card-img-top" alt="Card image" />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{retailer}</p>
                        <p className="price">£{cost}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartCards = ({ data }) => {
    return (
        <div className="container mt-5">
            <div id="cart-items" className="mt-4">
                {data.map((item, index) => (
                    <Card key={index} title={item.title} imagePath={item.imagePath}
                          retailer={item.retailer} cost={item.cost} />
                ))}
            </div>
        </div>
    );
};

export default CartCards;