'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Currency } from '../utils/interface/interface';
export default function Getprice() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get<Currency[]>('http://127.0.0.1:8000/currencies/');
      setCurrencies(response.data);
      setDataFetched(true);
    } catch (error) {
      console.error('There was an error fetching the currencies:', error);
      setDataFetched(false);
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
          onClick={fetchData}
        >
          دریافت اطلاعات
        </button>

        {dataFetched ? (
          <table className="min-w-full bg-white border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">عنوان</th>
                <th className="py-2 px-4 border-b">قیمت زنده</th>
                <th className="py-2 px-4 border-b">تغییرات</th>
                <th className="py-2 px-4 border-b">کمترین قیمت</th>
                <th className="py-2 px-4 border-b">بیشترین قیمت</th>
                <th className="py-2 px-4 border-b">زمان به‌روزرسانی</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b"><span><img src={currency.flag_url} width={'20px'} height={'20px'}></img></span>{currency.title}</td>
                  <td className="py-2 px-4 border-b">{currency.live_price}</td>
                  <td className="py-2 px-4 border-b text-green-400">{currency.change}</td>
                  <td className="py-2 px-4 border-b text-red-400" >{currency.lowest}</td>
                  <td className="py-2 px-4 border-b">{currency.highest}</td>
                  <td className="py-2 px-4 border-b">{currency.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 text-red-500">خطا در دریافت اطلاعات</p>
        )}
      </div>
    </main>
  );
}
