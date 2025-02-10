document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cart = document.querySelector(".cart__products");
  const cartContainer = document.querySelector(".cart");

  /**
   * Обновляет видимость корзины: скрывает ее, если товаров нет, и показывает, если есть.
   */
  const updateCartVisibility = () => {
    if (cart.children.length === 0) {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "block";
    }
  };

  /**
   * Удаляет товар из корзины.
   * @param {HTMLElement} cartProduct - Товар в корзине.
   */
  const removeFromCart = (cartProduct) => {
    cartProduct.remove();
    updateCartVisibility();
  };

  /**
   * Изменяет количество товаров в карточке продукта.
   * @param {HTMLElement} control - Элемент управления количеством (кнопка "+" или "-").
   * @param {boolean} increment - Увеличивать (true) или уменьшать (false) количество.
   */
  const changeProductQuantity = (control, increment) => {
    const quantityElement = control
      .closest(".product__quantity-controls")
      .querySelector(".product__quantity-value");
    let quantity = parseInt(quantityElement.textContent, 10);

    if (increment) {
      quantity += 1;
    } else {
      quantity = Math.max(1, quantity - 1); // Минимум 1
    }

    quantityElement.textContent = quantity;
  };

  /**
   * Добавляет товар в корзину.
   * Если товар уже существует, увеличивает его количество.
   * @param {HTMLElement} product - Карточка товара.
   */
  const addToCart = (product) => {
    const productId = product.dataset.id;
    const productImage = product.querySelector(".product__image").src;
    const quantity = parseInt(
      product.querySelector(".product__quantity-value").textContent,
      10
    );

    // Проверяем, есть ли товар в корзине
    const existingProduct = cart.querySelector(
      `.cart__product[data-id="${productId}"]`
    );
    if (existingProduct) {
      // Увеличиваем количество
      const countElement = existingProduct.querySelector(
        ".cart__product-count"
      );
      countElement.textContent =
        parseInt(countElement.textContent, 10) + quantity;
    } else {
      // Добавляем новый товар
      const cartProduct = document.createElement("div");
      cartProduct.className = "cart__product";
      cartProduct.dataset.id = productId;

      cartProduct.innerHTML = `
        <img class="cart__product-image" src="${productImage}">
        <div class="cart__product-count">${quantity}</div>
        <button class="cart__product-remove">Удалить</button>
      `;

      // Обработчик для кнопки удаления
      cartProduct
        .querySelector(".cart__product-remove")
        .addEventListener("click", () => {
          removeFromCart(cartProduct);
        });

      // Добавляем новый товар в корзину
      cart.appendChild(cartProduct);
    }

    updateCartVisibility();
  };

  // Устанавливаем обработчики событий для каждого товара
  products.forEach((product) => {
    // Обработчики изменения количества
    product
      .querySelector(".product__quantity-control_dec")
      .addEventListener("click", (event) => {
        changeProductQuantity(event.target, false);
      });

    product
      .querySelector(".product__quantity-control_inc")
      .addEventListener("click", (event) => {
        changeProductQuantity(event.target, true);
      });

    // Обработчик добавления в корзину
    product.querySelector(".product__add").addEventListener("click", () => {
      addToCart(product);
    });
  });

  // Обновляем видимость корзины при загрузке страницы
  updateCartVisibility();
});