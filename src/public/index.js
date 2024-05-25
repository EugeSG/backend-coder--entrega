const socket = io();

const divProducts = document.getElementById('products');

socket.on('getProducts', (data) => {

    divProducts.innerHTML = data.map((prod) => {
        return `
        <div id=${prod.id} class="product">
            <div class="decriptionProduct">
                <div class="title">
                    Título: ${prod.title}
                </div>
                <div>
                    Descripción: ${prod.description}
                </div>
                <div>
                    Precio: ${prod.price}
                </div>
                <div>
                    Código: ${prod.code}
                </div>
                <div>
                    Stock: ${prod.stock}
                </div>
                <div>
                    Categoría: ${prod.category}
                </div>
            </div>
            <button id="btnDeleteProduct" onclick="deleteProduct('${prod.id}')">Eliminar</button>
        </div>`
    }).join(' ')
});


const saveNewProduct = () => {

    let inputTitle = document.getElementById('title');
    let inputDescription = document.getElementById('description');
    let inputPrice = document.getElementById('price');
    let inputCode = document.getElementById('code');
    let inputStock = document.getElementById('stock');
    let inputCategory = document.getElementById('category');

    const newProduct = {
        title: inputTitle.value,
        description: inputDescription.value,
        price: inputPrice.value,
        code: inputCode.value,
        stock: inputStock.value,
        category: inputCategory.value
    }
    socket.emit('addNewProduct', newProduct);
};

const deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
}

socket.on('handleErrors', (data) => {
    alert(`${data.status}: ${data.message} `)
})