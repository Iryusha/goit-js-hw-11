export function fetchCountries (name) {
  let page = 1;
  let limit = 40;

  const params = new URLSearchParams({
    page: page,
    per_page: limit,
  });

  const url = `https://pixabay.com/api/?key=25798215-b5224b890c985f6c53280bcb2&q=${name}&${params}&image_type=photo&orientation=horizontal&safesearch=true`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      page += 1;
      return countries;
    });
}
