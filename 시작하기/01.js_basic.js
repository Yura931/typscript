const basic = () => {
    let x;

    if("" == 0) {
        // 참입니다! 근데 왜죠??..
        // JavaScript의 동일 연산자는( == ) 인수를 강제로 변환하여(coerces), 예기치 않은 동작을 유발한다.
        console.log(`"" == 0 : ${"" == 0}`);
    } else {
        console.log(`"" == 0 : false`);
    }

    if (1 < x < 3) {
        console.log(`1 < x < 3 : ${1 < x < 3}`);
    } else {
        console.log(`1 < x < 3 : false`);
    }

    const obj = { width: 10, height: 15};

    // JavaScript는 존재하지 않는 프로퍼티의 접근을 허용
    // 프로퍼티 철자가 틀렸지만 오류 표출 해주지 않음
    const area = obj.width * obj.heigth;
    console.log('arda = NaN : ', area);
}

basic();