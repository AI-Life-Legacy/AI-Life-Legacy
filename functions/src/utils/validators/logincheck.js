export function checkUidInLocals(res) {
    return res.locals.uid ? true : false;  // uid가 있으면 true, 없으면 false 반환
}