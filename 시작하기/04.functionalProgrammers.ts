/*
* 내장 타입(Built-in types)
* JavaScript 에서는 7개의 내장 타입을 정의한다.
*
* Number        - 배정밀도 IEEE 754 부동소수점
* String        - 수정 불가능한 UTF-16 문자열
* Boolean       - true 와 false
* Symbol        - 보통 키로 사용하는 고유한 값
* Null          - 단위 타입과 동등
* Undefined     - 단위 타입과 동등
* Object        - 레코드와 유사한 것
*
* TypeScript 내장 원시 타입
* number
* string
* boolean
* symbol
* null
* undefined
* object
*
* 다른 중요한 TypeScript 타입(Other important TypeScript types)
* unknown       - 최상위 타입
* never         - 하위 타입
* 객체 리터럴     - 예, { property: Type }
* void          - 리턴 타입으로 사용하기 위해 의도된 undefined의 서브타입
* T[]           - 수정가능한 배열들, 또한 Array<T>로 사용 가능
* [T, T]        - 고정된 길이지만 수정 가능한 튜플
* (t: T) => U   - 함수
* */

// 함수 구문에는 매개변수 이름이 포함되어 있다.
let fst: (a: any, d: any) => any = (a, d) => a;
let snd: <T, U>(a: T, d: U) => U = (a, d) => d;

// 객체 리터럴 타입 구문이 객체 리터럴 값 구문과 꽤 유사하다.
let o: { n: number; xs: object[] } = { n: 1, xs: [] };

// [T, T]는 T[]의 서브타입이다.

/*
* 박스 형태 타입(Boxed types)
* JavaScript는 프로그래머들이 해당 타입에 접근할 수 있는 메서드를 포함하는 원시타입을 동등하게 박스해 왔다.
* 원시 형태의 number, 박스 형태 타입의 Number
* 박스 형태 타입은 메서드가 원시 타입을 반환할 때 아주 드물게 필요하다
* */

(1).toExponential();
Number.prototype.toExponential.call(1);

// 숫자 리터럴에서 메서드를 호출하려면 파서를 지원하기 위해 메서드를 괄호 안에 넣어야 한다.

/*
* 점진적인 타이핑(Gradual typing)
*
* TypeScript는 표현식의 타입을 알 수 없을 때마다 any 타입을 사용한다.
* any[] 에 어떤 값이든 체크하지 않고 넣어도 상관없다.
*
* any 사용 시 에러가 발생하면 tsconfig.json 에서
* "noImplicitAny": true 또는 "strict": true를 설정해야 한다.
* */

const anys : any[] = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });

// anys.map(anys[2]);  // 에러, 함수가 아님

let sepsis = anys[0] + anys[1];


/*
* 구조적인 타이핑(Structural typing)
* */

let o1 = { x: "hi", extra: 1 };
let o2: { x :string } = o1;
/*
* 객체 리터럴 { x: "hi", extra: 1 } 에 매치되는 { x: string, extra: number }
* 이 타입은 필수 프로퍼티가 모두 있고 해당 프로퍼티에 할당 가능한 타입이 있으므로 { x: string } 에 할당 가능
* 나머지 프로퍼티는 할당을 막지 않고 { x: string } 의 서브타입으로 만든다.
* */

type One = { p: string };
interface Two {
    p: string;
}

class Three {
    p = "Hello";
}

let x:One = { p: "hi" };
let two:Two = x;
console.log('x: ', x);
two = new Three();
console.log('two: ', two);

/*
* 유니언(Unions)
* */

function start(
    arg: string | string[] | (() => string) | { s: string }
): string {
    // JavaScript 에서 아주 일반적
    if (typeof arg === "string") {
        return commonCase(arg);
    } else if (Array.isArray(arg)) {
        return arg.map(commonCase).join(",");
    } else if (typeof arg === "function") {
        return commonCase(arg());
    } else {
        return commonCase(arg.s);
    }

    function commonCase(s: string): string {
        return s;
    }
}

let arg1 = "string";
let arg2 = ["s", "t", "r", "i", "n", "g"];
let arg3 = () => "function string";
let arg4 = { s : "obj string" };

console.log('arg1: ', start(arg1));
console.log('arg2: ', start(arg2));
console.log('arg3: ', start(arg3));
console.log('arg4: ', start(arg4));

/*
* 교집합
* */
type Combined = { a: number } & { b: string; };
type Conflicting = { a: number } & { a: string };

let combined: Combined = { a: 1, b: "string" };
console.log('combined: ', combined);

/*
* 유닛 타입(Unit types)
* 하나의 원시 값을 포함하고 있는 원시 타입의 서브타입
* 하나의 특정 값만을 허용하는 타입
* */

declare function pad(s: string, n: number, direction: "left" | "right"): string;
pad("hi", 10, "left");

let s:string = "right"; // string 타입과 "left" | "rigth" 는 다름
// pad("hi", 10, s);   오류: 'string' 은 '"left" | "right"'에 할당할 수 없다.

let s2: "left" | "right" = "right"; // 타입 표기를 하여 left, right 타입이 아닌 변수가 s2에 할당되는 것을 방지
pad("hi", 10, s2);

/*
* 문맥적인 타이핑 (Contextual typing)
* */

declare function map<T, U>(f: (t: T) => U, ts: T[]): U[];
let sns = map((n) => n.toString(), [1, 2, 3]);
// T, U는 호출 전에 추론되지 않음, [1, 2, 3] 으로 T = number를 추론한 다음 n => n.toString()의 리턴 타입으로 U=string을 추론,
// sns 가 string[] 타입을 가지도록 함

declare function map2<T, U>(ts: T[], f: (t: T) => U): U[];
// 문맥을 통해 리턴 타입 추론

declare function run<T>(thunk: (t: T) => void): T;
let i: { inference: string } = run((o) => {
    o.inference = "INSERT STATE HERE";
});

/*
* 선언 이니셜라이저는 선언 타입: { inference: string } 에 따라서 문맥적으로 타입이 정해짐
* 호출의 리턴 타입은 추론을 위해 문맥적인 타입을 사용하기 때문에 컴파일러는 T={ inference: string } 으로 추론
* 화살표 함수는 매개변수에 타입을 지정하기 위해 문맥적인 타입을 사용하므로, 컴파일러는 o: { inference: string } 를 제공
* */

/*
* 타입 별칭(Type aliases)
* 단순한 별칭
* */

type Size = [number, number];
let xs: Size = [101.1, 999.9];

type FString = string & { __compileTimeOnly: any }; // 교차 타입, A 이면서 B인 타입
/*
* 런타임에서는 그냥 string, 컴파일 타임(TypeScript 타입 검사) 에서는 "특별한 string"으로 취급하겠다는 것
* string인 동시에 __compileTimeOnly 라는 프로퍼티를 가진 타입
* 이 프로퍼티는 실제로 존재하지 않아도 됨
* 컴파일 타임에만 존재하는 가짜 태그
* */

let f: FString;
let st: string;

st = f; // 가능
/*
* FString은 "string + α"
* string이 요구하는 조건을 이미 만족
* 더 구체적인 타입 -> 일반적인 타입 / 허용
* */

// f = st; 불가능
/*
* FString은 __compileTimeOnly 라는 "태그"가 필요
* 일반 string 에는 태그가 없음
* 일반적인 타입 -> 더 구체적인 타입 / 거부
* */

function makeFString(s: string): FString {
    return s as FString;
}

/*
* 왜 이렇게 쓰나?
* 이메일 문자열
* 사용자 ID
* HTML-safe string
* SQL-safe string
* */

type UserId = string & { readonly __userId: unique symbol };
type Email = string & { readonly __email: unique symbol };

/*
* string & { tag } = 컴파일 타임 전용 라벨이 붙은 string
* TypeScript식 newtype 흉내
* */





