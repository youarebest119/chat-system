export const debouncing = (func, delay = 400) => {
    let debounceTimer
    return function () {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
}


export const GetDateFromStr = str => {
    let date = new Date(str);
    return {
        month: date.getMonth(),
        year: date.getFullYear(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        hours: date.getHours(),
        date: date.getDate(),
        formattedDate: function () {
            return `${this.hours}:${this.minutes} (${this.date} ${date.toLocaleString('default', { month: 'long' })},${this.year})`;
        },
    }
}