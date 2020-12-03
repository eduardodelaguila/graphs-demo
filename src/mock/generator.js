import { getMonth, addDays, getWeek } from "date-fns";

const currencies = ["CAD", "USD"];
const startingDate = "2017/12/31";
const randNumbers = [1, 15000];

const firm = {
    day: "2020-03-23",
    week: 1,
    month: 1,
    gross_sales: 11855.65,
    net_sales: 900.46,
    transaction_volume: 5853.69,
    currency_code: "USD",
};

const generateRandom = () => {
    return parseFloat(
        Math.random() * (randNumbers[0] - randNumbers[1]) + randNumbers[0]
    ).toFixed(2);
};

export const generator = (totalValues) => {
    const mock = [];
    for (let x = 0; x < totalValues; x++) {
        const newMock = { ...firm };
        newMock.day = addDays(new Date(startingDate), x);
        newMock.week = getWeek(newMock.day);
        newMock.month = getMonth(newMock.day);
        newMock.gross_sales = generateRandom();
        newMock.net_sales = generateRandom();
        newMock.currency_code =
            currencies[Math.floor(Math.random() * currencies.length)];
        mock.push(newMock);
    }
    return mock;
};
