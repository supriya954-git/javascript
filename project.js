
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({
    input: stdin,
    output: stdout
});

async function getInput(params) {
    const name = await rl.question(params ?? 'Enter your task: ');
    return name;
}

const inventory = [];
const shell_items = [];

console.log("\n========== SHOP INVENTORY MANAGEMENT SYSTEM ==========");

console.log("Available Commands:");
console.log("-----------------------------------------");
console.log("insert  - Add new inventory");
console.log("update  - Update existing inventory");
console.log("delete  - Delete inventory");
console.log("select  - Select one inventory item");
console.log("getall  - Display all inventory items");
console.log("find    - Find a particular item");
console.log("mean    - Calculate mean price");
console.log("median  - Calculate median price");
console.log("sell    - Sell an item and update stock");
console.log("exit    - Close the inventory system");
console.log("-----------------------------------------");

let exit = false;

while (exit !== true) {

    const button = await getInput(
        "\nEnter task (insert, update, delete, select, getall, find, mean, median, sell, exit): "
    );

    switch (button.toLowerCase()) {

        // INSERT INVENTORY
        case 'insert': {
            const name = await getInput("Enter Name: ");
            const qty = Number(await getInput("Enter QTY: "));
            const price = Number(await getInput("Enter Price: "));

            const payload = {
                name: name,
                quantity: qty,
                price: price
            };

            inventory.push(payload);

            console.log("Inventory inserted successfully!");
            break;
        }

        // UPDATE INVENTORY
        case 'update': {
            const uname = await getInput("Enter Name to update: ");

            const item = inventory.find(item => item.name === uname);

            if (item) {
                const uqty = Number(await getInput("Enter new QTY: "));
                const uprice = Number(await getInput("Enter new Price: "));

                item.quantity = uqty;
                item.price = uprice;

                console.log("Inventory updated successfully!");
            } else {
                console.log("Item not found!");
            }

            break;
        }

        // DELETE INVENTORY
        case 'delete': {
            const dname = await getInput("Enter Name to delete: ");

            const index = inventory.findIndex(item => item.name === dname);

            if (index !== -1) {
                inventory.splice(index, 1);
                console.log("Item deleted successfully!");
            } else {
                console.log("Item not found!");
            }

            break;
        }

        // SELECT ONE INVENTORY ITEM
        case 'select': {
            const sname = await getInput("Enter item name: ");

            const item = inventory.find(item => item.name === sname);

            if (item) {
                console.table(item);
            } else {
                console.log("Item not found!");
            }

            break;
        }

        // FETCH ALL INVENTORY
        case 'getall': {
            if (inventory.length === 0) {
                console.log("Inventory is empty!");
            } else {
                console.table(inventory);
            }

            break;
        }

        // FIND ONE ITEM
        case 'find': {
            const fname = await getInput("Enter item name to find: ");

            const item = inventory.find(item => item.name === fname);

            if (item) {
                console.log("Item found!");
                console.log("Name:", item.name);
                console.log("Quantity:", item.quantity);
                console.log("Price:", item.price);
            } else {
                console.log("Item not found!");
            }

            break;
        }

        // CALCULATE MEAN PRICE
        case 'mean': {
            if (inventory.length === 0) {
                console.log("No inventory available!");
                break;
            }

            let total = 0;

            inventory.forEach(item => {
                total = total + item.price;
            });

            let mean = total / inventory.length;

            console.log("Mean Price:", mean);

            break;
        }

        // CALCULATE MEDIAN PRICE
        case 'median': {
            if (inventory.length === 0) {
                console.log("No inventory available!");
                break;
            }

            let prices = [];

            inventory.forEach(item => {
                prices.push(item.price);
            });

            prices.sort((a, b) => a - b);

            let middle = Math.floor(prices.length / 2);
            let median;

            if (prices.length % 2 === 0) {
                median = (prices[middle - 1] + prices[middle]) / 2;
            } else {
                median = prices[middle];
            }

            console.log("Median Price:", median);

            break;
        }

        // SELL ITEMS
        case 'sell': {
            const sname = await getInput("Enter item name to sell: ");

            const item = inventory.find(item => item.name === sname);

            if (item) {
                const sellQty = Number(await getInput("Enter quantity to sell: "));

                if (sellQty > 0 && sellQty <= item.quantity) {

                    item.quantity = item.quantity - sellQty;

                    const soldItem = {
                        name: item.name,
                        quantity: sellQty,
                        price: item.price,
                        total: sellQty * item.price
                    };

                    shell_items.push(soldItem);

                    console.log("Item sold successfully!");
                    console.log("Total Amount:", soldItem.total);

                } else {
                    console.log("Invalid quantity or insufficient stock!");
                }

            } else {
                console.log("Item not found!");
            }

            break;
        }

        // EXIT
        case 'exit': {
            exit = true;
            console.log("Exiting Inventory System...");
            break;
        }

        default:
            console.log("Invalid task!");
    }
}

rl.close();
