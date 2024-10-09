import React, {useEffect, useState}  from 'react'

interface ForexRate {
    messageType: string,
    ticker: string,
    date: string,
    bidSize: number,
    bidPrice: number,
    midPrice: number,
    askSize: number,
    askPrice: number
}

const ForexRateStream: React.FC = () => {
    const [rates, setRates] = useState<ForexRate[]>([]);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log("Connection Opened!")
        }

        socket.onmessage = (event: MessageEvent) => {
            const blob = event.data;
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const textData = reader.result as string;  
                    const parsedData = JSON.parse(textData);
                    const data = parsedData.data
                    console.log(data)
                    const forexRate: ForexRate = { 
                        messageType: data[0],          // "Q" (Update Message Type)
                        ticker: data[1],               // Ticker (string)
                        date: data[2],                 // Date (ISO string)
                        bidSize: data[3],              // Bid Size (number)
                        bidPrice: data[4],             // Bid Price (number)
                        midPrice: data[5],             // Mid Price (number)
                        askSize: data[6],              // Ask Size (number)
                        askPrice: data[7]              // Ask Price (number)
                    };
                    setRates((prevRates) => [...prevRates, forexRate]);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            };
            reader.readAsText(blob);
        };

        socket.onerror = (error) => {
            console.log('Here is the error', error)
        }

        return () => {
            socket.close();
        };

    }, []);

    return (
        <div>
          {rates ? (rates.map((rate) => (
            <li>
                <div>
                    <p>{`Service: ${rate.messageType}`}</p>
                    <p>{`Ticker: ${rate.ticker}`}</p>
                    <p>{`Date: ${rate.date}`}</p>
                    <p>{`Bid Size: ${rate.bidSize}`}</p>
                    <p>{`Bid Price: ${rate.bidPrice}`}</p>
                    <p>{`Mid Price: ${rate.midPrice}`}</p>
                    <p>{`Ask Size: ${rate.askSize}`}</p>
                    <p>{`Ask Price: ${rate.askPrice}`}</p>
                </div>
            </li>
          ))  
          ) : (
            <p>Loading forex rates...</p>
          )}
        </div>
    );
}

export default ForexRateStream;