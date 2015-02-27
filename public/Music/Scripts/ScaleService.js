app.service('ScaleService', function(NoteModel, GameControlService, SettingService){

	/****************************************
	 *				 VARIABLES		    	*
	 ****************************************/

	//Scale names (olny has Major and Minor Scale)
	var _scaleNameList = ["CM","GM","DM","AM","EM","BM","FsM","DbM","AbM","EbM","BbM","FM",
						"Cmin","Dmin","Emin","Fmin","Gmin","Amin","Bmin","Csmin","Dsmin","Fsmin","Gsmin","Asmin"];
	
	//Default value/setting.
	var _xDistanceBetweenNote = 12;
	var _firstNoteXCoord = 15;
	var _firstNoteLowestInterval = 57;
	var _correctAnswerIndex = "";

	/****************************************
	 *			COMMON FUNCTIONS		   	*
	 ****************************************/

	//Construct random question.
	this.getQuestion = function(){
		var result = [];

		//Pick a random Scale.
		var randomScaleIndex = Math.floor(Math.random() * _scaleNameList.length);
		var randomScaleName = _scaleNameList[randomScaleIndex];
		var randomScale = NoteModel.getScaleWithName(randomScaleName);
		
		//console.log(randomScale);
		//Get choosen clef.
		var clefUsed = GameControlService.getClefUsed();
		
		//Construct notes.
		var noteArray = randomScale.Notes.slice();
		
		//Adjust lowest note's y coordinate on "random note mode" for better visual display.
		if(SettingService.isRandomNotePos())
			var lowestYCoord = 52;
		else
			var lowestYCoord = _firstNoteLowestInterval;	
		var notePosOnBar = 0;
		while(noteArray.length > 0){
			//console.log(lowestYCoord);
			if(SettingService.isRandomNotePos()){
				var notePos = Math.floor(Math.random() * noteArray.length);
			}
			else
				var notePos = 0;
			var noteName = noteArray.splice(notePos,1);
			var currentNote = NoteModel.getNoteWithName(noteName);
			var xCoord = _firstNoteXCoord + _xDistanceBetweenNote * notePosOnBar;

			//Picking Y Coordinate.
			var yCoord = "";
			var interval = 0;
			if(clefUsed == "G"){
				do{
					yCoord = currentNote.CoorY.G[interval];
					interval++;
				}while(yCoord > lowestYCoord);
			}
			else{
				do{
					yCoord = currentNote.CoorY.F[interval];
					interval++;
				}while(yCoord > lowestYCoord);
			}
			if(!SettingService.isRandomNotePos()){
				lowestYCoord = yCoord;
			}


			var accidential = currentNote.Accidential;
			var note = "<note value=" + noteName + " x=" + xCoord + " y=" + yCoord + " acc=" + accidential + "></note>";
			result.push(note);
			notePosOnBar++;
		}

		//Set correct answer here
		_correctAnswerIndex = randomScaleIndex;
		GameControlService.setCorrectAnswer(randomScaleName);
		return result;
	}

	//Get random answer set.
	this.getAnswerSet = function (){
		var resultSet = [];

		//Get 3 wrong answers first
		for(var i = 1; i <= 3; i++){
			var currentScaleIndex = (_correctAnswerIndex + 2 * i) % _scaleNameList.length;
			var currentScaleName = _scaleNameList[currentScaleIndex];
			var currentScale = "<answer class='squareBox' value=" + currentScaleName + " type='Scale'></answer>";
			resultSet.push(currentScale);
		}

		//Get the correct answer
		var correctAnswerName = _scaleNameList[_correctAnswerIndex];
		var correctAnswer = "<answer  class='squareBox'  value=" + correctAnswerName + " type='Scale'></answer>";
		var correctAnswerRandomIndex = Math.floor(Math.random() * 4);
		resultSet.splice(correctAnswerRandomIndex, 0, correctAnswer);

		return resultSet;
	}
});