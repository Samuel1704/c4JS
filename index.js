"use strict"

//simple JS based browser game
//Made by https://github.com/Samuel1704

//Game Constants
const GRID_WIDTH = 7
const GRID_HEIGHT = 6

//Init empty Array
function createArray(width, height) {
	let returnArray = []
	for (let i = 0; i < height; i++) {
		let rowArray = []
		for (let j = 0; j < width; j++) {
			rowArray.push(0)
		}
		returnArray.push(rowArray)
	}
	return returnArray
}

//Update Array when Column gets clicked
function updateArray(column, grid, id) {
	for (let i = 0; i < grid.length; i++) {
		if (grid[i][column] !== 0) {
			grid[i - 1][column] = id
			return grid
		}
	}
	grid[grid.length - 1][column] = id
	return grid
}

//Check Array if somone has won
function checkWin(grid) {
	//Horizontal Scan
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] === grid[i][j + 1] && grid[i][j + 1] === grid[i][j + 2] && grid[i][j + 2] === grid[i][j + 3] && grid[i][j] !== 0) {
				alert("Player " + grid[i][j] + " has won the game")
				return createArray(GRID_WIDTH, GRID_HEIGHT)
			}
		}
	}
	//Vertical Scan
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (grid[i][j] === grid[i + 1][j] && grid[i + 1][j] === grid[i + 2][j] && grid[i + 2][j] === grid[i + 3][j] && grid[i][j] !== 0) {
				alert("Player " + grid[i][j] + " has won the game")
				return createArray(GRID_WIDTH, GRID_HEIGHT)
			}
		}
	}
	//increasing pitch Scan
	for (let i = 3; i < grid.length; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] === grid[i - 1][j + 1] && grid[i - 1][j + 1] === grid[i - 2][j + 2] && grid[i - 2][j + 2] === grid[i - 3][j + 3] && grid[i][j] !== 0) {
				alert("Player " + grid[i][j] + " has won the game")
				return createArray(GRID_WIDTH, GRID_HEIGHT)
			}
		}
	}
	//decreasing pitch Scan
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 4; j++) {
			if (grid[i][j] === grid[i + 1][j + 1] && grid[i + 1][j + 1] === grid[i + 2][j + 2] && grid[i + 2][j + 2] === grid[i + 3][j + 3] && grid[i][j] !== 0) {
				alert("Player " + grid[i][j] + " has won the game")
				return createArray(GRID_WIDTH, GRID_HEIGHT)
			}
		}
	}
	return grid
}

//Function for rendering the array
function renderArray(grid, ctx) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[0].length; j++) {
			if (grid[i][j] === 1) {
				ctx.fillStyle = "#FF0000"
				ctx.fillRect(j * 100, i * 100, 100, 100)
			} else if (grid[i][j] === 2) {
				ctx.fillStyle = "#00FF00"
				ctx.fillRect(j * 100, i * 100, 100, 100)
			} else {
				ctx.fillStyle = "lightgray"
				ctx.fillRect(j * 100, i * 100, 100, 100)
			}
		}
	}
}

//Main Game
document.addEventListener("DOMContentLoaded", (event) => {
	//Game Variables
	let GRID_GAME = createArray(GRID_WIDTH, GRID_HEIGHT)
	let gameDiv = document.getElementById("game")
	let player1Text = document.getElementById("Player1")
	let player2Text = document.getElementById("Player2")

	//Canvas Variables
	let c = document.getElementById("gameCanvas")
	let ctx = c.getContext("2d")

	//Player names and ids
	let Player1 = prompt("Enter first player name") || "player1"
	let Player2 = prompt("Enter secound player name") || "player2"
	let currPlayer = Player1
	player1Text.innerText = "Player 1:" + Player1
	player2Text.innerText = "Player 2:" + Player2

	//When clicked on a column
	gameDiv.addEventListener("click", (event) => {
		//Get the column where the player has clicked
		let columnClicked = Math.floor(event.clientX / 100)

		//Update the Grid with alternating players
		if (currPlayer === Player1) {
			try {
				GRID_GAME = updateArray(columnClicked, GRID_GAME, 1)
				currPlayer = Player2
			} catch (err) {
				alert("Out of Range")
			}
		} else {
			try {
				GRID_GAME = updateArray(columnClicked, GRID_GAME, 2)
				currPlayer = Player1
			} catch (err) {
				alert("Out of Range")
			}
		}

		//Check if any player got four in a row
		GRID_GAME = checkWin(GRID_GAME, ctx)

		//Draw the Array as a grid onto the screen
		renderArray(GRID_GAME, ctx)
	})
})
