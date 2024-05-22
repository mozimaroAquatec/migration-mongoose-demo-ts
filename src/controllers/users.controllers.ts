// Importing necessary modules
import ErrorResponse from "../utils/error.handler"; // Importing custom error handler
import { Request, Response } from "express"; // Importing types for Express request and response
import Users from "../models/users.model"; // Importing Helioss model
import {} from "../utils/schemas/energies.shema";
import { SuccessResponse } from "../utils/success.response";
import { createUserSchema } from "../utils/schemas/users.shema";
import { usersLoggers } from "../logging";
/**
 * @desc Creates a new user.
 * @param {Request} req The HTTP request object containing user data in the request body.
 * @param {Response} res The HTTP response object used to send the response.
 * @returns {Promise<void>} A Promise that resolves when the user creation is complete.
 * @method POST
 * @access PUBLIC
 */

export const createUser = async (req: Request, res: Response) => {
  try {
    // Extract username from request body
    const { username } = req.body as { username: string };
    // Validating input data from client
    const { error } = createUserSchema(req.body);
    if (error)
      return res
        .status(400)
        .json(new ErrorResponse(400, `${error.details[0].message}`));
    // Log user creation success
    usersLoggers.info(
      { method: "POST", status: 201 },
      "user created successfully"
    );
    // Respond with success message
    await Users.create({ username });

    return res
      .status(201)
      .json(new SuccessResponse(201, "user created successfully"));
  } catch (error) {
    // Handle errors
    res.status(500).json(new ErrorResponse(500, "Internal server error"));
    usersLoggers.error(error, `create user error: ${error}`);
    throw new ErrorResponse(500, `create user error: ${error}`);
  }
};

/**
 * @desc  Controller function to get all users
 * @param GET /
 * @param PUBLIC
 **/
export const getUsers = async function (req: Request, res: Response) {
  try {
    // get all users from db
    const users = await Users.find();

    usersLoggers.info({ method: "GET", status: 200 }, "get users success");
    return res
      .status(200)
      .json(new SuccessResponse(200, "get users success", { users }));
  } catch (error) {
    // Handle errors
    res.status(500).json(new ErrorResponse(500, "Internal server error"));
    usersLoggers.error(error, `get users error: ${error}`);
    throw new ErrorResponse(500, `getUsers : ${error}`);
  }
};
/**
 * @desc  Controller function to handle getting all energies
 * @param DELETE
 * @param PUBLIC
 **/
export const deleteUsers = async function (req: Request, res: Response) {
  try {
    await Users.deleteMany();

    usersLoggers.info(
      { method: "DELETE", status: 200 },
      "users deleted successfully"
    );

    return res
      .status(200)
      .json(new SuccessResponse(200, "users deleted successfully"));
  } catch (error) {
    // Handle errors
    res.status(500).json(new ErrorResponse(500, "Internal server error"));
    usersLoggers.error(error, `delete users error: ${error}`);
    throw new ErrorResponse(500, `deleteUsers : ${error}`);
  }
};

/**
 * @desc  Controller function to handle getting all energies
 * @param DELETE /
 * @param PUBLIC
 **/
export const thorwUserError = async function (req: Request, res: Response) {
  try {
    // Query the database for all Energies records

    usersLoggers.error(
      new ErrorResponse(400, "user error example"),
      "user error example"
    );
    return res.status(200).json(new SuccessResponse(200, "user error example"));
  } catch (error) {
    // Handle errors
    res.status(500).json(new ErrorResponse(500, "Internal server error"));
    usersLoggers.error(error, `thorwUserError: ${error}`);
    throw new ErrorResponse(500, `thorwUserError : ${error}`);
  }
};
