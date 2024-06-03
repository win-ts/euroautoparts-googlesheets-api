export function getThailandTime() {
    const date = new Date();
    const offset = 7 * 60;
    const localTime = date.getTime();
    const localOffset = date.getTimezoneOffset() * 60000;
    const utcTime = localTime + localOffset;
    const thailandTime = new Date(utcTime + (offset * 60000));
    return thailandTime.toLocaleString('th-TH');
}