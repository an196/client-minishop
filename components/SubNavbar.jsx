import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SubNavbar() {
	const [screenSize, setScreenSize] = useState();
	const [activeSubNavbar, setActiveSubNavbar] = useState(false);
	const router = useRouter();
	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (screenSize <= 1279) {
			setActiveSubNavbar(true);
		} else {
			setActiveSubNavbar(false);
		}
	}, [screenSize]);

	return (
		<div>
			{activeSubNavbar ? (
				<div className='flex space-x-6 -mt-3 mb-3 items-center justify-center font-extrabold sm:hidden'>
					<Link href={`/`}>
						<span
							className={
								router.pathname === '/'
									? `text-2xl nav-bar-item-active`
									: 'cursor-pointer nav-bar-item text-gray-700 text-2xl'
							}
						>
							Home
						</span>
					</Link>
					<Link href={`/category/1`}>
						<span
							className={
								router.query?.slug === '1'
									? `text-2xl nav-bar-item-active`
									: 'nav-bar-item text-gray-700 text-2xl'
							}
						>
							Earphone
						</span>
					</Link>
					<Link href={`/category/2`}>
						<span
							className={
								router.query?.slug === '2'
									? `text-2xl nav-bar-item-active`
									: 'nav-bar-item text-gray-700 text-2xl'
							}
						>
							Home
						</span>
					</Link>
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

export default SubNavbar;
