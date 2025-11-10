import fs from 'node:fs/promises';
import path from 'node:path';

export default class FileSystemService {
	// Throws an error if the file does not exist
	static async readFile(path: string): Promise<string> {
		return fs.readFile(path, 'utf-8');
	}

	// Resolves paths consistently between environments
	// If `dist` is part of the current `__dirname`, it assumes the application
	// is running from the `dist` folder and appends `dist` to `process.cwd()`.
	// Otherwise, it uses `process.cwd()` and appends `src`.
	static resolvePath(relativePath: string): string {
		const isInDist = __dirname.includes(path.join('dist'));

		// Determine the base directory based on runtime environment
		const basePath = isInDist
			? path.join(process.cwd(), 'dist') // Add `dist` for
			: path.join(process.cwd(), 'src'); // Add src

		// Resolve and return the full path
		return path.join(basePath, relativePath);
	}
}
