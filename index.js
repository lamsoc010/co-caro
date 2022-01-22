const CELLS = 10;
        const COLUMS = 10;
        let arr = [];
        let player = 1;
        let positionCurrent = [];
        let isGameOver = false;

        let scorePlayer1 = 0;
        let scorePlayer2 = 0;

        function start() {
            drawGame(arr);
        }
        function reset() {
            arr = [];
            drawGame(arr);
            isGameOver = false;
        }

        function undo() {
            if(!isGameOver) {
                // Lấy toạ độ i và j của phần tử cuối cùng đã lưu ở bước đi
                let i = positionCurrent[positionCurrent.length - 1][0];
                let j = positionCurrent[positionCurrent.length - 1][1];

                // Xoá phần tử cuối cùng đó đi
                positionCurrent.pop();
                
                arr[i][j] = '*';
                document.getElementById(`cell-${i}-${j}`).innerHTML = "";
                if(player == 1) {
                    player = 2
                } else {
                    player = 1;
                }
            }
        }

        function drawGame(arr) {
            let htmls = ``;
            for(let i = 0; i < CELLS; i++) {
                arr[i] = [];
                htmls += `<tr>`;
                for(let j = 0; j < COLUMS; j++) {
                    arr[i][j] = '*'
                    htmls += `<td id = "cell-${i}-${j}" onclick="play(${i}, ${j})"></td>`
                } 
                htmls += `</tr>`;
                
            }
            document.getElementById('game-board').innerHTML = htmls;
        }

        function play(i, j) {
            if(!isGameOver && arr[i][j] == '*' ) {
                // Thêm các vị trí đi vào mảng
                positionCurrent.push([i,j]);

                let input = document.getElementById(`cell-${i}-${j}`);
                if(player == 1) {
                    input.innerHTML = "X";
                    input.style.color = 'blue';
                    arr[i][j] = "X";
                    player = 2;
                } else {
                    input.innerHTML = "O";
                    input.style.color = 'red';
                    arr[i][j] = "O";
                    player = 1;
                }
                checkWin(i, j);
            }
        }
        function checkWin(i, j) {
            gameOver(duongCheoNgang(i,j));
            gameOver(duongCheoDoc(i,j));
            gameOver(duongCheoXuoi(i, j));
            gameOver(duongCheoNguoc(i, j));
            
        }

        function duongCheoNgang(i,j) {
            let x = 1;
            var count = 1;
            while(j - x >= 0 && arr[i][j-x] == arr[i][j]) {
                count++;
                x++;
            }

            let y = 1;
            while(j+y < CELLS && arr[i][j+y] == arr[i][j]) {
                count++;
                y++;
            }
            return count;
        }

        function duongCheoDoc(i, j) {
            let x = 1;
            var count = 1;
            while(i - x >= 0 && arr[i - x][j] == arr[i][j]) {
                count++;
                x++;
            }

            let y = 1;
            while(i + y < COLUMS && arr[i + y][j] == arr[i][j]) {
                count++;
                y++;
            }
            return count;
        }

        function duongCheoXuoi(i, j) {
            let x = 1;
            var count = 1;
            while(i - x >= 0 && j - x >= 0 && arr[i - x][j - x] == arr[i][j]) {
                count++;
                x++;
            }

            let y = 1;
            while(i + y < COLUMS && j + y < CELLS && arr[i + y][j + y] == arr[i][j]) {
                count++;
                y++;
            }
            return count;
        }

        function duongCheoNguoc(i, j) {
            let x = 1;
            var count = 1;
            while(i + x < COLUMS && j - x >= 0 && arr[i + x][j - x] == arr[i][j]) {
                count++;
                x++;
            }

            let y = 1;
            while(i - y >= 0 && j + y < CELLS && arr[i - y][j + y] == arr[i][j]) {
                count++;
                y++;
            }
            return count;
        }



        function gameOver(count) {
            if(count == 5) {
                let player1 = document.getElementById('player1');
                let player2 = document.getElementById('player2');
                isGameOver = true;
                alert(`Player ${player} chiến thắng, chúc mừng bạn được thêm 20 điểm`);
                if(player == 1) {
                    scorePlayer1 += 20;
                    player1.innerHTML = `Player ${player}: ${scorePlayer1} `;
                } else {
                    scorePlayer2 += 20;
                    player2.innerHTML = `Player ${player}: ${scorePlayer2} `;
                }
            }
        }