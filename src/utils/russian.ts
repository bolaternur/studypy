/** Forms are singular, two–four, and five–twenty: урок / урока / уроков. */
export function plural(n:number,one:string,few:string,many:string){return n%100>=11&&n%100<=14?many:n%10===1?one:n%10>=2&&n%10<=4?few:many;}
