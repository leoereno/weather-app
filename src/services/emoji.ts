export function getEmoji(weatherCode: number, currentHour: number){
    if(weatherCode <= 3 && currentHour <= 18 ) return "☀️";
    if(weatherCode <= 3 && currentHour >= 18 ) return "🌙";
    if((weatherCode >= 80 && weatherCode <= 82) || (weatherCode>=61 && weatherCode<=65)) return "🌧️";

}