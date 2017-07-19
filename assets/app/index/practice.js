(function () {
		app.controller('practiceCtr', function($scope, $http){
			var jlpt = window.location.pathname.split('/')[2];
			var type = window.location.pathname.split('/')[3];
			$scope.correctAnswer = undefined;
			$scope.answerChoice = undefined;
			$scope.getRandomRecord = function(){
				$scope.correctAnswer = undefined;
				$scope.answerChoice = undefined;
				$scope.loading = true;
				$http.post("/question/randomrecord",{type:type, jlpt:jlpt},{}).then(function(res){
					$scope.loading = false;
		  			if(res.data.message == 'success'){
						$scope.question = res.data.question;
						$scope.question.answer = utils.shuffle($scope.question.answer);
		  			}
		  			else if(res.data.message == 'not_enough_question'){
		  				utils.alert({
	                        title:'Thông báo',
	                        msg: 'Chúng tôi không đủ câu hỏi cho bộ đề này.',
	                        callback:function(){
	                        	window.location.href = window.location.origin;
	                        },
	                        callbackClose:function(){
	                        	window.location.href = window.location.origin;
	                        }
	                    });
		  			}else{
		  				utils.alert({
	                        title:'Thông báo',
	                        msg: 'Có lỗi gì đó xảy ra.',
	                        callback:function(){
	                        	window.location.href = window.location.origin;
	                        },
	                        callbackClose:function(){
	                        	window.location.href = window.location.origin;
	                        }
	                    });
		  			}
		  		}).catch(function(err){
		  			utils.alert({
	                    title:'Thông báo',
	                    msg: 'Có lỗi gì đó xảy ra.',
                        callback:function(){
                        	window.location.href = window.location.origin;
                        },
                        callbackClose:function(){
                        	window.location.href = window.location.origin;
                        }
	                });
		  		});
			}
			$scope.getRandomRecord();
			$scope.getAnswer = function(_ansId){
				if($scope.correctAnswer != undefined) return;
				$http.post("/question/getanswercorrect",{questionId:$scope.question.id},{}).then(function(res){
					$scope.loading = false;
		  			if(res.data.message == 'success'){
		  				$scope.answerChoice = _ansId;
		  				$scope.correctAnswer = res.data.answer.id;
		  			}else{
		  				utils.alert({
	                        title:'Thông báo',
	                        msg: 'Có lỗi gì đó xảy ra.'
	                    });
		  			}
		  		}).catch(function(err){
		  			utils.alert({
	                    title:'Thông báo',
	                    msg: 'Có lỗi gì đó xảy ra.'
	                });
		  		});
			}
			$scope.next = function(){
				$scope.getRandomRecord();
			}
		});
	})();