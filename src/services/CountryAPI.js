export const fetchCountrys = async () => {
  const response = await fetch('https://api.countrystatecity.in/v1/countries', {
    headers: {
      'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

