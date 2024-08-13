import * as service from "../services/product.service.js";

const createURLWithQuerys = (page, limit, sort, title) => {
     
        let url = `http://localhost:8080/api/products?page=${page}`;

        if(limit) url += `&limit=${limit}`
        else url +=  `&limit=10`;
        if(sort) url += `&sort=${sort}`;
        if(title) url += `&title=${title}`;
        return url;
}

export const getAll =  async (req, res) => {
    try {
        const method = req.method;
        const { page, limit, sort, title } = req.query;
        const response = await service.getAll(method, limit, page, sort, title);
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
        res.status(500).json({ status: "Error", message: error.message });
    }
};

export const getById =  async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await service.getById(pid);
        if (!product) res.status(404).json({ status: "Error", message: "Product Not Found" });
        else res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};

export const create =  async (req, res) => {
    try {
        
        //Añadir archivos si tiene
        const productBody = req.body;

        let thumbnails = [];
        if(req.files){
            for (const file of req.files) {
                thumbnails.push(file.path);
            }
            productBody.thumbnails = thumbnails;
        }

        // create y manejo de errores. 
        const product = await service.create(productBody, req.method);

        if (product.status == "error") res.status(422).json({ status: "Error", message: product.mssg });
        else res.status(201).json(product.payload);

    } catch (error) {
        res.status(500).json({ status: "Error", message: error.message });
    }
};


export const update = async (req, res) => {
    try {
        const { pid } = req.params;

        const prodUpdated = await service.update(pid, req.body);
        if(!prodUpdated) res.status(404).json({message: `Error: Product Not Found`});
        else if(prodUpdated.status == "error") res.status(422).json({ message: `Error: ${prodUpdated.mssg}`});
        else res.status(201).json(prodUpdated);
    } catch (error) {
        console.log(error);
    }
}

export const remove = async (req, res) => {
    try {
        const { pid } = req.params;
        const prodDeleted = await service.remove(pid);
        if(!prodDeleted) res.status(404).json({message: `Error: Product Not Found`});
        else res.status(201).json(prodDeleted);
    } catch (error) {
        
    }
}
