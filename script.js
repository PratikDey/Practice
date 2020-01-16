///////////////////
//CODING CHALLENGE

/*
1. Build a function constructor called Question to describe 
a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (
   choose an adequate data structure here, array, object, etc.)
c) correct answer (choose a number for this)   

2. Create a couple of questions using the constructor

3. Store them all inside an array.

4. Select one random question and log it into the console, together
with the possible answers

5. Use the prompt function to ask the user for the correct answer.
   The user should input the number of the correct answer such as you
   such as you displayed on the task 4.

6. Check if the answer is correct and print to the console wheather the
   answer is correct or not (Hint: write another method for this).

7. Suppose this code would be a plugin for the other programmers to use 
   in their code. So make sure that all your code is private and doesn't 
   interfere with the other programmers' code (Hint: we learned a special 
   technique to do exactly that).





//////////////////
// EXPERT LEVEL

8. After you display the result, display the next random question, 
	so that the game never ends (Hint: write a function for this and call it right after displaying the result)
9. Be careful: 
	after Task 8, the game literally never ends. 
	So include the option to quit the game if the user writes 'exit' instead of the answer. 
	In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun!
	So each time an answer is correct, add 1 point to the score
	(Hint: I'm going to use the power of closures for this, but you don't have to, 
	just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this.
*/



(function(){
		var Question = function(question, answer, correct) {
		this.question = question,
		this.answer = answer,
		this.correct = correct
	};

	Question.prototype.displayQuestion = 
		function() {
			console.log(this.question);
			for (var i=0; i<this.answer.length; i++){
				console.log(i + ': ' + this.answer[i]);
			}	
		}

	Question.prototype.checkAnswer = function(ans, callback) {
		var sc;
		if(ans === this.correct) {
			console.log('Correct!')
			sc = callback(true);
		}else{
			console.log('You can do better now.')
			sc = callback(false);
		}

		this.displayScore(sc);
	} 

	Question.prototype.displayScore = function(score) {
		console.log('Your current score is: ' + score);
		console.log('------------------------------------------------');
	}

	var questionOne = new Question('Is your favourite language javascript?',['Yes','No'], 0);
	var questionTwo = new Question('Is my name Pratik?', ['Yes','No'], 0);
	var questionStorage = [questionOne, questionTwo];
	
	function score() {
		var sc = 0;
		return function(correct) {
			if(correct) {
				sc++;
			}
			return sc;
		}
	}

	var keepScore = score();


	function nextQuestion() {
		
		var randomSelection = Math.floor(Math.random(questionStorage) * questionStorage.length);

		questionStorage[randomSelection].displayQuestion();

		var answers = prompt('Please select the correct answer.');

		if(answers !== 'exit') {
			questionStorage[randomSelection].checkAnswer(parseInt(answers), keepScore);
			nextQuestion();
		}
	}	
	nextQuestion();
})();