import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import addTask_form from "../../store/actions/addTask_form";
import details_action from "../../store/actions/details";
import "./home.css";
export default function Home() {
  const [list, setList] = useState(
    localStorage.getItem("list")
      ? JSON.parse(localStorage.getItem("list"))
      : [
          {
            id: 1,
            title: "Example Todo",
            description: "Lorem text",
            subtasks: [
              { subtask_title: "Sub task 1", subtask_state: "todo" },
              { subtask_title: "Sub task 2", subtask_state: "todo" },
            ],
            state: "todo",
          },
        ]
  );
  let [subTasks, setSubTasks] = useState([]);
  let [subTask, setSubtask] = useState("");
  let [todoState, setTodoState] = useState("todo");
  let [updateTask, setUpdateTask] = useState({});
  let [updateTaskState, setUpdateTaskState] = useState("");
  let titleRef = React.createRef();
  let descriptionRef = React.createRef();
  let subtaskRef = React.createRef();
  let dispatch = useDispatch();
  let showAddTask = useSelector((state) => state.addTask_form);
  let IS_TASK_DETAILS_SHOWN = useSelector((state) => state.detailsReducer);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  let handleOverlayClick = (e) => {
    dispatch(addTask_form(false));
    dispatch(details_action(false));
  };
  let handleAddSubTask = (e) => {
    e.preventDefault();
    if (subTask) {
      setSubTasks((prevState) => {
        return [
          ...prevState,
          {
            subtask_title: subTask,
            subtask_state:
              todoState == "todo"
                ? "todo"
                : todoState == "doing"
                ? "doing"
                : "done",
          },
        ];
      });

      setSubtask("");
    }
  };

  let handleDeleteSubTask = (e) => {
    let index = subTasks.findIndex((task, index) => {
      return index == e.target.dataset.index;
    });
    subTasks.splice(index, 1);
    setSubTasks([...subTasks]);
    console.log(subTasks);
  };
  let handleAddTask = (e) => {
    e.preventDefault();
    if (titleRef.current.value && descriptionRef.current.value && todoState) {
      setList((prevState) => {
        return [
          ...prevState,
          {
            id: list.length + 1,
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            subtasks: subTasks.length > 0 ? subTasks : "",
            state: todoState,
          },
        ];
      });
      dispatch(addTask_form(false));
      setSubTasks([]);
    }

    console.log(list);
  };
  let handleTodoState = (e) => {
    setTodoState(e.target.value);
    setUpdateTask((prevState) => {
      return {
        ...prevState,
        state: e.target.value,
      };
    });
  };
  let handleSubTask = (e) => {
    setSubtask(e.target.value);
  };
  let handleShowTodoDetails = (todo) => {
    setUpdateTask(todo);
    dispatch(details_action(true));
  };
  let handleUpdateBtn = (e) => {
    e.preventDefault();
    let taskIndex = list.findIndex((todo) => todo.id == updateTask.id);
    list.splice(taskIndex, 1);
    setList((prevState) => {
      return [...prevState, updateTask];
    });
    dispatch(details_action(false));
  };
  let handlesubTaskDetails = (e, index) => {
    console.log(e.target.value, index);
    updateTask.subtasks[index].subtask_state = e.target.value;
    setUpdateTask((prevState) => {
      return {
        ...updateTask,
      };
    });
  };
  let handleDelete = (e) => {
    let todoIndex = list.findIndex((todo) => todo.id == updateTask.id);
    list.splice(todoIndex, 1);
    setList(list);
    dispatch(details_action(false));
  };
  let getNumberOfState = (state) => {
    let result = [0, 0, 0];
    list.forEach((todo) => {
      if (todo.state == "todo") result[0]++;
      else if (todo.state == "doing") result[1]++;
      else result[2]++;
    });
    return result;
  };
  return (
    <>
      <div className="home row gy-0 gx-5 mx-0">
        <div className="todo col-md-4">
          <div className="title todo__title d-flex align-items-center">
            <div className="circle todo__circle"></div>
            <p className="mb-0">Todo ({getNumberOfState("todo")[0]})</p>
          </div>

          {list.map((todo, index) => {
            return (
              todo.state === "todo" && (
                <div
                  className=" box todo__box"
                  key={index}
                  onClick={() => handleShowTodoDetails(todo)}
                >
                  <h5>{todo.title}</h5>
                  <p>{todo.subtasks.length} subtasks</p>
                </div>
              )
            );
          })}
        </div>
        <div className="doing col-md-4">
          <div className="title doing__title">
            <div className="circle doing__circle"></div>
            <p className="mb-0">Doing ({getNumberOfState("doing")[1]})</p>
          </div>
          {list.map((todo, index) => {
            return (
              todo.state == "doing" && (
                <div
                  className=" box todo__box"
                  key={index}
                  onClick={() => handleShowTodoDetails(todo)}
                >
                  <h5>{todo.title}</h5>
                  <p>{todo.subtasks.length} subtasks</p>
                </div>
              )
            );
          })}
        </div>
        <div className="done col-md-4">
          <div className="title done__title">
            <div className="circle done__circle"></div>
            <p className="mb-0">Done ({getNumberOfState("doing")[2]})</p>
          </div>
          {list.map((todo, index) => {
            return (
              todo.state == "done" && (
                <div
                  className=" box todo__box"
                  key={index}
                  onClick={() => handleShowTodoDetails(todo)}
                >
                  <h5>{todo.title}</h5>
                  <p>{todo.subtasks.length} subtasks</p>
                </div>
              )
            );
          })}
        </div>
      </div>
      {/* ------------------------ HANDLE: ADD TASK */}
      {showAddTask && (
        <div className="addTask">
          <form className="row">
            <div className="addTask__left col-md-6">
              <label
                htmlFor="task_title"
                className="addTask__title addTask__label"
              >
                Title
              </label>
              <input
                type="text"
                id="task_title"
                placeholder="e.g Reading a book"
                ref={titleRef}
              />
              <label
                htmlFor="task__description"
                className="addTask__description addTask__label"
              >
                description
              </label>
              <textarea
                type="text"
                id="task__description"
                placeholder="e.g reading a ABC book for 30 min"
                ref={descriptionRef}
              />
              <label htmlFor="task__state" className=" addTask__label">
                State
              </label>
              <select
                className="addTask__state"
                id="task__state"
                onChange={(e) => handleTodoState(e)}
              >
                <option disabled selected>
                  Select State
                </option>
                <option value="todo" key="todo">
                  Todo
                </option>
                <option value="doing" key="doing">
                  Doing
                </option>
                <option value="done" key="done">
                  Done
                </option>
              </select>
            </div>
            <div className="addTask__right col-md-6">
              <label
                htmlFor="addTask__subtasks"
                className="addTask__title addTask__label"
              >
                Subtasks
              </label>
              <div className="addTask__subtasksBox">
                <input
                  type="text"
                  id="task__description"
                  placeholder="e.g making a coffee"
                  ref={subtaskRef}
                  onChange={(e) => handleSubTask(e)}
                  value={subTask}
                />
              </div>

              <button
                className="subTaskBtn"
                onClick={(e) => handleAddSubTask(e)}
              >
                Add Subtask
              </button>

              {subTasks.map((subtask, index) => (
                <div className="addTask__subtasksBox" key={index}>
                  <p className="subTask__p" key={index}>
                    {subtask.subtask_title}
                  </p>
                  {/* <input
                    type="text"
                    id="task__description"
                    placeholder="e.g making a coffee"
                    ref={subtaskRef}
                    onChange={(e) => handleSubTask(e)}
                    value={subTask}
                  /> */}

                  <i
                    className="fa-solid fa-xmark"
                    data-index={index}
                    onClick={(e) => handleDeleteSubTask(e)}
                  ></i>
                </div>
              ))}
              <button
                type="submit"
                className="addTask__add"
                onClick={(e) => handleAddTask(e)}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
      {showAddTask && (
        <div
          className="addTask__overlay"
          onClick={(e) => handleOverlayClick(e)}
        ></div>
      )}
      {/* ------------------------ HANDLE: TASK DETAILS */}
      {IS_TASK_DETAILS_SHOWN && (
        <div className="taskDetails">
          <div className="taskDetails__box d-flex justify-content-between align-items-center">
            <div>
              <p>Title</p>
              <h4>{updateTask.title}</h4>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn-danger btn fs-3 rounded-4 px-4"
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </button>
              <button
                className="primaryBtn ms-3"
                onClick={(e) => handleUpdateBtn(e)}
              >
                Update
              </button>
            </div>
          </div>
          <div className="taskDetails__box">
            <p>Description</p>
            <h4>{updateTask.description}</h4>
          </div>
          <div className="taskDetails__box">
            <p>State</p>
            <h4
              className={`text-capitalize ${
                updateTask.state == "todo"
                  ? "todo__text"
                  : updateTask.state == "doing"
                  ? "doing__text"
                  : "done__text"
              }`}
            >
              {updateTask.state}
            </h4>
          </div>
          <div className="taskDetails__box">
            <p>Change State</p>
            <select
              className="form-select py-2 fs-4 w-25"
              onChange={(e) => {
                handleTodoState(e);
              }}
            >
              <option selected disabled>
                Select State
              </option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="taskDetails__box">
            <p>Subtasks</p>
            <table className="table table-hover customTable ">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">State</th>
                  <th scope="col">Change</th>
                </tr>
              </thead>
              <tbody>
                {updateTask.subtasks.length > 0 &&
                  updateTask.subtasks.map((task, index) => (
                    <tr key={index}>
                      <td>{task.subtask_title}</td>
                      <td
                        className={`text-capitalize ${
                          task.subtask_state == "todo"
                            ? "todo__text"
                            : task.subtask_state == "doing"
                            ? "doing__text"
                            : "done__text"
                        }`}
                      >
                        {task.subtask_state}
                      </td>
                      <td>
                        <select
                          className="form-select fs-5 w-75"
                          onChange={(e) => handlesubTaskDetails(e, index)}
                        >
                          <option selected disabled>
                            Select State
                          </option>

                          <option value="todo">Todo</option>
                          <option value="doing">Doing</option>
                          <option value="done">Done</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {IS_TASK_DETAILS_SHOWN && (
        <div
          className="addTask__overlay"
          onClick={(e) => handleOverlayClick(e)}
        ></div>
      )}
    </>
  );
}
