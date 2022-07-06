import ReactDOM from "react-dom"
import React, { useState } from 'react';

import * as remediesData from "./remedies.json"
import './style.css'


function App() {
	return <MainBody />
}

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}


function MainBody() {
	const inputprops = useInput()
	return (
		<div id="main-body">
			<input id="search" {...inputprops} placeholder="اسم دوة"></input> 
			<DrugTable data={inputprops.value} />
		</div>
	)
}

function DrugTable(props) {

	const list = []
	if(props.data !==undefined) {
		for (const remedy of remediesData) {
			const data = props.data.toLowerCase()
			if(remedy["SCIENTIFIC  NAME"] === undefined || remedy["TRADE NAME"] === undefined) {
				continue
			}
			if(remedy["SCIENTIFIC  NAME"].toLowerCase().includes(data) || remedy["TRADE NAME"].toLowerCase().includes(data)) {
				list.push(remedy)
			}
			console.log(list.length)
			if(list.length > 10 ) {
				break
			}
		}
	}
	console.log(list)

	const items = list.map((item) => {
		return (
			<tr>
				<td>{item["SCIENTIFIC  NAME"]}</td>
				<td>{item["TRADE NAME"]}</td>
				<td>{item["NATIONALITY OF THE MANUFACTURER)"]}</td>
			</tr>
		)
	})

	return (
		<table>
			<tr>
				<th>Scientific Name</th>
				<th>Trade Name</th>
				<th>Nationality</th>
			</tr>
			{items}
			<tr> </tr>
		</table>
	)
}

const app = document.getElementById("app")
ReactDOM.render(<App />, app)