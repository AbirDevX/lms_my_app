/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface CustomValidationError {
    field: string;
    message: string;
}

export interface CustomValidationResponse {
    success: boolean;
    message: string;
    data: CustomValidationError[];
    status_code: number;
}
export interface AuthenticatedRequest extends Request {
    user: {
        sub: number;
        created_at: Date;
    };
}