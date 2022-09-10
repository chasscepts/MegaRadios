import Svg, { Path } from "react-native-svg";


const VectorIcon = ({ path, color, size, viewBox }) => (
  <Svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d={path}
      fill={color}
    />
  </Svg>
);

VectorIcon.defaultProps = {
  size: 24,
  color: 'gray',
  viewBox: '0 0 24 24',
};

export default VectorIcon;
