// TypeScript: 정적 타입 검사자(TypeScript: A Static Type Checker)
/*
* 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 정적 검사라고 한다.
* 어떤 것이 오류인지와 어떤 것이 연산 되는 값에 기인하지 않음을 정하는 것
* 정적 타입 검사자인 TypeScript는 프로그램을 실행시키기 전에 값의 종류를 기반으로 프로그램의 오류를 찾는다.
* */

const staticTypeChecker = () => {

    // @errors: 2551 - TypeScript 에서 볼 수 있는 오류, obj 타입 때문
    const obj = { width: 10, height: 15};;
    const area = obj.width * obj.heigth;

}

staticTypeChecker();

