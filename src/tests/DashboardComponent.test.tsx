import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/DashboardComponent";
import { WalletProvider } from "../context/WalletContext";

const mockProducts = [
  { id: 1, title: "Product 1", price: 100 },
  { id: 2, title: "Product 2", price: 200 },
];

window.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ products: mockProducts }),
  })
) as jest.Mock;

describe("Dashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    render(
      <WalletProvider>
        <Dashboard />
      </WalletProvider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("adds product to cart when clicked", async () => {
    render(
      <WalletProvider>
        <Dashboard />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("1")).toBeInTheDocument(); // Quantity
  });

  test("updates total when adding products", async () => {
    render(
      <WalletProvider>
        <Dashboard />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("+"));
    expect(screen.getByText("60")).toBeInTheDocument(); // 60% subsidy of 100
  });
});
