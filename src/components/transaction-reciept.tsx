import React from "react";

interface Product {
  id: string | number;
  name: string;
  price: number;
  totalAmount: number;
  deduction: number;
}

interface ProductListProps {
  products: Product[];
  customerName: string;
  customerId: string;
  refNumber: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  customerName,
  customerId,
  refNumber,
}) => {
  const total = products.reduce(
    (sum, product) => sum + (product.deduction || 0),
    0
  );

  // Dummy data for missing props
  const dummyDate = "Mon, 16 March 2024";
  const dummyWallet = "Muranga Kilimo";
  const dummyFarmerPhone = "0712345678";
  const dummyAgroDealerName = "Harrison Kungs";
  const dummyMerchantId = "POS1323535";
  const dummyPhoneNumber = "0712 345 678";

  return (
    <div
      className="p-8 bg-white"
      style={{ width: "210mm", minHeight: "297mm" }}
    >
      <div className="flex justify-between items-start mb-8">
        <div className="bg-green-800 text-white px-4 py-2">
          <h1 className="text-lg">Transaction Receipt</h1>
        </div>
        <div className="flex gap-4">
          <img src="/Logo.svg" alt="Co-op Bank Logo" width={48} height={48} />
          <img src="/header.png" alt="Government Logo" width={48} height={48} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
        <div className="space-y-2">
          <div className="flex">
            <span className="w-40 text-gray-600">Date:</span>
            <span className="text-green-800">{dummyDate}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Reference Number:</span>
            <span className="text-green-800">{refNumber}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Wallet:</span>
            <span className="text-green-800">{dummyWallet}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Farmer Name/ID:</span>
            <span className="text-green-800">
              {customerName} - {customerId}
            </span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Farmer Phone No:</span>
            <span className="text-green-800">{dummyFarmerPhone}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex">
            <span className="w-40 text-gray-600">Agro-dealer Name:</span>
            <span className="text-green-800">{dummyAgroDealerName}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Merchant ID:</span>
            <span className="text-green-800">{dummyMerchantId}</span>
          </div>
          <div className="flex">
            <span className="w-40 text-gray-600">Phone Number:</span>
            <span className="text-green-800">{dummyPhoneNumber}</span>
          </div>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="bg-green-800 text-white">
            <th className="py-2 px-4 text-left">Product Code</th>
            <th className="py-2 px-4 text-right">Quantity</th>
            <th className="py-2 px-4 text-right">Price</th>
            <th className="py-2 px-4 text-right">Total Amount</th>
            <th className="py-2 px-4 text-right">Deduction</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-gray-50" : ""}
            >
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4 text-right">1</td>
              <td className="py-2 px-4 text-right">
                {product.price?.toFixed(2) ?? "0.00"}
              </td>
              <td className="py-2 px-4 text-right">
                {product.totalAmount?.toFixed(2) ?? "0.00"}
              </td>
              <td className="py-2 px-4 text-right">
                {product.deduction?.toFixed(2) ?? "0.00"}
              </td>
            </tr>
          ))}
          <tr className="bg-green-800 text-white">
            <td colSpan={4} className="py-2 px-4 text-right font-bold">
              TOTAL
            </td>
            <td className="py-2 px-4 text-right font-bold">
              {total?.toFixed(2) ?? "0.00"}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="text-right text-xs text-gray-500">PAGE 1 OF 1</div>
    </div>
  );
};

export default ProductList;
