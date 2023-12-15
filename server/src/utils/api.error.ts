export class ApiError extends Error {

    constructor(
        public readonly status: number,
        public readonly message: string,
    ) {
        super(message);
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }
    
    static unauthorized() {
        return new ApiError(401, `You are not authorized`);
    }
    
    static forbidden(message: string = 'You don\'t have access') {
        return new ApiError(403, message);
    }

    static notFound(message: string = 'Resource not found') {
        return new ApiError(404, message);
    }

}