//interact with API, argument GET, PUT
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
//delete from db
const deleteFromDb = async id => {
	try {
		const apiUrl = `https://wincacademydatabase.firebaseio.com/jeroen/tasks/${id}.json `;
		const connect = await fetch(apiUrl, {
			method: 'DELETE'
			//body: body
		});
		console.log('deleted');
		listTasksInDom();
	} catch {
		console.log('Oops an error...');
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
	} catch {
		console.log('Oops an error...');
	}
};