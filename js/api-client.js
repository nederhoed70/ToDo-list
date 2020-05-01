//interact with API, argument GET, PUT
const connectToApi = async (method, newData) => {
	try {
		const apiUrl = `https://wincacademydatabase.firebaseio.com/jeroen/tasks.json `;
		const connect = await fetch(apiUrl, {
			method: method,
			body: newData
		});
		const result = await connect.json();
		let tasks = Object.keys(result).map(key => ({
			id: key,
			description: result[key].description,
			done: result[key].done
		}));
		return tasks;
	} catch (err) {
		console.log('Oops an error...', err);
	}
};
//delete from db
const deleteFromDb = async id => {
	try {
		const apiUrl = `https://wincacademydatabase.firebaseio.com/jeroen/tasks/${id}.json `;
		const connect = await fetch(apiUrl, {
			method: 'DELETE'
			//body: body
		});

		listTasksInDom();
	} catch (err) {
		console.log('Oops an error...', err);
	}
};

const editCheckedDb = async (id, method, body) => {
	try {
		const apiUrl = `https://wincacademydatabase.firebaseio.com/jeroen/tasks/${id}/done.json `;
		const connect = await fetch(apiUrl, {
			method: method,
			body: body
		});
		console.log('deleted');
		listTasksInDom();
	} catch (err) {
		console.log('Oops an error...', err);
	}
};
