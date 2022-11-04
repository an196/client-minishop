import parse from 'html-react-parser';
function DescriptionDetail({ details }) {
	return <> {details && <>{parse(details)}</>}</>;
}
export default DescriptionDetail;
