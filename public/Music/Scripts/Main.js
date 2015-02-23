var app = angular.module('myApp', ['ngDialog']);

/****************************************
 *			 MAIN CONTROLLER 		   	*
 ****************************************/
app.controller('mainCtrl', function($window, $scope,$compile, ngDialog, NameNoteService, ChordService, ScaleService, GameControlService, SettingService){
	
	var _category = "Note";
	$scope.nextQuestionSwitch = false;

	//Check Answer respond and render respond to UI.
	$scope.checkRespond = function(){
		var respond = GameControlService.getQuestionRespond();
		var respondBox = angular.element(document.querySelector("div[id='respondBox']"));
		respondBox.append($compile(respond)($scope));

		//Display next question box.
		setTimeout(function(){
			$scope.nextQuestionSwitch = true;
			$scope.$apply();
		}, 1000);

		//Disable all answer buttons.
		angular.element(document.querySelector("div[id='answerBox']")).children().off('click');
	}

	//Routine run for "Note" game mode.
	var NameNoteRun = function(){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));

		var note = NameNoteService.getQuestion();

		//Get key signature used.
		var key = NameNoteService.getKey();
		questionBox.append($compile(key)($scope));
		questionBox.append($compile(note)($scope));

		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get answers for the question.
		var answerSet = NameNoteService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		for(i = 0; i < answerSet.length; i++){
			var answer = answerSet[i];
			answerBox.append(answer);
		}
		$compile(answerBox)($scope);
	};

	//Routine run for "Chord" game mode.
	var ChordRun = function(){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		
		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get question
		var notes = ChordService.getQuestion();
		for(i =0; i < notes.length; i++){
			var note = notes[i];
			questionBox.append($compile(note)($scope));
		}

		//Get answers for the question.
		var answerSet = ChordService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		
		for(i = 0; i < answerSet.length; i++){
			var answer = answerSet[i];
			answerBox.append(answer);
		}
		$compile(answerBox)($scope);
	};

	//Routine run for "Chord" game mode.
	var ScaleRun = function(){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		
		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get question
		var notes = ScaleService.getQuestion();
		for(i =0; i < notes.length; i++){
			var note = notes[i];
			questionBox.append($compile(note)($scope));
		}

		//Get answers for the question.
		var answerSet = ScaleService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		
		for(i = 0; i < answerSet.length; i++){
			var answer = answerSet[i];
			answerBox.append(answer);
		}
		$compile(answerBox)($scope);
	};

	//Construct new question.
	$scope.nextQuestion = function(){
		$scope.nextQuestionSwitch  = false;

		//Clear out the question box.
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		questionBox.children().remove();
		GameControlService.gameStart();

		//Random game mode for now.
		var questionType = SettingService.getQuestionType();
		_category = questionType[Math.floor(Math.random() * questionType.length)];
		if(_category == "Note")
			NameNoteRun();
		else if(_category == "Chord")
			ChordRun();
		else
			ScaleRun();

		//Add question text.
		questionBox.append(GameControlService.getQuestionText(_category));
	};

	//Open setting menu.
	$scope.openSetting = function(){
		ngDialog.open({
			template : 'setting.html',
			className: 'ngdialog-theme-default'});
	}

	//Recompile size when orientation change.
	angular.element($window).bind('orientationchange', function(){
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		$compile(answerBox)($scope);
		$compile(questionBox)($scope);
	});

	//Listen for setting change.
	$scope.$on('settingApplied', function(){
		ngDialog.close();
		$scope.nextQuestion();
	});

	$scope.nextQuestion();
});
app.controller('settingCtrl', function($rootScope, $scope, SettingService){
	//Load setting back.
	//Question type.
	$scope.noteType = SettingService.isNoteType();
	$scope.chordType = SettingService.isChordType();
	$scope.scaleType = SettingService.isScaleType();

	//Chord Setting
	$scope.inversionChord = SettingService.isChordInverted();

	//Apply setting
	$scope.applySetting = function(){
		SettingService.saveQuestionType($scope.noteType, $scope.chordType, $scope.scaleType);
		SettingService.saveChordSetting($scope.inversionChord);
		$rootScope.$broadcast('settingApplied');
	};

	//Reset to default
	$scope.defaultSetting = function(){
		$scope.noteType = true;
		$scope.chordType = true;
		$scope.scaleType = true;
		$scope.inversionChord = true;
	};
});
/****************************************
 *		  UI ELEMENT DIRECTIVES 	   	*
 ****************************************/
app.directive('note', function(GameControlService){
	return{
		scope: {
			x : '@',
			y : '@',
			acc : '@'
		},
		template: "<accidential type='{{ acc }}'></accidential>",
		link : function(scope, element){
			//Pick a random node
			var noteDuration = GameControlService.getNoteDuration();
			element.css('background-image', noteDuration);
			element.css('left', scope.x + '%');
			element.css('top', scope.y + '%');

			//Add extra line if needed.
			GameControlService.addExtraLine(scope.x, scope.y);
		}
	}
});	
app.directive('accidential', function(){
	return {
		scope : {
			type : '@'
		},
		link : function(scope, element){
			element.css('background-image', 'url(img/Accidential/' + scope.type + '.png)');
		}
	}
})

app.directive('answer', function(GameControlService){
	return {
		link : function(scope, element, attrs){
			element.css('background-image', 'url(img/Answer/' + attrs.type + "/" + attrs.value + '.png)');
			//element.css('background-image', 'url(img/Answer/Note/test.png)');
			element.bind('click', function(){
				GameControlService.isCorrectAnswer(attrs.value);	
				scope.checkRespond();
				element.addClass('animated rotateOutDownLeft')
				//element.addClass('animated hinge');;
			});	

		}
	}
})
app.directive('respond', function($window){
	return {
		scope: {
			type : '@'
		},
		controller: function($scope){
			var randomRespondIndex = Math.floor(Math.random() * 4 + 1);
			if($scope.type == "R"){
				$scope.bkground = 'url(img/Respond/Correct/' + randomRespondIndex + '.png)';
			}
			else
				$scope.bkground = 'url(img/Respond/Wrong/' + randomRespondIndex + '.png)';
		},
		template : '{{ display }}',
		link : function(scope, element){
			element.css('background-image', scope.bkground);
			element.addClass('bounceIn');
		}
	}
});
app.directive('key', function(){
	return {
		scope : {
			value : '@',
			clef : '@'
		},
		link: function(scope, element){
			if(scope.clef == "F")
				element.css('top', '5%');
			element.css('background-image', 'url(img/Key/' + scope.value + '.png)');
		}
	}
});

/****************************************
 *		   CSS CLASS DIRECTIVES	 	  	*
 ****************************************/

 //This class to make sure question has a fixed size ratio.
app.directive('questionBoxSize',function($compile){
	return {
		restrict: 'C',
		link : function(scope, element, attrs){
			var elemWidth = element[0].offsetWidth;
			var elemHeight = elemWidth / 2.3;
			element.css("height", elemHeight + 'px');
		}
	}
});

app.directive('squareBox', function($window){
    return{
        restrict: 'C',
        link: function(scope, element){
            var style = $window.getComputedStyle(element[0], null);
            var width = style.getPropertyValue('width');
            element.css('height', width);
        }
    }
});



