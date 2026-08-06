import React from 'react';
import { View } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

interface TulipIconProps {
  size?: number;
  color?: string;
  style?: any;
}

export const TulipIcon: React.FC<TulipIconProps> = ({
  size = 24,
  color = '#8b5cf6',
  style,
}) => {
  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        <G>
          <Path
            d="M50 10 C45 25, 35 35, 30 45 C25 55, 30 65, 40 70 C45 72, 48 70, 50 65 C52 70, 55 72, 60 70 C70 65, 75 55, 70 45 C65 35, 55 25, 50 10Z"
            fill={color}
          />
          <Path
            d="M50 25 C48 35, 45 40, 42 45 C40 48, 45 52, 50 50 C55 52, 60 48, 58 45 C55 40, 52 35, 50 25Z"
            fill={color}
            opacity={0.7}
          />
          <Path
            d="M50 70 L50 95"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <Path
            d="M50 80 C40 75, 30 78, 28 85 C26 88, 35 90, 50 85"
            fill={color}
            opacity={0.8}
          />
          <Path
            d="M50 85 C60 80, 70 83, 72 90 C74 93, 65 95, 50 90"
            fill={color}
            opacity={0.8}
          />
        </G>
      </Svg>
    </View>
  );
};

export default TulipIcon;
