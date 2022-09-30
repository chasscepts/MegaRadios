import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { stations } from '../utils/stations';
import bg from '../assets/images/cntrlbg.png';
import coverImage from '../assets/images/studio.jpg';
import VectorIcon from './VectorIcon';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#630101',
  },
  coverWrap: {
    position: 'relative',
    height: 70,
  },
  stationWrap: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  cover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dimmer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
  platBtnWrap: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  playBtn: {
    width: 40,
    height: 40,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A0101',
    borderRadius: 20,
  },
  rippleWrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ripple: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tag: {
    fontWeight: '900',
    fontSize: 20,
  },
  slogan: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

const lastStationIndex = stations.length - 1;

const playerStates = {
  PLAYING: 'PLAYING',
  PAUSED: 'STOPPED',
  LOADING: 'LOADING',
};

export const AudioPlayer = (() => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
    playThroughEarpieceAndroid: false
  })
  .then(() => {
    sound = new Audio.Sound();
  })
  .catch(() => {
    sound = new Audio.Sound();
  });

  let playing = false;
  let loading = false;
  let _src;
  let _onStateChange;
  /**
   * {Sound}
   */
  let sound;

  const play = () => new Promise((resolve, reject) => {
    if (!_src) {
      reject(new Error('Player not loaded!'));
      return;
    }
    if (_onStateChange) {
      _onStateChange({ state: playerStates.LOADING });
    }
    sound.loadAsync({ uri: _src })
      .then(() => sound.playAsync())
      .then(() => {
        playing = true;
        if (_onStateChange) {
          _onStateChange({ state: playerStates.PLAYING });
        }
        resolve();
      })
      .catch((err) => reject(err));
  });

  const stop = () => new Promise((resolve, reject) => {
    sound.stopAsync()
      .then(() => sound.unloadAsync())
      .then(() => {
        playing = false;
        if (_onStateChange) {
          _onStateChange({ state: playerStates.PAUSED });
        }
        resolve();
      })
      .catch((err) => reject(err));
  });

  return {
    play: () => {
      if (!_src || playing) return;
      play();
    },
    stop: () => {
      if (!(_src && playing)) return;
      stop();
    },
    /**
     * @param {string} src
     */
    load: (src) => {
      return new Promise((resolve, reject) => {
        if (loading) {
          reject(new Error('Please wait for previous load request to finish!'));
          return;
        }

        loading = true;
        _src = src;

        if (playing) {
          stop()
            .then(() => play())
            .then(() => {
              loading = false;
              resolve();
            })
            .catch((err) => {
              loading = false();
              reject(err);
            })
        } else {
          loading = false;
          resolve();
        }
      });
    },
    /**
     * @param {EventListener} callback
     */
    set onStateChange(callback) {
      _onStateChange = callback;
    },
    /**
     * @param {EventListener} callback
     */
    set onError(callback) {
      _onError = callback;
    },
  };
})();


const RippleView = ({ delay, backgroundColor }) => {
  const scale = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const scaleConfig = {
    toValue: 1,
    duration: 2000,
    easing: Easing.linear,
    useNativeDriver: true,
  };
  const opacityConfig = {
    toValue: 0,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  };

  if (delay) {
    scaleConfig.delay = delay;
    opacityConfig.delay = delay;
  }

  Animated.loop(
    Animated.parallel([
      Animated.timing(scale, scaleConfig),
      Animated.timing(opacity, opacityConfig),
    ]),
  ).start();

  return (
    <View style={[styles.rippleWrap, { backgroundColor: 'transparent' }]}>
      <Animated.View
        style={[
          styles.ripple,
          { transform: [{ scale }], opacity, backgroundColor }
        ]}
      />
    </View>
  );
};

RippleView.defaultProps = {
  delay: 0,
};

const PlayButton = ({ status, onClick }) => {
  if (status === playerStates.LOADING) {
    return (
      <View
        style={[
          styles.playBtn,
          { backgroundColor: 'transparent' }
        ]}
      >
        <RippleView backgroundColor="#a42525" />
        <RippleView delay={2500} backgroundColor="#f34444" />
        <RippleView delay={1500} backgroundColor="#c93333" />
      </View>
    );
  }

  const path = status === playerStates.PLAYING ? 'M18,18H6V6H18V18Z' : 'M8,5.14V19.14L19,12.14L8,5.14Z';

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.playBtn}>
        <VectorIcon path={path} color="#fff" size={16} />
      </View>
    </TouchableOpacity>
  );
};

const NavButton = ({ isNext, disabled, onClick }) => {
  const path = isNext ? 'M4,5V19L11,12M18,5V19H20V5M11,5V19L18,12' : 'M20,5V19L13,12M6,5V19H4V5M13,5V19L6,12';

  if (disabled) {
    return <VectorIcon path={path} color="gray" size={24} />;
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <VectorIcon path={path} color="#fff" size={24} />
    </TouchableOpacity>
  );
};

/**
 * @param {Object} props
 * @param {Object} props.station
 * @param {string} props.station.id
 * @param {string} props.station.name
 * @param {string} props.station.slogan
 * @param {string} props.station.tag
 * @param {string} props.station.streamUrl
 * @param {string} props.station.color1
 * @param {string} props.station.color2
 * @param {string} props.station.twitterId
 * @param {string} props.station.logo
 */
const AudioPlayerView = ({ station, setStation }) => {
  const [status, setStatus] = useState(playerStates.PAUSED);

  useEffect(() => {
    AudioPlayer.onStateChange = (({ state }) => {
      setStatus(state);
    });
  });

  if (!station) {
    return (
      <View style={{ backgroundColor: '#3A0101', padding: 5 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>No Station Selected</Text>
      </View>
    );
  }

  const currentIndex = stations.indexOf(station);

  const handPlayClick = () => {
    if (status === playerStates.PLAYING) {
      AudioPlayer.stop();
    } else {
      AudioPlayer.play();
    }
  };

  const next = () => {
    const temp = currentIndex + 1;
    if (temp > lastStationIndex) return;
    setStation(stations[temp]);
  };

  const previous = () => {
    const temp = currentIndex - 1;
    if (temp < 0) return;
    setStation(stations[temp]);
  };

  const textStyle = { color: station.color2 };

  return (
    <ImageBackground style={styles.container} source={bg} resizeMode="cover">
      <ImageBackground
        style={styles.coverWrap}
        imageStyle={{ borderRadius: 10 }}
        source={coverImage}
        resizeMode="stretch"
      >
        <View style={[styles.dimmer, { backgroundColor: `${station.color1}80` }]} />
        <View style={styles.stationWrap}>
          <View>
            <Text style={[styles.tag, textStyle]}>{station.tag}</Text>
          </View>
          <View>
            <Text style={[styles.slogan, textStyle]}>{station.slogan}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.controls}>
        <NavButton disabled={currentIndex === 0} onClick={previous} />
        <View style={styles.platBtnWrap}>
          <PlayButton status={status} onClick={handPlayClick} />
        </View>
        <NavButton disabled={currentIndex === lastStationIndex} onClick={next} isNext />
      </View>
    </ImageBackground>
  );
};

export default AudioPlayerView;
