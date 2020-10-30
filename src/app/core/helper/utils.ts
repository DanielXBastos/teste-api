export default class Utils {
  // Encontra o menor valor de um pacote
  getLowestPackPrice(pack) {
    if (pack.length > 1) {
      return pack.find(p => p.fullPrice === Math.min.apply(Math, pack.map(x => x.fullPrice)));
    } else if (pack.length === 1) {
      return pack[0];
    }
  }
}
