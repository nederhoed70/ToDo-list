//addressing DOM elements
const ul = document.getElementById('tasks-list');
const li = document.createElement('li');

//const span = document.createElement('span');
const taskSpan = document.getElementsByClassName('task-buttons').children;

// get tasks from db and list them into the DOM
const listTasksInDom = async () => {
	ul.innerHTML = '';
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
		).innerHTML = `<span class="task-name">${task.description}</span><span class="task-status">${status}</span><span class="task-buttons"><img src="img/edit.png" id="${task.id}" class="edit-img" title="edit ${task.description}?"><img src="img/trash.png" id="d${task.id}" class="trash-img" title="delete ${task.description}?"></span><img src="img/check.png" id="c${task.id}" class="check-img" title="mark ${task.description} as done?"></span>`;
		//edit task listeners
		document.getElementById(task.id).addEventListener('click', event => {
			alert('soon, next release...');
		});
		//delete task listeners
		document.getElementById('d' + task.id).addEventListener('click', event => {
			//delete task
			deleteFromDb(task.id, 'DELETE');
			//get updated tasklist
			listTasksInDom();
		});
		//mark task as done listeners
		document.getElementById('c' + task.id).addEventListener('click', event => {
			//check task as done
			editCheckedDb(task.id, 'PUT', true);
			//get updated tasklist
			listTasksInDom();
		});
	});
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
		//get updated tasklist
		listTasksInDom();
	});
	//taskbar gets an eventistener to pass the value on submit
	taskBar.addEventListener('input', function() {});
};

document.addEventListener('DOMContentLoaded', function() {
	listTasksInDom();
	eventListeners();
});
