let products = [
    { id: 1, name: "CPU", amount: 3, price: 100 },
    { id: 2, name: "GPU", amount: 4, price: 150 },
    { id: 3, name: "HDD", amount: 10, price: 120 },
    { id: 4, name: "SSD", amount: 2, price: 180 }
]

webix.ready(function () {
    
    //Table description
    let priceCart = {
        view: "datatable", id: "leftTable",

        columns: [
            { id: "id", header: "#", width: 30 },
            { id: "name", header: "Name", width: 120 },
            { id: "amount", header: "Amount", width: 100 },
            { id: "price", header: "Price", width: 100 }
        ],
        autoheight: true,
        autowidth: true,
        select: "row",
        data: products,

    }

    let shopCart = {
        view: "datatable", id: "rightTable",
        columns: [
            { id: "id", header: "#", width: 30 },
            { id: "name", header: "Name", width: 120 },
            { id: "amount", header: "Amount", width: 100 },
            { id: "price", header: "Price", width: 100 }
        ],
        autoheight: true,
        autowidth: true,
        select: "row",

    }
    //GUI for the application
    webix.ui({
        type: "space",
        rows: [
            { template: "Online store", height: 50, width: 150 },

            {
                cols: [
                    { template: "On the storage", height: 50, width: 350 },
                    { template: "On the cart", height: 50, width: 350 }
                ]
            },
            {
                cols: [priceCart, shopCart]
            },
            {
                cols: [
                    { template: "Your price will be:", height: 50, width: 200 },
                    { template: "0", id: "counter", height: 50, width: 100 }
                ]
            }
        ]
    });

    //Counting the full price
    let priceCounter = 0;
    //Adds cash to the total price
    $$('leftTable').attachEvent("onItemClick", function (item) {

        let addToCart = $$('leftTable').getItem(item.row);
        if (addToCart.amount > 0) {
            priceCounter += parseInt(addToCart.price);

            $$('counter').define('template', priceCounter);
            $$('counter').refresh();
        }

    });

    //Delete cash from the total price
    $$('rightTable').attachEvent("onItemClick", function (cart) {

        let removeFromCart = $$('rightTable').getItem(cart.row);
        priceCounter -= parseInt(removeFromCart.price);

        $$('counter').define('template', priceCounter);
        $$('counter').refresh();
    });

    // Move to cart
    $$('leftTable').attachEvent("onItemClick", function (item) {

        let storageRow = $$('leftTable').getItem(item.row);
        let copyRow = webix.copy($$('leftTable').getItem(item.row));
        let toCartRow = $$('rightTable').getItem(item.row);

        if (storageRow.amount == 0) {
            alert('No items in the storage');

        } else if (toCartRow) {            //if the products is already on the right table
            storageRow.amount--;
            toCartRow.amount++;

            $$('leftTable').refresh();
            $$('rightTable').refresh();

        } else {                     //for unique item
            storageRow.amount--;
            $$('rightTable').add(copyRow);
            copyRow.amount = 1;

            $$('leftTable').refresh();
            $$('rightTable').refresh();

        }

    });



    // Return item to the storage
    $$('rightTable').attachEvent("onItemClick", function (cart) {
        let cartRow = $$('rightTable').getItem(cart.row);
        let copyCartRow = webix.copy($$('rightTable').getItem(cart.row));
        let toStoreRow = $$('leftTable').getItem(cart.row);

        if (copyCartRow.amount == 1) {
            $$('rightTable').remove(cart.row);
            toStoreRow.amount++;

            $$('leftTable').refresh();

        } else {
            cartRow.amount--;
            toStoreRow.amount++;

            $$('rightTable').refresh();
            $$('leftTable').refresh();
        }

    });


})



