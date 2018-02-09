var app=angular.module("HangmanApp",[]);
app.controller("GameController",['$scope','$timeout',function($scope,$timeout){

	var words=["jaipur","allahabad","orissa","dhanbad","uttrakhand","rajasthan","kharagpur","manipur","kerala","bangalore","gurugram","vishakhapatnam","raipur","bhopal","sikkim","maharashtra","madhyapradesh","mumbai","kolkata"];
	$scope.incorrectLetters=[];
	$scope.correctLetters=[];
	$scope.won = 0;
	$scope.lost = 0;
	$scope.guesses = 6;
	$scope.displayWord = '';
	$scope.input = {
		letter : ''
	}

	var selectRandomWord = function () {
		var index = Math.round(Math.random()*words.length);
		return words[index];
	}

	var newGame = function(){
		$scope.incorrectLetters=[];
		$scope.correctLetters=[];
		$scope.guesses = 6;
		$scope.displayWord = '';
		selectedWord = selectRandomWord();
		var tempDisplayWord = '';
		for (var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord+='*';
		}
		$scope.displayWord = tempDisplayWord;
	}

	$scope.letterChoosen = function(){
		for (var i = 0; i < $scope.correctLetters.length; i++) {
			if($scope.correctLetters[i].toLowerCase()==$scope.input.letter.toLowerCase()){
				$scope.input.letter = "";
				return;
			}
		}
		for (var i = 0; i < $scope.incorrectLetters.length; i++) {
			if($scope.incorrectLetters[i].toLowerCase()==$scope.input.letter.toLowerCase()){
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = 0; i < selectedWord.length; i++) {
			if(selectedWord[i].toLowerCase()==$scope.input.letter.toLowerCase()){
				$scope.displayWord = $scope.displayWord.slice(0,i)+$scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
				correct = true;
			}
		}

		if(correct) {
			$scope.correctLetters.push($scope.input.letter.toUpperCase());
		} else {
			$scope.guesses--;
			$scope.incorrectLetters.push($scope.input.letter.toUpperCase());
		}
		$scope.input.letter="";
		if($scope.guesses==0){
			alert("You Lost !! Try Again !!!");
			$scope.lost++;
			$timeout(function(){
				newGame();
			},1500);
		}
		if($scope.displayWord.indexOf("*")==-1){
			alert("Congrats !! You Won !!!");
			$scope.won++;
			$timeout(function(){
				newGame();
			},1500);
		}
	}

	newGame();

}]);
