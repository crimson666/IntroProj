export interface languages {
    id: number;
    name: string;
}

export interface students {
    id: number;
    name: string;
    phoneNumber?: number | string;
    age: number;
    languages: Array<string>;
}

interface Order {
    Ordetype: string;
    price: number;
    volume: number;
}

export interface orderBook {
    Orderbook: Array<Order>;
    SellOrder: Array<Order>;
    CreatedTimestampUtc: string;
}

interface coins {
    bid: number;
    ask: number;
    last: number;
}

export interface latestprices {
    stats: string;
    prices: {
        btc: coins;
        ltc: coins;
        doge: coins;
    }
}