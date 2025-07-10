
// Karpattea full shop – React + Tailwind

import { useState } from "react";
import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Карпатський чай для чоловіків",
    price: 79,
    image: "/images/product1.jpg",
    description:
      "Цей карпатський збір — потужне джерело природної сили, сформоване з рослин, які здавна цінувалися за їхню здатність підтримувати чоловіче здоров’я. ✅ Сприяє підвищенню чоловічої енергії та лібідо! ✅ Підтримує функції передміхурової залози! ✅ Відновлює фізичну силу, витривалість і загальне самопочуття! ✅ Має очищувальний ефект та зміцнює імунну систему!"
  },
  {
    id: 2,
    name: "Карпатський діабетичний чай",
    price: 79,
    image: "/images/product2.jpg",
    description:
      "Шукаєте натуральну підтримку при діабеті? 🌿 Познайомтеся з Карпатським Діабетичним Чаєм — створеним на основі давніх традицій та цілющих властивостей гірських рослин. ✅ Сприяє зниженню рівня цукру, покращує зір, нормалізує тиск та стимулює вироблення інсуліну."
  },
  {
    id: 3,
    name: "Іван-чай ферментований",
    price: 79,
    image: "/images/product3.jpg",
    description:
      "Іван-чай, відомий також як кипрій, — це традиційний карпатський напій із глибоким ароматом і м’яким смаком. Без кофеїну, без домішок — тільки сила дикої природи. Альтернатива класичним чаям."
  },
  {
    id: 4,
    name: "Чай для міцного сну",
    price: 79,
    image: "/images/product4.jpg",
    description:
      "Заспокійливий збір із карпатських трав для легкого засинання та відновлення. ✅ Допомагає зняти втому, покращує якість сну, підтримує нервову систему та емоційну рівновагу."
  },
  {
    id: 5,
    name: "Карпатський очищаючий чай",
    price: 79,
    image: "/images/product5.jpg",
    description:
      "Натуральний збір із дикорослих карпатських трав для щоденного очищення, тонусу тіла та комфортного травлення. Має приємний смак і рослинний аромат."
  },
  {
    id: 6,
    name: "Високогірний вітамінний чай",
    price: 79,
    image: "/images/product6.jpg",
    description:
      "🌄 Карпатський Високогірний Вітамінний Чай — ароматний, з ягідною кислинкою та трав’яним післясмаком. Наповнює енергією, ідеально підходить для холодної пори або щоденного вживання."
  }
];

export default function KarpatteaShop() {
  const [cart, setCart] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addToCart = (product, qty) => {
    const quantity = parseInt(qty);
    if (!quantity || quantity < 1) return;
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + quantity } : item
          )
        : [...prev, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("cart", JSON.stringify(cart));

    const response = await fetch("https://karpattea-backend.onrender.com/send", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setCart([]);
      setSubmitted(true);
    } else {
      alert("Помилка при надсиланні замовлення. Спробуйте пізніше.");
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen text-gray-800">
      <div className="relative h-[250px] md:h-[320px] overflow-hidden">
        <img
          src="/images/header.jpg"
          alt="Карпати"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg text-center px-4">
            Трав’яні збори з Карпат — смак, якому довіряють.
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow p-4 bg-white text-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto mb-2 h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-700 font-bold mb-2">₴{product.price}</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  id={`qty-${product.id}`}
                  className="w-16 text-center border rounded px-2 py-1"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() =>
                    addToCart(
                      product,
                      document.getElementById(`qty-${product.id}`).value
                    )
                  }
                  className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl shadow"
                >
                  ➕ Додати до кошика
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">🛒 Кошик</h2>
        {cart.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <span>
                  {item.name} × {item.qty}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline"
                >
                  Видалити
                </button>
              </li>
            ))}
            <li className="font-bold mt-2">Загальна сума: ₴{total}</li>
          </ul>
        )}

        {cart.length > 0 && !submitted && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-xl shadow space-y-3"
          >
            <input
              name="name"
              placeholder="Ваше ім’я"
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="phone"
              placeholder="Номер телефону"
              required
              className="w-full border p-2 rounded"
            />
            <select name="delivery" required className="w-full border p-2 rounded">
              <option value="">Оберіть доставку</option>
              <option>Нова Пошта</option>
              <option>Укрпошта</option>
            </select>
            <textarea
              name="address"
              placeholder="Адреса або № відділення"
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="comment"
              placeholder="Коментар (необов’язково)"
              className="w-full border p-2 rounded"
            />
            <button className="bg-green-700 text-white px-4 py-2 rounded-xl">
              ✅ Оформити замовлення
            </button>
          </form>
        )}

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-xl mt-4">
            ✅ Дякуємо! Ваше замовлення прийнято. Ми звʼяжемось із вами найближчим часом.
          </div>
        )}
      </div>
    </div>
  );
}
