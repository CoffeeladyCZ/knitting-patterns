import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../test/test-utils";
import { Dashboard } from "./Dashboard";
import type { GetViewerRepositoriesQuery } from "../api/gql/generated/types";
import type { UseQueryResult } from "@tanstack/react-query";

// Mock the API hook
vi.mock("../api/hooks", () => ({
  useViewerRepositories: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: vi.fn(),
}));

// Import the mocked hook
import { useViewerRepositories } from "../api/hooks";

// Helper function to create mock query results
const createMockQueryResult = <T,>(
  overrides: Partial<UseQueryResult<T, Error>> = {},
): UseQueryResult<T, Error> =>
  ({
    data: undefined,
    error: null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    isPending: false,
    isFetching: false,
    isRefetching: false,
    isStale: false,
    dataUpdatedAt: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: "idle" as const,
    isFetched: false,
    isFetchedAfterMount: false,
    isInitialLoading: false,
    isLoadingError: false,
    isRefetchError: false,
    refetch: vi.fn(),
    status: "pending" as const,
    ...overrides,
  }) as UseQueryResult<T, Error>;

describe("Dashboard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    vi.mocked(useViewerRepositories).mockReturnValue(
      createMockQueryResult<GetViewerRepositoriesQuery>({
        isLoading: true,
        isPending: true,
        status: "pending",
      }),
    );

    render(<Dashboard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders title when loaded", async () => {
    const mockData: GetViewerRepositoriesQuery = {
      viewer: {
        repositories: {
          nodes: [
            {
              id: "1",
              name: "test-repo",
              description: "Test repository",
              url: "https://github.com/test/test-repo",
              isPrivate: false,
              owner: {
                avatarUrl: "https://github.com/test.png",
              },
            },
          ],
        },
      },
    };

    vi.mocked(useViewerRepositories).mockReturnValue(
      createMockQueryResult<GetViewerRepositoriesQuery>({
        data: mockData,
        isLoading: false,
        isSuccess: true,
        status: "success",
      }),
    );

    render(<Dashboard />);

    expect(screen.getByText("GitHub repositories")).toBeInTheDocument();

    expect(screen.getByText("test-repo")).toBeInTheDocument();
  });

  it("renders error state when API fails", () => {
    // Mock error state
    vi.mocked(useViewerRepositories).mockReturnValue(
      createMockQueryResult<GetViewerRepositoriesQuery>({
        isLoading: false,
        isError: true,
        error: new Error("API Error"),
        status: "error",
      }),
    );

    render(<Dashboard />);

    // Check if error message is displayed
    expect(screen.getByText("Error: API Error")).toBeInTheDocument();
  });
});
