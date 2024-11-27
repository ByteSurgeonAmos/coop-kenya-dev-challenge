import React, { useEffect, useState } from "react";
import SummaryPage from "./Summary-page";
import { useWallet } from "../context/WalletContext";
import LoadingSpinner from "./LoadingSpinner";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
  deduction: number;
  total: number;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { balance } = useWallet();
  const [insufficientFunds, setInsufficientFunds] = useState<string | null>(
    null
  );
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(
        data.products.slice(0, 5).map((p: any) => ({
          id: p.id,
          title: p.title,
          price: p.price * 120,
        }))
      );
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQuantity = existing.quantity + 1;
        const total = existing.price * newQuantity;
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
                total: total,
                deduction: total * 0.6,
              }
            : item
        );
      }
      const total = product.price;
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          total: total,
          deduction: total * 0.6,
        },
      ];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(item.quantity + change, 0),
                total: Math.max(item.quantity + change, 0) * item.price,
                deduction:
                  Math.max(item.quantity + change, 0) * item.price * 0.6,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.deduction, 0);

  useEffect(() => {
    if (totalAmount > balance) {
      setInsufficientFunds(
        `Insufficient funds. You need ${Math.floor(
          totalAmount - balance
        )} KES more`
      );
    } else {
      setInsufficientFunds(null);
    }
  }, [totalAmount, balance]);

  if (showSummary) {
    return (
      <SummaryPage
        cartItems={cartItems}
        onBack={() => setShowSummary(false)}
        onPay={(amount) => {
          console.log("Payment processing:", amount);
        }}
      />
    );
  }

  return (
    <div className="flex-grow p-2 sm:p-6 bg-gray-50">
      <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
        <button className="flex items-center px-3 py-1 sm:px-4 sm:py-2 mb-4 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          &larr; Back
        </button>
        <h1 className="text-base sm:text-lg font-bold mb-2">Product Details</h1>
        <p className="text-xs sm:text-sm font-medium mb-4">
          Inua mkulima wallet balance:{" "}
          <strong>KES {Math.floor(balance)}</strong>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-semibold mb-2">Products</h2>
            {loading ? (
              <div className="border rounded-lg p-4 flex justify-center">
                <LoadingSpinner size="sm" />
              </div>
            ) : error ? (
              <div className="border rounded-lg p-4 text-center text-red-600">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="border rounded-lg p-4 text-center">
                No products available
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex justify-between border-b py-2"
                  >
                    <span>{product.title}</span>
                    <span>{Math.floor(product.price)} KES</span>
                    <button
                      className="text-yellow-600"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-semibold mb-2">Selected Products</h2>
            <div className="border rounded-lg p-2 sm:p-4 bg-yellow-50">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-center text-sm">
                  Please select products from the products panel first
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-2 font-semibold text-xs sm:text-sm">
                    <div className="col-span-2">Product</div>
                    <div className="hidden sm:block">Qty</div>
                    <div className="hidden sm:block">Unit Price</div>
                    <div>Total</div>
                    <div>Deduction</div>
                    <div></div>
                  </div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 sm:grid-cols-7 gap-2 py-2 border-b items-center text-xs sm:text-sm"
                    >
                      <div className="col-span-2">{item.title}</div>
                      <div className="hidden sm:flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-yellow-600"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-yellow-600"
                        >
                          +
                        </button>
                      </div>
                      <div className="hidden sm:block">
                        {Math.floor(item.price)}
                      </div>
                      <div>{Math.floor(item.price * item.quantity)}</div>
                      <div>
                        <div>{Math.floor(item.deduction)}</div>
                        <div className="text-xs text-gray-500">
                          (60% subsidy)
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 flex items-center justify-center rounded-full border border-black text-black hover:bg-red-600 hover:text-white"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <div className="text-right font-bold">
                      Total Deduction: {Math.floor(totalAmount)} KES
                    </div>
                    {insufficientFunds && (
                      <div className="mt-2 text-right text-red-600 text-sm">
                        {insufficientFunds}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {totalAmount > 0 && (
          <div className="mt-6 text-center text-red-600 text-sm">
            You will receive {Math.floor(totalAmount)} kes from the subsidy
            program. If this does not cover the total cost of the purchase,
            ensure you get the balance from the customer.
          </div>
        )}
        <div className="flex flex-col sm:flex-row justify-center w-full items-center gap-2 sm:gap-4">
          <button className="w-full sm:w-[10rem] flex justify-center items-center px-4 py-2 mt-4 bg-black text-white rounded">
            &larr; Back
          </button>
          <button
            className={`w-full sm:w-auto mt-4 px-4 py-2 text-white rounded ${
              totalAmount > 0 && totalAmount <= balance
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-gray-400"
            }`}
            disabled={totalAmount === 0 || totalAmount > balance}
            onClick={() => {
              if (totalAmount > balance) {
                alert("Insufficient funds");
                return;
              }
              setShowSummary(true);
            }}
          >
            {insufficientFunds ? "Insufficient Funds" : `Proceed to Summary`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
