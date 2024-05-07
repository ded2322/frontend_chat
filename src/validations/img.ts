export function getImageExtension(imagePath: any) {
	const standardExtensions = ["png", "jpg", "webp", "jpeg"];
	
	const extension = imagePath.split('.').pop();

	if (standardExtensions.includes(extension)) {
			return true;
	} else {
			return false;
	}
}

