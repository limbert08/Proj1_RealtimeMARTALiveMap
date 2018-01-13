# Proj1_PumpkinSquirrelJuice

Project Title: Visual UI for MARTA

Team Members:
Daryl Bilderback
Nic Branker
Limbert Bontigao
Gene Cannella
Thomas Gentle
Tyler Maran

Project Description: 
STAGE1:
Our Team wants to have a Graphical Map of the MARTA Rail system, showing all Trains, incoming Trains, Traine Delay notifications, etc.

Sketch of Final Project:

APIs to be used: MARTA API, Google Maps API

Rough Breakdown of Tasks:
1) Create UI

2) Figure out User's Location by interfacing Google location to assign closest MARTA Station

3) Call the MARTA API to populate the a Database (ex. Firebase)

4) UI will call the Firebase Database to display the Graphical interface


1/13/18 Update
First Steps:
1.	Initialize a firebase database to store the data from Google Maps and Marta API
a.	Nic
2.	Begin constructing the basic UI outline
a.	Daryl, Limbert, Gene
3.	Build basic HTML to pull data from the database 
a.	Tyler
4.	Store user preferences
a.	Thomas

Stretch Goals:
-	Upon station select, the user will be given summary information on upcoming trains and a visual update
-	Data analytics for operators
o	Number of times each train is late or out for maintenance 
-	Pull late/on-time/early train statistics and push a “likelihood of on-time” indicator for each train
-	Sell to GDOT for a piece of that $1.2bln in new funding Marta just got

Ideas and items to consider:
- Using SVG JS to animate the map
  - Create HTML Canvas and use JS for train animation
  - Make items on this map clickable (for station select)
- Make sure trains are never double counted
  - Pull train ID's to see if any station lists the same station as a prior one


