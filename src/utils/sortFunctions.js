export const sortTickets = (array, sortWay) => {
  if (sortWay === 'low-cost') {
    array = array.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }
  if (sortWay === 'fast') {
    const flyTime = (flight) => {
      return parseFloat(flight.segments[0].duration) + parseFloat(flight.segments[1].duration);
    };
    array = array.sort((a, b) => flyTime(a) - flyTime(b));
  }
  if (sortWay === 'optimal') {
    const optimalRate = (flight) => {
      return (
        parseFloat(flight.segments[0].duration) +
        parseFloat(flight.segments[1].duration) +
        parseFloat(flight.price) / 100 -
        parseFloat(flight.segments[0].stops.length) * 100 -
        parseFloat(flight.segments[1].stops.length) * 100
      );
    };
    array = array.sort((a, b) => optimalRate(a) - optimalRate(b));
  }
  return array;
};

export const filterTickets = (array, filters) => {
  if (filters.includes('all') || filters.length === 5) return array;
  if (filters.includes('no-transfer')) {
    array = array.filter((item) => item.segments[0].stops.length === 0 && item.segments[1].stops.length === 0);
  }
  if (filters.includes('one-transfer')) {
    array = array.filter((item) => item.segments[0].stops.length === 1 && item.segments[1].stops.length === 1);
  }
  if (filters.includes('two-transfers')) {
    array = array.filter((item) => item.segments[0].stops.length === 2 && item.segments[1].stops.length === 2);
  }
  if (filters.includes('three-transfers')) {
    array = array.filter((item) => item.segments[0].stops.length === 3 && item.segments[1].stops.length === 3);
  }
  return array;
};
