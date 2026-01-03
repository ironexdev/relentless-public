import { USER_IMAGE_SIZE } from '$lib/config';
import type { CropArea } from 'svelte-easy-crop';

export type ImageSize = {
	width: number;
	height: number;
};

export class ImageProcessingService {
	static async getCroppedImg(
		imageSrc: string,
		pixelCrop: CropArea,
		rotation = 0,
		targetSize: ImageSize = USER_IMAGE_SIZE
	): Promise<Blob | null> {
		const image = await this.createImage(imageSrc);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) {
			return null;
		}

		const rotRad = this.getRadianAngle(rotation);

		const { width: bBoxWidth, height: bBoxHeight } = this.rotateSize(
			image.width,
			image.height,
			rotation
		);

		canvas.width = bBoxWidth;
		canvas.height = bBoxHeight;

		ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
		ctx.rotate(rotRad);
		ctx.translate(-image.width / 2, -image.height / 2);

		ctx.drawImage(image, 0, 0);

		const croppedCanvas = document.createElement('canvas');
		const croppedCtx = croppedCanvas.getContext('2d');

		if (!croppedCtx) {
			return null;
		}

		croppedCanvas.width = targetSize.width;
		croppedCanvas.height = targetSize.height;

		croppedCtx.drawImage(
			canvas,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			targetSize.width,
			targetSize.height
		);

		return new Promise<Blob | null>((resolve) => {
			croppedCanvas.toBlob((blob) => {
				resolve(blob || null);
			}, 'image/webp');
		});
	}

	static createImage(url: string): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener('load', () => resolve(image));
			image.addEventListener('error', (error) => reject(error));
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = url;
		});
	}

	static getRadianAngle(degreeValue: number): number {
		return (degreeValue * Math.PI) / 180;
	}

	static rotateSize(
		width: number,
		height: number,
		rotation: number
	): { width: number; height: number } {
		const rotRad = this.getRadianAngle(rotation);

		return {
			width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
			height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
		};
	}
}
