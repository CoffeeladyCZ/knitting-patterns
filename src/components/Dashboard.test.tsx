import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../test/test-utils";
import { Dashboard } from "./Dashboard";

describe("Dashboard Component", () => {
  it("renders loading state initially", () => {
    const mockOnRepositoryClick = vi.fn();

    render(<Dashboard onRepositoryClick={mockOnRepositoryClick} />);

    // Check if loading text is displayed
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders title when loaded", async () => {
    const mockOnRepositoryClick = vi.fn();

    render(<Dashboard onRepositoryClick={mockOnRepositoryClick} />);

    // Wait for the component to load and check for the title
    expect(await screen.findByText("Knitting Patterns")).toBeInTheDocument();
  });
});
