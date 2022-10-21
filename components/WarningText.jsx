import React from 'react';

function WarningText({message}) {
	return (
		<p className='p-1 text-[13px] font-light  text-orange-500'>
			{message}
		</p>
	);
}

export default WarningText;
