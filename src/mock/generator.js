import { getMonth, addDays, getWeek, differenceInDays, format } from "date-fns";
const currencies = ["CAD", "USD"];
const randNumbers = [1, 15000];

const contract = {
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

export const generator = (totalValues, start = new Date(), end) => {
    let count = totalValues;
    const mock = [];

    if (!totalValues) {
        count = Math.abs(differenceInDays(start, end));
    }

    for (let x = 0; x < count; x++) {
        const newMock = { ...contract };
        newMock.day = addDays(new Date(start), x);
        newMock.week = getWeek(newMock.day);
        newMock.month = getMonth(newMock.day);
        newMock.gross_sales = Math.abs(parseFloat(generateRandom()));
        newMock.net_sales = Math.abs(parseFloat(generateRandom()));
        newMock.transaction_volume = Math.abs(parseFloat(generateRandom()));
        newMock.currency_code =
            currencies[Math.floor(Math.random() * currencies.length)];
        mock.push(newMock);
    }
    return mock;
};

export const handleApex = (mock) => {
    const result = {
        curated: [
            { name: "Gross", data: [], type: "line" },
            { name: "Net", data: [], type: "line" },
            { name: "Volume", data: [], type: "line" },
        ],
        xCategories: [],
        maxima: [0, 0, 0],
        minima: [0, 0, 0],
        cards: {},
    };

    mock.forEach((v, i) => {
        result.xCategories.push(Date.parse(v.day));
        result.curated[0].data.push(v.gross_sales);
        result.curated[1].data.push(v.net_sales);
        result.curated[2].data.push(v.transaction_volume);

        // if (!result.cards.hasOwnProperty(v.payment)) {
        //     result.cards[v.payment] = 1;
        // } else {
        //     result.cards[v.payment] = result.cards[v.payment] + 1;
        // }
    });
    result.maxima[0] = Math.max(...result.curated[0].data);
    result.maxima[1] = Math.max(...result.curated[1].data);
    result.maxima[2] = Math.max(...result.curated[2].data);
    result.minima[0] = Math.min(...result.curated[0].data);
    result.minima[1] = Math.min(...result.curated[1].data);
    result.minima[2] = Math.min(...result.curated[2].data);
    return result;
};

export const handleNivo = (mock) => {
    const result = {
        curated: [
            { id: "gross", data: [], color: "#9965f4" },
            { id: "net", data: [], color: "#f186c0" },
            { id: "volume", data: [], color: "#ff8d00" },
        ],
        maxima: [0, 0, 0],
        minima: [0, 0, 0],
        cards: {},
    };

    mock.forEach((v, i) => {
        result.curated[0].data.push({
            x: Date.parse(v.day),
            y: v.gross_sales,
        });
        result.curated[1].data.push({
            x: Date.parse(v.day),
            y: v.net_sales,
        });
        result.curated[2].data.push({
            x: Date.parse(v.day),
            y: v.transaction_volume,
        });
    });
    // data.forEach((i) => {
    //     if (!result.cards.hasOwnProperty(i.payment)) {
    //         result.cards[i.payment] = 1;
    //     } else {
    //         result.cards[i.payment] = result.cards[i.payment] + 1;
    //     }
    // });
    return result;
};

export const handleChart = (mock) => {
    const result = {
        curated: [
            {
                id: "Gross",
                label: "Gross",
                data: [],
                borderColor: "#9965f4",
                fill: false,
            },
            {
                id: "Net",
                label: "Net",
                data: [],
                borderColor: "#f186c0",
                fill: false,
            },
            {
                id: "Volume",
                label: "Volume",
                data: [],
                borderColor: "#ff8d00",
                fill: false,
            },
        ],
        xCategories: [],
        maxima: [0, 0, 0],
        minima: [0, 0, 0],
        cards: {},
    };

    mock.forEach((v, i) => {
        result.xCategories.push(format(v.day, "yyyy/MM/dd"));
        result.curated[0].data.push(v.gross_sales);
        result.curated[1].data.push(v.net_sales);
        result.curated[2].data.push(v.transaction_volume);
    });
    // data.forEach((i) => {
    //     if (!result.cards.hasOwnProperty(i.payment)) {
    //         result.cards[i.payment] = 1;
    //     } else {
    //         result.cards[i.payment] = result.cards[i.payment] + 1;
    //     }
    // });

    return result;
};
