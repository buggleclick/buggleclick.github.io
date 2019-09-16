const numberWritten: string[] = [
    '',' Million',' Billion',' Trillion',' Quadrillion',' Quintillion',
    ' Sextillion',' Septillion',' Octillion',' Nonillion',' Decillion'
];

const appendCommas = function(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const parseLargeNumber = function(value: number): string {
    if(value <= 999999) {
        return appendCommas(value.toString());
    } else {
        let baseVal: number = 0;
        let notation: string = String();
        if(!isFinite(value)){ 
            return 'Uncalculable!';
        } else {
            let thisVal: number = (value /= 1000);
            while(Math.round(value) >= 1000) {
                thisVal /= 1000;
                baseVal++;
            }
            if(baseVal >= numberWritten.length) {
                return 'Uncalculable!';
            } else {
                notation = numberWritten[baseVal];
            }
            return (Math.round(thisVal * 1000) / 1000) + notation;
        }
    }
}