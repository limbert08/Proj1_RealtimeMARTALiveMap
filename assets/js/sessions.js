function updateSession (lastStation /* string */, arrayOfStation){
	sessionStorage.setItem('lastStation', lastStation);
	sessionStorage.setItem('arrayOfStation', arrayOfStation);
}
