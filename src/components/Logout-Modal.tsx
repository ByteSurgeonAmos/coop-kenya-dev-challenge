import { LogOut } from "lucide-react";

interface LogoutModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ onConfirm, onCancel }: LogoutModalProps) {
  const userName = JSON.parse(localStorage.getItem("user") || "{}").name;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Log Out?</h2>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-2 border-yellow-500 rounded-lg flex items-center justify-center">
            <LogOut className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <p className="text-center text-gray-600 mb-8">
          Are you sure you want to log out, {userName}?
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
}
