const UserController = require("../controllers/user");
const User = require("../db/models/user");

jest.mock("../db/models/user", () => {
//   const mockFindById = jest.fn();
//   return {
//     query: () => ({ findById: mockFindById }),
//   };
const mockInsert = jest.fn();
  const mockFindById = jest.fn();

  return {
    query: () => ({
      insert: mockInsert,
      findById: mockFindById,
    }),
  };
});

describe("UserController", () => {
  describe("getUser", () => {
    it("should get a user by ID", async () => {
      const req = { params: { id: 1 } };
      const mockUser = { id: 1, name: "Test User" };
      User.query().findById.mockResolvedValue(mockUser);

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await UserController.getUser(req, res);

      expect(User.query().findById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors when getting a user", async () => {
      const req = { params: { id: 1 } };
      const mockError = new Error("Database error");
      User.query().findById.mockRejectedValue(mockError);

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await UserController.getUser(req, res);
      expect(res.success).toBe(false);
    });
  });

  describe("createUser", () => {
    it("should create a user successfully", async () => {
      const req = { body: { name: "Junaid", email: "junaid@gmail.com" } };
      const mockUser = { id: 1, name: "Junaid", email: "junaid@gmail.com" };
      User.query().insert.mockResolvedValue(mockUser);
  
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await UserController.createUser(req, res);
  
      expect(User.query().insert).toHaveBeenCalledWith(req.body);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  
    it("should handle errors when creating a user", async () => {
      const req = { body: { name: "Junaid", email: "junaid@gmail.com" } };
      const mockError = new Error("Database error");
      User.query().insert.mockRejectedValue(mockError);
  
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };
      await UserController.createUser(req, res);
  
      expect(User.query().insert).toHaveBeenCalledWith(req.body);
      expect(res.success).toBe(false);
      
      consoleErrorSpy.mockRestore(); // Restore original console.error
    });
  });
  
});
