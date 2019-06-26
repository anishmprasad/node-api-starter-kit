module.exports = {
	INSERT: 'INSERT INTO todos(text, done) values($1, $2)',
	GETALLTODOBYASC: 'SELECT * FROM todos ORDER BY id ASC',
	UPDATE: 'UPDATE todos SET text=($1), done=($2) WHERE id=($3)',
	DELETE: 'DELETE FROM todos WHERE id=($1)'
};
