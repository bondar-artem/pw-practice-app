/* Створити функцію для обчислення часу, потрібного для підйому на поверх. Особа відпочиває через певні проміжки подоланих сходинок.

getTimeToClimbFloors(numFloors, stairsPerFloor, timePerStair, stairsPerRest, restTime)

Пареметри:

20 numFloors: кількість поверхів
15 stairsPerFloor: кількість сходинок одного поверху
0.75 timePerStair: кількість часу подолати одну сходинку
7 stairsPerRest: кількість сходинок, які можна подолати перед відпочинком
3 restTime: кількість часу на відпочинок
Приклади для перевірки:

console.log(getTimeToClimbFloors(10, 20, 0.5, 10, 2)); // Expected output: 138

console.log(getTimeToClimbFloors(5, 10, 0.25, 5, 1)); // Expected output: 21.5

console.log(getTimeToClimbFloors(20, 15, 0.75, 7, 3)); // Expected output: 351 */


function getTimeToClimbFloors(numFloors, stairsPerFloor, timePerStair, stairsPerRest, restTime) {
    let totalTime = 0;
    let totalStairs = numFloors * stairsPerFloor;

    for (let stair = 1; stair <= totalStairs; stair++) {
        totalTime += timePerStair; 

        if (stair % stairsPerRest === 0 && stair !== totalStairs) {
            totalTime += restTime;
        }
    }

    return totalTime;
}

console.log(getTimeToClimbFloors(10, 20, 0.5, 10, 2));

console.log(getTimeToClimbFloors(5, 10, 0.25, 5, 1)); 

console.log(getTimeToClimbFloors(20, 15, 0.75, 7, 3));

