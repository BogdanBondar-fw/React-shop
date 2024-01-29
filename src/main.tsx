import React, { useState } from 'react'
import './style.css'

interface iPhoneType {
    USD: number
    EUR: number
    UAN: number
    PLN: number
}

interface iPhoneModel {
    name: string
    description: string
    prices: iPhoneType
}

const iPhone12: iPhoneModel = {
    name: 'iPhone 12',
    description: 'This is iPhone 12...',
    prices: {
        USD: 1000,
        EUR: 900,
        UAN: 40000,
        PLN: 5000,
    },
}

const iPhone11: iPhoneModel = {
    name: 'iPhone 11',
    description: 'This is iPhone 11...',
    prices: {
        USD: 900,
        EUR: 800,
        UAN: 3500,
        PLN: 4500,
    },
}

const iPhone10: iPhoneModel = {
    name: 'iPhone 10',
    description: 'This is iPhone 10...',
    prices: {
        USD: 800,
        EUR: 700,
        UAN: 3000,
        PLN: 4000,
    },
}

const Main = () => {
    const [selectedCurrency, setSelectedCurrency] =
        useState<keyof iPhoneType>('EUR')
    const [total, setTotal] = useState<number>(0)

    const handleCurrencyChange = (currency: keyof iPhoneType) => {
        setSelectedCurrency(currency)
        setTotal(0)
    }

    const handleBuy = (price: number) => {
        setTotal((prevTotal) => prevTotal + price)
    }

    return (
        <div className="main-container">
            <div className="main">
                <h1>Our shop page</h1>
                <div className="main-btn">
                    <button onClick={() => handleCurrencyChange('USD')}>
                        USD
                    </button>
                    <button onClick={() => handleCurrencyChange('EUR')}>
                        EUR
                    </button>
                    <button onClick={() => handleCurrencyChange('UAN')}>
                        UAN
                    </button>
                    <button onClick={() => handleCurrencyChange('PLN')}>
                        PLN
                    </button>
                </div>
                <div className="product-list">
                    {renderProduct(iPhone12, selectedCurrency, handleBuy)}
                    {renderProduct(iPhone11, selectedCurrency, handleBuy)}
                    {renderProduct(iPhone10, selectedCurrency, handleBuy)}
                </div>
                <h2>Total: {total}</h2>
            </div>
        </div>
    )
}

const renderProduct = (
    iPhone: iPhoneModel,
    currency: keyof iPhoneType,
    handleBuy: (price: number) => void
) => (
    <div className="list-item" key={iPhone.name}>
        <h1>{iPhone.name}</h1>
        <h2>{iPhone.description}</h2>
        <h3>
            {iPhone.prices[currency]} {currency}
        </h3>
        <button onClick={() => handleBuy(iPhone.prices[currency])}>Buy</button>
    </div>
)

export default Main
