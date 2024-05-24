const socket = io();

const divProducts = document.getElementById('products');

socket.on('getProducts', (data) => {

    divProducts.innerHTML = data.map((prod) => {
        const newButton = document.createElement('button');
        newButton.textContent = 'Click me!';    

        return `
        <div id=${prod.id}>
            <div>
                Título: ${prod.title}
            </div>
            <div>
                Descripción: ${prod.description}
            </div>
            <div>
                Precio: ${prod.price}
            </div>
        </div>
      <hr /></p>`
      document.body.appendChild(newButton);
    }).join(' ')
});

let inputTitle = document.getElementById('title');
let inputDescription = document.getElementById('description');
let inputPrice = document.getElementById('price');
let inputCode = document.getElementById('code');
let inputStock = document.getElementById('stock');
let inputCategory = document.getElementById('category');
let btnFormAddProduct = document.getElementById('btnSubmitNewProduct');
let btnDeleteProduct = document.getElementById('btnDeleteProduct');



btnFormAddProduct.addEventListener('click', () => {
    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        code: inputCode.value,
        stock: inputStock.value,
        category: inputCategory.value
    }
    deleteProduct();
    socket.emit('addNewProduct', newProduct);

});

newButton.addEventListener('click', () => {
  console.log('New button clicked!');
});