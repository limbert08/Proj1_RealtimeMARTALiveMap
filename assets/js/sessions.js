function updateSession (lastStation /* string */, arrayOfStation){
	//if only updating one item, give the other a value of '' (empty string)
	if (lastStation != "") {
		sessionStorage.setItem('lastStation', lastStation);
	}
	if (arrayOfStation != "") {
		sessionStorage.setItem('arrayOfStation', arrayOfStation);
	}
}
