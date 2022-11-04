function Service() {
    this.getListProduct = function () {
        return axios({
            url : "https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product",
            method: "GET",
        });
   
    };
  

    this.deleteProductApi = function (id) {
        return axios({
         
            url : `https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product/${id}`,

            method: "DELETE",
        });
    };

    this.addProductApi = function (product) {
        return axios({
           
            url : "https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product",
            method: "POST",
            data: product,
        });
    };

    this.getProductById = function (id) {
        return axios({
            url : `https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product/${id}`,
            method: "GET",
        });
    };

    this.updateProductApi = function (product) {
        return axios({
            url : `https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product/${product.id}`,
            method: "PUT",
            data: product,
        });
    };
}
