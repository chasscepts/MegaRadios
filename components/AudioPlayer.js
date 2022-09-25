import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import {
  Image,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3A0101',
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
};

const Player = (() => {
  let playing = false;
  let loaded = false;
  let loading = false;
  let _onError = (err) => console.log(err);
  let _onStateChange;
  const sound = new Audio.Sound();

  const play = () => {
    sound.playAsync()
      .then(() => {
        playing = true;
        if (_onStateChange) {
          _onStateChange({ state: playerStates.PLAYING });
        }
      })
      .catch((err) => _onError(err));
  };

  const stop = () => {
    sound.stopAsync()
      .then(() => {
        playing = false;
        if (_onStateChange) {
          _onStateChange({ state: playerStates.PAUSED });
        }
      })
      .catch((err) => _onError(err));
  };

  const loadSrc = (src) => {
    sound.loadAsync({ uri: src })
      .then(() => {
        loaded = true;
        if (playing) {
          play();
        }
        loading = false;
      })
      .catch((err) => {
        loading = false;
        _onError(err);
      });
  }

  return {
    play: () => {
      if (!loaded || playing) return;
      play();
    },
    stop: () => {
      if (!(loaded && playing)) return;
      stop();
    },
    /**
     * @param {string} src
     */
    set  src (src) {
      if (loading) return;
      loading = true;
      if (loaded) {
        sound.unloadAsync()
          .then(() => loadSrc(src))
          .catch((err) => {
            _onError(err);
            loading = false;
          });
      } else {
        loadSrc(src);
      }
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

const PlayButton = ({ isStop, onClick }) => {
  const path = isStop ? 'M18,18H6V6H18V18Z' : 'M8,5.14V19.14L19,12.14L8,5.14Z';

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
    return <VectorIcon path={path} color="gray" size={16} />;
  }

  return (
    <TouchableOpacity onPress={onClick}>
      <VectorIcon path={path} color="#fff" size={16} />
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
const AudioPlayer = ({ station, setStation }) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    Player.onStateChange = (({ state }) => {
      setPlaying(state === playerStates.PLAYING);
    });
  });

  useEffect(() => {
    if (station) {
      Player.src = station.streamUrl;
    }
  }, [station]);

  if (!station) {
    return (
      <View>
        <Text>No Station Selected</Text>
      </View>
    );
  }

  const currentIndex = stations.indexOf(station);

  const handPlayClick = () => {
    if (playing) {
      Player.stop();
    } else {
      Player.play();
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
          <PlayButton isStop={playing} onClick={handPlayClick} />
        </View>
        <NavButton disabled={currentIndex === lastStationIndex} onClick={next} isNext />
      </View>
    </ImageBackground>
  );
};

export default AudioPlayer;
