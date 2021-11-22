import * as csv from '..';

const data = '\uFEFFa,b,c\r"1",2,3\n4,"5",6\r\n7,"The number eight: ""8""",9\r"a\r\na",b,"c, d"\n12';

console.log(csv.parse(data));
