//addressing DOM elements
const ul = document.getElementById('tasks-list');
const li = document.createElement('li');

//const span = document.createElement('span');
const taskSpan = document.getElementsByClassName('task-buttons').children;

//Alert message
const showAlert = (message) => {
	messageLocation = document.getElementById('alert-message');
	messageLocation.innerHTML = message;
	messageLocation.style.display = 'block';
	setTimeout(() => {
		messageLocation.style.display = 'none';
	}, 3000);
};

// get tasks from db and list them into the DOM
const listTasksInDom = async () => {
	ul.innerHTML = '';
	let listOfTasks = await connectToApi('GET');
	let change;
	let changeClass;
	//get list of tasks
	listOfTasks.forEach((task) => {
		if (task.done === true) {
			currentTask = {
				status: 'done',
				change: 'pending',
				class: 'fas fa-history',
			};
		} else {
			currentTask = {
				status: 'pending',
				change: 'done',
				class: 'fas fa-check',
			};
		}
		//put each task into DOM
		ul.appendChild(
			document.createElement('li')
		).innerHTML = `<span class="task-name-${currentTask.status}">${task.description}</span>
		<span class="task-status ${currentTask.status}">${currentTask.status}</span>
		<span class="task-buttons">
			<i class="far fa-edit" id="${task.id}" class="edit-img" title="edit ${task.description}?"></i>
			<i class="far fa-trash-alt" id="d${task.id}" title="delete ${task.description}?"></i>
			<i class="${currentTask.class}" id="c${task.id}" title="mark ${task.description} as ${currentTask.change}?"></i>
			</span>`;
		//edit task listeners
		document.getElementById(task.id).addEventListener('click', (event) => {
			const changedTask = prompt('Change task description:', task.description);
			if (changedTask === task.description || changedTask === null) {
				showAlert('no changes made');
				//alert('nothing changed');
			} else {
				editDescriptionDb(
					task.id,
					'PUT',
					JSON.stringify({ description: changedTask })
				);
			}
		});
		//delete task listeners
		document
			.getElementById('d' + task.id)
			.addEventListener('click', (event) => {
				//delete task
				deleteFromDb(task.id, 'DELETE');
				//get updated tasklist
				listTasksInDom();
			});
		//mark task as done listeners
		document
			.getElementById('c' + task.id)
			.addEventListener('click', (event) => {
				//check task as done or pending
				if (!task.done) {
					editCheckedDb(task.id, 'PUT', true);
				} else {
					editCheckedDb(task.id, 'PUT', false);
				}
			});
	});
};

const eventListeners = () => {
	//define textinput and submit
	const submitButton = document.getElementById('submit-task');
	const taskBar = document.getElementById('new-task');
	//press submit to recieve value of input-filed
	submitButton.addEventListener('click', function () {
		if (taskBar.value) {
			//new task in object
			let newTask = {
				description: taskBar.value,
				done: false,
			};
			//clear inputfield after submit
			taskBar.value = '';
			//post object to api
			connectToApi('POST', JSON.stringify(newTask));
		} else {
			alert('You must enter a new task');
		}
		//get updated tasklist
		listTasksInDom();
	});
	//taskbar gets an eventistener to pass the value on submit
	taskBar.addEventListener('input', function () {});
};

document.addEventListener('DOMContentLoaded', function () {
	listTasksInDom();
	eventListeners();
});
