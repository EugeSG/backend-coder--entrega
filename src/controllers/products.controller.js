import * as service from "../services/product.service.js";

const createURLWithQuerys = (page, limit, sort, title) => {
     
        let url = `http://localhost:8080/api/products?page=${page}`;

        if(limit) url += `&limit=${limit}`
        else url =  `&limit=10`;
        if(sort) url += `&sort=${sort}`;
        if(title) url += `&title=${title}`;

        return url;
}

export const getAll =  async (req, res) => {
    try {
        const { page, limit, sort, title } = req.query;

        const response = await service.getAll(limit, page, sort, title);

        const nextLink = response.hasNextPage ? createURLWithQuerys(response.nextPage, limit, sort, title ) : null;
        const prevLink = response.hasPrevPage ? createURLWithQuerys(response.prevPage, limit, sort, title ) : null;
        
        if(response) {
            res.status(200).json({
                status: 'success',
                payload: response.docs || response,
                totalPages: response.totalPages ? response.totalPages : null,
                prevPage: response.prevPage ? response.prevPage : null,
                nextPage: response.nextPage ? response.nextPage : null,
                page,
                hasNextPage: response.hasNextPage ? response.hasNextPage : null,
                hasPrevPage: response.hasPrevPage ? response.hasPrevPage : null,
                prevLink,
                nextLink
                })
        } else {
            res.status(500).json({
                status: 'error',
                payload: null,
                totalPages: null,
                prevPage: null,
                nextPage: null,
                page: null,
                hasNextPage: null,
                hasPrevPage: null,
                prevLink: null,
                nextLink: null
                })
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

export const getById =  async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await service.getById(pid);
        if (!product) res.status(404).json({ message: "Product Not Found" });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

export const create =  async (req, res) => {
    try {

        //Añadir archivos si tiene
        const productBody = req.body;

        let thumbnails = [];
        if(req.file){
            for (const file of req.files) {
                thumbnails.push(file.path);
            }
            productBody.thumbnails = thumbnails;
        }
        

        // create y manejo de errores. 
        const product = await service.create(productBody);

        if (product.status == "error") res.status(422).json({ message: `Error: ${product.mssg}` });
        else res.status(201).json(product.payload);

    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

// router.put("/:idProduct", async (req, res) => {
//     try {
//         const { idProduct } = req.params;
//         const productUpdate = await productManager.updateProduct(req.body, idProduct);
//         if (productUpdate[0] == "Error") res.status(422).json({ message: productUpdate[1] });
//         else res.status(200).json(productUpdate);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// });

// router.delete("/:idProduct", async (req, res) => {
//     try {
//         const { idProduct } = req.params;
//         const productDelete = await productManager.deleteProduct(idProduct);
//         if (productDelete[0] == "Error") res.status(404).json({ message: productDelete[1] });
//         else res.status(200).json({ message: "Product with id: ${idProduct} deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// });
