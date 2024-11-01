'use strict'

/* home.htmlの画像をクリックしたら、detail.htmlに遷移 */
const params = new URLSearchParams(window.location.search); // インスタンス化（コンストラクタ）
// console.log(window.location.search); // -> ?category=todo/?category=shopping/?category=travel/?category=movie

// 4行目でhome.htmlのhrefで指定した、キーとバリューをparamsに代入する
// 代入後のイメージ ↓
// const params = {
//     category: "todo" or "shopping" or "travel" or "movie"    
// };

// オブジェクトからキーを使ってバリューを取得（getがルールとして記載必要）
const getElement = {
    todo : {title : "TO DO", image : 'Todo.jpg',},
    shopping : {title : "SHOPPING", image : 'Shopping.jpg'},
    travel : {title : "TRAVEL", image : 'Travel.jpg'},
    movie : {title : "MOVIE", image : 'Movie.jpg'}
}

/*headerを変更*/ 
const getTitle = getElement[params.get("category")].title;
// console.log(getTitle);
document.getElementById('header-title').textContent = getTitle;

/*backgroundを変更*/
const getImage = getElement[params.get("category")].image;
// console.log(getTitle);
document.getElementById('background-image').style.backgroundImage =`url('${getImage}')`;



let ul = document.getElementById('list');
/* ADDを押すと、リストに追加される */
document.getElementById('add-button').addEventListener('click', function(){
    let li = document.createElement('li');
    li.innerHTML = document.getElementById('input-box').value;
    ul.appendChild(li);
    
    /* "X"を追加*/
    let span = document.createElement("span");
    let deleteButton = document.createTextNode("\u00D7");
    span.className = "delete-button";
    span.appendChild(deleteButton);
    li.appendChild(span);  

    /* "X"を押すと、削除される*/
    span.addEventListener('click', function() {
        ul.removeChild(li);
    })

    /* リスト追加後に、検索欄に入力したテキストを削除する*/
    document.getElementById('input-box').value = "";
});




document.querySelector('ul').addEventListener('click', function(event) {
    if(event.target.tagName === "LI") { //クリックされた要素がliタグであるかを確認
        let clickedItem = event.target; //クリックしたli要素を取得
        /* 取り消し線の切り替え*/
        if(clickedItem.style.textDecoration === "line-through") {
            clickedItem.style.textDecoration = "none";  //取り消し線を削除
        } else {
            clickedItem.style.textDecoration = "line-through"; //取り消し線を追加
        }

        /* チェックマークの切り替え*/
        let checkMark = clickedItem.querySelector('.check-mark');
        if (checkMark) {
            clickedItem.removeChild(checkMark); // チェックマークを削除
        } else {
            let span = document.createElement('span');
            span.className = "check-mark";
            clickedItem.appendChild(span); // チェックマークを追加
        }

        /* グレーに変更する*/
        if (clickedItem.style.backgroundColor === "gray") {
            clickedItem.style.backgroundColor = ""; // 元の色に戻す
        } else {
            clickedItem.style.backgroundColor = "gray"; // グレーに変更
        }
    }
});
