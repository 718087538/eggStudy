let prices = [7, 1, 5, 3, 6, 4];
var maxProfit = function (prices) {
    //低后面有高的 低买 连续高选最高卖
    let income = 0;
    for (let i = 0; i < prices.length; i++) {
        console.log(prices[i]);
        for (let j = i + 1; j < prices.length; j++) {
            console.log(prices[i]);
            if (prices[i] < prices[j]) {//买
                console.log(income);
                if (prices[j + 1]) {
                    if (prices[j] > prices[j + 1]) {//卖
                        income += prices[j] - prices[i];
                        console.log(income);
                    }
                } else {
                    income += prices[j] - prices[i];
                    console.log(income);
                }
            }
        }
    }
    return income;
};

maxProfit(prices)