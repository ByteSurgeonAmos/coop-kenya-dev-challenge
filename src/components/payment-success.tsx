import { Check, X as XIcon } from "lucide-react";

interface PaymentSuccessProps {
  refNumber: string;
  amount?: number;
  customerName: string;
  customerId: string;
  onDownload: () => void;
  onDone: () => void;
  status?: "success" | "error";
  errorMessage?: string;
}

export default function PaymentSuccess({
  refNumber,
  amount,
  customerName,
  customerId,
  onDownload,
  onDone,
  status = "success",
  errorMessage,
}: PaymentSuccessProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          {status === "success" ? "Payment Successful" : "Payment Failed"}
        </h1>

        {status === "success" ? (
          <>
            <div className="space-y-2 text-center mb-6">
              <p className="text-gray-600">
                Ref Number: <span className="text-black">{refNumber}</span>
              </p>
              <p className="text-gray-600">
                Date:{" "}
                <span className="text-black">
                  {new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-3xl font-bold">
                {amount ? amount.toFixed(2) : "0.00"} KES
              </p>
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600">Agrovet product purchase for</p>
              <p className="font-medium">
                {customerName} -{customerId}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onDownload}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Download Receipt
              </button>
              <button
                onClick={onDone}
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Done
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
                <XIcon className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <p className="text-red-500 mb-6">{errorMessage}</p>
            <button
              onClick={onDone}
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
