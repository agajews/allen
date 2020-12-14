import {useState, useEffect} from 'react';
import _ from 'lodash';

function App() {
  return (
    <div className="App">
      <Page/>
    </div>
  );
}

const removeFromArray = (list, idx) => [..._.take(list, idx), ..._.drop(list, idx+1)];

const changeAtIdx = (list, idx, fn) => [
  ..._.take(list, idx),
  fn(list[idx]),
  ..._.drop(list, idx+1),
];

const Page = () => {
  const [blocks, setBlocks] = useState([{
    type: 'todo',
    list: ['hi', 'robert'],
    name: 'Speed Dating',
  }, {
    type: 'todo',
    list: ['bye', 'robert'],
    name: 'Speed Dating 2',
  }]);

  console.log(blocks);

  const addTodo = (idx, entry) => {
    setBlocks(changeAtIdx(blocks, idx, (block) =>
      ({...block, list: block.list.concat([entry])})))
  };

  const removeTodo = (idx, listIdx) => {
    setBlocks(changeAtIdx(blocks, idx, (block) =>
      ({...block, list: removeFromArray(block.list, listIdx)})))
  };

  const setName = (idx, name) => {
    setBlocks(changeAtIdx(blocks, idx, (block) =>
      ({...block, name: name})));
  };

  return (
    <>
    {blocks.map((block, idx) => {
      if (block.type === 'todo') {
        return <TodoList
          list={block.list}
          name={block.name}
          addTodo={(entry) => addTodo(idx, entry)}
          removeTodo={(listIdx) => removeTodo(idx, listIdx)}
          setName={(name) => setName(idx, name)}
        />;
      }
    })}


    <div>
      <button onClick={() => {}}>
        Add todo block
      </button>
    </div>

    </>
  );
};

const TodoList = ({list, name, setName, addTodo, removeTodo}) => {
  const [inputVal, setInputVal] = useState('');
  return (
    <>
    <TodoName name={name} setName={setName}/>
    <ul>
      {list.map((name, idx) =>
        <ListItem
          name={name}
          remove={() => removeTodo(idx)}
        />
      )}
    </ul>

    <button onClick={() => {addTodo(inputVal)}}>
      Add todo
    </button>

    <input type="text" onChange={(e) => setInputVal(e.target.value)}/>
    </>
  );
}

const ListItem = ({name, remove}) => (
  <li>
    {name}
    <button onClick={remove}>x</button>
  </li>
);

const TodoName = ({name, setName}) => {
  /* const [editing, setEditing] = useState(false);
  if (editing) {
    return <input
      type="text"
      value={name}
      onBlur={() => setEditing(false)}
      onChange={(e) => setName(e.target.value)}
    />
  } else {
    return (<h2 onClick={() => setEditing(true)}>{name}</h2>);
  } */

  return <input
    className="todo-name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />;
};

export default App;

  /* useEffect(async () => {
    const serverList = await fetch('http://0.0.0.0:8000/alex', {})
      .then((res) => res.text())
      .then((data) => JSON.parse(data));
    setList(serverList);
  }, []); */

  /* useEffect(() => {
    fetch('http://0.0.0.0:8000/set-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    });
  }, [list]); */

