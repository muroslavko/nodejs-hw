var express = require('express');
var task = express.Router();

const taskService = require('../entities/task/taskService');

/* GET listing. */
task.get('/', (req, res, next) => {
	taskService.getAllTasks().then((tasks) => {
		res.send(tasks);
	}).catch((err) => {
		res.status(400).end();
	});
});

task.get('/:id', (req, res, next) => {
	taskService.getTaskById(req.params.id).then((task) => {
		res.send(task);
	}).catch((err) => {
		res.status(400).end();
	});
});

task.post('/', (req, res, next) => {
	taskService.addTask(req.body).then((task) => {
		res.socket.emit("tasks-changed");
		res.status(201).send(task);
	}).catch((err) => {
		res.status(403).end();
	});
});

task.delete('/:id', (req, res, next) => {
	taskService.deleteTask(req.params.id).then((task) => {
		res.socket.emit("tasks-changed");
		res.status(200).end();
	}).catch((err) => {
		res.status(400).end();
	});
});

task.put('/:id', (req, res, next) => {
	taskService.editTask(req.params.id, req.body).then((task) => {
		debugger;
		res.socket.emit("tasks-changed");
		res.status(200).end();
	}).catch((err) => {
		res.status(400).send(err);
	});
});

module.exports = task;
