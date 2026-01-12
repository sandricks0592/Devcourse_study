// var vs let vs cont
            function compareVariable() {
                let num1 = 10;
                const num2 = 30;
                alert('num1 : ' + num2);
            }


            // ID 란에 입력된 값을 팝업창에 띄우기
            function popId() {
                let userId = document.getElementById('txt_id').value;
                let userPW = document.getElementById('txt_pw').value;
                if (!userId ) {
                    // = userId == ''
                    alert('아이디를 입력해주세요.');
                }
                else {
                    alert(document.getElementById('txt_id').value);
                }

            }
            
            // 나만의 함수 만들고, 버튼을 클릭하면 호출하기
            function firstFuction () {
                alert('1');
                alert('2');
                alert('3');
            }