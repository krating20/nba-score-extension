async function fetchData() {
    const scoreUrl = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
    const newsUrl = 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news';

    try {
        // Fetch NBA scores
        const scoreResponse = await fetch(scoreUrl);
        if (scoreResponse.ok) {
            const scoreData = await scoreResponse.json();
            const scoresBody = document.getElementById('scoresBody');
            scoresBody.innerHTML = ''; // Clear previous content
            scoreData.events.forEach(event => {
                const shortName = event.shortName;
                const homeTeamScore = event.competitions[0].competitors[0].score;
                const awayTeamScore = event.competitions[0].competitors[1].score;
                const shortDetail = event.status.type.description.trim();
                
                const row = scoresBody.insertRow();
                const shortNameCell = row.insertCell();
                const homeScoreCell = row.insertCell();
                const awayScoreCell = row.insertCell();
                const detailCell = row.insertCell();
                
                shortNameCell.textContent = shortName;
                homeScoreCell.textContent = homeTeamScore;
                awayScoreCell.textContent = awayTeamScore;
                detailCell.textContent = shortDetail;

                // Check if the game status is "Final" and bold and color the higher score in red
                if (shortDetail === "Final") {
                    if (homeTeamScore > awayTeamScore) {
                        homeScoreCell.style.fontWeight = "bold";
                        homeScoreCell.style.color = "green"; // Change text color to green
                    } else if (awayTeamScore > homeTeamScore) {
                        awayScoreCell.style.fontWeight = "bold";
                        awayScoreCell.style.color = "green"; // Change text color to green
                    }
                }
            });
        } else {
            console.log("Failed to retrieve data from the scores API endpoint.");
        }

        // Fetch NBA news
        const newsResponse = await fetch(newsUrl);
        if (newsResponse.ok) {
            const newsData = await newsResponse.json();
            const headlines = newsData.articles.map(article => article.headline);
            const randomIndex = Math.floor(Math.random() * headlines.length);
            const randomHeadline = headlines[randomIndex];
            const headlineContainer = document.getElementById('headlineContainer');
            headlineContainer.textContent = randomHeadline;
        } else {
            console.log("Failed to retrieve data from the news API endpoint.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();
