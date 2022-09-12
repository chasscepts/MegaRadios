import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import stationsManager, { stations } from "../utils/stations";

const styles = StyleSheet.create({
  stationPanel: {
    position: 'relative',
    backgroundColor: '#fff',
    marginBottom: 7,
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: { height: 1, width: 0.3 },
  },
  stationPanelInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  indicatorWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
  indicator: {
    backgroundColor: '#145b28',
    color: 'fff',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Roboto',
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 3,
  },
  textWrap: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 10,
    paddingTop: 10,
  },
  tag: {
    fontWeight: '700',
  },
  slogan: {
    fontWeight: '700',
    fontSize: 10,
    marginTop: 5,
  },
});

/**
 * @param {Object} props
 * @param {boolean} props.isActive
 * @param {Function} props.onClick
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
const StationPanel = ({ station, isActive, onClick }) => {
  const handleClick = () => {
    if (isActive) {
      return;
    }
    onClick(station);
  };

  return (
    <TouchableOpacity
      onPress={handleClick}
    >
      <View style={styles.stationPanel}>
        <View style={styles.stationPanelInner}>
          <Image style={styles.logo} source={station.logo} />
          <View style={styles.textWrap}>
            <Text style={styles.tag}>{station.tag}</Text>
            <Text style={styles.slogan}>{station.slogan}</Text>
          </View>
        </View>
        {isActive && (
          <View style={styles.indicatorWrap}>
            <Text style={styles.indicator}>Now Playing</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const StationsPanel = ({ station, onStationChange }) => {
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    stationsManager.getLastPlayed()
      .then((station) => {
        onStationChange(station);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (station) {
      setSelectedId(station.id);
    }
  }, [station]);

  const handleSelection = (station) => {
    onStationChange(station);
    stationsManager.setLastPlayed(station);
  };

  return (
    <FlatList
      data={stations}
      extraData={selectedId}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StationPanel isActive={item.id === selectedId} station={item} onClick={handleSelection} />}
    />
  );
};

export default StationsPanel;
