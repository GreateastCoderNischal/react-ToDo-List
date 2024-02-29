import { useEffect, useState } from 'react';

import './App.css';
import InputBox from './components/InputBox';

function App() {
  const [list, setlist] = useState([]);
  const [value, setValue] = useState('');

  const saveToLS = () => {
    localStorage.setItem('tasks', JSON.stringify(list));
    console.log('has been saved');
  };
  useEffect(() => {
    let todo = localStorage.getItem('tasks');
    console.log(todo);
    if (todo) {
      setlist(JSON.parse(localStorage.getItem('tasks')));
    }
  }, []);

  function Save() {
    console.log('clicked');
    if (value != '') {
      console.log('wrong');
      setlist((prev) => [...prev, { name: value, isCompleted: false }]);
    }
    saveToLS();
    setValue('');
  }
  function handleCheckbox(index) {
    setlist((lst) => {
      const new_list = [...lst];
      let elm = new_list[index];
      console.log(elm);
      new_list[index] = {
        name: elm.name,
        isCompleted: !elm.isCompleted,
      };
      return new_list;
    });
    saveToLS();
  }

  function handleEdit(name) {
    handleDelete(name);
    let newVal = name;
    setValue(name);
    saveToLS();
  }
  function handleDelete(name) {
    console.log('has been clicked');

    let new_list = list.filter((object) => object.name != name);
    setlist(new_list);
  }
  return (
    <>
      <div className="w-full h-screen bg-teal-300 py-4">
        <div className="w-[60%] rounded-2xl bg-violet-400 h-[80%] mx-auto">
          <div className="w-[100%] mx-auto bg-[#2184db] text-center text-white font-semibold text-[30px] rounded shadow-lg">
            To Do list
          </div>
          <div className="w-full bg-[#121212] p-3 flex items-center justify-between ">
            <div className="flex w-[90%]">
              <InputBox
                name="Name"
                onValue={(val) => {
                  setValue(val);
                }}
                value={value}
              />
              <InputBox name="Description" />
            </div>
            <div className="mt-3">
              <button onClick={() => Save()} className="button bg-purple-200">
                Save
              </button>
            </div>
          </div>
          <div className="m-5 bg-violet-500 rounded-lg shadow-lg p-4">
            <h1 className="text-[30px] text-center text-black font-bold">
              Your To Do's
            </h1>
            {list.length == 0 && <div> No To Do 's </div>}
            <ol start="1" className="list-decimal m-4">
              {list.map(function (item, index) {
                return (
                  <li key={index} className="my-2">
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => handleCheckbox(index)}
                      />
                      <span className={item.isCompleted ? 'line-through' : ''}>
                        {item.name}
                      </span>
                      <button
                        className="editDelete"
                        onClick={() => {
                          handleEdit(item.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="editDelete"
                        style={{ backgroundColor: 'red' }}
                        onClick={() => {
                          handleDelete(item.name);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
