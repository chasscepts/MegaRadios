import AsyncStorage from '@react-native-async-storage/async-storage';
import beatAbjLogo from '../assets/images/beatabjlogo.png';
import beatIbLogo from '../assets/images/beatiblogo.png';
import beatLagLogo from '../assets/images/beatlaglogo.png';
import beatLndLogo from '../assets/images/beatlndlogo.png';
import classicAbjLogo from '../assets/images/classicabjlogo.png';
import classicLagLogo from '../assets/images/classiclaglogo.png';
import classicPhLogo from '../assets/images/classicphlogo.png';
import lagosTalksLogo from '../assets/images/lagostalkslogo.png';
import naijaIbLogo from '../assets/images/naijaiblogo.png';
import naijaLagLogo from '../assets/images/naijalaglogo.png';
import naijaPhLogo from '../assets/images/naijaphlogo.png';

export const stations = [
  {
    id: "mega_0001",
    name: "The Beat FM Lagos",
    slogan: "The Heart Beat Of Lagos",
    tag: "The Beat 99.9 FM Lagos",
    streamUrl: "http://beatfmlagos.atunwadigital.streamguys1.com/beatfmlagos",
    color1: "#E70F0F",
    color2: "#FFFFFF",
    twitterId: "52833129",
    logo: beatLagLogo,
  },
  {
    id: "mega_0002",
    name: "Naija FM Lagos",
    slogan: "Na We Radio",
    tag: "Naija FM 102.7 Lagos",
    streamUrl: "http://naijafmlagos.atunwadigital.streamguys1.com/naijafmlagos",
    color1: "#1DAF24",
    color2: "#FFFFFF",
    twitterId: "338301147",
    logo: naijaLagLogo,
  },
  {
    id: "mega_0003",
    name: "Classic FM Lagos",
    slogan: "The Station That Plays Every Song You Know",
    tag: "Classic 97.3 FM Lagos",
    streamUrl: "http://classicfmlagos.atunwadigital.streamguys1.com/classicfmlagos",
    color1: "#D1A460",
    color2: "#191663",
    twitterId: "140767456",
    logo: classicLagLogo,
  },
  {
    id: "mega_0004",
    name: "The Beat FM Ibadan",
    slogan: "The Heart Beat Of Ibadan",
    tag: "The Beat 97.9 FM Ibadan",
    streamUrl: "http://beatfmibadan.atunwadigital.streamguys1.com/beatfmibadan",
    color1: "#E70F0F",
    color2: "#FFFFFF",
    twitterId: "1051201818",
    logo: beatIbLogo,
  },
  {
    id: "mega_0005",
    name: "Naija FM Ibadan",
    slogan: "Na We Radio",
    tag: "Naija FM 102.7 Ibadan",
    streamUrl: "http://naijafmibadan.atunwadigital.streamguys1.com/naijafmibadan",
    color1: "#1DAF24",
    color2: "#FFFFFF",
    twitterId: "2425843537",
    logo: naijaIbLogo,
  },
  {
    id: "mega_0006",
    name: "The Beat FM London",
    slogan: "The Beat Of Your City",
    tag: "The Beat London 103.6 FM",
    streamUrl: "http://stream.zeno.fm/x59sz6hkev8uv",
    color1: "#E70F0F",
    color2: "#FFFFFF",
    twitterId: "27435509",
    logo: beatLndLogo,
  },
  {
    id: "mega_0007",
    name: "Lagos Talks FM",
    slogan: "Let's Get Talking",
    tag: "Lagos Talks 91.3FM",
    streamUrl: "http://lagostalks.atunwadigital.streamguys1.com/lagostalks",
    color1: "#EE2FD3",
    color2: "#115185",
    twitterId: "4923813761",
    logo: lagosTalksLogo,
  },
  {
    id: "mega_0008",
    name: "The Beat FM PortHarcourt",
    slogan: "The Heart Beat Of PortHarcourt",
    tag: "The Beat 99.9 FM PortHarcourt",
    streamUrl: "http://beatfmph.atunwadigital.streamguys1.com/beatfmph",
    color1: "#E70F0F",
    color2: "#FFFFFF",
    twitterId: "821379957410725889",
    logo: beatLagLogo,
  },
  {
    id: "mega_0009",
    name: "Naija FM PortHarcourt",
    slogan: "Na We Radio",
    tag: "Naija FM 92.7 PortHarcourt",
    streamUrl: "http://naijafmph.atunwadigital.streamguys1.com/naijafmph",
    color1: "#1DAF24",
    color2: "#FFFFFF",
    twitterId: "829223802949214208",
    logo: naijaPhLogo,
  },
  {
    id: "mega_0010",
    name: "Classic FM PortHarcourt",
    slogan: "The Station That Plays Every Song You Know",
    tag: "Classic 91.1 FM PortHarcourt",
    streamUrl: "http://classicfmph.atunwadigital.streamguys1.com/classicfmph",
    color1: "#D1A460",
    color2: "#191663",
    twitterId: "803512331762331648",
    logo: classicPhLogo,
  },
  {
    id: "mega_0011",
    name: "The Beat FM Abuja",
    slogan: "The Heart Beat Of Abuja",
    tag: "The Beat 97.9 FM Abuja",
    streamUrl: "http://beatfmabuja.atunwadigital.streamguys1.com/beatfmabuja",
    color1: "#E70F0F",
    color2: "#FFFFFF",
    twitterId: "842270260862545920",
    logo: beatAbjLogo,
  },
  {
    id: "mega_0012",
    name: "Classic FM Abuja",
    slogan: "The Station That Plays Every Song You Know",
    tag: "Classic 94.3 FM Abuja",
    streamUrl: "http://classicfmabuja.atunwadigital.streamguys1.com/classicfmabuja",
    color1: "#D1A460",
    color2: "#191663",
    twitterId: "965967622285164544",
    logo: classicAbjLogo,
  },
];

const stationsManager = (() => {
  const LAST_PLAYED_STORAGE_KEY = 'USER_LAST_PLAYED';
  let _lastPlayed = null;

  return {
    getLastPlayed: () => {
      if (_lastPlayed) {
        return Promise.resolve(_lastPlayed);
      }
      return new Promise((resolve) => {
        AsyncStorage.getItem(LAST_PLAYED_STORAGE_KEY)
          .then((id) => {
            let temp;
            if (id) {
              temp = stations.find((s) => s.id === id);
            }
            _lastPlayed = temp || stations[0];
            resolve(_lastPlayed);
          })
          .catch(() => {
            _lastPlayed = stations[0];
            resolve(_lastPlayed);
          })
      });
    },
    setLastPlayed: (station) => {
      _lastPlayed = station;
      AsyncStorage.setItem(LAST_PLAYED_STORAGE_KEY, station.id)
        .catch(() => {});
    }
  };
})();

export default stationsManager;
