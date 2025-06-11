import { OpenStreetMapResponse } from "@/constants/responses";
import axios from "axios";
import { get_country } from "..";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock environment variable
const originalEnv = process.env;

describe("get_country", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Clear module cache
    process.env = {
      ...originalEnv,
    };
    // Set environment variable before importing
    process.env.EXPO_PUBLIC_USER_AGENT = "TestApp/1.0 (test@example.com)";
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe("Successful responses", () => {
    it("should return OpenStreetMap response data for valid coordinates", async () => {
      // Arrange
      const lat = 34.0512082;
      const long = -6.7738409;
      const mockResponse: OpenStreetMapResponse = {
        place_id: 274975656,
        licence:
          "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
        osm_type: "way",
        osm_id: 591233792,
        lat: "34.0511539",
        lon: "-6.7738574",
        class: "highway",
        type: "residential",
        place_rank: 26,
        importance: 0.0533925803006027,
        addresstype: "road",
        name: "",
        display_name:
          "Tabriquet, Salé, Pachalik de Salé, Prefecture of Salé, Rabat-Salé-Kénitra, 11080, Morocco",
        address: {
          suburb: "Tabriquet",
          city: "Salé",
          county: "Pachalik de Salé",
          state_district: "Prefecture of Salé",
          region: "Rabat-Salé-Kénitra",
          postcode: "11080",
          country: "Morocco",
          country_code: "ma",
        },
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      // Act
      const result = await get_country(
        lat,
        long,
        "TestApp/1.0 (test@example.com)"
      );

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`,
        {
          headers: {
            "User-Agent": "TestApp/1.0 (test@example.com)",
          },
        }
      );
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it("should construct correct URL with different coordinates", async () => {
      // Arrange
      const lat = 40.7128;
      const long = -74.006;
      const mockResponse = { place_id: 123456 };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      // Act
      await get_country(lat, long, "TestApp/1.0 (test@example.com)");

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=40.7128&lon=-74.006",
        expect.objectContaining({
          headers: {
            "User-Agent": "TestApp/1.0 (test@example.com)",
          },
        })
      );
    });

    it("should handle negative coordinates correctly", async () => {
      // Arrange
      const lat = -33.8688;
      const long = 151.2093;
      const mockResponse = { place_id: 789012 };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      // Act
      await get_country(lat, long, "TestApp/1.0 (test@example.com)");

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://nominatim.openstreetmap.org/reverse?format=json&lat=-33.8688&lon=151.2093",
        expect.objectContaining({
          headers: {
            "User-Agent": "TestApp/1.0 (test@example.com)",
          },
        })
      );
    });
  });

  describe("Error handling", () => {
    it("should return undefined and log error when axios throws an error", async () => {
      // Arrange
      const lat = 34.0512082;
      const long = -6.7738409;
      const errorMessage = "Network Error";

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      // Act
      const result = await get_country(lat, long);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should handle 403 Forbidden error", async () => {
      // Arrange
      const lat = 34.0512082;
      const long = -6.7738409;
      const axiosError = {
        response: {
          status: 403,
          statusText: "Forbidden",
        },
        message: "Request failed with status code 403",
      };

      mockedAxios.get.mockRejectedValueOnce(axiosError);

      // Act
      const result = await get_country(lat, long);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should handle 404 Not Found error", async () => {
      // Arrange
      const lat = 0;
      const long = 0; // Ocean coordinates
      const axiosError = {
        response: {
          status: 404,
          statusText: "Not Found",
        },
        message: "Request failed with status code 404",
      };

      mockedAxios.get.mockRejectedValueOnce(axiosError);

      // Act
      const result = await get_country(lat, long);

      // Assert
      expect(result).toBeUndefined();
    });

    it("should handle timeout errors", async () => {
      // Arrange
      const lat = 34.0512082;
      const long = -6.7738409;
      const timeoutError = {
        code: "ECONNABORTED",
        message: "timeout of 5000ms exceeded",
      };

      mockedAxios.get.mockRejectedValueOnce(timeoutError);

      // Act
      const result = await get_country(lat, long);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("Response data validation", () => {
    it("should return exact response structure matching OpenStreetMapResponse interface", async () => {
      // Arrange
      const lat = 34.0512082;
      const long = -6.7738409;
      const mockResponse: OpenStreetMapResponse = {
        place_id: 274975656,
        licence:
          "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
        osm_type: "way",
        osm_id: 591233792,
        lat: "34.0511539",
        lon: "-6.7738574",
        class: "highway",
        type: "residential",
        place_rank: 26,
        importance: 0.0533925803006027,
        addresstype: "road",
        name: "",
        display_name:
          "Tabriquet, Salé, Pachalik de Salé, Prefecture of Salé, Rabat-Salé-Kénitra, 11080, Morocco",
        address: {
          suburb: "Tabriquet",
          city: "Salé",
          county: "Pachalik de Salé",
          state_district: "Prefecture of Salé",
          region: "Rabat-Salé-Kénitra",
          postcode: "11080",
          country: "Morocco",
          country_code: "ma",
        },
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {},
      });

      // Act
      const result = await get_country(
        lat,
        long,
        "TestApp/1.0 (test@example.com)"
      );

      // Assert
      expect(result).toEqual(mockResponse);
      expect(result?.address.country).toBe("Morocco");
      expect(result?.address.country_code).toBe("ma");
      expect(result?.place_id).toBe(274975656);
      expect(result?.display_name).toContain("Morocco");
    });
  });
});
