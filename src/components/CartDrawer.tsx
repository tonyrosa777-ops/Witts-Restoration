"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    cartTotal,
    isOpen,
    setIsOpen,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  /* Trap focus inside drawer when open */
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        tabIndex={-1}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--bg-elevated)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "rgba(245,245,245,0.1)" }}
        >
          <h2
            className="font-[family-name:var(--font-barlow-condensed)] text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Your Cart
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            style={{ color: "var(--text-secondary)" }}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <span className="text-5xl">🛒</span>
              <p
                className="text-lg font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Your cart is empty
              </p>
              <p
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Browse the shop and add some gear.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg px-6 py-2 text-sm font-semibold transition-colors"
                style={{
                  border: "1px solid rgba(245,245,245,0.2)",
                  color: "var(--text-primary)",
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.variantId}
                  className="flex gap-4 rounded-xl p-3"
                  style={{ background: "var(--bg-card)" }}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-20 w-20 flex-shrink-0 rounded-lg"
                    style={{ background: "var(--bg-base)" }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full rounded-lg object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.size} / {item.color}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity controls */}
                      <div
                        className="flex items-center gap-2 rounded-lg px-1"
                        style={{ border: "1px solid rgba(245,245,245,0.1)" }}
                      >
                        <button
                          onClick={() =>
                            item.quantity <= 1
                              ? removeItem(item.variantId)
                              : updateQuantity(item.variantId, item.quantity - 1)
                          }
                          className="px-2 py-1 text-sm transition-colors hover:text-white"
                          style={{ color: "var(--text-secondary)" }}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>
                        <span
                          className="min-w-[1.5rem] text-center text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variantId, item.quantity + 1)
                          }
                          className="px-2 py-1 text-sm transition-colors hover:text-white"
                          style={{ color: "var(--text-secondary)" }}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p
                        className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-medium"
                        style={{ color: "var(--accent)" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer — only when cart has items */}
        {items.length > 0 && (
          <div
            className="border-t px-6 py-4"
            style={{ borderColor: "rgba(245,245,245,0.1)" }}
          >
            {/* Subtotal */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Subtotal
              </span>
              <span
                className="font-[family-name:var(--font-jetbrains-mono)] text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout CTA */}
            <button
              className="w-full rounded-lg px-8 py-3 text-base font-bold transition-all hover:brightness-110"
              style={{
                background: "var(--accent)",
                color: "var(--bg-base)",
                boxShadow: "0 0 20px rgba(212,160,23,0.3)",
              }}
              onClick={() => {
                /* Stub — will wire to Stripe checkout */
                alert("Checkout coming soon! This is a demo.");
              }}
            >
              Checkout
            </button>

            {/* Secondary actions */}
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="text-sm transition-colors hover:text-red-400"
                style={{ color: "var(--text-muted)" }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
