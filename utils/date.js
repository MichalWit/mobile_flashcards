const formatDate = (date) => (date.toISOString().substring(0, 10))

export function getTodaysDateKey() {
    return formatDate(new Date())
}

export function getDateKey(date) {
    return formatDate(date)
}
