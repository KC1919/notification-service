import { errorResponse } from "../utils/api_response.js";

const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error:", err.stack); // Log the full error for debugging

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    errorResponse(res, message, statusCode, err)
};

export default errorHandler;
