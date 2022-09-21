// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

contract Ebay {
    struct Product {
        address buyer;
        address seller;
        uint256 id;
        uint256 price;
        uint256 rating;
        string name;
        string description;
        string category;
        string imgUrl;
    }

    uint256 productCounter;

    mapping(uint256 => Product) public products;

    function listNewProduct(
        string memory _name,
        string memory _description,
        string memory _category,
        string memory _imgUrl,
        uint256 _price,
        uint256 _rating
    ) public {
        Product memory newProduct = Product({
            buyer: address(0),
            seller: msg.sender,
            id: productCounter,
            price: _price,
            rating: _rating,
            name: _name,
            description: _description,
            category: _category,
            imgUrl: _imgUrl
        });

        products[productCounter] = newProduct;
        productCounter++;
    }

    function getNumberOfProducts() public view returns (uint256) {
        return productCounter;
    }

    function purchaseItem(uint256 _id) public payable {
        Product storage product = products[_id];

        require(msg.value == product.price, "Invalid amount sent for product");
        require(product.seller != address(0));
        require(product.buyer == address(0), "Item has been bought");
        require(
            msg.sender != product.seller,
            "Seller cannot buy their own product"
        );

        product.buyer = msg.sender;

        payable(product.seller).transfer(msg.value);
    }
}
