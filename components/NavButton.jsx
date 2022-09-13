
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
	<button onClick={customFunc} style={{ color }} >
		<span style={{ background: dotColor }} />
		{icon}
	</button>
);

export default NavButton;