/* Chord Service: Handles "Chord" game mode functionality */
app.service('ChordService', function(NoteModel, GameControlService, SettingService){

	/****************************************
	 *				 VARIABLES		    	*
	 ****************************************/

	//Chord names (olny has Major and Minor Chord)
	var _chordNameList = ["CM", "CsM", "DbM", "DM", "DsM", "EbM", "EM", "FM", "FsM", "GbM", "GM", "GsM", "AbM", "AM", "AsM", "BbM", "BM",
						"Cmin", "Csmin", "Dbmin", "Dmin", "Dsmin", "Ebmin", "Emin", "Fmin", "Fsmin", "Gbmin", "Gmin", "Gsmin", "Abmin", "Amin", "Asmin", "Bbmin", "Bmin"];
	
	//Default value/setting.
	var _xDistanceBetweenNote = 17;
	var _firstNoteXCoord = 30;
	var _firstNoteLowestInterval = 59;
	var _correctAnswerIndex = "";
	
	/****************************************
	 *			COMMON FUNCTIONS		   	*
	 ****************************************/

	//Return random chord inversion.
	var _getChordInversion = function (root, _3rdnote, _5thnote){
		var randomChordInversion = Math.floor(Math.random() * 6);
		//Root position.
		if(randomChordInversion == 0)
			return [root, _3rdnote, _5thnote];
		if(randomChordInversion == 1)
			return [root, _5thnote, _3rdnote];
		
		//First Inversion
		if(randomChordInversion == 2)
			return [_3rdnote, root, _5thnote];
		if(randomChordInversion == 3)
			return [_3rdnote, _5thnote, root];
		
		//Second Inversion.
		if(randomChordInversion == 4)
			return [_5thnote, _3rdnote, root];
		if(randomChordInversion == 5)
			return [_5thnote, root ,_3rdnote];
	}

	//Construct random question.
	this.getQuestion = function(){
		var result = [];

		//Pick a random chord.
		//If key is in used then.
		var keyUsed = GameControlService.getKeyNameUsed();
		if(SettingService.isKeyUsedinChord()){
			var chordsWithKey = NoteModel.getChordInKey(keyUsed); 
			var randomChordIndex = Math.floor(Math.random() * chordsWithKey.length);
			var randomChordName = chordsWithKey[randomChordIndex];
		}
		else{
			var randomChordIndex = Math.floor(Math.random() * _chordNameList.length);
			var randomChordName = _chordNameList[randomChordIndex];
		}
		var randomChord = NoteModel.getChordWithName(randomChordName);

		//console.log(randomChordName); //DEBUG
		//Get root, 3rd and 5th note.
		var rootName = randomChord.Notes[0];
		var root = NoteModel.getNoteWithName(rootName);
		var _3rdNoteName = randomChord.Notes[1];
		var _3rdNote = NoteModel.getNoteWithName(_3rdNoteName);
		var _5thNoteName = randomChord.Notes[2];
		var _5thNote = NoteModel.getNoteWithName(_5thNoteName);

		//Get choosen clef.
		var clefUsed = GameControlService.getClefUsed();
		
		//Construct notes.
		if(SettingService.isChordInverted()){
			var noteArray = _getChordInversion(root, _3rdNote, _5thNote);
			var lowestInterval = _firstNoteLowestInterval;
		}
		else{
			var noteArray = [root,_3rdNote,_5thNote];
			var lowestInterval = 50;
		}
		var lowestYCoord = lowestInterval;
		for(var i = 0; i < noteArray.length; i++){
			var currentNote = noteArray[i];
			var noteName = currentNote.Name;
			var xCoord = _firstNoteXCoord + _xDistanceBetweenNote * i;
			var yCoord = "";
			var interval = 0;
			if(clefUsed == "G"){
				do{
					yCoord = currentNote.CoorY.G[interval];
					interval++;
				}while(yCoord > lowestYCoord);
				lowestYCoord = yCoord;
			}
			else{
				do{
					yCoord = currentNote.CoorY.F[interval];
					interval++;
				}while(yCoord > lowestYCoord);
				lowestYCoord = yCoord;
			}
			lowestYCoord = yCoord;
			if(SettingService.isKeyUsedinChord()){
				if(noteName == "Fx" || noteName == "Bbb" || noteName == "Cx")
					var accidential = currentNote.Accidential;
				else
					var accidential = 'none';
			}
			else
				var accidential = currentNote.Accidential;
			var note = "<note value=" + noteName + " x=" + xCoord + " y=" + yCoord + " acc=" + accidential + "></note>";
			result.push(note);
		}

		//Set correct answer here
		if(SettingService.isKeyUsedinChord()){
			var correctAnswerIndex = "";
			for(var i = 0; i < _chordNameList.length; i++){
				if(_chordNameList[i] == randomChordName){
					correctAnswerIndex = i;
					break;
				}
			}
			_correctAnswerIndex = correctAnswerIndex;
		}
		else
			_correctAnswerIndex = randomChordIndex;
		GameControlService.setCorrectAnswer(randomChordName);
		return result;
	}

	//Get random answer set.
	this.getAnswerSet = function (){
		var resultSet = [];

		//Get 3 wrong answers first
		for(var i = 1; i <= 3; i++){
			var currentChordIndex = (_correctAnswerIndex + 2 * i) % _chordNameList.length;
			var currentChordName = _chordNameList[currentChordIndex];
			var currentChord = "<answer class='squareBox' value=" + currentChordName + " type='Chord'></answer>";
			resultSet.push(currentChord);
		}

		//Get the correct answer
		var correctAnswerName = _chordNameList[_correctAnswerIndex];
		var correctAnswer = "<answer  class='squareBox'  value=" + correctAnswerName + " type='Chord'></answer>";
		var correctAnswerRandomIndex = Math.floor(Math.random() * 4);
		resultSet.splice(correctAnswerRandomIndex, 0, correctAnswer);

		return resultSet;
	}

	//Return key signature used for this question.
	this.getKey = function(){
		var key = "<key value=" + _keyUsed + " clef=" + _clefUsed + " ></key>";
		return key;
	}

});