//1. Съхранява в колекция списък с всички събития, които са организирани.

var Events = {
    eventId: [],
    eventName: [],
    access: [],
    attendants: []
};

//4. Създава ново събитие. Задължителни атрибути на събитието са неговото име.
//Ако потребителя не подаде флаг, указващ дали събитието е подходящо за непълнолетни то по подразбиране е.

var eventIdCounter = 0;

var createEvent = function(_eventName, _access){
    if(_eventName == null){
        console.log("You must enter a name for your event. Operation not successful.");
        return;
    }
    
    eventIdCounter++;
    Events.eventId[Events.eventId.length] = eventIdCounter;
    Events.eventName[Events.eventName.length] = _eventName;
    Events.attendants[Events.attendants.length]= [""];

    if(_access != true){
        Events.access[Events.access.length] = false;
        return;
    }
    
    Events.access[Events.access.length] = _access;
}

var printEventInfo = function(_eventId){
    if(isNaN(_eventId)){
        console.log("Input data is not in correct format. Operation not successful.");
        return;
    }
    if(_eventId > eventIdCounter){
        console.log("The event you are looking for does not yet exist. Operation not successful.");
        return;
    }

    var index = Events.eventId.indexOf(_eventId);
    console.log("Event " + Events.eventId[index] + ": " + Events.eventName[index] + ". " + checkAccess(Events.access[index]));
};

var checkAccess = function(value){
    if(value){
        return "The event doesn't let underaged attendants.";
    }
    else{
        return "Attendants of all ages are welcome.";
    }
};

//2. Извежда всички вече съхранени събития, като визуализира цялата необходима информация за тях.

var printAllEvents = function(){
    for(var i = 1; i <= eventIdCounter; i++){
        if(Events.eventId.indexOf(i) < 0){
            continue;
        }

        printEventInfo(i);
    }
};

//3. Изтрива събитие по уникален идентификатор, и извежда съобщение за успешно извършена операция.

var  removeEvent = function(_eventId){
    var index = Events.eventId.indexOf(_eventId);
    Events.eventId[index] = null;
    Events.eventName[index] = null;
    Events.access[index] = null;
    Events.attendants[index]= [""];

    console.log("The event has been successfully deleted.");

    for(var i = index; i < Events.eventId.length - 1; i++){
        Events.eventId[i] = Events.eventId[i + 1];
        Events.eventName[i] = Events.eventName[i + 1];
        Events.access[i] = Events.access[i + 1];
        Events.attendants[i]= [""];
        for(var j = 0; j < Events.attendants[i+1].length; j++){
            Events.attendants[i][j] = Events.attendants[i+1][j];
        }
    }

    Events.eventId.pop();
    Events.eventName.pop();
    Events.access.pop();
    Events.attendants.pop();

};

//5. Актуализира събитие по уникален идентификатор и изведете съобщение за правилно извършена операция.

var updateEventInfo = function(_eventId, _eventName, _access){

    if(Events.eventId.indexOf(_eventId) < 0){
        console.log("The id you have entered is invalid. Operation not successful.");
        return;
    }

    var index = Events.eventId.indexOf(_eventId);

    if(_eventName == null){
        console.log("You must enter a new name or access flag for your event. Operation not successful.");
        return;
    }

    if(_eventName == true || _eventName == false){
        _access = _eventName;
    }
    else{
        Events.eventName[index] = _eventName;
    }

    if(_access != null){
        if(_access == true)
        {
            Events.access[index] = true;
        }
        else if(_access == false){
            Events.access[index] = false;
        }
        else{
            console.log("Incorrect access input. The access to the event stays as before: " + checkAccess(Events.access[Events.eventId.indexOf(_eventId)]));
        }
    }

    console.log("Event successfully updated.");
    printEventInfo(_eventId);
};

// create collection for attendants 

var Attendants = {
    attendantId: [],
    attendantName: [],
    gender: [],
    age: []
};

var attendantIdCounter = 0;

var createAttendant = function(_attendantName, _gender, _age){
    if(_attendantName == null || _gender == null || _age == null || typeof _attendantName != "string" || (_gender != "female" && _gender != "male") || isNaN(_age)){ 
        console.log("Incorrect data input. Operation Not successful.");
        return;
    }

    attendantIdCounter++;
    Attendants.attendantId[Attendants.attendantId.length] = attendantIdCounter;
    Attendants.attendantName[Attendants.attendantName.length] = _attendantName;
    Attendants.gender[Attendants.gender.length] = _gender;
    Attendants.age[Attendants.age.length] = _age;    

    console.log("Attendant created. ");
}; 

//6. Добавете клиент към вече създадено събитие.
//Ако възрастта на клиента не му позволява да присъства на събитието, известете с помощта на необходимото съобщение.

var addAttendantToEvent = function(_eventId, _attendantId){
    if(Events.eventId.indexOf(_eventId) < 0){
        console.log("The event you are looking for does not exist. Operation not successful.");
        return;
    }

    if(Attendants.attendantId.indexOf(_attendantId) < 0){
        console.log("The attendant you are looking for is not in the system. Operation not successful.");
        return;
    }

    var attendantIndex = Attendants.attendantId.indexOf(_attendantId);
    var eventIndex = Events.eventId.indexOf(_eventId);

    if(Events.attendants[eventIndex].indexOf(_attendantId) > -1){
        console.log("This attendant is already elisted for this event.");
        return;
    }


    if(Attendants.age[attendantIndex] < 18  && Events.access[eventIndex]){
        console.log("The attendant is not of age therefore is not permitted to this event.");
        return;
    }

    if(Events.attendants[eventIndex][0] == ""){
        Events.attendants[eventIndex][0] = Attendants.attendantId[attendantIndex];
        console.log(Attendants.attendantName[attendantIndex] + " has been added as an attendant to " + Events.eventName[eventIndex] + ".");
        return;
    }

    Events.attendants[eventIndex][Events.attendants[eventIndex].length] = Attendants.attendantId[attendantIndex];
    console.log(Attendants.attendantName[attendantIndex] + " has been added as an attendant to " + Events.eventName[eventIndex] + ".");

};

var printAttendantInfo = function(_attendantId){
    if(isNaN(_attendantId)){
        console.log("Input data is not in correct format. Operation not successful.");
        return;
    }
    if(_attendantId > Attendants.attendantId[Attendants.attendantId.length - 1]){
        console.log("The attendant you are looking for is not in our attendant list. Operation not successful.");
        return;
    }

    var index = Attendants.attendantId.indexOf(_attendantId);
    console.log(Attendants.attendantName[index] + ", " + Attendants.gender[index] + " and " + Attendants.age[index] + " years old.");
};


//7. Визуализирайте списък с всички клиенти които присъстват на определено събитие.
//Предоставете възможност да бъдат филтрирани по пол, тоест да се визуализират само мъжете или само жените.

var showAttendantsAtEvent = function(_eventId, _gender){
    var index = Events.eventId.indexOf(_eventId);

    if(index < 0){
        console.log("The event you are looking for does not exist. Operation not successful.");
        return;
    }

    if(_gender == null){
        console.log("All attendants going to " + Events.eventName[index] + " are: ");

        for(var i = 0; i < Events.attendants[index].length; i++){
            printAttendantInfo(Events.attendants[index][i]);
        }
    }
    else if(_gender == "female" || _gender == "male"){
        console.log( _gender + " attendants going to " + Events.eventName[index] + " are: ");

        for(var i = 0; i < Events.attendants[index].length; i++){
            if(_gender == Attendants.gender[Attendants.attendantId.indexOf(Events.attendants[index][i])]){
                printAttendantInfo(Events.attendants[index][i]);
            }
        }
    }
    else{
        console.log("Your input for gender is invalid. Operation not successful.");
    }

};

//8. Премахнете присъстващ потребител от събитието.

var removeAttendantFromEvent = function(_eventId, _attendantId){

    if(isNaN(_eventId) || isNaN(_attendantId)){
        console.log("Your input data is incorrect. Operation not successful.");
        return;
    }

    var eventIndex = Events.eventId.indexOf(_eventId);
    var attendantIndex = Events.attendants[eventIndex].indexOf(_attendantId);

    if(Events.eventId.indexOf(_eventId) < 0){
        console.log("The event you are searching for does not exist. Operation not successful.");
        return;
    }

    if(Events.attendants[eventIndex].indexOf(_attendantId) < 0){
        console.log("The attendant you are seaching for is not enlisted for the event. Operation not successful.");
        return;
    }

    Events.attendants[eventIndex][attendantIndex] = 0;

    for(var i = attendantIndex; i < Events.attendants[eventIndex].length - 1; i++)
    {
        Events.attendants[eventIndex][i] = Events.attendants[eventIndex][i + 1];
    }
    Events.attendants[eventIndex].pop();
    console.log("Attendant " + Attendants.attendantName[attendantIndex] + " was successfully removed from event " + Events.eventName[eventIndex] + ".");
    
};

//adding data 

createEvent("Megami Friday Fantasy",            true);
createEvent("Grafa in Encanto",                 false);
createEvent("V:rgo in da house: Bling Club",    true);
createEvent("Gery-Nikol rocks Pasha",           true);
createEvent("Fundraiser concert with 100 Kila", false);
createEvent("FA Trakiya spectacle",             false);

createAttendant("Veselka Zoneva",    "female", 20);
createAttendant("Anelia Nikolova",   "female", 15);
createAttendant("Dimitur Tsonev",    "male",   23);
createAttendant("Galina Filipova",   "female", 39);
createAttendant("Antonia Pashova",   "female", 33);
createAttendant("Angel Blagoev",     "male",   22);
createAttendant("Maria Gramatikova", "female", 17);
createAttendant("Mitko Pavlov",      "male",   16);
createAttendant("Ralica Rumenova",   "female", 21);
createAttendant("Kaloyan Tenev",     "male",   22);

addAttendantToEvent(2,4);
addAttendantToEvent(2,5);
addAttendantToEvent(4,1);
addAttendantToEvent(1,1);
addAttendantToEvent(1,3);
addAttendantToEvent(1,5);
addAttendantToEvent(5,10);
addAttendantToEvent(5,7);
addAttendantToEvent(5,8);
addAttendantToEvent(3,9);
addAttendantToEvent(6,4);

console.clear();

