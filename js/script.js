//addressing DOM elements
const ul = document.getElementById('tasks-list');
const li = document.createElement('li');
const span = document.createElement('span');

//interact with API, argument GET, PUT, DELETE
const connectToApi = async (method, newData) => {
	try {
		const apiUrl = `https://wincacademydatabase.firebaseio.com/jeroen/tasks.json `;
		const connect = await fetch(apiUrl, {
			method: method,
			body: newData
		});
		console.log('json fetched');
		const result = await connect.json();
		let tasks = Object.keys(result).map(key => ({
			id: key,
			description: result[key].description,
			done: result[key].done
		}));
		return tasks;
	} catch {
		console.log('Oops an error...');
	}
};

// get tasks from db and list them into the DOM
const listTasksInDom = async () => {
	let listOfTasks = await connectToApi('GET');
	//get list of tasks
	listOfTasks.forEach(task => {
		if (task.done === true) {
			status = 'done';
		} else {
			status = 'pending';
		}
		//put each task into DOM
		ul.appendChild(
			document.createElement('li')
		).innerHTML = `<span class="task-name">${task.description}</span><span class="task-status">${status}</span><span class="task-buttons"><img src="img/edit.png" id="${task.id}" class="edit-img" title="edit ${task.description}?"><img src="img/trash.png" id="${task.id}" class="trash-img" title="delete ${task.description}?"></span>`;
	});
	listenToTaskButtons();
};

const eventListeners = () => {
	//define textinput and submit
	const submitButton = document.getElementById('submit-task');
	const taskBar = document.getElementById('new-task');
	//press submit to recieve value of input-filed
	submitButton.addEventListener('click', function() {
		//new task in object
		let newTask = {
			description: taskBar.value,
			done: false
		};
		console.log(newTask);
		//clear inputfield after submit
		taskBar.value = '';
		//post object to api
		connectToApi('POST', JSON.stringify(newTask));
		//clear current tasklist
		ul.innerHTML = '';
		//get updated tasklist
		listTasksInDom();
	});
	//taskbar gets an eventistener to pass the value on submit
	taskBar.addEventListener('input', function() {});
};

const listenToTaskButtons = () => {
	let buttonsDel = document.getElementsByClassName('trash-img');
	console.log(buttonsDel);
	buttonsDel.forEach(button => {
		console.log(button);
		button.addEventListener('click', event => {
			console.log('click');
		});
	});
};

listTasksInDom();
eventListeners();
