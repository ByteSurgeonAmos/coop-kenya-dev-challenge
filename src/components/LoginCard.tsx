import React, { useState } from "react";

/* Test credentials for dummyjson:
 * username: 'emilys'
 * password: 'emilypasss'
 */

interface LoginFormData {
  username: string;
  password: string;
}

const LoginCard: React.FC = () => {
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log("formData", formData);
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Invalid credentials. Try username: kminchelle, password: 0lelplR"
        );
      }

      // On successful login
      console.log("Login successful:", data);
      alert("Login successful! Token: " + data.token);
    } catch (error) {
      setApiError(
        error instanceof Error
          ? error.message
          : "Try using username: kminchelle, password: 0lelplR"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username.length >= 3) {
      setFormStep(2);
      setErrors({});
    } else {
      setErrors({ username: "Username must be at least 3 characters" });
    }
  };

  const handleBackToUsername = () => {
    setFormStep(1);
    setErrors({});
    setApiError("");
  };

  return (
    <form
      onSubmit={formStep === 1 ? handleUsernameSubmit : handleSubmit}
      className="relative flex flex-col justify-center p-4 sm:p-8 bg-white rounded-lg shadow-md w-full max-w-[90%] sm:max-w-sm overflow-hidden"
    >
      {/* Leaves Image */}
      <img
        src="/green-leaves-white-background.png"
        alt="Leaves"
        className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 pointer-events-none opacity-50"
      />

      {/* Text Content */}
      <h1 className="text-lg sm:text-xl font-bold text-green-700">
        Welcome to
      </h1>
      <h2 className="text-xl sm:text-2xl font-extrabold text-green-800 break-words">
        Inua Mkulima - Subsidy Program
      </h2>
      <p className="mt-4 text-gray-700">Enter your password to continue</p>

      {formStep === 1 ? (
        /* Username Step */
        <div className="mt-4">
          <label htmlFor="username" className="block text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.username ? "border-red-500" : ""
            }`}
            placeholder="Enter your username"
            autoFocus
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">{errors.username}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 mt-6 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Continue →
          </button>
        </div>
      ) : (
        /* Password Step */
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={handleBackToUsername}
              className="text-gray-600 hover:text-gray-800"
            >
              ←
            </button>
            <span className="ml-2 text-gray-600">
              Username: {formData.username}
            </span>
          </div>

          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400"
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
          {apiError && (
            <p className="mt-4 text-sm text-red-500 text-center">{apiError}</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 mt-6 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-300 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in →"}
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginCard;
