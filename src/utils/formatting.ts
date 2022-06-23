export const formatTel = (tel?: string) => {
    return tel?.replace(/\D/g, '')
}

export const formatCard = (number?: string) => {
    return (
        number &&
        number
            .replace(/\D/g, '')
            .split('')
            .map((symbol, index) => {
                if (index === 4 || index === 8 || index === 12) {
                    return ` ${symbol}`
                }
                return symbol
            })
            .join('')
    )
}

export const formatDecimal = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
}).format

export const formatImpact = new Intl.NumberFormat('de-DE', {
    style: 'unit',
    unit: 'kilogram',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format

export const formatCurrency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format

const pFormat = new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format

export const formatPercent = (percent: number) => pFormat(percent / 100)
