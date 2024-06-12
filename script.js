document.addEventListener("DOMContentLoaded", function() {
    const diceA = document.getElementById("diceA");
    const diceB = document.getElementById("diceB");
    const diceC = document.getElementById("diceC");
    const winnerDiv = document.getElementById("winner");
    const rollButton = document.getElementById("roll-button");

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function getResults() {
        const scoreA = rollDice();
        const scoreB = rollDice();
        const scoreC = rollDice();

        diceA.textContent = scoreA;
        diceB.textContent = scoreB;
        diceC.textContent = scoreC;

        return [scoreA, scoreB, scoreC];
    }

    function displayResults(scores) {
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const scoreCount = scores.reduce((acc, score) => {
            acc[score] = (acc[score] || 0) + 1;
            return acc;
        }, {});

        diceA.className = 'dice';
        diceB.className = 'dice';
        diceC.className = 'dice';

        if (scoreCount[maxScore] > 1) {
            if (scores[0] === maxScore) diceA.classList.add('blue');
            if (scores[1] === maxScore) diceB.classList.add('blue');
            if (scores[2] === maxScore) diceC.classList.add('blue');
        } else {
            if (scores[0] === maxScore) diceA.classList.add('green');
            if (scores[1] === maxScore) diceB.classList.add('green');
            if (scores[2] === maxScore) diceC.classList.add('green');

            if (scoreCount[minScore] > 1) {
                if (scores[0] === minScore) diceA.classList.add('blue');
                if (scores[1] === minScore) diceB.classList.add('blue');
                if (scores[2] === minScore) diceC.classList.add('blue');
            } else {
                if (scores[0] === minScore) diceA.classList.add('red');
                if (scores[1] === minScore) diceB.classList.add('red');
                if (scores[2] === minScore) diceC.classList.add('red');
            }
        }

        const secondMaxScore = Math.max(...scores.filter(score => score !== maxScore));
        if (scoreCount[secondMaxScore] > 1 || secondMaxScore !== minScore) {
            if (scores[0] === secondMaxScore) diceA.classList.add('yellow');
            if (scores[1] === secondMaxScore) diceB.classList.add('yellow');
            if (scores[2] === secondMaxScore) diceC.classList.add('yellow');
        }

        if (scoreCount[maxScore] > 1) {
            winnerDiv.textContent = "It's a draw!";
        } else {
            const winnerIndex = scores.indexOf(maxScore);
            const winnerNames = ["Member A", "Member B", "Member C"];
            winnerDiv.textContent = `${winnerNames[winnerIndex]} wins!`;
        }
    }

    rollButton.addEventListener("click", function() {
        const scores = getResults();
        displayResults(scores);
    });
});
