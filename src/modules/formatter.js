module.exports = {
    number(value) {
        if(!value){return 0}
        let val = (value/1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    price(value) {
        if(!value){return 0}
        let val = (value/1).toFixed(0).replace('.', ',')
        return "IDR " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    flatNumber(value){
        if(!value){return 0}
        return value.split('.').join("")
    }    
}