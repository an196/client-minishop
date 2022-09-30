import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStateContext } from '~/context/StateContext';

function SubNavbar() {
	const [screenSize, setScreenSize] = useState();
	const [activeSubNavbar, setActiveSubNavbar] = useState(true);
	const router = useRouter();
	const { categories, setCategories } = useStateContext();

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

	console.log(categories)
	return (
		<div>
			<div className='flex space-x-6 -mt-3 mb-3 items-center justify-center font-extrabold md:hidden'>
				{categories?.map((category, _index) => (
					<Link href={`/category/${category.code}`} key={_index}>
						<span
							className={
								router.query?.slug === category.code
									? `text-2xl nav-bar-item-active xl:hidden`
									: 'cursor-pointer nav-bar-item text-gray-700 text-2xl'
							}
						>
							{category.name}
						</span>
					</Link>
				))}
			</div>
		</div>
	);
}

export default SubNavbar;
