const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
    {
        'View': 'Bullish',
        'Value': {
            '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Bull Call Spread'],
            '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
            '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
        }
    },
    {
        'View': 'Bearish',
        'Value': {
            '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
            '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
            '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
        }
    },
    {
        'View': 'RangeBound',
        'Value': {
            '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Short Straddle'],
            '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
            '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
        }
    },
    {
        'View': 'Volatile',
        'Value': {
            '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
            '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
            '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
        }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const dateDropdown = document.getElementById('dateDropdown');
    const cardsContainer = document.getElementById('cardsContainer');
    const emptyState = document.getElementById('emptyState');
    let selectedView = 'Bullish';
    let selectedDate = dateArray[0];

    // Populate date dropdown
    dateArray.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateDropdown.appendChild(option);
    });

    // Handle view change
    document.querySelectorAll('.toggle input').forEach(input => {
        input.addEventListener('change', (event) => {
            selectedView = event.target.value;
            renderCards();
        });
    });

    // Handle date change
    dateDropdown.addEventListener('change', (event) => {
        selectedDate = event.target.value;
        renderCards();
    });

    // Render strategy cards
    function renderCards() {
        cardsContainer.innerHTML = '';
        emptyState.innerHTML = '';

        const viewStrategies = strategyArray.find(strategy => strategy.View === selectedView);
        if (viewStrategies && viewStrategies.Value[selectedDate]) {
            const strategies = viewStrategies.Value[selectedDate];
            const strategyCount = {};

            strategies.forEach(strategy => {
                if (strategyCount[strategy]) {
                    strategyCount[strategy]++;
                } else {
                    strategyCount[strategy] = 1;
                }
            });

            Object.keys(strategyCount).forEach(strategy => {
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-strategy-count', `${strategyCount[strategy]} ${strategyCount[strategy] > 1 ? 'Strategies' : 'Strategy'}`);
                card.innerHTML = `
                    <h3>${strategy}</h3>
                    <p>${strategyCount[strategy]} ${strategyCount[strategy] > 1 ? 'Strategies' : 'Strategy'}</p>
                `;
                cardsContainer.appendChild(card);
            });
        } else {
            emptyState.textContent = `No strategies available for ${selectedDate}`;
        }
    }

    // Initial render
    renderCards();
});
