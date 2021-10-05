const DayCycle = ["#1B4F72", "#21618C", "#2874A6", "#2E86C1", "#3498DB", "#5DADE2"];
const NightCycle = ["#1B2631","#212F3C","#283747","#2E4053","#34495E","#5D6D7E"];
window.onload = __init__;

function __init__(){
    run();
}
function run() {
    let BackGround = document.querySelector(".BackgroundTop");
    let Clock = 0;
    let Enemies = [];
    let Character = document.createElement("div");
    Character.className = "Character";
    BackGround.appendChild(Character);
    let tf = false;
    let Interval = setInterval(() => {
        Clock = timer(BackGround, Clock);
        Enemies.push(SpawnEnemies(BackGround));
        console.log("Enemies Length: " + Enemies.length);
       // if(Enemies.length !== 0 && !tf){
            CharacterFire(BackGround, Character, Enemies);
        //    tf= true;
        //}
        MoveEnemies(BackGround, Enemies[Enemies.length - 1], Character)

    }, 5000);
}
function CharacterFire(Background, Character, Enemies){
    let BackgroundBounds = Background.getBoundingClientRect();
    let Bullet = document.createElement("div");
    Bullet.className = "Bullet";
    Background.appendChild(Bullet);
    let CStyle = getComputedStyle(Character);
    //console.log(CStyle);
    Bullet.style.left = Number.parseInt(CStyle.left) + "px";
    Bullet.style.bottom = Number.parseInt(CStyle.height) - 20 + "px";

    let Interval = setInterval(()=>{
        if(Enemies.length === 0){
            clearInterval(Interval);
        }
        if(Number.parseInt(getComputedStyle(Bullet).left) >= Number.parseInt(getComputedStyle(Enemies[0]).left)){
            Background.removeChild(Enemies.shift());
            Background.removeChild(Bullet);
            clearInterval(Interval);
            console.log("Hit!");

        }
        Bullet.style.left = Number.parseInt(getComputedStyle(Bullet).left) + 300 + "px";

    },100);
}
function MoveEnemies(Background , div, Character) {

    let Interval = setInterval(() => {
        let CharHitBox = Character.getBoundingClientRect();
        let EnemyHitBox = div.getBoundingClientRect();
        if (CharHitBox.x <= EnemyHitBox.x && (CharHitBox.x + CharHitBox.width) >= EnemyHitBox.x) {
            console.log("Enemy is inside of character Bounds.");
            clearInterval(Interval);
            Background.removeChild(div);
        } else {
            //console.log(Number.parseInt(getComputedStyle(div).left));
            //div.style.left = Number.parseInt(getComputedStyle(Character).left) + Number.parseInt(getComputedStyle(Character).width) + "px";
            div.style.left = Number.parseInt(getComputedStyle(div).left) - 50 + "px";
        }
    }, 100);
}
function SpawnEnemies(BackGround){
    let NewEnemies = document.createElement("div");
    NewEnemies.className = "BasicEnemy";
    BackGround.appendChild(NewEnemies);
    return NewEnemies;
}
function timer(Background, Clock) {
    if (Clock < 12) {
        if (Clock < 6) {

            Background.style.backgroundColor = DayCycle[Clock % 6];
        } else if (Clock < 12) {

            Background.style.backgroundColor = DayCycle[5 - Clock % 6];
        }
    } else {

        if (Clock < 18) {

            Background.style.backgroundColor = NightCycle[5 - Clock % 6];
        } else if (Clock < 24) {

            Background.style.backgroundColor = NightCycle[Clock % 6];
        }

    }

    if (Clock > 23) {
        return 0;
    } else {
        return Clock + 1;
    }
}
