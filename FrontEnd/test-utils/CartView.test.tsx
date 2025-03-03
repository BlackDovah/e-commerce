import { render, screen, waitFor, userEvent } from "@test-utils";
import { CartView } from "@/components/Cart/CartView";
import { CART_OPEN_EVENT } from "@/components/Cart/CartOpenEvents";
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

const mockCartItems = [
  {
    ID: "1",
    title: "Test Book",
    price: 29.99,
    quantity: 2,
    image: "test-image.jpg",
  },
];

vi.mock("@/components/Contexts/ProductContext", () => ({
  useProduct: () => ({
    cartItems: mockCartItems,
    setCartItems: vi.fn(),
  }),
}));

describe("CartView", () => {
  it("renders cart button with correct item count", () => {
    render(<CartView />);
    const countElement = screen.getByText("1", { exact: false });
    expect(countElement).toBeInTheDocument();
  });

  it("opens cart drawer when cart button is clicked", async () => {
    render(<CartView />);
    const cartButton = screen.getByRole("button");
    await userEvent.click(cartButton);

    await waitFor(() => {
      const drawer = document.querySelector(".mantine-Drawer-root");
      expect(drawer).toBeInTheDocument();
    });
  });

  it("displays cart items with correct information", async () => {
    render(<CartView />);
    const cartButton = screen.getByRole("button");
    await userEvent.click(cartButton);

    await waitFor(() => {
      const drawer = document.querySelector(".mantine-Drawer-root");
      expect(drawer).toBeInTheDocument();
      expect(drawer).toHaveTextContent("Test Book");
      expect(drawer).toHaveTextContent("Quantity: 2");
      expect(drawer).toHaveTextContent("$29.99");
    });
  });

  it("opens cart when CART_OPEN_EVENT is dispatched", async () => {
    render(<CartView />);
    window.dispatchEvent(new Event(CART_OPEN_EVENT));

    await waitFor(() => {
      const drawer = document.querySelector(".mantine-Drawer-root");
      expect(drawer).toBeInTheDocument();
    });
  });

  it("calculates and displays correct total", async () => {
    render(<CartView />);
    const cartButton = screen.getByRole("button");
    await userEvent.click(cartButton);

    await waitFor(() => {
      const drawer = document.querySelector(".mantine-Drawer-root");
      expect(drawer).toHaveTextContent("Total: $59.98");
    });
  });

  it("shows empty cart message when no items", async () => {
    vi.mock("@/components/Contexts/ProductContext", () => ({
      useProduct: () => ({
        cartItems: [],
        setCartItems: vi.fn(),
      }),
    }));

    render(<CartView />);
    const cartButton = screen.getByRole("button");
    await userEvent.click(cartButton);

    await waitFor(() => {
      const drawer = document.querySelector(".mantine-Drawer-root");
      expect(drawer).toHaveTextContent("Your cart is empty");
    });
  });
});
