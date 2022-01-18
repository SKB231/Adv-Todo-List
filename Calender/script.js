let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')):[];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calender = document.getElementById("calendar");
const newEventModal = document.getElementById('newEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventCardInput = document.getElementById('eventTitleInput');
const deleteEventModal = document.getElementById('deleteEventModal');

function openModal(date)
{
    clicked = date;

    const eventForDay = events.find(e => e.date===clicked);

    if(eventForDay)
    {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }
    else
    {
        newEventModal.style.display = 'block';
    }
    backDrop.style.display = 'block';
}

function saveEvent()
{
    if(eventCardInput.value)
    {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }
    else
    {
        eventTitleInput.classList.add('error');
    }
}

function closeModal()
{
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventCardInput.value = '';
    eventTitleInput.classList.remove('error');
    clicked = null;
    load();
}

function deleteEvent()
{
    events = events.filter(e => e.date!==clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function load()
{
    const dt = new Date();

    if(nav !== 0)
    {
        dt.setMonth((new Date()).getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year,month+1,0).getDate();
    const firstDayOfMonth = new Date(year,month, 1);

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    calender.innerHTML = '';

    const paddingDays = weekdays.indexOf(dateString.split(",")[0]);
    document.getElementById("monthDisplay").innerText = `${dt.toLocaleDateString('en-us',{month:'long'})} ${dt.toLocaleDateString('en-us',{year:'numeric'})}`;


    for(let i = 1; i<= paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month+1}/${i-paddingDays}/${year}`;
        if(i > paddingDays)
        {
            daySquare.innerText = i - paddingDays;
            daySquare.addEventListener('click',() => openModal(dayString));

            const eventForDay = events.find(e => e.date === dayString);

            if(i-paddingDays === day && nav === 0)
            {
                daySquare.id = 'currentDay';
            }

            if(eventForDay)
            {
                const EventDiv = document.createElement('div');
                EventDiv.classList.add('event');
                EventDiv.innerText = eventForDay.title;
                daySquare.appendChild(EventDiv);
            }

        }
        else
        {
            daySquare.classList.add('padding');
        } 
        calender.appendChild(daySquare);
    }
}

function initButtons()
{
    document.getElementById('nextButton').addEventListener('click', ()=>
    {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', ()=>
    {
        nav--;
        load();
    });
    document.getElementById('saveButton').addEventListener('click',saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);

    document.getElementById('deleteButton').addEventListener('click',deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);

    
}

initButtons();
load();


