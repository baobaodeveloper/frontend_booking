import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Detail from '../../components/detail/Detail';
import { Footer } from '../../components/footer/Footer';
import HeaderHotel from '../../components/header/HeaderList';
import { URL } from '../../constants/common';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { calcDate } from '../../utils/calcDate';

const DetailHotel = () => {
  const { dates, options } = useContext(SearchContext);
  const { id } = useParams();
  const { data, loading, err, reFetch } = useFetch(
    `${URL}/hotel/find/${id}`
  );
  const dateStay = calcDate(dates[1], dates[0]);
  return (
    <div>
      <HeaderHotel />
      <Detail data={data} dateStay={dateStay} options={options} />
      <Footer />
    </div>
  );
};

export default DetailHotel;
