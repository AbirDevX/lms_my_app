/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

import * as streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
    uploadFile(file: Express.Multer.File, userId: any): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: `/my-app/${userId}/avatar/`, // Optional: specify folder
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) return reject(new Error(error.message || 'Upload failed'));
                    if (!result) return reject(new Error('Upload failed - no result'));
                    resolve(result);
                },
            );
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}
