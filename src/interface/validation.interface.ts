/* eslint-disable prettier/prettier */
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