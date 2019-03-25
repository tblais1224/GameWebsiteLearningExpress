// this is a file that gathers and stores the shopping cart

const cartFruit = [];
const cartQuantity = [];

function shoppingCart0() {
    var fruit = document.getElementById("fruitName0").getAttribute('name');
    cartFruit.push(fruit);
    cartQuantity.push(document.getElementById("fruitQuantity0").value);
    console.log(cartFruit, cartQuantity);
}

function shoppingCart1() {
    var fruit = document.getElementById("fruitName1").getAttribute('name');
    cartFruit.push(fruit);
    cartQuantity.push(document.getElementById("fruitQuantity1").value);
    console.log(cartFruit, cartQuantity);
}

function shoppingCart2() {
    var fruit = document.getElementById("fruitName2").getAttribute('name');
    cartFruit.push(fruit);
    cartQuantity.push(document.getElementById("fruitQuantity2").value);
    console.log(cartFruit, cartQuantity);
}

function shoppingCart3() {
    var fruit = document.getElementById("fruitName3").getAttribute('name');
    cartFruit.push(fruit);
    cartQuantity.push(document.getElementById("fruitQuantity3").value);
    console.log(cartFruit, cartQuantity);
}


function fruitstand() {
    //console.log(cartFruit, cartQuantity);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
    var cost = 0;
    for (var i = 0; i < cartFruit.length; i++) {
        var buyFruit = cartFruit[i];
        var quantity = parseInt(cartQuantity[i]);
        var fruit = ["Apples", "Oranges", "Peaches", "Grapefruit"];
        var price = [1.00, 1.50, 1.75, 2.00];
        var fruitIndex = fruit.indexOf(buyFruit);
        cost += (quantity * price[fruitIndex]);
    }
    console.log(cost);

    document.getElementById("totalCost").innerHTML = `The cost of all your fruit for today is ${formatter.format(cost)}.`;
}
//     function totalCost() {
//         if (quantity > 1) {
//             var s = 's';
//         }
//         else { s = ''; }
//         document.getElementById("demo").innerHTML = `The cost of ${quantity} ${buyFruit}${s} is ${cost}.`;
//     }
//     if (fruit.includes(buyFruit) && quantity > 0) {
//         totalCost();
//     }
//     else { document.getElementById("demo").innerHTML = 'No fruit was purchased'; }
// }