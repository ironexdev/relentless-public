import sharp from 'sharp';
import { USER_IMAGE_SIZE, IMAGE_FORMAT, OPTIMIZED_IMAGE_QUALITY } from '$lib/config';
import { logger } from '$lib/server/logger';

export class ImageProcessingService {
	static async processUserImage(buffer: Buffer): Promise<Buffer | null> {
		const sharpImage = sharp(buffer);
		const sharpMetadata = await sharpImage.metadata();

		if (
			sharpMetadata.height !== USER_IMAGE_SIZE.height ||
			sharpMetadata.width !== USER_IMAGE_SIZE.width ||
			sharpMetadata.format !== IMAGE_FORMAT
		) {
			logger.warn({
				msg: 'Received image does not match the required dimensions. User probably bypassed the frontend validation.',
				receivedDimensions: {
					height: sharpMetadata.height,
					width: sharpMetadata.width,
					format: sharpMetadata.format
				},
				requiredDimensions: {
					height: USER_IMAGE_SIZE.height,
					width: USER_IMAGE_SIZE.width,
					format: IMAGE_FORMAT
				}
			});
			return null;
		}

		return sharpImage
			.toFormat(IMAGE_FORMAT, {
				quality: OPTIMIZED_IMAGE_QUALITY
			})
			.toBuffer();
	}

	static async processAndResizeUserImage(buffer: Buffer): Promise<Buffer | null> {
		try {
			return await sharp(buffer)
				.resize(USER_IMAGE_SIZE.width, USER_IMAGE_SIZE.height, {
					fit: 'cover',
					position: 'center'
				})
				.toFormat(IMAGE_FORMAT, {
					quality: OPTIMIZED_IMAGE_QUALITY
				})
				.toBuffer();
		} catch (error) {
			logger.error({
				msg: 'Failed to process and resize user image',
				error
			});
			return null;
		}
	}

	static async validateUserImage(buffer: Buffer): Promise<boolean> {
		try {
			const metadata = await sharp(buffer).metadata();

			return (
				metadata.height === USER_IMAGE_SIZE.height &&
				metadata.width === USER_IMAGE_SIZE.width &&
				metadata.format === IMAGE_FORMAT
			);
		} catch {
			return false;
		}
	}
}
