import React, { useState, useEffect } from "react";
import PaymentSuccess from "./payment-success";
import ProductList from "./transaction-reciept";
import { useWallet } from "../context/WalletContext";
import LoadingSpinner from "./LoadingSpinner";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  deduction: number;
}

interface SummaryPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPay: (amount: number) => void;
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  cartItems = [],
  onBack,
  onPay,
}) => {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [timer, setTimer] = useState(30);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentRef, setPaymentRef] = useState("");
  const [userData, setUserData] = useState({ name: "", id: "" });
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { updateBalance } = useWallet();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({ name: user.name, id: user.id || "CUS123" });
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handlePayment = async () => {
    const enteredCode = verificationCode.join("");
    setPaymentError(null);
    setIsProcessing(true);

    try {
      if (enteredCode === "123456") {
        const ref = `TXN${Math.random()
          .toString(36)
          .substr(2, 9)
          .toUpperCase()}`;
        setPaymentRef(ref);
        await updateBalance(totalDeduction);
        setShowSuccessModal(true);
        onPay(totalDeduction);
      } else if (enteredCode === "000000") {
        // Simulate a failed payment
        throw new Error("Payment declined by bank");
      } else {
        setPaymentError(
          "Invalid OTP. Please enter 123456 for success, or 000000 to simulate failure"
        );
      }
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    onBack();
  };

  const handleDownloadReceipt = async () => {
    try {
      const receiptElement = document.getElementById("transaction-receipt");
      if (!receiptElement) {
        throw new Error("Receipt element not found");
      }

      const { generatePDF } = await import("../utils/generate-pdf");
      await generatePDF(receiptElement, `receipt-${paymentRef}.pdf`);
    } catch (error) {
      console.error("Failed to generate receipt:", error);
      alert("Failed to generate receipt. Please try again.");
    }
  };

  const totalDeduction =
    cartItems?.reduce((sum, item) => sum + item.deduction, 0) || 0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Summary</h1>

      <div className="flex items-center gap-2 text-sm mb-6">
        <button
          onClick={onBack}
          className="text-yellow-500 px-2 py-1 rounded hover:bg-yellow-100"
        >
          ← Back
        </button>
        <span className="text-gray-400">›</span>
        <span className="text-yellow-500">Product Details</span>
        <span className="text-gray-400">›</span>
        <span>Summary</span>
      </div>

      <div className="border rounded-lg p-6 mb-8">
        <h2 className="font-medium mb-4">Selected Products</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-4">No items in cart</div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 items-center"
              >
                <div>{item.title}</div>
                <div className="text-center">{item.quantity}</div>
                <div className="text-right">{Math.floor(item.price)} kes</div>
                <div className="text-right">{Math.floor(item.total)} kes</div>
                <div className="text-right">
                  <div>{Math.floor(item.deduction)} kes</div>
                  <div className="text-xs text-gray-500">(60% subsidy)</div>
                </div>
              </div>
            ))}
            <div className="text-right font-medium pt-4 border-t">
              Total: {Math.floor(totalDeduction)} kes
            </div>
          </div>
        )}
      </div>

      <div className="text-center mb-8">
        <p className="mb-4">
          Enter the <span className="font-medium">verification code</span> sent
          to the parent at <span className="font-medium">072*****715</span> via
          SMS.
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-lg border rounded"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
            />
          ))}
        </div>
        {paymentError && (
          <p className="text-red-500 mt-2 text-sm">{paymentError}</p>
        )}
        <p className="text-sm">
          Didn't receive OTP? Resend in{" "}
          <span className="text-yellow-500">{timer}sec</span>
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="px-6 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400 flex items-center gap-2"
        >
          {isProcessing ? (
            <>
              Processing
              <LoadingSpinner size="sm" />
            </>
          ) : (
            `Pay ${Math.floor(totalDeduction)} Kes`
          )}
        </button>
      </div>

      {showSuccessModal && (
        <PaymentSuccess
          refNumber={paymentRef}
          amount={totalDeduction}
          customerName={userData.name}
          customerId={userData.id}
          onDownload={handleDownloadReceipt}
          onDone={handleDone}
        />
      )}

      <div id="transaction-receipt" style={{ display: "none" }}>
        <ProductList
          products={cartItems.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            totalAmount: item.total,
            deduction: item.deduction,
          }))}
          customerName={userData.name}
          customerId={userData.id}
          refNumber={paymentRef}
        />
      </div>

      <p className="text-center text-red-500 mt-8">
        You will receive {Math.floor(totalDeduction)}.00 kes from the subsidy
        program. If this does not cover the total cost of the purchase ensure
        you get the balance from the customer.
      </p>
    </div>
  );
};

export default SummaryPage;
