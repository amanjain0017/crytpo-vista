import React, { useEffect, useState } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";


export function commafy( num ) {
    let str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

const Carousel = () => {
  const [trending, settrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    settrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trending.map((coin) => {
    
    let profit = coin.price_change_percentage_24h >=0;

    return (
      <Link to={`/coins/${coin.id}`}
        style={{
          display:"flex",
          flexDirection:"column",
          alignItems:"center",
          cursor:"pointer",
          textTransform:"uppercase",
          color:"white",
        }}
      >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span> {coin?.symbol}
          &nbsp;
          <span
          style={{
            color: profit > 0 ?"green":"red",
            fontWeight:500
          }}
          >
          {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}% </span>
          <span style={{fontSize:22, fontWeight:500}}>
            <br />
          {symbol}{commafy(coin?.current_price.toFixed(2))}
          </span>
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
