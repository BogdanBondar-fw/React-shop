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
    priceUSD: number
}

const currencyRates: iPhoneType = {
    USD: 1,
    EUR: 0.9,
    UAN: 40,
    PLN: 5,
}

const iPhones: Record<string, iPhoneModel> = {
    'iPhone 12': {
        name: 'iPhone 12',
        description: 'This is iPhone 12...',
        priceUSD: 1000,
    },
    'iPhone 11': {
        name: 'iPhone 11',
        description: 'This is iPhone 11...',
        priceUSD: 900,
    },
    'iPhone 10': {
        name: 'iPhone 10',
        description: 'This is iPhone 10...',
        priceUSD: 800,
    },
}

const Main = () => {
    const [selectedCurrency, setSelectedCurrency] =
        useState<keyof iPhoneType>('EUR')
    const [purchases, setPurchases] = useState<Record<string, number>>({})

    const handleCurrencyChange = (currency: keyof iPhoneType) => {
        setSelectedCurrency(currency)
    }

    const handleBuy = (iPhoneName: string, priceUSD: number) => {
        setPurchases((prevPurchases) => ({
            ...prevPurchases,
            [iPhoneName]: (prevPurchases[iPhoneName] || 0) + priceUSD,
        }))
    }

    const total = Object.entries(purchases).reduce(
        (acc, [iPhoneName, purchase]) => {
            const priceInSelectedCurrency =
                purchases[iPhoneName] * currencyRates[selectedCurrency]
            return acc + priceInSelectedCurrency
        },
        0
    )

    const renderProduct = (iPhone: iPhoneModel, iPhoneName: string) => (
        <div className="list-item" key={iPhone.name}>
            <h1>{iPhone.name}</h1>
            <h2>{iPhone.description}</h2>
            <h3>
                {(iPhone.priceUSD * currencyRates[selectedCurrency]).toFixed(0)}{' '}
                {selectedCurrency}
            </h3>
            <button onClick={() => handleBuy(iPhoneName, iPhone.priceUSD)}>
                Buy
            </button>
        </div>
    )

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
                    {Object.keys(iPhones).map((iPhoneName) =>
                        renderProduct(iPhones[iPhoneName], iPhoneName)
                    )}
                </div>
                <h2>
                    Total: {total.toFixed(0)} {selectedCurrency}
                </h2>
            </div>
        </div>
    )
}

export default Main
