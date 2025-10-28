import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useAuth } from "../../app/stores/Auth";
import type { User, UserWithoutPassword } from "../../app/types/User";
import type { ApiResponse, GoogleAuthResponse } from "../../app/types/Utils";

// Mock $fetch
const mockFetch = vi.fn();
vi.stubGlobal("$fetch", mockFetch);

// Mock navigateTo
const mockNavigateTo = vi.fn();
vi.stubGlobal("navigateTo", mockNavigateTo);

describe("Auth Store", () => {
  let authStore: ReturnType<typeof useAuth>;

  beforeEach(() => {
    setActivePinia(createPinia());
    authStore = useAuth();

    // Reset mocks
    mockFetch.mockReset();
    mockNavigateTo.mockReset();

    // Reset store state
    authStore.$reset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial state", () => {
    it("should have correct initial state", () => {
      expect(authStore.user).toBeNull();
      expect(authStore.isLogged).toBe(false);
      expect(authStore.tokens).toBeNull();
    });
  });

  describe("Getters", () => {
    it("getUser should return user", () => {
      const mockUser: UserWithoutPassword = {
        id: "1",
        email: "test@example.com",
        firstname: "John",
        lastname: "Doe",
        roles: ["user"],
      };

      authStore.user = mockUser;
      expect(authStore.getUser).toEqual(mockUser);
    });

    it("checkIfLogged should return isLogged", () => {
      authStore.isLogged = true;
      expect(authStore.checkIfLogged).toBe(true);

      authStore.isLogged = false;
      expect(authStore.checkIfLogged).toBe(false);
    });

    it("getTokens should return tokens", () => {
      const mockTokens = { access_token: "token123" };
      authStore.tokens = mockTokens;
      expect(authStore.getTokens).toEqual(mockTokens);
    });
  });

  describe("login action", () => {
    const mockUsers: User[] = [
      {
        id: "1",
        email: "john@example.com",
        password: "password123",
        firstname: "John",
        lastname: "Doe",
        roles: ["user"],
      },
      {
        id: "2",
        email: "owner@example.com",
        password: "password123",
        firstname: "Jane",
        lastname: "Owner",
        roles: ["owner"],
      },
    ];

    it("should login successfully with correct credentials", async () => {
      const mockResponse: ApiResponse<User[]> = {
        data: mockUsers,
        status: "success",
        message: "Users retrieved",
      };

      mockFetch.mockResolvedValue(mockResponse);

      await authStore.login("john@example.com", "password123");

      expect(authStore.isLogged).toBe(true);
      expect(authStore.user).toEqual({
        id: "1",
        email: "john@example.com",
        firstname: "John",
        lastname: "Doe",
        roles: ["user"],
      });
      expect(mockNavigateTo).toHaveBeenCalledWith("/");
    });

    it("should throw error with incorrect credentials", async () => {
      const mockResponse: ApiResponse<User[]> = {
        data: mockUsers,
        status: "success",
        message: "Users retrieved",
      };

      mockFetch.mockResolvedValue(mockResponse);

      await expect(
        authStore.login("wrong@example.com", "wrongpassword")
      ).rejects.toThrow("Email ou mot de passe incorrect.");

      expect(authStore.isLogged).toBe(false);
      expect(authStore.user).toBeNull();
    });

    it("should handle API error", async () => {
      mockFetch.mockRejectedValue(new Error("Network error"));

      await expect(
        authStore.login("john@example.com", "password123")
      ).rejects.toThrow("Network error");

      expect(authStore.isLogged).toBe(false);
      expect(authStore.user).toBeNull();
    });
  });

  describe("googleLogin action", () => {
    const mockGoogleUser: User = {
      id: "1",
      email: "google@example.com",
      firstname: "Google",
      lastname: "User",
      roles: ["user"],
      googleId: 123,
      picture: "google-picture.jpg",
    };

    const mockGoogleResponse: GoogleAuthResponse = {
      access_token: "google-access-token",
      refresh_token: "google-refresh-token",
      user: {
        sub: "google-sub-123",
        email: "google@example.com",
        email_verified: true,
        family_name: "User",
        given_name: "Google",
        name: "Google User",
        picture: "google-picture.jpg",
      },
    };

    it("should login successfully with Google", async () => {
      const mockResponse: ApiResponse<User> = {
        data: mockGoogleUser,
        status: "success",
        message: "Google user retrieved",
      };

      mockFetch.mockResolvedValue(mockResponse);

      await authStore.googleLogin(mockGoogleResponse);

      expect(authStore.isLogged).toBe(true);
      expect(authStore.tokens).toEqual({
        access_token: "google-access-token",
        refresh_token: "google-refresh-token",
      });
      expect(authStore.user).toEqual({
        id: "1",
        email: "google@example.com",
        firstname: "Google",
        lastname: "User",
        roles: ["user"],
        googleId: 123,
        picture: "google-picture.jpg",
      });
      expect(mockNavigateTo).toHaveBeenCalledWith("/");
    });

    it("should throw error when Google user not found", async () => {
      const mockResponse: ApiResponse<User> = {
        data: null as any,
        status: "error",
        message: "User not found",
      };

      mockFetch.mockResolvedValue(mockResponse);

      await expect(authStore.googleLogin(mockGoogleResponse)).rejects.toThrow(
        "Compte inconnu. Merci de créer un compte"
      );

      expect(authStore.isLogged).toBe(false);
      expect(authStore.user).toBeNull();
    });

    it("should handle Google API error", async () => {
      mockFetch.mockRejectedValue(new Error("Google API error"));

      await expect(authStore.googleLogin(mockGoogleResponse)).rejects.toThrow(
        "Google API error"
      );

      expect(authStore.isLogged).toBe(false);
      expect(authStore.user).toBeNull();
    });
  });

  describe("redirectAfterLogin action", () => {
    it("should redirect to login if not logged in", () => {
      authStore.isLogged = false;

      authStore.redirectAfterLogin();

      expect(mockNavigateTo).toHaveBeenCalledWith("/login");
    });

    it("should redirect to backoffice for backoffice role", () => {
      authStore.isLogged = true;
      authStore.user = {
        id: "1",
        email: "admin@example.com",
        firstname: "Admin",
        lastname: "User",
        roles: ["backoffice"],
      };

      authStore.redirectAfterLogin();

      expect(mockNavigateTo).toHaveBeenCalledWith("/backoffice");
    });

    it("should redirect to owner for owner role", () => {
      authStore.isLogged = true;
      authStore.user = {
        id: "1",
        email: "owner@example.com",
        firstname: "Owner",
        lastname: "User",
        roles: ["owner"],
      };

      authStore.redirectAfterLogin();

      expect(mockNavigateTo).toHaveBeenCalledWith("/owner");
    });

    it("should redirect to home for regular user", () => {
      authStore.isLogged = true;
      authStore.user = {
        id: "1",
        email: "user@example.com",
        firstname: "Regular",
        lastname: "User",
        roles: ["user"],
      };

      authStore.redirectAfterLogin();

      expect(mockNavigateTo).toHaveBeenCalledWith("/");
    });
  });

  describe("logout action", () => {
    it("should clear all state and redirect to home", () => {
      // Set initial state
      authStore.user = {
        id: "1",
        email: "user@example.com",
        firstname: "Test",
        lastname: "User",
        roles: ["user"],
      };
      authStore.isLogged = true;
      authStore.tokens = { access_token: "token123" };

      authStore.logout();

      expect(authStore.user).toBeNull();
      expect(authStore.isLogged).toBe(false);
      expect(authStore.tokens).toBeNull();
      expect(mockNavigateTo).toHaveBeenCalledWith("/");
    });
  });
});
