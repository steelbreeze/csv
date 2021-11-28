import * as csv from '..';

const data = 'a,b,c\r"1",2,3\n4,"5",6\r\n7,"The number eight: ""8""",9\r"a\r\na",b,"c, d"\n12';

console.error(csv.parse(data));

process.stdout.write(csv.encode([{name: 'Dwayne "The Rock" Johnson', age: 49}, {name: "Ringo \nStarr", age: 81}]));