import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import { Card } from "./Card";
import { type RepositoryNode } from "../api/types";

// Mock repository data for testing
const mockRepository: RepositoryNode = {
  id: "test-id",
  name: "Test Repository",
  description: "This is a test repository",
  url: "https://github.com/test/repo",
  isPrivate: false,
  owner: {
    avatarUrl: "https://github.com/testuser.png",
  },
};

describe("Card Component", () => {
  it("renders repository information correctly", () => {
    const mockOnClick = vi.fn();

    render(<Card repository={mockRepository} onClick={mockOnClick} />);

    // Check if repository name is displayed
    expect(screen.getByText("Test Repository")).toBeInTheDocument();

    // Check if repository description is displayed
    expect(screen.getByText("This is a test repository")).toBeInTheDocument();

    // Check if repository URL is displayed
    expect(
      screen.getByText("https://github.com/test/repo"),
    ).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    const mockOnClick = vi.fn();

    render(<Card repository={mockRepository} onClick={mockOnClick} />);

    // Click on the card
    screen.getByText("Test Repository").click();

    // Verify onClick was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("has correct CSS classes for styling", () => {
    const mockOnClick = vi.fn();

    render(<Card repository={mockRepository} onClick={mockOnClick} />);

    const cardElement = screen.getByText("Test Repository").closest("div");

    // Check if the card has the expected CSS classes
    expect(cardElement).toHaveClass(
      "border",
      "border-gray-300",
      "rounded-md",
      "p-4",
      "cursor-pointer",
    );
  });
});
