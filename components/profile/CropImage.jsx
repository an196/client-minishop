import 'react-image-crop/dist/ReactCrop.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import { FileUploader } from 'react-drag-drop-files';
import { DropImageArea } from '~/components';
import { dataURLtoFile} from '~/helper/convertImage';

const TYPE_FILE = ['JPG', 'PNG', 'GIF', 'WEBP'];

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: '%',
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight,
		),
		mediaWidth,
		mediaHeight,
	);
}

function CropImage() {
	const [src, setSrc] = useState(null);
	const [crop, setCrop] = useState();
	const [aspect, setAspect] = useState(1 / 1)
	const [croppedImageUrl, setCroppedImageUrl] = useState(null);
	let imageRef = useRef();

	const onSelectFile = (file) => {
		if (file) {
			const reader = new FileReader();
			reader.addEventListener('load', () => setSrc(reader.result));
			reader.readAsDataURL(file);
		}
	};

	// If you setState the crop in here you should return false.
	const onImageLoaded = (e) => {
		if (aspect) {
			const { width, height } = e.currentTarget
			setCrop(centerAspectCrop(width, height, aspect))
		  }
	};

	const onCropComplete = (crop) => {
		makeClientCrop(crop);
	};

	const onCropChange = (crop, percentCrop) => {
		// You could also use percentCrop:
		// setState( percentCrop );
		setCrop(crop);
	};


	
	async function makeClientCrop(crop) {
		if (imageRef && crop.width && crop.height) {
			const base64Image = getCroppedImg(imageRef.current, crop, );
			 var file = dataURLtoFile(base64Image, 'newFile.jpeg');
    	console.log(file);
		}
	}

	function getCroppedImg(image, crop, fileName) {
		const canvas = document.createElement('canvas');
		const pixelRatio = window.devicePixelRatio;
		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;
		const ctx = canvas.getContext('2d');

		canvas.width = crop.width * pixelRatio * scaleX;
		canvas.height = crop.height * pixelRatio * scaleY;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = 'high';


		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width * scaleX,
			crop.height * scaleY,
		);

		// As Base64 string
  		const base64Image = canvas.toDataURL('image/jpeg');
		return base64Image
	}

	const handleImageChange = (e) => {
		onSelectFile(e)
	}
	
	return (
		<div className='flex flex-row gap-4 justify-center items-center'>
			<FileUploader handleChange={handleImageChange} children={<DropImageArea />} types={TYPE_FILE} />
			{src && (
				<div className=''>
					<ReactCrop
						src={src}
						crop={crop}
						ruleOfThirds
						onImageLoaded={onImageLoaded}
						onComplete={onCropComplete}
						onChange={onCropChange}
						circularCrop={true}
						centerAspectCrop={centerAspectCrop}
					>
						<img
							ref={imageRef}
							alt='Crop me'
							src={src}
							onLoad={onImageLoaded}
						/>
					</ReactCrop>
				</div>
			)}
			{croppedImageUrl && <img alt='Crop' style={{ maxWidth: '100%' }} src={croppedImageUrl} />}
		</div>
	);
}

export default CropImage;
