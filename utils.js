export class Utils{
    constructor(){
        this.date = new Date();
    }

    formatDate(){
        let options = {day: '2-digit', month: '2-digit', year: 'numeric' }
        let formattedDate = new Intl.DateTimeFormat('es-ES', options).format(this.date);
        return formattedDate;
    }

    formatHour(){
        let hours = this.date.getHours();
        return hours;
    }


}