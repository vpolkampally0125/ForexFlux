import React, {useEffect, useState}  from 'react'

interface ForexRate {
    pair: string,
    price: number
}

const ForexRateStream: React.FC = () => {
    const [rates, setRates] = useState<ForexRate | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080')

        socket.onopen = () => {
            console.log("Connection Opened!")
        }

        socket.onmessage = (event: MessageEvent) => {
            try{
                const data: ForexRate = JSON.parse(event.data)
                setRates(data)
            }catch (error) {
                console.log('This is the error:', error);
            }
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
          {rates ? (
            <div>
              {/* Render the forex rates */}
              <p>{`Currency Pair: ${rates.pair}`}</p>
              <p>{`Price: ${rates.price}`}</p>
            </div>
          ) : (
            <p>Loading forex rates...</p>
          )}
        </div>
    );
}

export default ForexRateStream;

