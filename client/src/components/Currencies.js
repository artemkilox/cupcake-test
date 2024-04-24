import React, {useEffect, useState} from 'react';
import axios from "axios";

const Currencies = () => {
    const [RUB, setRUB] = useState([])
    const [USD, setUSD] = useState([])
    const [EUR, setEUR] = useState([])
    const [RU, setRU] = useState([])
    const [RE, setRE] = useState([])
    const [EU, setEU] = useState([])

    useEffect( () => {
        setupDefault()
        subscribe()
    }, [])

    const setupDefault = async () => {
        const responseFirst = await axios.get('http://localhost:3000/api/v1/first')
        const responseSecond = await axios.get('http://localhost:3000/api/v1/second')
        const responseThird = await axios.get('http://localhost:3000/api/v1/third')
        setValues(responseFirst.data.rates, responseSecond.data.rates, responseThird.data.rates)
    }

    const subscribe = async () => {
        try {
            const responseFirst = await axios.get('http://localhost:3000/api/v1/first/poll')
            const responseSecond = await axios.get('http://localhost:3000/api/v1/second/poll')
            const responseThird = await axios.get('http://localhost:3000/api/v1/third/poll')
            setValues(responseFirst.data.rates, responseSecond.data.rates, responseThird.data.rates)
            await subscribe()
        } catch (e){
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    const setValues = (First, Second, Third) => {
        const FRub = Math.round(First.RUB * 100) / 100
        const SRub = Math.round(Second.RUB * 100) / 100
        const TRub = Math.round(Third.RUB * 100) / 100

        const FUsd = Math.round(First.USD * 100) / 100
        const SUsd = Math.round(Second.USD * 100) / 100
        const TUsd = Math.round(Third.USD * 100) / 100

        const FEur = Math.round(First.EUR * 100) / 100
        const SEur = Math.round(Second.EUR * 100) / 100
        const TEur = Math.round(Third.EUR * 100) / 100

        const FRU = Math.round((FRub/FUsd) * 100) / 100
        const SRU = Math.round((SRub/SUsd) * 100) / 100
        const TRU = Math.round((TRub/TUsd) * 100) / 100

        const FRE = Math.round((FRub/FEur) * 100) / 100
        const SRE = Math.round((SRub/SEur) * 100) / 100
        const TRE = Math.round((TRub/TEur) * 100) / 100

        const FEU = Math.round((FEur/FUsd) * 100) / 100
        const SEU = Math.round((SEur/SUsd) * 100) / 100
        const TEU = Math.round((TEur/TUsd) * 100) / 100

        setRUB([[{id: 'FRub', value: FRub}, {id: 'SRub', value: SRub}, {id: 'TRub', value: TRub}], Math.min(FRub, SRub, TRub)])
        setUSD([[{id: 'FUsd', value: FUsd}, {id: 'SUsd', value: SUsd}, {id: 'TUsd', value: TUsd}], Math.min(FUsd, SUsd, TUsd)])
        setEUR([[{id: 'FEur', value: FEur}, {id: 'SEur', value: SEur}, {id: 'TEur', value: TEur}], Math.min(FEur, SEur, TEur)])
        setRU([[{id: 'FRU', value: FRU}, {id: 'SRU', value: SRU}, {id: 'TRU', value: TRU}], Math.min(FRU, SRU, TRU)])
        setRE([[{id: 'FRE', value: FRE}, {id: 'SRE', value: SRE}, {id: 'TRE', value: TRE}], Math.min(FRE, SRE, TRE)])
        setEU([[{id: 'FEU', value: FEU}, {id: 'SEU', value: SEU}, {id: 'TEU', value: TEU}], Math.min(FEU, SEU, TEU)])
    }

    return (
        <table className="currencies-wrapper">
            <thead>
                <tr className="table-row">
                    <th className="table-value">Pair name/market</th>
                    <th className="table-value">First</th>
                    <th className="table-value">Second</th>
                    <th className="table-value">Third</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-row">
                    <th className="table-value">RUB/CUPCAKE</th>
                    {RUB.length > 0 ?
                        RUB[0].map(item =>
                            <th className={item.value === RUB[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
                <tr className="table-row">
                    <th className="table-value">USD/CUPCAKE</th>
                    {USD.length > 0 ?
                        USD[0].map(item =>
                            <th className={item.value === USD[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
                <tr className="table-row">
                    <th className="table-value">EUR/CUPCAKE</th>
                    {EUR.length > 0 ?
                        EUR[0].map(item =>
                            <th className={item.value === EUR[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
                <tr className="table-row">
                    <th className="table-value">RUB/USD</th>
                    {RU.length > 0 ?
                        RU[0].map(item =>
                            <th className={item.value === RU[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
                <tr className="table-row">
                    <th className="table-value">RUB/EUR</th>
                    {RE.length > 0 ?
                        RE[0].map(item =>
                            <th className={item.value === RE[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
                <tr className="table-row">
                    <th className="table-value">EUR/USD</th>
                    {EU.length > 0 ?
                        EU[0].map(item =>
                            <th className={item.value === EU[1] ? "table-value active" : "table-value"} key={item.id}>{item.value}</th>
                        ) : <th></th>
                    }
                </tr>
            </tbody>
        </table>
    );
};

export default Currencies;