/* eslint-disable prettier/prettier */

import { ValidationError } from "@nestjs/common";
import { CustomValidationError } from "src/common/interface/validation.interface";

export function flattenValidationErrors(errors: ValidationError[], parentPath = ''): CustomValidationError[] {
    const result: CustomValidationError[] = [];

    errors.forEach((error) => {
        const fieldPath = parentPath ? `${parentPath}.${error.property}` : error.property;

        // Add constraint errors
        if (error.constraints) {
            Object.values(error.constraints).forEach((message) => {
                result.push({
                    field: fieldPath,
                    message: `${message}*`
                });
            });
        }

        // Handle nested objects recursively
        if (error.children && error.children.length > 0) {
            result.push(...flattenValidationErrors(error.children, fieldPath));
        }
    });

    return result;
}