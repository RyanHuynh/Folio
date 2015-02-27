/* Note Service: Handles "Note" game mode functionality */
app.service('NameNoteService', function(NoteModel, GameControlService){
	
	/****************************************
	 *				 VARIABLES		    	*
	 ****************************************/

	var _noteNameList = ["Cb", "C", "Cs", "Db", "D", "Ds", "Eb", "E", "Es", "Fb", "F", "Fs", "Gb", "G", "Gs", "Ab", "A", "As", "B", "Bb","Bs"];
	var _correctAnswerIndex = "";
	var _defaultXCoord = 50;
	
	/****************************************
	 *			COMMON FUNCTIONS		   	*
	 ****************************************/

	//Get a random question.
	this.getQuestion = function(){

		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();

		//Get key signature.
		var keyName = GameControlService.getKeyNameUsed();

		//Get random note.
		var noteArray = NoteModel.getNotesInKey(keyName);
		var randomIndex = Math.floor(Math.random() * noteArray.length);
		var randomNoteName = noteArray[randomIndex];
		var choosenNote = NoteModel.getNoteWithName(randomNoteName);

		//Get Y coordination of note on clef.
		if(clefUsed == "G"){
			var noteOnClefArray = choosenNote.CoorY.G;
		}
		else
			var noteOnClefArray = choosenNote.CoorY.F;

		//Construct note.
		var randomYCoordIndex = Math.floor(Math.random() * noteOnClefArray.length);
		var yCoord = noteOnClefArray[randomYCoordIndex];
		var note = "<note x=" + _defaultXCoord + " y=" + yCoord + " acc='none'></note>";

		//Set correct answer
		var correctAnswerIndex = "";
		for(var i = 0; i < _noteNameList.length; i++){
			if(_noteNameList[i] == randomNoteName){
				correctAnswerIndex = i;
				break;
			}
		}
		_correctAnswerIndex = correctAnswerIndex;
		GameControlService.setCorrectAnswer(randomNoteName);

		return note;
	}

	//Construct a random answer set.
	this.getAnswerSet = function(){
		var resultSet = [];

		//Get 3 wrong answers
		for(i = 1; i <= 3; i++){
			var currentNoteIndex = (_correctAnswerIndex + 2 * i) % _noteNameList.length;
			var currentNoteName = _noteNameList[currentNoteIndex];
			var currentNote = "<answer class='squareBox' value=" + currentNoteName + " type='Note'></answer>";
			resultSet.push(currentNote);
		}

		//Add correct answer
		var correctAnswer = _noteNameList[_correctAnswerIndex];
		var cAnswer = "<answer  class='squareBox'  value=" + correctAnswer + " type='Note'></answer>";
		var randomInsertIndex = Math.floor(Math.random() * 4);
		resultSet.splice(randomInsertIndex, 0, cAnswer);

		return resultSet;

	}
});