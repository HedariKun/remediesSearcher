
const reader = require("xlsx")
const fs = require("fs")

async function main() {
	const file = reader.readFile("./remedies_list.xls")
	const sheet = file.Sheets[file.SheetNames[0]]
	const range = reader.utils.decode_col(sheet["!ref"])
	const res = await fs.writeFileSync("remedies.json", JSON.stringify(reader.utils.sheet_to_json(sheet)))
	console.log(res)
}

main()