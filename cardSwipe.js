const frame = document.querySelector('.frame');
// 프레임을 가져옴
const imgs = ['./img1.jpg', './img2.jpg', './img3.jpg', './img4.jpg', './img5.jpg'];

let imageCount = 0;

for (let i = 0; i < 5; i++){
    appendCard();
}
// 카드 5개를 동적으로 넣어줌
let current = frame.querySelector('.card:last-child');
let startX = 0, startY = 0, moveX = 0; moveY = 0;
addEventListener(current);
// 이벤트 넣어주기
// 가장 마지막 자식이 최상단에 있음 라스트 차일드로 가져온걸 현재카드에 넣어준다
// 모든 무브 초기화

document.querySelector('#hate-btn').onclick = () => {
    moveX = -1
    moveY = 0
    complete()
}

document.querySelector('#like-btn').onclick = () => {
    moveX = 1
    moveY = 0
    complete()
}

function appendCard() {
    const firstCard = frame.children[0];
    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.style.backgroundImage = `url(${imgs[imageCount++ % imgs.length]})`
    if(firstCard) frame.insertBefore(newCard, firstCard);
    else frame.appendChild(newCard);
}
// 카드를 추가할 때 마다 첫번째 자식 전에 넣어줘야 하기 때문에 퍼스트 카드와 뉴카드를 선언
// 첫 번째 카드가 있으면 앞에 새 카드를 넣어주고
// 맨 첫번째 카드를 넣을때 appendChild로 넣어주기
// 카운트를 배열의 길이로 나눈 나머지 0으로 시작해서 카운트 ++ 해주면 함수 호출 시 마다 반복이 되며 이미지가 반복

function addEventListener(card){
    card.addEventListener('pointerdown', onPointerDown);
}
// 최상단 카드에 포인터 다운을 넣어줌
function setTransform(x, y, deg, duration){
    current.style.transform = `translate3d(${x}px, ${y}px, 0)`
    if (duration) current.style.transition = `transform ${duration}ms`
}

function onPointerDown(e){ 
    startX = e.clientX;
    startY = e.clientY;
    current.addEventListener('pointermove', onPointerMove);
    current.addEventListener('pointerup', onPointerUp);
    current.addEventListener('pointerleave', onPointerUp);
}
// 포인터 다운이 일어낫을때를 선언 아직은 공부가 더 필요
function onPointerMove(e){
    moveX = e.clientX - startX;
    moveY = e.clientY - startY;

    setTransform(moveX, moveY, moveX / innerWidth * 50);
}
// 포인터 무브를 선언 아직은 공부가 더 필요
// 보여지는 화면 과 moveX한 값이 기울기 조절
function onPointerUp(e){
    current.removeEventListener('pointermove', onPointerMove);
    current.removeEventListener('pointerup', onPointerUp);
    current.removeEventListener('pointerleave', onPointerUp);
    if(Math.abs(moveX) > frame.clientWidth / 2){
        current.removeEventListener('pointerdown', onPointerDown);
        complete();
    }else{
        cancle();
    }
}
// 카드를 재 위치 시키면서 이벤트들을 지우고 덜 날라갓다면 다시 재위치 시키는 함수
function complete(){
    // 날아가는 트랜지션 500ms
    const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.1;
    const flyY = (moveY / moveX) * flyX;
    setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth * 0.5);

    // 카드 교체식
    const prev = current;
    const next = current.previousElementSibling;
    current = next;
    addEventListener(next);
    appendCard();
    setTimeout(() => frame.removeChild(prev), 500)
}

function cancle(){
    setTransform(0, 0, 0, 100);
    setTimeout(() => current.style.transition = '', 100)
}
// 초기화 상태로 돌아옴