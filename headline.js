// URL of the JSON data
const url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news';

// Fetch the JSON data from the URL
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Extract the headline from the first article
    const headline = data.articles[0].headline;
    console.log(headline);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });