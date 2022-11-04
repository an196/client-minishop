import { useStateContext } from '../context/StateContext';
import { SuggestRowItem} from '../components';

function SuggestItemsArea() {

    const { categories } = useStateContext();
	return (
		<div className='w-full'>
			<h2 className='text-center m-12 text-[#324d67] text-[24px] font-semibold'>You may also like</h2>
			{categories && categories.length > 0
				? categories.map((_, index) => <SuggestRowItem key={index} idCategory={categories[index]?.code} />)
				: null}
		</div>
	);
}

export default SuggestItemsArea;
