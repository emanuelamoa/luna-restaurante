let cart = [];


// =====================================
// AGREGAR PRODUCTO
// =====================================

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    updateCart();

    openCart();
}


// =====================================
// ACTUALIZAR CARRITO
// =====================================

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío 🛒
            </p>
        `;

    }


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.quantity;


        total += subtotal;

        count += item.quantity;


        const div =
            document.createElement("div");


        div.className = "cart-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    S/ ${item.price.toFixed(2)}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

            </div>


            <button
                onclick="removeFromCart(${index})">

                🗑️

            </button>

        `;


        cartItems.appendChild(div);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        total.toFixed(2);
}


// =====================================
// CAMBIAR CANTIDAD
// =====================================

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();
}


// =====================================
// ELIMINAR PRODUCTO
// =====================================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


// =====================================
// ABRIR CARRITO
// =====================================

function openCart() {

    document
        .getElementById("cart")
        .classList
        .add("active");


    document
        .getElementById("cart-overlay")
        .classList
        .add("active");
}


// =====================================
// CERRAR CARRITO
// =====================================

function closeCart() {

    document
        .getElementById("cart")
        .classList
        .remove("active");


    document
        .getElementById("cart-overlay")
        .classList
        .remove("active");
}


// =====================================
// FILTRAR MENÚ
// =====================================

function filterMenu(category, button) {

    const products =
        document.querySelectorAll(".product");


    const buttons =
        document.querySelectorAll(".category");


    buttons.forEach(btn => {

        btn.classList.remove("active");

    });


    button.classList.add("active");


    products.forEach(product => {

        if (
            category === "todos" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });
}


// =====================================
// PEDIDO POR WHATSAPP
// =====================================

function checkout() {

    // COMPROBAR CARRITO

    if (cart.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;
    }


    // DATOS DEL CLIENTE

    const name =
        document
        .getElementById("customer-name")
        .value
        .trim();


    const phone =
        document
        .getElementById("customer-phone")
        .value
        .trim();


    const orderType =
        document
        .getElementById("order-type")
        .value;


    const address =
        document
        .getElementById("customer-address")
        .value
        .trim();


    const notes =
        document
        .getElementById("customer-notes")
        .value
        .trim();


    // COMPROBAR NOMBRE

    if (name === "") {

        alert(
            "Por favor, escribe tu nombre."
        );

        return;
    }


    // COMPROBAR TELÉFONO

    if (phone === "") {

        alert(
            "Por favor, escribe tu teléfono."
        );

        return;
    }


    // COMPROBAR DIRECCIÓN SI ES DELIVERY

    if (
        orderType === "delivery" &&
        address === ""
    ) {

        alert(
            "Por favor, escribe tu dirección."
        );

        return;
    }


    // =====================================
    // CREAR MENSAJE
    // =====================================

    let message =
        "🌙 *PEDIDO - LUNA RESTAURANTE*%0A";

    message +=
        "━━━━━━━━━━━━━━━━━━%0A%0A";


    message +=
        "👤 *Cliente:* " +
        encodeURIComponent(name) +
        "%0A";


    message +=
        "📞 *Teléfono:* " +
        encodeURIComponent(phone) +
        "%0A";


    if (orderType === "delivery") {

        message +=
            "🚚 *Tipo:* Delivery%0A";

        message +=
            "📍 *Dirección:* " +
            encodeURIComponent(address) +
            "%0A";

    } else {

        message +=
            "🏪 *Tipo:* Recojo en local%0A";

    }


    message +=
        "%0A🍽️ *PEDIDO*%0A";


    message +=
        "━━━━━━━━━━━━━━━━━━%0A";


    // =====================================
    // PRODUCTOS
    // =====================================

    let total = 0;


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        total += subtotal;


        message +=
            "• " +
            encodeURIComponent(item.name) +
            " x" +
            item.quantity +
            " — S/ " +
            subtotal.toFixed(2) +
            "%0A";

    });


    // =====================================
    // TOTAL
    // =====================================

    message +=
        "%0A💰 *TOTAL: S/ " +
        total.toFixed(2) +
        "*%0A";


    // =====================================
    // NOTAS
    // =====================================

    if (notes !== "") {

        message +=
            "%0A📝 *Notas:* " +
            encodeURIComponent(notes) +
            "%0A";

    }


    message +=
        "%0A¡Gracias por elegir Luna! 🌙";


    // =====================================
    // WHATSAPP
    // =====================================

    const restaurantPhone =
        "51941969809";


    const whatsappURL =
        "https://wa.me/" +
        restaurantPhone +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );

}