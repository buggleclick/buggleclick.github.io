// =================================================================================
//  Number Formatting
// =================================================================================
const formatLong: string[] = [
    ' thousand',' million',' billion',' trillion',' quadrillion',
    ' quintillion',' sextillion',' septillion',' octillion',' nonillion'
];
const prefixesLong: string[] = [
    '','un','duo','tre','quattuor','quin','sex','septen','octo','novem'
];
const suffixesLong: string[] = [
    'decillion','vigintillion','trigintillion','quadragintillion',
    'quinquagintillion','sexagintillion','septuagintillion','octogintillion',
    'nonagintillion'
];
for(let i in suffixesLong) {
    for(let ii in prefixesLong) {
        formatLong.push(` ${prefixesLong[ii]}${suffixesLong[i]}`);
    }
}

const formatShort: string[] = [
    'k','M','B','T','Qa','Qi','Sx','Sp','Oc','No'
];
const prefixesShort: string[] = [
    '','Un','Do','Tr','Qa','Qi','Sx','Sp','Oc','No'
];
const suffixesShort: string[] = [
    'D','V','T','Qa','Qi','Sx','Sp','O','N'
];
for(var i in suffixesShort) {
    for(var ii in prefixesShort) {
        formatShort.push(` ${prefixesShort[ii]}${suffixesShort[i]}`);
    }
}
formatShort[10] = String('Dc');

function formatEveryThirdPower(notation: string[]): Function {
    return function(value: number): string {
        let baseValue = 0;
        let notationValue = String();

        if(!isFinite(value)) {
            return 'Uncalculable!';
        } else {
            if(value >= 1000000) {
                value /= 1000;
                while(Math.round(value) >= 1000) {
                    value /= 1000;
                    baseValue++;
                }
                if(baseValue > notation.length) {
                    return 'Uncalculable!';
                } else {
                    notationValue = notation[baseValue];
                }
            }
            return (Math.round(value * 1000) / 1000) + notationValue;
        }
    }
}

function rawFormatter(value: number): number {
    return Math.round(value * 1000) / 1000;
}

let numberFormatters: Function[] = [
    formatEveryThirdPower(formatShort),
    formatEveryThirdPower(formatLong),
    rawFormatter
]