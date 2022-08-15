// Data for first autocomplete(data.json - country list with country names/codes)
interface ICountry {
  name: string;
  code: string;
}
export const filterMockData = <T extends ICountry>(value: string, data: Array<T>) => {
  let res = (value.length > 0)
    ? data.sort().filter((v: T) => (new RegExp(`^${value}`, 'i')).test(v.name))
    : [];
  return res.map((item) => ({
    id: item.code,
    value: item.name,
  }));
}

// Data for second autocomplete(loaded from my prev project - returns a list of
// cities with states)
const api = {
  host: 'https://fabalist.com/api/',
  searchUrl: 'geosearch',
  searchUrlParams: 'searchText=',
};
const searchApiUrl = api.host + api.searchUrl + '?' + api.searchUrlParams; 

interface ICity {
  sublabel: string;
  label: string;
  id: number,
}
// Data has a special shape for prev project architecture, so we should normalize it a little
export const filterApiData = <T extends ICity>(value: string, data: any) => {
  return data.cities.items.map((item: T) => ({
    id: item.id,
    value: item.label + ', ' + item.sublabel,
  }));
}
export const getFilterApiUrl = (value: string) => searchApiUrl + value;