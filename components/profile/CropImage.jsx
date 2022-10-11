import 'react-image-crop/dist/ReactCrop.css';
import React, { useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop';
import { FcAddImage } from 'react-icons/fc';
import { FileUploader } from 'react-drag-drop-files';

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

function DropImageArea() {
	return (
		<label className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 h-full items-center bg-slate-300  rounded-md cursor-pointer'>
			<div className='space-y-1 text-center items-center flex flex-col text-indigo-600'>
				<FcAddImage className='h-10 w-10' />
				<div className='flex text-sm text-gray-600 items-center flex-col'>
					<label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 px-2 py-1'>
						<span>Upload a file</span>
					</label>
					<p className='pl-1'>or drag and drop</p>
				</div>
				<p className='text-xs text-gray-500'>PNG, JPG, GIF</p>
			</div>
		</label>
	);
}

function CropImage() {
	const [imgSrc, setImgSrc] = useState('');
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [aspect, setAspect] = useState(1 / 1);
	const imgRef = useRef(null);
	const [rotate, setRotate] = useState(0);

	function onSelectFile(file) {
        //console.log(e.target.files)
		if (file) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener('load', () => setImgSrc(reader.result.toString() || ''));
			reader.readAsDataURL(file);
		}
	}

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	const handleImageChange = (file) => {
        onSelectFile(file)
	};

	return (
		<div className='flex flex-row gap-4'>
			<FileUploader handleChange={handleImageChange} children={<DropImageArea />} types={TYPE_FILE} />
			{imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					aspect={aspect}
					circularCrop={true}
				>
					<img
						ref={imgRef}
						alt='Crop me'
						src={imgSrc}
						style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
						onLoad={onImageLoad}
					/>
				</ReactCrop>
			)}
		</div>
	);
}

export default CropImage;
