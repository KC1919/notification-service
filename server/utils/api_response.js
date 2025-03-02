export const successResponse = (res, statusCode, message, data) => {
    try {
        return res.status(statusCode).json({
            message: message,
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

export const errorResponse = (res, message, statusCode = 400, error = null) => {
    try {
        return res.status(statusCode).json({ success: false, message, error });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}