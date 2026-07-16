let cart = [];

function addToCart(name, price) {
    let existing = cart.find(i => i.name === name);
    if (existing) { existing.qty++; } 
    else { cart.push({ name, price, qty: 1 }); }
    updateCart();
}

function updateCart() {
    let list = document.getElementById('cart-items');
    let total = 0;
    list.innerHTML = cart.map((i, index) => {
        total += i.price * i.qty;
        return `<div>${i.name} | ${i.qty} | 
            <button onclick="changeQty(${index}, -1)">-</button>
            <button onclick="changeQty(${index}, 1)">+</button></div>`;
    }).join('');
    document.getElementById('count').innerText = cart.reduce((a, b) => a + b.qty, 0);
    document.getElementById('total').innerText = total;
}

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCart();
}

function toggleCart() { document.getElementById('cart-modal').classList.toggle('hidden'); }

function sendToWhatsApp() {
    let phone = "966549780808"; // ضعي رقمك هنا
    let msg = "طلب جديد:%0A" + cart.map(i => `${i.name} (العدد: ${i.qty})`).join("%0A");
    window.open(`https://wa.me/${phone}?text=${msg}`);
}