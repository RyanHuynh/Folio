/* Note Model : transport Note/Chord model to services. */
app.service('NoteModel', function(){

	/************************************
	 *			  RESOURCES	    		*
	 ************************************/

	//Note models.
	var C = {	Name: "C",
				Accidential : "none",
				Key: ["C", "G", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [57,39.5,23.3] , F : [61.5,44.5,28] }};
	var Cb= {	Name: "Cb",
				Accidential : "f",
				Key: [],
				CoorY: { G: [57,39.5,23.3] , F : [61.5,44.5,28] }};
	var Cx = {	Name: "Cx",
				Accidential : "x",
				Key: [],
				CoorY: { G: [57,39.5,23.3] , F : [61.5,44.5,28] }};
	var Cs = {	Name: "Cs",
				Accidential : "s",
				Key: ["D", "A", "E", "B", "Fs"],
				CoorY: { G: [57,39.5,23.3] , F : [61.5,44.5,28] }};
	var Db = {	Name: "Db",
				Accidential : "f",
				Key: ["Ab", "Db", "Gb"],
				CoorY: { G: [55,37,21] , F : [59,42,26] }};
	var D = {	Name: "D",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "F", "Bb", "Eb"],
				CoorY: { G: [55,37,21] , F : [59,42,26] }};
	var Ds = {	Name: "Ds",
				Accidential : "s",
				Key: ["E", "B", "Fs"],
				CoorY: { G: [55,37,21] , F : [59,42,26] }};
	var Eb = { 	Name: "Eb",
				Accidential : "f",
				Key: ["Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [52,35,21] , F : [57,39.5,23.3] }};
	var E = { 	Name: "E",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "E", "B", "F"],
				CoorY: { G: [52,35] , F : [57,39.5,23.3] }};
	var Es = { 	Name: "Es",
				Accidential : "s",
				Key: [],
				CoorY: { G: [52,35] , F : [57,39.5,23.3] }};
	var F = {	Name: "F",
				Accidential : "none",
				Key: ["C", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [49.5,32.5] , F : [55,37,21] }};		
	var Fx = {	Name: "Fx",
				Accidential : "x",
				Key:[],
				CoorY: { G: [49.5,32.5] , F : [55,37,21] }};
	var Fs = {	Name: "Fs",
				Accidential : "s",
				Key: ["G","D","A","E","B","Fs"],
				CoorY: { G: [49.5,32.5] , F : [55,37,21] }};		
	var Fb = {	Name: "Fb",
				Accidential : "f",
				Key: [],
				CoorY: { G: [49.5,32.5] , F : [55,37,21] }};		
	var Gb = { 	Name: "Gb",
				Accidential : "f",
				Key: ["Db", "Gb"],
				CoorY: { G: [63.5,47,30] , F : [52,35] }};
	var G = { 	Name: "G",
				Accidential : "none",
				Key: ["C", "G", "D", "F", "Bb", "Eb", "Ab"],
				CoorY: { G: [63.5,47,30] , F : [52,35] }};
	var Gs = { 	Name: "Gs",
				Accidential : "s",
				Key: ["A", "E", "B", "Fs"],
				CoorY: { G: [63.5,47,30] , F : [52,35] }};
	var Ab = {	Name: "Ab",
				Accidential : "f",
				Key: ["Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [61.5,44.5,28] , F : [49.5,32.5] }};
	var A = {	Name: "A",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "E", "F", "Bb"],
				CoorY: { G: [61.5,44.5,28] , F : [49.5,32.5] }};
	var As = {	Name: "As",
				Accidential : "s",
				Key: ["B", "Fs"],
				CoorY: { G: [61.5,44.5,28] , F : [49.5,32.5] }};
	var B = { 	Name: "B",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "E", "B"],
				CoorY: { G: [59,42,26] , F : [63.5,47,30] }};
	var Bb = { 	Name: "Bb",
				Accidential : "f",
				Key: ["F", "Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [59,42,26] , F : [63.5,47,30] }};
	var Bs = { 	Name: "Bs",
				Accidential : "s",
				Key: [],
				CoorY: { G: [59,42,26] , F : [63.5,47,30] }};
	var Bbb = { Name: "Bbb",
				Accidential : "bb",
				Key: [],
				CoorY: { G: [59,42,26] , F : [63.5,47,30] }};
	var _noteList = [C, Cb, Cs, Cx, Db, D, Ds, Eb, E, Es, F, Fs, Fx, Fb, Gb, G, Gs, Ab, A, As, B, Bb, Bs, Bbb];

	//Chord Model.
	var _chordList = [ 	{ Name: "CM",
						Notes : ["C","E","G"] },
						{ Name: "CsM",
						Notes : ["Cs","Es","Gs"] },
						{ Name: "DbM",
						Notes : ["Db","F","Ab"] },
						{ Name: "DM",
						Notes : ["D","Fs","A"] },
						{ Name: "DsM",
						Notes : ["Ds","Fx","As"] },
						{ Name: "EbM",
						Notes : ["Eb","G","Bb"] },
						{ Name: "EM",
						Notes : ["E","Gs","B"] },
						{ Name: "FM",
						Notes : ["F","A","C"] },
						{ Name: "FsM",
						Notes : ["Fs","As","Cs"] },
						{ Name: "GbM",
						Notes : ["Gb","Bb","Db"] },
						{ Name: "GM",
						Notes : ["G","B","D"] },
						{ Name: "GsM",
						Notes : ["Gs","Bs","Ds"] },
						{ Name: "AbM",
						Notes : ["Ab","C","Eb"] },
						{ Name: "AM",
						Notes : ["A","Cs","E"] },
						{ Name: "AsM",
						Notes : ["As","Cx","Es"] },
						{ Name: "BbM",
						Notes : ["Bb","D","F"] },
						{ Name: "BM",
						Notes : ["B","Ds","Fs"] },

						{ Name: "Cmin",
						Notes : ["C","Eb","G"] },
						{ Name: "Csmin",
						Notes : ["Cs","E","Gs"] },
						{ Name: "Dbmin",
						Notes : ["Db","Fb","Ab"] },
						{ Name: "Dmin",
						Notes : ["D","F","A"] },
						{ Name: "Dsmin",
						Notes : ["Ds","Fs","As"] },
						{ Name: "Ebmin",
						Notes : ["Eb","Gb","Bb"] },
						{ Name: "Emin",
						Notes : ["E","G","B"] },
						{ Name: "Fmin",
						Notes : ["F","Ab","C"] },
						{ Name: "Fsmin",
						Notes : ["Fs","A","Cs"] },
						{ Name: "Gbmin",
						Notes : ["Gb","Bbb","Db"] },
						{ Name: "Gmin",
						Notes : ["G","Bb","D"] },
						{ Name: "Gsmin" ,
						Notes : ["Gs","B","Ds"] },
						{ Name: "Abmin",
						Notes : ["Ab","Cb","Eb"] },
						{ Name: "Amin",
						Notes : ["A","C","E"] },
						{ Name: "Asmin",
						Notes : ["As","Cs","Es"] },
						{ Name: "Bbmin",
						Notes : ["Bb","Db","F"] },
						{ Name: "Bmin",
						Notes : ["B","D","Fs"] }];

	//Scale Model.
	var _scaleList =[	{ Name: "CM" ,
						Notes: ["C","D","E","F","G","A","B"] },
						{ Name: "GM",
						Notes: ["G","A","B","C","D","E","Fs"] },
						{ Name: "DM",
						Notes: ["D","E","Fs","G","A","B","Cs"] },
						{ Name: "AM",
						Notes: ["A","B","Cs","D","E","Fs","Gs"]},
						{ Name: "EM",
						Notes: ["E","Fs","Gs","A","B","Cs","Ds"]},
						{ Name: "BM",
						Notes: ["B","C","Ds","E","Fs","Gs","As"]},
						{ Name: "FsM",
						Notes: ["Fs","Gs","As","B","Cs","Ds","Es"]},
						{ Name: "DbM",
						Notes: ["Db","Eb","F","Gb","Ab","Bb","C"]},
						{ Name: "AbM",
						Notes: ["Ab","Bb","C","Db","Eb","F","G"]},
						{ Name: "EbM",
						Notes: ["Eb","F","G","Ab","Bb","C","D"]},
						{ Name: "BbM",
						Notes: ["Bb","C","D","Eb","F","G","A"]},
						{ Name: "FM",
						Notes: ["F","G","A","Bb","C","D","E"]},

						{ Name: "Cmin",
						Notes: ["C","D","Eb","F","G","Ab","Bb"]},
						{ Name: "Dmin",
						Notes: ["D","E","F","G","A","Bb","C"]},
						{ Name: "Emin",
						Notes: ["E","Fs","G","A","B","C","D"]},
						{ Name: "Fmin",
						Notes: ["F","G","Ab","Bb","C","Db","Eb"]},
						{ Name: "Gmin",
						Notes: ["G","A","Bb","C","D","Eb","F"]},
						{ Name: "Amin",
						Notes: ["A","B","C","D","E","F","G"]},
						{ Name: "Bmin",
						Notes: ["B","Cs","D","E","F","G","A"]},
						{ Name: "Csmin",
						Notes: ["Cs","Ds","E","Fs","Gs","A","B"]},
						{ Name: "Dsmin",
						Notes: ["Ds","F","Fs","Gs","As","B","Cs"]},
						{ Name: "Fsmin",
						Notes: ["Fs","Gs","A","B","Cs","D","E"]},
						{ Name: "Gsmin",
						Notes: ["Gs","As","B","Cs","Ds","E","Fs"]},
						{ Name: "Asmin",
						Notes: ["As","C","Cs","Ds","F","Fs","Gs"]}];

	//Key signature model
	var _keyList = [{	Name: "C",
						Notes: ["C","D","E","F","G","A","B"],
						Chord:["CM","FM","GM","Dmin","Emin","Amin"] },
					{	Name: "G",
						Notes: ["C","D","E","Fs","G","A","B"],
						Chord:["GM","CM","DM","Amin","Bmin","Emin"] },
					{	Name: "D",
						Notes: ["Cs","D","E","Fs","G","A","B"],
						Chord:["DM","GM","AM","Emin","Fsmin","Bmin"] },
					{	Name: "A",
						Notes: ["Cs","D","E","Fs","Gs","A","B"],
						Chord:["AM","DM","EM","Bmin","Csmin","Fsmin"] },
					{	Name: "E",
						Notes: ["Cs","Ds","E","Fs","Gs","A","B"],
						Chord:["EM","AM","BM","Fsmin","Gsmin","Csmin"] },
					{	Name: "B",
						Notes: ["Cs","Ds","E","Fs","Gs","As","B"],
						Chord:["BM","FsM","GsM","Csmin","Dsmin","Gsmin"] },
					{	Name: "Fs",
						Notes: ["Cs","Ds","Es","Fs","Gs","As","B"],
						Chord:["FsM","BM","CsM","Gsmin","Asmin","Dsmin"] },
					{	Name: "Cs", //NEED PICTURE
						Notes: ["Cs","Ds","Es","Fs","Gs","As","Bs"],
						Chord:["CsM","FsM","GsM","Dsmin","Asmin"] },
					{	Name: "F",
						Notes: ["C","D","E","F","G","A","Bb"],
						Chord:["FM","BbM","CM","Gmin","Amin","Dmin"] },
					{	Name: "Bb",
						Notes: ["C","D","Eb","F","G","A","Bb"],
						Chord:["BbM","EbM","FM","Cmin","Dmin","Gmin"] },
					{	Name: "Eb",
						Notes: ["C","D","Eb","F","G","Ab","Bb"],
						Chord:["EbM","AbM","BbM","Fmin","Gmin","Cmin"] },
					{	Name: "Ab",
						Notes: ["C","Db","Eb","F","G","Ab","Bb"],
						Chord:["AbM","DbM","EbM","Bbmin","Cmin","Fmin"] },
					{	Name: "Db",
						Notes: ["C","Db","Eb","F","Gb","Ab","Bb"],
						Chord:["DbM","GbM","AbM","Ebmin","Fmin","Bbmin"] },
					{	Name: "Gb",
						Notes: ["Cb","Db","Eb","F","Gb","Ab","Bb"],
						Chord:["GbM","DbM","Abmin","Bbmin","Ebmin"] }];

	//Return Note with input name.
	this.getNoteWithName = function(noteName){
		var result = "";
		for(var i = 0; i < _noteList.length; i++){
			var note = _noteList[i];
			if(note.Name == noteName){
				result = note;
				break;
			}
		}
		return result;
	};

	//return Chord with input chord name.
	this.getChordWithName = function(chordName){
		var result = "";
		for(var i = 0; i < _chordList.length; i++){
			var chord = _chordList[i];
			if(chord.Name == chordName){
				result = chord;
				break;
			}
		}
		return result;
	};

	//return Scale with input scale name.
	this.getScaleWithName = function(scaleName){
		var result = ""
		for(var i = 0; i < _scaleList.length; i++){
			var scale = _scaleList[i];
			if(scale.Name == scaleName){
				result = scale;
				break;
			}
		}
		return result;
	};

	//Return chord with scale/key
	this.getChordInKey = function(keyName){
		var result = [];
		for(var i = 0; i < _keyList.length; i++){
			if(_keyList[i].Name == keyName){
				result = _keyList[i].Chord;
				break;
			}
		}
		return result;
	}

	//Get notes with key.
	this.getNotesInKey = function(keyName){
		var result = [];
		for(var i = 0; i < _keyList.length; i++){
			if(_keyList[i].Name == keyName){
				result = _keyList[i].Notes;
				break;
			}
		}
		return result;
	}
});







