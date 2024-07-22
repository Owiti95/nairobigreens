document.getElementById("productForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const productPhone = document.getElementById("productPhone")

    //process the form data
    const formData = {
        name: productName,
        price: productPrice,
        imageUrl: imageUrl,
        phone: productPhone,
    };

    // Send POST request using fetch/ will post the user's values
    fetch('https://farmers-sigma.vercel.app/vegetables', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Product added successfully');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error adding the product');
    });
    
    //clears the form after submission
    document.getElementById("productForm").reset();
});

fetch('db.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const productListDiv = document.getElementById('productList');
            productListDiv.innerHTML = '';

            data.vegetables.forEach(product => {
                const productCard = `
                    <div class="product-card">
                        <img src="${product.imageUrl}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>Price: KSHS${product.price}</p>
                        <p>phone: ${product.phone}</p>
                    </div>
                `;
                productListDiv.innerHTML += productCard;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        function deleteProduct(index) {
            fetch('db.json')
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(function(data) {
                    // Remove the product from data.vegetables array
                    data.vegetables.splice(index, 1);
    
                    // Update db.json with the modified data
                    return fetch('db.json', {
                        method: 'PUT', // or 'POST'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                })
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Error updating product');
                    }
                    // Re-fetch and display updated products
                    fetchAndDisplayProducts();
                })
                .catch(function(error) {
                    console.error('Error deleting product:', error);
                });
        }