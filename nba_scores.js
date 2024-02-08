async function fetchData() {
    const url = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
  
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const scoresBody = document.getElementById('scoresBody');
        scoresBody.innerHTML = ''; // Clear previous content
        data.events.forEach(event => {
          const shortName = event.shortName;
          const homeTeamScore = event.competitions[0].competitors[0].score;
          const awayTeamScore = event.competitions[0].competitors[1].score;
          const shortDetail = event.status.type.description.trim(); // Trim whitespace
          
          console.log(shortDetail); // Log game status to verify
          
          const row = scoresBody.insertRow();
          const shortNameCell = row.insertCell();
          const homeScoreCell = row.insertCell();
          const awayScoreCell = row.insertCell();
          const detailCell = row.insertCell();
          
          shortNameCell.textContent = shortName;
          homeScoreCell.textContent = homeTeamScore;
          awayScoreCell.textContent = awayTeamScore;
          detailCell.textContent = shortDetail;
        });
      } else {
        console.log("Failed to retrieve data from the API endpoint.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  fetchData();
  