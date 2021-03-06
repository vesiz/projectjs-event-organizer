//#region Main Tasks

//1. Съхранява в колекция списък с всички събития, които са организирани.

var Events = {
    eventId: [],
    eventName: [],
    access: [],
    attendants: []
};

// | for additional tasks 2, task 1
// v
Events.fee = [];

// | for additional tasks 3, task 4
// v
Events.rating = [];

//4. Създава ново събитие. Задължителни атрибути на събитието са неговото име.
//Ако потребителя не подаде флаг, указващ дали събитието е подходящо за непълнолетни то по подразбиране е.

var eventIdCounter = 0;

var createEvent = function(_eventName, _access, _fee){
    
    if(eventsAddingShutdown){
        console.log("This operation is not allowed at the moment.");
        return;
    }
    
    if(_eventName == null){
        console.log("You must enter a name for your event. Operation not successful.");
        return;
    }
    
    eventIdCounter++;
    Events.eventId[Events.eventId.length] = eventIdCounter;
    Events.eventName[Events.eventName.length] = _eventName;
    Events.attendants[Events.attendants.length]= [""];
    Events.rating[Events.rating.length] = 0;
    
    if(_access == null){
        Events.access[Events.access.length] = false;
        Events.fee[Events.fee.length] = 0;
    }
    else if(typeof _access == "boolean"){
        if(_access){
            Events.access[Events.access.length] = true;
        }
        else{
            Events.access[Events.access.length] = false;
        }
        
        if(typeof _fee == "number" && _fee > 0){
            Events.fee[Events.fee.length] = _fee;
        }
        else{
            Events.fee[Events.fee.length] = 0;
        }   
    } 
    else if(typeof _access == "number" && _access > 0){
        Events.access[Events.access.length] = false;
        Events.fee[Events.fee.length] = _access;       
    }
    else{
        Events.access[Events.access.length] = false;
        Events.fee[Events.fee.length] = 0;      
    }
    
    console.log("Event successfully created. Event Id: " + Events.eventId[Events.eventId.length - 1]);
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

    var eventString = checkAdmissionFee(_eventId) + "Event " + Events.eventId[index] + ": " + Events.eventName[index] + ". " 
                      + checkAccess(Events.access[index]) + " Addmission fee: " + Events.fee[index] + " BGN.";
    
    if(Events.date[index] != undefined){
        eventString += "\n\tThe date specified for this event is: " + Events.date[index].getFullYear() + "/" + Events.date[index].getMonth() + "/" + Events.date[index].getDate() + ".";
    }
    else{
        eventString += "\n\tThere is no date specified for this event.";
    }
    
    if(Events.eventName[index][0] == "~"){
        eventString +="\n" + showEventRating(_eventId);
    }

    return eventString;
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

var printAllEvents = function(_option){

    if(_option == 1){
        console.log("Archived events:");

        for(var i = 0; i < Events.eventId.length; i++){
            if(Events.eventName[i][0] == "~"){
                console.log(printEventInfo(Events.eventId[i]));
            }
        }
        return;
    }
    else if( _option == 2){
        console.log("Active events:");

        for(var i = 0; i < Events.eventId.length; i++){
            if(Events.eventName[i][0] != "~"){
                console.log(printEventInfo(Events.eventId[i]));
            }
        }
        return;
    }

    console.log("All events:");

    for(var i = 0; i < Events.eventId.length; i++){
        console.log(printEventInfo(Events.eventId[i]));
    }
};

//3. Изтрива събитие по уникален идентификатор, и извежда съобщение за успешно извършена операция.

var  removeEvent = function(_eventId){
    var index = Events.eventId.indexOf(_eventId);
    
    Events.eventId[index] = null;
    Events.eventName[index] = null;
    Events.access[index] = null;
    Events.date[index] = undefined;
    Events.fee[index] = null;
    Events.attendants[index]= [""];
    Events.rating[index] = null;
    
    console.log("The event has been successfully deleted.");
    
    for(var i = index; i < Events.eventId.length - 1; i++){
        Events.eventId[i] = Events.eventId[i + 1];
        Events.eventName[i] = Events.eventName[i + 1];
        Events.access[i] = Events.access[i + 1];
        Events.fee[i] = Events.fee[i + 1];
        Events.rating[i] = Events.rating[i + 1];
        
        if(Events.date[i + 1] != undefined){
            Events.date[i] = new Date(Events.date[i + 1]);
            Events.date[i + 1] = undefined;
        }
        
        Events.attendants[i]= [""];
        for(var j = 0; j < Events.attendants[i+1].length; j++){
            Events.attendants[i][j] = Events.attendants[i+1][j];
        }
    }
    
    Events.eventId.pop();
    Events.eventName.pop();
    Events.access.pop();
    Events.attendants.pop();
    Events.fee.pop();
    Events.rating.pop();
    
    if(Events.date.length > Events.eventId.length){
        Events.date.pop();
    }
    
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

// | for additional tasks 2, task 4
// v
Attendants.wallet = [];

// | for additional tasks 2, task 5
// v
Attendants.VIPStatus = [];

var attendantIdCounter = 0;

var createAttendant = function(_attendantName, _gender, _age, _wallet){
    
    if(attendantsAddingShutdown){
        console.log("This operation is not allowed at the moment");
        return;
    }
    
    if(_attendantName == null || _gender == null || _age == null || typeof _attendantName != "string" || (_gender != "female" && _gender != "male") || isNaN(_age) || isNaN(_wallet) || _age < 0 || _wallet < 0){ 
        console.log("Incorrect data input. Operation Not successful.");
        return;
    }
    
    attendantIdCounter++;
    Attendants.attendantId[Attendants.attendantId.length] = attendantIdCounter;
    Attendants.attendantName[Attendants.attendantName.length] = _attendantName;
    Attendants.gender[Attendants.gender.length] = _gender;
    Attendants.age[Attendants.age.length] = _age;
    Attendants.wallet[Attendants.wallet.length] = _wallet;  
    Attendants.VIPStatus[Attendants.VIPStatus.length] = 0;  
    
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

    if(Events.eventName[eventIndex][0] == "~"){
        console.log("You cannot add attendants to archived events.");
        return;
    }
    
    if(Events.attendants[eventIndex].indexOf(_attendantId) > -1){
        console.log("This attendant is already elisted for this event.");
        return;
    }
    
    if(Attendants.age[attendantIndex] < 18  && Events.access[eventIndex]){
        console.log("The attendant is not of age therefore is not permitted to this event.");
        return;
    }
    
    if(Events.fee[eventIndex] > Attendants.wallet[attendantIndex]){
        console.log("This person doesn't have enough money to attend this event.");
        return;
    }

    if(Events.attendants[eventIndex][0] == ""){
        Events.attendants[eventIndex][0] = Attendants.attendantId[attendantIndex];
    }
    else{
        Events.attendants[eventIndex][Events.attendants[eventIndex].length] = Attendants.attendantId[attendantIndex];    
    }

    if(Attendants.VIPStatus[attendantIndex] > 5){
        Attendants.VIPStatus[attendantIndex] = 0;
    }
    else{
        Attendants.wallet[attendantIndex] -= Events.fee[eventIndex];
        Attendants.VIPStatus[attendantIndex] += 1;
    }
    
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
    console.log(Attendants.attendantName[index] + ", " + Attendants.gender[index] + ", " + Attendants.age[index] + " years old and having " + Attendants.wallet[index] + " BGN.");
};

var printAllAttendants = function(){
    for(var i = 0; i < Attendants.attendantId.length; i++){
        printAttendantInfo(Attendants.attendantId[i]);
    }
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
createEvent("V:rgo in da house: Bling Club",    true, 5);
createEvent("Gery-Nikol rocks Pasha",           true);
createEvent("Fundraiser concert with 100 Kila", 10);
createEvent("FA Trakiya spectacle",             false);

createAttendant("Veselka Zoneva",    "female", 20, 200 );
createAttendant("Anelia Nikolova",   "female", 15, 40  );
createAttendant("Dimitur Tsonev",    "male",   23, 120 );
createAttendant("Galina Filipova",   "female", 39, 1050);
createAttendant("Antonia Pashova",   "female", 33, 510 );
createAttendant("Angel Blagoev",     "male",   22, 300 );
createAttendant("Maria Gramatikova", "female", 17, 60  );
createAttendant("Mitko Pavlov",      "male",   16, 0   );
createAttendant("Ralica Rumenova",   "female", 21, 320 );
createAttendant("Kaloyan Tenev",     "male",   22, 140 );

addAttendantToEvent(1,1);
addAttendantToEvent(2,4);
addAttendantToEvent(2,5);
addAttendantToEvent(4,1);
addAttendantToEvent(1,3);
addAttendantToEvent(1,5);
addAttendantToEvent(5,10);
addAttendantToEvent(5,7);
addAttendantToEvent(5,8);
addAttendantToEvent(3,9);
addAttendantToEvent(6,4);

console.clear();

//#endregion

//#region Additional Tasks 1

//1. Създайте функционалност която да спира добавянето на събития или добавянето на клиенти на централно ниво. 
//Когато бъде активирана при опит да се добави събитие или клиент потребителя получава
//съобщение че операцията не може да бъде извършена, защото системата е затворена.

var eventsAddingShutdown = false;
var attendantsAddingShutdown = false;

var forbidAdding = function(_boolValue, _typeValue){
    if(typeof _boolValue != "boolean" || (_typeValue != 1 && _typeValue != 2)){
        console.log("Input data is not correct.\nChoose true- to forbid additions and false- to allow them.\nNext choose 1- to change addition access to events and 2- to attendants.");        
        return;        
    }
    
    if(_typeValue == 1){
        eventsAddingShutdown = _boolValue;
    }
    else if(_typeValue == 2){
        attendantsAddingShutdown = _boolValue;
    }
}

//добавено e и условие в началото на functions createEvent и createAttendant

//2. Добавете възможност за запазване на текуща дата на събитието.

Events.date = [];

var addDateToEvent = function(_eventId, _date){
    
    var eventDate = new Date(_date);
    
    if(Events.eventId.indexOf(_eventId) < 0 || eventDate == "Invalid Date" ){
        console.log("Operation not successful. \nCheck if the event you want to add a date to is existing or if your date format is correct. \nDate format: yyyy/mm/dd");
        return;
    }
    
    if(Events.date[Events.eventId.indexOf(_eventId)] != undefined){
        console.log("There is already a date set for this event.");
        return;
    }
    
    if(eventDate < new Date()){
        console.log("You cannot assign past date to an event. \nOperation not successful.");
        return;
    }
    
    Events.date[Events.eventId.indexOf(_eventId)] = new Date(eventDate);
    console.log("Date added to event N" + _eventId + ".");
    
};
// допълнителна функционалност добавена към removeEvent за правилното изтриване на цялото събитие заедно със датата.
// допълнителна функционалност добавена към printEventInfo за правилното извеждане на информация за датата на събитието. 

//3. Създайте функционалност за извеждане на събитието с най-много добавени клиенти. 
//Ако такова не съществува (всички са с равен брой) или не съществуват събития изведете необходимите съобщения, по ваш избор.

var printBiggestEvent = function(){
    var attendantsPerEvent = [];
    
    for(var i = 0; i < Events.eventId.length; i++){
        if(Events.attendants[i][0] == ""){
            attendantsPerEvent[i] = 0;
        }
        else{
            attendantsPerEvent[i] = Events.attendants[i].length;
        }
    }
    
    attendantsPerEvent.sort();
    attendantsPerEvent.reverse();
    
    if(attendantsPerEvent.length == 0 || attendantsPerEvent[0] == attendantsPerEvent[1]){
        console.log("An event with the most attendants does not yet exist.");
        return;
    }
    
    console.log("The event with the most attendants is: ");
    
    for(var i = 0; i < Events.eventId.length; i++){
        if(Events.attendants[i].length == attendantsPerEvent[0]){
            console.log(printEventInfo(Events.eventId[i]));
            break;
        }
    }  
};

//4. Изведете всички събития които са подходящи за малолетни посетители.

var printEventsForUnderaged = function(){
    for(var i = 0; i < Events.eventId.length; i++){
        if(!Events.access[i]){
            console.log(printEventInfo(Events.eventId[i]));
        }
    }
};

//5. Изведете всички събития като ги групирате, събитията които са предназначени за пълнолетни 
//посетители трябва да имат звездичка пред името си “*”, а тези подходящи за непълнолетни диез “#”.

var printAllEventsWithAgeInfo = function(){
    for(var i = 0; i < Events.eventId.length; i++){
        if(Events.access[i]){
            console.log("*"+ printEventInfo(Events.eventId[i]));
        }
        else{
            console.log("#"+ printEventInfo(Events.eventId[i]));
        }
    }
};

//6. Създайте механизъм за филтриране на събития по определен критерии.
//Функцията трябва да има възможност да получава име / или флаг за достъп и да визуализира само тези събития които отговарят на критериите.

var filterEvents = function(input){
    if(typeof input == "string"){
        if(Events.eventName.indexOf(input) < 0){
            console.log("There isn't an event with this name.");
            return;
        }
        
        for(var i = 0; i < Events.eventId.length; i++){
            if(Events.eventName[i] == input){
                console.log(printEventInfo(Events.eventId[i]));
            }
        }
    }
    else if(typeof input == "boolean"){
        for(var i = 0; i < Events.eventId.length; i++){
            if(Events.access[i] == input){
                console.log(printEventInfo(Events.eventId[i]));
            }
        }
    }
    else {
        return "Invalid data input. Filtering not succeessful.";
    }
};

addDateToEvent(2, "2019/10/05");
addDateToEvent(5, "2019/02/17");

console.clear();

//#endregion

//#region Additional Tasks 2

//1. Оказва се че фирмата се е сетила в последствие че партитата, които организира не са благотворителни, 
//и следователно трябва да събира някаква входна такса от всички клиенти които я посещават.

// в началото на кода, след декларацията на обект Events е добавено property fee: такса за събитие


//2. Добавете, свойство цена към всяко събитие което организирате. 
//Цената не е задължително свойство, всяко събитие което е регистрирано без цена, става автоматично безплатно.
 
// модифицирани functions createEvent, printEventInfo и removeEvent за да отговарят на условието на задачата и да приемат и обработват данни за цена на събитието

createEvent("Bedroom Beach Grand Opening", true, 20);
addDateToEvent(7, "2019/05/10");
createEvent("Fundraiser for BMCHK", 15);
createEvent("Saturday Blackout At Bling", true, 5);
createEvent("Grigor Dimitrov VS Gaël Monfils at Arena Armeec", 50);

console.clear();


//3. Всички събития, които са платени трябва да визуализират заглавията си със знака $ пред имената си. 
//Безплатни събития трябва да визуализират имената си със знак “!”

var checkAdmissionFee = function(_eventId){
    if(Events.fee[Events.eventId.indexOf(_eventId)] > 0){
        return "$";
    }
    else {
        return "!";
    }
}

// checkAdmissionFee се извиква във function printEventInfo


//4. Всеки регистриран клиент, в системата трябва да разполага с портфейл. 
//Портфейлът съдържа пари които се намаляват при регистрация за ново събитие. 
//Ако потребителя няма пари в портфейла си, системата не го регистрира.

// след декларацията на обект Attendants е добавено property wallet: портфейл на клиент 
// модифицирани са functions createAttendant, printAttendantInfo, addAttendantToEvent,
// за да се изпълнят на условията на задачата и да се приемат и обработват данни за портфейл на клиента


//5. Фирмата добавя понятие VIP криент. VIP е всеки който е добавен като клиент на поне 5 събития. 
//VIP клиентите не заплащат такса при посещението си на следващото събитие. 
//При регистрация за шестото си събитие статуса им се нулира и те отново се превръщат в обикновенни клиенти.

// след декларацията на обект Attendants е добавено property VIPStatus
// модифицирани са functions createAttendant и addAttendanttoEvent за да се изпълнят условията на задачата


//#endregion

//#region Additional Tasks 3

//1. Създайте функционалност за архивиране на събития.
//Архивираните събития не могат да приемат гости. Архивираните събития, могат да бъдат само и единствено преглеждани като такива

//2. Названието на всяко архивирано събитие трябва да започва със символа ~

var archiveEvent = function(_eventId){
    if(Events.eventId.indexOf(_eventId) < 0){
        console.log("The event you are trying to archive doesn't exist. Try using a different ID number.");
        return;
    }

    if(Events.eventName[Events.eventId.indexOf(_eventId)][0] == "~" ){
        console.log("This event is already archived.");
        return;
    }

    var getEventName = "~" + Events.eventName[Events.eventId.indexOf(_eventId)];
    Events.eventName[Events.eventId.indexOf(_eventId)] = getEventName;
    console.log("Event successfully archived.");
};

//добавено условие във функция addAttendantToEvent за проверка дали определено събитие е архивирано преди да се добави клиент към него 


//3. Създайте функционалност за листинг на архивирани събития. Разширете функционалността на листинга така че да могат да се листват: 
//всички събития, само архивирани, само активни

// модифицирана е function printAllEvents като се дава възможност за подаване на параметър. 
// ако подаденият параметър е 1 се извеждат всички архивирани събития, ако е 2- всички активни. 
// ако се подаде нещо друго или нищо като параметър ще се изведат всички събития



//4. Създайте функционалност за визуализация на приходите от клиенти, които едно архивирано събитие е генерирало

var archivedEventProfit = function(_eventId){
    var eventIndex = Events.eventId.indexOf(_eventId);

    if(eventIndex < 0 || Events.eventName[eventIndex][0] != "~"){
        console.log("The event you are looking for isn't yet archived.");
        return;
    }

    var totalProfit = 0;

    if(Events.attendants[eventIndex].length == 1 && Events.attendants[eventIndex][0] == ""){
        totalProfit = 0;
    }
    else{
        totalProfit = Events.attendants[eventIndex].length * Events.fee[eventIndex] ;
    }

    console.log("The total profit of event with ID: " + Events.eventId[eventIndex] + " is of " + totalProfit + " BGN.");
};

// 5. Създайте функционалност за оценка на събитията рейтинг. Всяко едно събития в началото на своето създаване има рейтинг 0.

//добавено е ново property към Events: rating. направени са модификации на functions createEvent и removeEvent за правилната обработка на 
//стойностите на рейтинга на всяко събитие

var rateEvent = function(_eventId, _attendantId, _rating){
    var eventIndex = Events.eventId.indexOf(_eventId);

    if(typeof _eventId != "number" || typeof _attendantId != "number" || typeof _rating != "number" || _rating < 1 || _rating > 10){
        console.log("Input data is not in correct format. Choose an event ID, attendant ID and rating between 1 and 10.");
        return; 
    }

    if(eventIndex < 0 || Events.eventName[eventIndex][0] != "~"){
        console.log("The event you are looking for isn't in the archived events.");
        return;
    }

    if(Events.attendants[eventIndex].indexOf(_attendantId) < 0){
        console.log("This attendant hasn't been to this event, therefore cannot give it a rating. ");
        return;
    }

    var currentRating = (_rating / 10) * 6;

    if(Events.rating[eventIndex] == 0){
        Events.rating[eventIndex] = currentRating;
    }
    else{
        previousRating = Events.rating[eventIndex];
        Events.rating[eventIndex] = (previousRating + currentRating) / 2;
    }
    
    console.log("Event rated."); 
    console.log(showEventRating(_eventId));
};

var showEventRating = function(_eventId){
    var eventIndex = Events.eventId.indexOf(_eventId);

    if(eventIndex < 0 || Events.eventName[eventIndex][0] != "~"){
        console.log("The event you are looking for isn't in the archived events.");
        return;
    }
    
    var resultStr = "";

    if(Events.rating[eventIndex] == 0){
        resultStr = "This event is not yet rated. Update coming soon."
    }
    else{
        resultStr =  "This event's rating is: " + Events.rating[eventIndex];
    }

    return resultStr;
};


//6. Разширете функционалността на листинг на събития, която да показва рейтинга на всяко едно събития.
//Ако събитието все още не е оценено, да се визуализира предстой актуализация

// направени са модификации на function printEventInfo за да отговаря на условието на задачата.

//adding data

addAttendantToEvent(10,9);
addAttendantToEvent(10,3);
addAttendantToEvent(10,4);

archiveEvent(10);
archiveEvent(1);

rateEvent(10,4,7);
rateEvent(1,1,10);

console.clear();

//#endregion



