let calculationCount = 0;

function addCalculationFields() {
    calculationCount++;
    const container = document.getElementById('input-container');
    
    const fieldSet = document.createElement('div');
    fieldSet.className = 'field';
    fieldSet.innerHTML = `
        <h2>單號 ${calculationCount}</h2>
        <label for="principal${calculationCount}">本金</label>
        <select id="principal${calculationCount}">
            <option value="100000">100000</option>
            <option value="200000">200000</option>
        </select>
        <label for="balance${calculationCount}">結餘</label>
        <input type="number" id="balance${calculationCount}">
        <label for="stockPrice${calculationCount}">股價</label>
        <input type="number" id="stockPrice${calculationCount}">
        <label for="stopLossPrice${calculationCount}">止損價</label>
        <input type="number" id="stopLossPrice${calculationCount}">
        <label for="lossPercentage${calculationCount}">最大虧損百分比</label>
        <select id="lossPercentage${calculationCount}">
            <option value="0.03">0.03</option>
            <option value="0.04">0.04</option>
            <option value="0.05">0.05</option>
            <option value="0.06">0.06</option>
            <option value="0.07">0.07</option>
            <option value="0.08">0.08</option>
            <option value="0.09">0.09</option>
            <option value="0.10">0.10</option>
            <option value="0.11">0.11</option>
            <option value="0.12">0.12</option>
            <option value="0.13">0.13</option>
            <option value="0.14">0.14</option>
            <option value="0.15">0.15</option>
        </select>
    `;
    
    container.appendChild(fieldSet);
}

function calculateResults() {
    const results = document.getElementById('results');
    results.innerHTML = '';
    let totalMaxLoss = 0;
    let totalMaxProfit = 0;

    for (let i = 1; i <= calculationCount; i++) {
        const principal = Number(document.getElementById(`principal${i}`).value);
        const balance = Number(document.getElementById(`balance${i}`).value);
        const stockPrice = Number(document.getElementById(`stockPrice${i}`).value);
        const stopLossPrice = Number(document.getElementById(`stopLossPrice${i}`).value);
        const lossPercentage = Number(document.getElementById(`lossPercentage${i}`).value);

        const a = principal - balance;
        let b, maxLossOrProfit, lotSize, resultType, targetProfitOrLoss, targetValue;

        if (a < 0) {
            // Profit scenario
            resultType = "獲利";
            b = (principal === 100000 ? 10000 : 20000) + Math.abs(a);
            maxLossOrProfit = b * lossPercentage;
            lotSize = maxLossOrProfit / (stockPrice - stopLossPrice);
            targetProfitOrLoss = b;
            targetValue = (principal * 0.1) + b;
            totalMaxProfit += maxLossOrProfit;
        } else {
            // Loss scenario
            resultType = "虧損";
            b = (principal === 100000 ? 10000 : 20000) - a;
            maxLossOrProfit = b * lossPercentage;
            lotSize = maxLossOrProfit / (stockPrice - stopLossPrice);
            targetProfitOrLoss = b;
            targetValue = (principal * 0.1) - b;
            totalMaxLoss += maxLossOrProfit;
        }

        results.innerHTML += `
            <p>單號 ${i} (${resultType}): ${resultType}額: ${Math.abs(a).toFixed(2)}，目標${resultType}額: ${targetProfitOrLoss.toFixed(2)}，最大虧損額: ${maxLossOrProfit.toFixed(2)}，手數: ${lotSize.toFixed(2)}</p>
        `;
    }

    if (calculationCount > 1) {
        const finalBalance = Number(document.getElementById('finalBalance').value);
        const finalResult = finalBalance - totalMaxLoss + totalMaxProfit;
        results.innerHTML += `<p>最終結果: ${finalResult.toFixed(2)}</p>`;
    }
}
